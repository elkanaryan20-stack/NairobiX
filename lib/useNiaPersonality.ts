"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent, PointerEvent as ReactPointerEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { HOVER_MESSAGES, IDLE_MESSAGES, ROAM_MESSAGES, isTaskRoute, pageMessage, pickFresh } from "@/lib/nia/presence";

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

// ── Idle moves ──────────────────────────────────────────────────────────
// "glyph" moves animate the N inside the circle; "body" moves animate the
// whole launcher (and the message attached to it). Each carries the chance
// that a message accompanies it, so movement and message never pair
// predictably — a tilt is usually silent, a hop often says something.
type SmallMove = "hop" | "bob" | "drift" | "arc" | "roll" | "tilt" | "spin" | "wipe";

const SMALL_MOVES: Record<SmallMove, { glyph?: string; body?: string; ms: number; messageChance: number }> = {
  hop: { body: "animate-nia-hop", ms: 900, messageChance: 0.6 },
  bob: { body: "animate-nia-bob", ms: 2000, messageChance: 0.5 },
  drift: { body: "animate-nia-drift", ms: 1400, messageChance: 0.4 },
  arc: { body: "animate-nia-arc", ms: 1500, messageChance: 0.4 },
  roll: { body: "animate-nia-roll-short", glyph: "animate-nia-roll-short-glyph", ms: 1700, messageChance: 0.5 },
  tilt: { glyph: "animate-nia-tilt", ms: 900, messageChance: 0.15 },
  spin: { glyph: "animate-nia-roll", ms: 700, messageChance: 0.2 },
  wipe: { ms: 3050, messageChance: 0 },
};
const SMALL_MOVE_NAMES = Object.keys(SMALL_MOVES) as SmallMove[];

const WIPE_PHASE_MS = 1400;
const WIPE_HOLD_MS = 250;

// ── Timing ──────────────────────────────────────────────────────────────
const MIN_IDLE_MS = 25_000;
const MAX_IDLE_MS = 45_000;
/** Each episode without the visitor doing anything waits longer than the last… */
const IDLE_BACKOFF = 1.6;
/** …and after this many, Nia stays still until the visitor is back. */
const MAX_EPISODES_WHILE_AWAY = 5;
/** At most this many idle messages per page — an invitation, not a nag. */
const MAX_MESSAGES_PER_PAGE = 3;
/** Recently working in a form or booking: Nia leaves the visitor alone. */
const TASK_QUIET_MS = 60_000;
const MESSAGE_DELAY_MS = 450;
const MESSAGE_HOLD_MS = 3600;
const BUBBLE_FADE_MS = 300;
const HOVER_NUDGE_COOLDOWN_MS = 4000;
const ROAMED_KEY = "nx_nia_roamed";

/** Anything the visitor may be working in. */
const TASK_SELECTOR = "form, input, textarea, select, [contenteditable='true'], [data-nia-quiet]";
/** Things a message must never sit on top of. */
const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, summary, [role='button'], [role='link'], form, [data-nia-quiet]";

export type NiaTravel = { x: number; rotate: number; ms: number; easing: string };
const HOME: NiaTravel = { x: 0, rotate: 0, ms: 0, easing: "linear" };
const EASE_ROLL = "cubic-bezier(0.55, 0, 0.35, 1)";
const EASE_ARRIVE = "cubic-bezier(0.2, 0.7, 0.25, 1)";

type RoamPhase = "pre" | "out" | "hidden" | "in" | "settling";
type Episode = { kind: "small" } | { kind: "roam"; phase: RoamPhase; legStart: number; legMs: number };
type TimerGroup = "episode" | "bubble" | "ui";

const random = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Nia's presence on the page: occasional, varied movements and short
 * messages when — and only when — the visitor has genuinely been idle.
 *
 * One pending timeout at most: activity only stamps a time, and the timeout
 * checks that stamp when it fires, so moving the mouse never churns timers.
 * Everything is transform/opacity. Off entirely while `active` is false
 * (chat panel or mobile nav open); with reduced motion, messages only fade.
 */
export function useNiaPersonality({ active, pathname }: { active: boolean; pathname: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const [glyphClass, setGlyphClass] = useState("");
  const [bodyClass, setBodyClass] = useState("");
  const [wipePhase, setWipePhase] = useState<WipePhase>("idle");
  const [isRolling, setIsRolling] = useState(false);
  const [travel, setTravel] = useState<NiaTravel>(HOME);
  const [away, setAway] = useState(false);
  const [bubble, setBubble] = useState<{ text: string; visible: boolean }>({ text: "", visible: false });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<Record<TimerGroup, ReturnType<typeof setTimeout>[]>>({ episode: [], bubble: [], ui: [] });
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const episodeRef = useRef<Episode | null>(null);
  const idleSinceRef = useRef(0);
  const lastTaskRef = useRef(0);
  const episodesRef = useRef(0);
  const messagesRef = useRef(0);
  const lastMoveRef = useRef<SmallMove | null>(null);
  const lastMessageRef = useRef<string | null>(null);
  const bubbleOwnerRef = useRef<"idle" | "hover" | null>(null);
  const bubbleTokenRef = useRef(0);
  const hoveredRef = useRef(false);
  /** Where Nia rests (her left edge, in px), measured as a roam begins. */
  const homeLeftRef = useRef<number | null>(null);
  const lastNudgeRef = useRef(0);
  const pathnameRef = useRef(pathname);
  const reducedMotionRef = useRef(reducedMotion);
  useEffect(() => {
    pathnameRef.current = pathname;
    reducedMotionRef.current = reducedMotion;
  }, [pathname, reducedMotion]);

  // ── Timers ──────────────────────────────────────────────────────────
  const later = useCallback((fn: () => void, ms: number, group: TimerGroup) => {
    timersRef.current[group].push(setTimeout(fn, ms));
  }, []);

  const clearGroup = useCallback((group: TimerGroup) => {
    timersRef.current[group].forEach(clearTimeout);
    timersRef.current[group] = [];
  }, []);

  // ── The message beside Nia ──────────────────────────────────────────
  const showBubble = useCallback((text: string, owner: "idle" | "hover") => {
    const token = ++bubbleTokenRef.current;
    bubbleOwnerRef.current = owner;
    setBubble({ text, visible: false });
    // Mount hidden, then reveal on the next frame so the fade-in runs.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (bubbleTokenRef.current === token) setBubble({ text, visible: true });
      }),
    );
  }, []);

  const hideBubble = useCallback(() => {
    const token = ++bubbleTokenRef.current;
    bubbleOwnerRef.current = null;
    setBubble((current) => (current.visible ? { ...current, visible: false } : current));
    setTimeout(() => {
      if (bubbleTokenRef.current === token) setBubble({ text: "", visible: false });
    }, BUBBLE_FADE_MS);
  }, []);

  /** True when a message beside Nia would cover nothing the visitor might want to use. */
  const messageAreaIsClear = useCallback((text: string) => {
    const button = buttonRef.current;
    if (!button) return false;
    const rect = button.getBoundingClientRect();
    // Mid-roam, judge the spot where she will settle, not where she is now.
    const right = (episodeRef.current?.kind === "roam" && homeLeftRef.current !== null ? homeLeftRef.current : rect.left) - 10;
    const width = Math.min(text.length * 7 + 40, right - 8);
    const cy = rect.top + rect.height / 2;
    const xs = [right - 6, right - width / 2, right - width + 6];
    const ys = [cy - 12, cy, cy + 12];
    for (const x of xs) {
      for (const y of ys) {
        const hit = document.elementFromPoint(x, y);
        if (hit?.closest(INTERACTIVE_SELECTOR)) return false;
      }
    }
    return true;
  }, []);

  const chooseIdleMessage = useCallback(() => {
    const onPage = pageMessage(pathnameRef.current);
    const text =
      messagesRef.current === 0 && onPage && Math.random() < 0.7
        ? onPage
        : pickFresh(IDLE_MESSAGES.filter((m) => m !== onPage), lastMessageRef.current);
    lastMessageRef.current = text;
    return text;
  }, []);

  /** Shows an idle message for a moment, if one is due and it would cover nothing. */
  const offerMessage = useCallback(
    (text: string, delay: number, hold = MESSAGE_HOLD_MS) => {
      later(() => {
        if (hoveredRef.current || !messageAreaIsClear(text)) return;
        messagesRef.current += 1;
        showBubble(text, "idle");
        later(() => bubbleOwnerRef.current === "idle" && hideBubble(), hold, "bubble");
      }, delay, "bubble");
    },
    [later, messageAreaIsClear, showBubble, hideBubble],
  );

  // ── Idle scheduling ─────────────────────────────────────────────────
  const runEpisodeRef = useRef<() => void>(() => {});

  const armIdle = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = null;
    if (episodesRef.current >= MAX_EPISODES_WHILE_AWAY) return;
    // Whole milliseconds: Date.now() is integral, so a fractional target could
    // leave a sliver of a millisecond that the check keeps rescheduling for.
    const required = Math.round(random(MIN_IDLE_MS, MAX_IDLE_MS) * IDLE_BACKOFF ** episodesRef.current);

    const check = () => {
      idleTimerRef.current = null;
      const now = Date.now();
      const idleFor = now - idleSinceRef.current;
      if (idleFor < required) {
        idleTimerRef.current = setTimeout(check, Math.max(1, required - idleFor));
        return;
      }
      const focused = document.activeElement;
      const busy =
        document.hidden ||
        hoveredRef.current ||
        episodeRef.current !== null ||
        now - lastTaskRef.current < TASK_QUIET_MS ||
        Boolean(focused && focused !== document.body && focused.closest(TASK_SELECTOR));
      if (busy) {
        idleSinceRef.current = now;
        idleTimerRef.current = setTimeout(check, required);
        return;
      }
      runEpisodeRef.current();
    };
    idleTimerRef.current = setTimeout(check, Math.max(0, required - (Date.now() - idleSinceRef.current)));
  }, []);

  const endEpisode = useCallback(() => {
    episodeRef.current = null;
    idleSinceRef.current = Date.now();
    armIdle();
  }, [armIdle]);

  // ── Small moves ─────────────────────────────────────────────────────
  const playSmallMove = useCallback(
    (move: SmallMove) => {
      lastMoveRef.current = move;
      if (move === "wipe") {
        setWipePhase("out");
        later(() => setWipePhase("hold"), WIPE_PHASE_MS, "episode");
        later(() => setWipePhase("in"), WIPE_PHASE_MS + WIPE_HOLD_MS, "episode");
        later(() => setWipePhase("idle"), WIPE_PHASE_MS * 2 + WIPE_HOLD_MS, "episode");
        return;
      }
      const spec = SMALL_MOVES[move];
      if (spec.glyph) setGlyphClass(spec.glyph);
      if (spec.body) setBodyClass(spec.body);
      later(() => {
        if (spec.glyph) setGlyphClass("");
        if (spec.body) setBodyClass("");
      }, spec.ms, "episode");
    },
    [later],
  );

  const runSmallEpisode = useCallback(() => {
    episodeRef.current = { kind: "small" };
    let duration = 0;
    if (!reducedMotionRef.current) {
      const move = pickFresh(SMALL_MOVE_NAMES, lastMoveRef.current);
      playSmallMove(move);
      duration = SMALL_MOVES[move].ms;
      if (messagesRef.current < MAX_MESSAGES_PER_PAGE && Math.random() < SMALL_MOVES[move].messageChance) {
        offerMessage(chooseIdleMessage(), MESSAGE_DELAY_MS);
        duration = Math.max(duration, MESSAGE_DELAY_MS + MESSAGE_HOLD_MS + BUBBLE_FADE_MS);
      }
    } else if (messagesRef.current < MAX_MESSAGES_PER_PAGE && Math.random() < 0.5) {
      // Reduced motion: no movement at all — just the occasional message, faded.
      offerMessage(chooseIdleMessage(), 0);
      duration = MESSAGE_HOLD_MS + BUBBLE_FADE_MS;
    }
    later(endEpisode, duration, "episode");
  }, [playSmallMove, offerMessage, chooseIdleMessage, later, endEpisode]);

  // ── The roam ────────────────────────────────────────────────────────
  // Rolling, not sliding: the N turns by exactly the distance travelled
  // over the circle's circumference, so the movement reads as physical.
  const settle = useCallback(() => {
    episodeRef.current = { kind: "roam", phase: "settling", legStart: 0, legMs: 0 };
    // Any whole number of turns looks identical to none, so this resets silently.
    setTravel(HOME);
    setAway(false);
    setBodyClass("animate-nia-settle");
    later(() => setBodyClass(""), 600, "episode");
    later(endEpisode, 600, "episode");
  }, [later, endEpisode]);

  const enterFromRight = useCallback(
    (backMessage: string | null) => {
      const button = buttonRef.current;
      if (!button) return settle();
      const rect = button.getBoundingClientRect();
      const home = homeLeftRef.current ?? window.innerWidth - rect.width - 24;
      const distance = window.innerWidth - home + 24;
      const turns = Math.max(1, Math.round(distance / (Math.PI * rect.width)));
      const ms = clamp(distance * 1.3, 700, 1300);
      // Off-screen right, instantly (she is out of sight), then roll home.
      setTravel({ x: distance, rotate: 0, ms: 0, easing: "linear" });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          episodeRef.current = { kind: "roam", phase: "in", legStart: Date.now(), legMs: ms };
          setTravel({ x: 0, rotate: -360 * turns, ms, easing: EASE_ARRIVE });
          if (backMessage) offerMessage(backMessage, ms * 0.6, 2600);
          later(settle, ms, "episode");
        }),
      );
    },
    [settle, offerMessage, later],
  );

  const runRoam = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return runSmallEpisode();
    const copy = Math.random() < 0.65 ? ROAM_MESSAGES.signature : ROAM_MESSAGES.gentle;
    const full = window.innerWidth >= 1024;
    try {
      sessionStorage.setItem(ROAMED_KEY, "1");
    } catch {
      // Storage blocked: the roam may simply happen again next page.
    }
    episodeRef.current = { kind: "roam", phase: "pre", legStart: 0, legMs: 0 };

    // 1–3. Notice the visitor: a small tilt, then a line.
    setGlyphClass("animate-nia-tilt");
    later(() => setGlyphClass(""), SMALL_MOVES.tilt.ms, "episode");
    offerMessage(copy.leave, 350, 2400);

    // 4–7. Roll away across the bottom of the viewport.
    later(() => {
      const rect = button.getBoundingClientRect();
      homeLeftRef.current = rect.left;
      const distance = full ? rect.left + rect.width + 24 : Math.min(window.innerWidth * 0.38, 380);
      const ms = full ? clamp(distance * 1.6, 1100, 2400) : clamp(distance * 2.2, 700, 1100);
      const rotate = -(distance / (Math.PI * rect.width)) * 360;
      setAway(true); // never clickable mid-roam: no accidental opens over page content
      episodeRef.current = { kind: "roam", phase: "out", legStart: Date.now(), legMs: ms };
      setTravel({ x: -distance, rotate, ms, easing: EASE_ROLL });

      if (full) {
        // 8–12. Gone for a beat, then back in from the other side.
        later(() => {
          episodeRef.current = { kind: "roam", phase: "hidden", legStart: 0, legMs: 0 };
          later(() => enterFromRight(copy.back), 900, "episode");
        }, ms, "episode");
      } else {
        // Tablet: a shorter roll out and back, never leaving the screen.
        later(() => {
          episodeRef.current = { kind: "roam", phase: "in", legStart: Date.now(), legMs: ms };
          setTravel({ x: 0, rotate: 0, ms, easing: EASE_ROLL });
          offerMessage(copy.back, ms * 0.6, 2600);
          later(settle, ms, "episode");
        }, ms + 500, "episode");
      }
    }, 350 + 2400 + 200, "episode");
  }, [runSmallEpisode, later, offerMessage, enterFromRight, settle]);

  const runEpisode = useCallback(() => {
    episodesRef.current += 1;
    let roamedAlready = false;
    try {
      roamedAlready = sessionStorage.getItem(ROAMED_KEY) === "1";
    } catch {
      roamedAlready = true;
    }
    const roamAllowed =
      !reducedMotionRef.current &&
      !roamedAlready &&
      window.innerWidth >= 640 &&
      !isTaskRoute(pathnameRef.current) &&
      episodesRef.current >= 2;
    if (roamAllowed && Math.random() < 0.4) runRoam();
    else runSmallEpisode();
  }, [runRoam, runSmallEpisode]);
  useEffect(() => {
    runEpisodeRef.current = runEpisode;
  }, [runEpisode]);

  /** The visitor did something: stop whatever Nia is doing, gracefully. */
  const interruptEpisode = useCallback(() => {
    const episode = episodeRef.current;
    if (!episode) return;
    clearGroup("bubble");
    if (bubbleOwnerRef.current === "idle") hideBubble();

    if (episode.kind === "small") return; // short moves finish on their own; only the message goes

    if (episode.phase === "pre") {
      clearGroup("episode");
      setGlyphClass("");
      endEpisode();
    } else if (episode.phase === "out") {
      // Roll back the way she came, as quickly as she left.
      clearGroup("episode");
      const travelled = clamp((Date.now() - episode.legStart) / episode.legMs, 0, 1);
      const ms = clamp(travelled * episode.legMs * 0.7, 350, 1100);
      episodeRef.current = { kind: "roam", phase: "in", legStart: Date.now(), legMs: ms };
      setTravel({ x: 0, rotate: 0, ms, easing: EASE_ARRIVE });
      later(settle, ms, "episode");
    } else if (episode.phase === "hidden") {
      clearGroup("episode");
      enterFromRight(null);
    }
    // "in" and "settling" are already on their way home.
  }, [clearGroup, hideBubble, endEpisode, later, settle, enterFromRight]);

  const resetPresence = useCallback(() => {
    clearGroup("episode");
    clearGroup("bubble");
    clearGroup("ui");
    episodeRef.current = null;
    hoveredRef.current = false;
    bubbleOwnerRef.current = null;
    bubbleTokenRef.current += 1;
    setBubble({ text: "", visible: false });
    setTravel(HOME);
    setAway(false);
    setGlyphClass("");
    setBodyClass("");
    setWipePhase("idle");
  }, [clearGroup]);

  // Activity watching + the idle timer. Cleanup only detaches this effect's
  // own listeners and timer — never shared visual state, which a sibling
  // effect may have just set under StrictMode's double-invoke.
  useEffect(() => {
    if (!active) return;
    idleSinceRef.current = Date.now();
    let lastX = -1;
    let lastY = -1;

    const onActivity = (event: Event) => {
      if (event.type === "pointermove") {
        const { clientX, clientY } = event as PointerEvent;
        // Ignore synthetic moves fired when content shifts under a still pointer.
        if (Math.abs(clientX - lastX) + Math.abs(clientY - lastY) < 3) return;
        lastX = clientX;
        lastY = clientY;
      }
      if (event.type === "visibilitychange" && document.hidden) return;
      const now = Date.now();
      idleSinceRef.current = now;
      const target = event.target;
      if (event.type !== "scroll" && target instanceof Element && target.closest(TASK_SELECTOR)) lastTaskRef.current = now;
      if (episodeRef.current) interruptEpisode();
      if (episodesRef.current > 0) {
        // Back from being away: start over with a fresh, short idle wait.
        episodesRef.current = 0;
        if (!episodeRef.current) armIdle();
      }
    };

    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "input", "focusin"] as const;
    events.forEach((type) => window.addEventListener(type, onActivity, { passive: true, capture: true }));
    document.addEventListener("scroll", onActivity, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onActivity);
    window.addEventListener("resize", onActivity, { passive: true });
    armIdle();

    return () => {
      events.forEach((type) => window.removeEventListener(type, onActivity, { capture: true }));
      document.removeEventListener("scroll", onActivity, { capture: true });
      document.removeEventListener("visibilitychange", onActivity);
      window.removeEventListener("resize", onActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    };
  }, [active, armIdle, interruptEpisode]);

  // Chat or mobile nav opened: Nia goes home and stays still. Done on the
  // transition (not in a cleanup) so StrictMode's re-run never resets her.
  const wasActiveRef = useRef(active);
  useEffect(() => {
    if (wasActiveRef.current && !active) {
      resetPresence();
      episodesRef.current = 0;
    }
    wasActiveRef.current = active;
  }, [active, resetPresence]);

  // A new page is a fresh start: counters reset, anything in flight goes home.
  const lastPathRef = useRef(pathname);
  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    interruptEpisode();
    hideBubble();
    episodesRef.current = 0;
    messagesRef.current = 0;
    idleSinceRef.current = Date.now();
  }, [pathname, interruptEpisode, hideBubble]);

  // Final safety net for any timers still pending on true unmount.
  useEffect(
    () => () => {
      (["episode", "bubble", "ui"] as const).forEach((group) => timersRef.current[group].forEach(clearTimeout));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    },
    [],
  );

  // Contextual reactions — see NiaSectionCue for the dispatching side.
  useEffect(() => {
    if (!active || reducedMotion || typeof window === "undefined") return;

    const react = (reaction?: NiaContextReaction) => {
      if (episodeRef.current) return;
      if (reaction === "bounce") playSmallMove("hop");
      else if (reaction === "tilt") playSmallMove("tilt");
      else if (reaction === "attentive") {
        setGlyphClass("animate-nia-attentive");
        later(() => setGlyphClass(""), 900, "ui");
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
  }, [active, reducedMotion, playSmallMove, later]);

  // ── Hover, focus and click ──────────────────────────────────────────
  const showHoverMessage = useCallback(() => {
    hoveredRef.current = true;
    interruptEpisode();
    clearGroup("bubble");
    const text = pickFresh(HOVER_MESSAGES, lastMessageRef.current);
    lastMessageRef.current = text;
    showBubble(text, "hover");
  }, [interruptEpisode, clearGroup, showBubble]);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent) => {
      if (event.pointerType !== "mouse") return; // touch "hover" is just the start of a tap
      showHoverMessage();
      const now = Date.now();
      // One small acknowledgement per visit of the pointer, not per wiggle.
      if (!reducedMotion && !episodeRef.current && now - lastNudgeRef.current > HOVER_NUDGE_COOLDOWN_MS) {
        lastNudgeRef.current = now;
        setGlyphClass("animate-nia-nudge");
        later(() => setGlyphClass(""), 600, "ui");
      }
    },
    [showHoverMessage, reducedMotion, later],
  );

  const onPointerLeave = useCallback(
    (event: ReactPointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hoveredRef.current = false;
      if (bubbleOwnerRef.current === "hover") hideBubble();
    },
    [hideBubble],
  );

  // Keyboard focus gets the same short label; a mouse click's focus does not.
  const onFocus = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      if (event.currentTarget.matches(":focus-visible")) showHoverMessage();
    },
    [showHoverMessage],
  );

  const onBlur = useCallback(() => {
    hoveredRef.current = false;
    if (bubbleOwnerRef.current === "hover") hideBubble();
  }, [hideBubble]);

  const triggerClickRoll = useCallback(
    (onComplete: () => void) => {
      clearGroup("episode");
      clearGroup("bubble");
      episodeRef.current = null;
      hideBubble();
      setGlyphClass("");
      setBodyClass("");
      setWipePhase("idle");
      if (reducedMotion) {
        onComplete();
        return;
      }
      setIsRolling(true);
      later(() => {
        setIsRolling(false);
        onComplete();
      }, 700, "ui");
    },
    [clearGroup, hideBubble, reducedMotion, later],
  );

  const travelStyle: CSSProperties = {
    transform: `translate3d(${travel.x}px, 0, 0)`,
    transition: travel.ms ? `transform ${travel.ms}ms ${travel.easing}` : "none",
  };
  const rotorStyle: CSSProperties = {
    transform: `rotate(${travel.rotate}deg)`,
    transition: travel.ms ? `transform ${travel.ms}ms ${travel.easing}` : "none",
  };

  return {
    buttonRef,
    glyphClass,
    bodyClass,
    wipePhase,
    isRolling,
    away,
    bubble,
    travelStyle,
    rotorStyle,
    reducedMotion,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    triggerClickRoll,
  };
}
