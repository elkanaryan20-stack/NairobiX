"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Captures first-touch UTM/referrer acquisition source once per browser. Renders nothing. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
