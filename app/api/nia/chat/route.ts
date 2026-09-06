import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { buildNiaSystemPrompt } from "@/lib/nia/system-prompt";
import { NIA_TOOLS, executeNiaTool } from "@/lib/nia/tools";
import { canExecuteTool } from "@/lib/nia/permissions";
import type { NiaChatMessage, NiaPermissionContext } from "@/lib/nia/types";

const MODEL = "claude-opus-5";
const MAX_TOKENS = 4096;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOOL_ITERATIONS = 4;

// Every website visitor runs under the public permission scope — see
// lib/nia/permissions.ts for how this extends to authenticated adapters.
const WEBSITE_CONTEXT: NiaPermissionContext = { role: "public" };

const SYSTEM_PROMPT = buildNiaSystemPrompt();

// Simple per-instance sliding-window rate limiter. This resets on cold start
// and is not shared across serverless instances — a reasonable soft limit
// for now, not a substitute for infrastructure-level rate limiting.
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseMessages(body: unknown): NiaChatMessage[] | null {
  if (!isRecord(body) || !Array.isArray(body.messages)) return null;

  const messages: NiaChatMessage[] = [];

  for (const entry of body.messages.slice(-MAX_MESSAGES)) {
    if (!isRecord(entry)) return null;
    const role = entry.role;
    const content = entry.content;

    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const trimmed = content.trim();
    if (!trimmed) continue;

    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LENGTH) });
  }

  if (messages.length === 0) return null;
  if (messages[messages.length - 1].role !== "user") return null;

  return messages;
}

async function* runNiaLoop(
  history: NiaChatMessage[]
): AsyncGenerator<string> {
  const client = new Anthropic();

  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration += 1) {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      output_config: { effort: "medium" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      tools: NIA_TOOLS,
      messages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        yield event.delta.text;
      }
    }

    const message = await stream.finalMessage();

    if (message.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: message.content });
      continue;
    }

    if (message.stop_reason !== "tool_use") {
      return;
    }

    messages.push({ role: "assistant", content: message.content });

    const toolUseBlocks = message.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of toolUseBlocks) {
      if (!canExecuteTool(WEBSITE_CONTEXT, block.name)) {
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: "This action is not permitted in the current context.",
          is_error: true,
        });
        continue;
      }

      const result = await executeNiaTool(block.name, block.input);
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: result.content,
        is_error: result.isError,
      });
    }

    messages.push({ role: "user", content: toolResults });
  }
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return new Response("You're sending messages a little too quickly. Please wait a moment and try again.", {
      status: 429,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return new Response("Invalid message history.", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of runNiaLoop(messages)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        console.error("Nia chat route error", error);
        controller.enqueue(
          encoder.encode("\n\nI'm having trouble responding right now. Please try again in a moment.")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
