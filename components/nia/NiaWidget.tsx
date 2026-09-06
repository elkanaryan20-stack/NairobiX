"use client";

import dynamic from "next/dynamic";

// Lazy-loaded so Nia's chat bundle never blocks the initial page render.
const NiaLauncher = dynamic(() => import("@/components/nia/NiaLauncher").then((mod) => mod.NiaLauncher), {
  ssr: false,
});

export function NiaWidget() {
  return <NiaLauncher />;
}
