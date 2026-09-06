"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { NiaMessage, NiaTypingIndicator } from "@/components/nia/NiaMessage";
import { NiaInput } from "@/components/nia/NiaInput";
import { NiaSuggestions } from "@/components/nia/NiaSuggestions";
import type { NiaChatMessage } from "@/lib/nia/types";

const FALLBACK_EMPTY_REPLY =
  "Sorry, I didn't catch that. Could you tell me a bit more about what you're looking for?";
const FALLBACK_ERROR_REPLY = "I'm having trouble responding right now. Please try again in a moment.";

export function NiaChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<NiaChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isWaitingForFirstToken, setIsWaitingForFirstToken] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError("");
    const nextMessages: NiaChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setDraft("");
    setIsStreaming(true);
    setIsWaitingForFirstToken(true);

    try {
      const response = await fetch("/api/nia/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let receivedAny = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          receivedAny = true;
          setIsWaitingForFirstToken(false);
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            updated[updated.length - 1] = { ...last, content: last.content + chunk };
            return updated;
          });
        }
      }

      if (!receivedAny) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: FALLBACK_EMPTY_REPLY };
          return updated;
        });
      }
    } catch {
      setError(FALLBACK_ERROR_REPLY);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
      setIsWaitingForFirstToken(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Nia</p>
            <p className="text-xs text-[var(--text-tertiary)]">NairobiX Growth Assistant</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Nia"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-tertiary)] transition hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-4">
            <p className="text-sm leading-6 text-[var(--text-secondary)]">
              Hi, I&apos;m Nia — the NairobiX Growth Assistant. Ask me about NairobiX, get help finding the
              right solution, or book a consultation.
            </p>
            <NiaSuggestions onSelect={sendMessage} />
          </div>
        ) : (
          messages.map((message, index) => {
            const isLastAssistant = index === messages.length - 1 && message.role === "assistant";
            if (isLastAssistant && isWaitingForFirstToken) {
              return <NiaTypingIndicator key={index} />;
            }
            if (isLastAssistant && !message.content) {
              return null;
            }
            return <NiaMessage key={index} message={message} />;
          })
        )}
        {error ? (
          <p role="alert" className="text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </div>

      <NiaInput value={draft} onChange={setDraft} onSend={() => sendMessage(draft)} disabled={isStreaming} />
    </div>
  );
}
