"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { StaticField } from "./static-field";

// three.js is only downloaded when this chunk is requested, never on the server.
const WaveField = dynamic(() => import("./wave-field"), { ssr: false });

function canRunWebGL() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the browser to be idle so the 3D chunk never competes with first paint.
    const start = () => setEnabled(canRunWebGL());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <div className="pointer-events-none absolute inset-0" data-hero="visual">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <StaticField />
      </div>
      {enabled && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <WaveField onReady={onReady} />
        </div>
      )}
    </div>
  );
}
