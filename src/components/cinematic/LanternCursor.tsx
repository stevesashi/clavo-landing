"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "button" | "interactive" | "upload";

function detectState(target: Element): CursorState {
  const explicit = target.closest<HTMLElement>("[data-cursor]");
  if (explicit?.dataset.cursor) return explicit.dataset.cursor as CursorState;
  if (target.closest('input[type="file"], [data-upload]')) return "upload";
  if (target.closest('button, [role="button"], input[type="submit"], input[type="reset"], input[type="button"]')) return "button";
  if (target.closest('a[href], select, input, textarea, label, [tabindex="0"]')) return "interactive";
  return "default";
}

const CSS = `
  body:not(.clavo-report-open) *, body:not(.clavo-report-open) *::before, body:not(.clavo-report-open) *::after { cursor: none !important; }
  body.clavo-report-open #clavo-cursor { display: none; }

  #clavo-cursor {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
  }

  #clavo-dot {
    position: absolute;
    width: 9px; height: 9px;
    border-radius: 50%;
    background: rgba(255,242,190,1);
    box-shadow: 0 0 5px 3px rgba(255,220,110,0.90), 0 0 14px 5px rgba(255,170,50,0.55);
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.12s ease-out, background 0.12s ease-out, box-shadow 0.12s ease-out;
    will-change: transform;
  }

  #clavo-ring {
    position: absolute;
    width: 0; height: 0;
    border-radius: 50%;
    border: 1.5px solid transparent;
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
    transition: width 0.12s ease-out, height 0.12s ease-out,
                transform 0.12s ease-out, opacity 0.12s ease-out,
                border-color 0.12s ease-out, border-style 0.12s ease-out;
    will-change: transform, opacity;
  }

  #clavo-cursor[data-state="button"] #clavo-dot {
    transform: translate(-50%, -50%) scale(0.44);
  }
  #clavo-cursor[data-state="button"] #clavo-ring {
    width: 42px; height: 42px;
    border-color: rgba(255,185,70,0.80);
    border-style: solid;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  #clavo-cursor[data-state="interactive"] #clavo-dot {
    transform: translate(-50%, -50%) scale(1.15);
  }
  #clavo-cursor[data-state="interactive"] #clavo-ring {
    width: 24px; height: 24px;
    border-color: rgba(255,255,255,0.40);
    border-style: solid;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  #clavo-cursor[data-state="upload"] #clavo-dot {
    transform: translate(-50%, -50%) scale(0.75);
    background: rgba(110,231,183,1);
    box-shadow: 0 0 5px 3px rgba(52,211,153,0.85), 0 0 14px 5px rgba(52,211,153,0.45);
  }
  #clavo-cursor[data-state="upload"] #clavo-ring {
    width: 46px; height: 46px;
    border-color: rgba(52,211,153,0.75);
    border-style: dashed;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

export default function LanternCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    let rafId = 0;
    let nx = -500, ny = -500;

    const flush = () => {
      el.style.transform = `translate3d(${nx}px,${ny}px,0)`;
      rafId = 0;
    };

    const onOver = (e: MouseEvent) => {
      el.dataset.state = detectState(e.target as Element);
    };

    let paused = false;
    const onReport = (e: Event) => {
      paused = (e as CustomEvent<{ open: boolean }>).detail.open;
    };

    const onMove = (e: MouseEvent) => {
      if (paused) return;
      nx = e.clientX;
      ny = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("clavo:report", onReport);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("clavo:report", onReport);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div id="clavo-cursor" ref={cursorRef} aria-hidden="true" data-state="default">
        <div id="clavo-ring" />
        <div id="clavo-dot" />
      </div>
    </>
  );
}
