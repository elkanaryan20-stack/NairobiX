"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type IdleBehavior = "tilt" | "bounce" | "shake" | "nudge" | "wipe";

const IDLE_BEHAVIORS: IdleBehavior[] = ["tilt", "bounce", "shake", "nudge", "wipe"];

const IDLE_BEHAVIOR_CLASS: Partial<Record<IdleBehavior, string>> = {
  tilt: "animate-nia-tilt",
  bounce: "animate-nia-bounce",
  shake: "animate-nia-shake",
  nudge: "animate-nia-nudge",
};

const IDLE_BEHAVIOR_DURATION_MS: Record<Exclude<IdleBehavior, "wipe">, number> = {
  tilt: 900,
  bounce: 700,
  shake: 500,
  nudge: 600,
};

const MIN_IDLE_DELAY_MS = 20_000;
const MAX_IDLE_DELAY_MS = 45_000;
const WIPE_PHASE_MS = 1400;
const WIPE_HOLD_MS = 250;

/** Custom events any page can dispatch (see NiaSectionCue) to nudge Nia toward a specific reaction as the visitor reaches a notable section. */
export type NiaContextReaction = "bounce" | "tilt" | "attentive";
export const NIA_CUE_EVENT = "nairobix:nia-cue";

// NiaLauncher is dynamically imported with ssr:false so Nia's bundle never
// blocks the initial page render — meaning a section can scroll into view,
// and NiaSectionCue can dispatch its (one-shot) event, before the launcher
// has mounted and attached its listener. Module scope survives that race:
// the dispatcher always records here too, and the hook checks for a
// not-yet-seen cue on mount, so an early cue is never silently lost.
let pendingCue: NiaContextReaction | null = null;

export function dispatchNiaCue(reaction: NiaContextReaction) {
  pendingCue = reaction;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(NIA_CUE_EVENT, { detail: { reaction } }));
  }
}

function consumePendingCue(): NiaContextReaction | null {
  const cue = pendingCue;
  pendingCue = null;
  return cue;
}

type WipePhase = "idle" | "out" | "hold" | "in";

/**
 * Nia's idle personality — occasional, varied, small movements while the
 * launcher sits idle. Deliberately not a visual-effects system: everything
 * here is gated on `active` (false while the chat panel is open — idle
 * personality has no reason to run against content nobody can see) and on
 * reduced-motion (disabled outright, functionality untouched).
 */
export function useNiaPersonality({ active }: { active: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const [markAnimationClass, setMarkAnimationClass] = useState("");
  const [wipePhase, setWipePhase] = useState<WipePhase>("idle");
  const [isRolling, setIsRolling] = useState(false);
  const lastBehaviorRef = useRef<IdleBehavior | null>(null);
  const timerIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timerIdsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimers = useCallback(() => {
    timerIdsRef.current.forEach(clearTimeout);
    timerIdsRef.current = [];
  }, []);

  const playIdleBehavior = useCallback(
    (behavior: IdleBehavior) => {
      if (behavior === "wipe") {
        setWipePhase("out");
        schedule(() => setWipePhase("hold"), WIPE_PHASE_MS);
        schedule(() => setWipePhase("in"), WIPE_PHASE_MS + WIPE_HOLD_MS);
        schedule(() => setWipePhase("idle"), WIPE_PHASE_MS + WIPE_HOLD_MS + WIPE_PHASE_MS);
        return;
      }
      setMarkAnimationClass(IDLE_BEHAVIOR_CLASS[behavior] ?? "");
      schedule(() => setMarkAnimationClass(""), IDLE_BEHAVIOR_DURATION_MS[behavior]);
    },
    [schedule]
  );

  const pickNextBehavior = useCallback((): IdleBehavior => {
    const choices = IDLE_BEHAVIORS.filter((behavior) => behavior !== lastBehaviorRef.current);
    const pick = choices[Math.floor(Math.random() * choices.length)];
    lastBehaviorRef.current = pick;
    return pick;
  }, []);

  // Random idle personality events, ~20-45s apart, skipped (and rescheduled,
  // not dropped) while the tab is backgrounded so nothing pointlessly
  // animates off-screen.
  useEffect(() => {
    if (!active || reducedMotion) return;

    let cancelled = false;
    const scheduleNext = () => {
      const delay = MIN_IDLE_DELAY_MS + Math.random() * (MAX_IDLE_DELAY_MS - MIN_IDLE_DELAY_MS);
      schedule(() => {
        if (cancelled) return;
        if (typeof document !== "undefined" && document.hidden) {
          scheduleNext();
          return;
        }
        playIdleBehavior(pickNextBehavior());
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    // Only stops this effect's own recursive scheduling chain — deliberately
    // does not touch markAnimationClass/wipePhase or clearAllTimers, both
    // shared with sibling effects (the contextual-cue reaction below, the
    // click-roll trigger). Under React StrictMode's dev-only double-invoke,
    // this cleanup runs between the two mounts alongside every other
    // effect's; clearing shared state here was wiping out a reaction that
    // the cue effect had *just* played in that same pass. Any element these
    // classes are applied to unmounts together with the whole launcher
    // whenever `active` goes false, so there's nothing left to visually
    // "stick" — see the unmount-only cleanup below for stray timers.
    return () => {
      cancelled = true;
    };
  }, [active, reducedMotion, schedule, playIdleBehavior, pickNextBehavior]);

  // Final safety net for any timers still pending on true unmount.
  useEffect(() => clearAllTimers, [clearAllTimers]);

  // Contextual reactions — see NiaSectionCue for the dispatching side.
  useEffect(() => {
    if (!active || reducedMotion || typeof window === "undefined") return;

    const react = (reaction?: NiaContextReaction) => {
      if (reaction === "bounce") playIdleBehavior("bounce");
      else if (reaction === "tilt") playIdleBehavior("tilt");
      else if (reaction === "attentive") {
        setMarkAnimationClass("animate-nia-attentive");
        schedule(() => setMarkAnimationClass(""), 900);
      }
    };

    // A section already in view may have fired its cue before this mounted.
    const missed = consumePendingCue();
    if (missed) react(missed);

    const handleCue = (event: Event) => {
      react((event as CustomEvent<{ reaction?: NiaContextReaction }>).detail?.reaction);
    };
    window.addEventListener(NIA_CUE_EVENT, handleCue);
    return () => window.removeEventListener(NIA_CUE_EVENT, handleCue);
  }, [active, reducedMotion, playIdleBehavior, schedule]);

  const triggerHoverNudge = useCallback(() => {
    if (reducedMotion) return;
    playIdleBehavior("nudge");
  }, [reducedMotion, playIdleBehavior]);

  const triggerClickRoll = useCallback(
    (onComplete: () => void) => {
      if (reducedMotion) {
        onComplete();
        return;
      }
      setIsRolling(true);
      schedule(() => {
        setIsRolling(false);
        onComplete();
      }, 700);
    },
    [reducedMotion, schedule]
  );

  return {
    markAnimationClass,
    wipePhase,
    isRolling,
    reducedMotion,
    triggerHoverNudge,
    triggerClickRoll,
  };
}
