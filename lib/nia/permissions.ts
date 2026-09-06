import type { NiaPermissionContext } from "@/lib/nia/types";

/**
 * Every tool Nia can call, and the minimum role permitted to call it. Today
 * the website only runs the "public" role — everything here is a tool that's
 * safe for an unauthenticated visitor to trigger (CRM/booking writes go
 * through the same validation as the public forms). When the Client Portal
 * and Staff Command Center adapters are built, add "client" and "staff"
 * tools/roles here rather than widening what "public" can do.
 *
 * Role/org identity must always come from the authenticated server-side
 * session of whichever adapter is calling this — never from a client-
 * supplied field — once authenticated adapters exist. The website adapter
 * has no authentication, so its context is always { role: "public" }.
 */
const TOOL_MIN_ROLE: Record<string, NiaPermissionContext["role"]> = {
  check_consultation_availability: "public",
  submit_growth_audit: "public",
  submit_service_request: "public",
  submit_partner_application: "public",
  book_consultation: "public",
};

export function canExecuteTool(context: NiaPermissionContext, toolName: string): boolean {
  const minRole = TOOL_MIN_ROLE[toolName];
  if (!minRole) return false; // unknown tool — deny by default
  return context.role === minRole;
}
