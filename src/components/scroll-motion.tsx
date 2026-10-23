"use client";

import { useEffect } from "react";
import { pageMotion } from "@/lib/motion";

/**
 * Starts the hero intro (src/lib/motion.ts, Web Animations API).
 * Section entrances, the pinned story, marquees, tabs and card glow are CSS and
 * small components of their own.
 */
export function ScrollMotion() {
  useEffect(() => pageMotion(), []);
  return null;
}
