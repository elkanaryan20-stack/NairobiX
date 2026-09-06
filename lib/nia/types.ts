// Shared types for Nia Core. Kept adapter-agnostic (no Next.js or browser
// types here) so the same shapes can later back the Portal, WhatsApp, and
// staff adapters described in the Nia Core architecture, not just the
// website chat widget.

export type NiaRole = "user" | "assistant";

export type NiaChatMessage = {
  role: NiaRole;
  content: string;
};

/**
 * The permission scope a Nia conversation runs under. Only "public" is
 * implemented today (the website has no authentication yet) — "client" and
 * "staff" are reserved so the Portal/Staff adapters can be added later
 * without reshaping this type.
 */
export type NiaPermissionContext = {
  role: "public";
};
