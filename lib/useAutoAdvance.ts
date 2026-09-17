"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DEFAULT_INTERVAL_MS = 3500;

type UseAutoAdvanceOptions = {
  /** Number of items in the sequence being advanced through. */
  itemCount: number;
  /** The caller's own current active index — this hook owns no state. */
  activeIndex: number;
  /** Called with the next index. Read via a ref internally, so it never needs to be memoized by the caller. */
  onAdvance: (nextIndex: number) => void;
  interval?: number;
  /** Set to false to disable autoplay outright (e.g. a sequence with only one real item). */
  enabled?: boolean;
};

type ContainerHandlers = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
};

/**
 * Drives automatic progression through an existing selectable sequence
 * (tabs, stages, connected-flow nodes) without owning any of its state —
 * callers keep whatever activeIndex/setActiveIndex (or activeId, resolved to
 * an index) they already have; this only decides *when* to call onAdvance.
 *
 * Pauses on hover, on keyboard focus within the returned container, when the
 * container scrolls out of the viewport, and entirely when the visitor
 * prefers reduced motion. Any activeIndex change — whether it came from
 * autoplay or a manual click — restarts the interval, so a manual selection
 * always takes priority and the next auto-advance counts down fresh from
 * wherever the visitor left it.
 */
export function useAutoAdvance({
  itemCount,
  activeIndex,
  onAdvance,
  interval = DEFAULT_INTERVAL_MS,
  enabled = true,
}: UseAutoAdvanceOptions): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerHandlers: ContainerHandlers;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const onAdvanceRef = useRef(onAdvance);
  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  });

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsInViewport(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isPaused =
    !enabled || reducedMotion || isHovered || isFocused || !isInViewport || itemCount <= 1;

  useEffect(() => {
    if (isPaused) return;
    const timeoutId = setTimeout(() => {
      onAdvanceRef.current((activeIndex + 1) % itemCount);
    }, interval);
    return () => clearTimeout(timeoutId);
  }, [isPaused, activeIndex, itemCount, interval]);

  const handleFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    // A mouse click also focuses the clicked button natively, and that focus
    // never clears on its own — pausing for it would freeze autoplay after
    // the very first manual click instead of just restarting its timer.
    // :focus-visible (true for keyboard navigation, false for a mouse click)
    // is exactly the distinction needed here.
    const target = event.target as Element;
    if (typeof target.matches === "function" && target.matches(":focus-visible")) {
      setIsFocused(true);
    }
  }, []);

  const handleBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  }, []);

  return {
    containerRef,
    containerHandlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
