"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

/**
 * The hero's "signal field": a grid of points moving like a slow wave.
 * The pointer drops a ripple into it and scrolling raises the swell.
 *
 * Loaded only in the browser, only when WebGL works and motion is allowed.
 * It renders nothing while off screen or while the tab is hidden.
 */

const COLS = 110;
const ROWS = 46;

const PALETTE = {
  light: { base: "#8f7d6c", hot: "#e2592d" },
  dark: { base: "#6f6152", hot: "#f3925a" },
};

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSwell;
  uniform vec2 uPointer;
  uniform float uPointerForce;
  uniform float uPixelRatio;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec3 p = position;
    float wave = sin(p.x * 0.42 + uTime * 0.9) * 0.32
               + sin(p.z * 0.7 + uTime * 0.6) * 0.22
               + sin((p.x + p.z) * 0.25 + uTime * 0.4) * 0.28;
    float d = distance(p.xz, uPointer);
    float ripple = exp(-d * 0.55) * sin(d * 2.4 - uTime * 3.2) * 0.7 * uPointerForce;
    p.y = (wave * (1.0 + uSwell * 1.6)) + ripple;
    vHeight = p.y;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + max(p.y, 0.0) * 2.2) * uPixelRatio * (9.0 / -mv.z);
    // Fade the far edge and the sides so the field has no hard border.
    vFade = smoothstep(14.0, 4.0, -mv.z) * smoothstep(10.5, 6.0, abs(p.x));
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, r);
    float heat = smoothstep(0.05, 0.75, vHeight);
    vec3 col = mix(uBase, uHot, heat);
    gl_FragColor = vec4(col, edge * vFade * (0.55 + heat * 0.45));
  }
`;

export default function WaveField({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL after all: the static fallback stays on screen.
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 4.2, 9.5);
    camera.lookAt(0, 0, 0);

    const positions = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i++] = (c / (COLS - 1) - 0.5) * 22;
        positions[i++] = 0;
        positions[i++] = (r / (ROWS - 1) - 0.5) * 12 - 1;
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));

    const isDark = () => document.documentElement.classList.contains("dark");
    const pick = () => (isDark() ? PALETTE.dark : PALETTE.light);
    const uniforms = {
      uTime: { value: 0 },
      uSwell: { value: 0 },
      uPointer: { value: [99, 99] as [number, number] },
      uPointerForce: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uBase: { value: new Color(pick().base) },
      uHot: { value: new Color(pick().hot) },
    };
    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const points = new Points(geometry, material);
    scene.add(points);

    // Theme changes recolour the field without a reload.
    const themeObserver = new MutationObserver(() => {
      uniforms.uBase.value.set(pick().base);
      uniforms.uHot.value.set(pick().hot);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    function resize() {
      const w = host!.clientWidth;
      const h = host!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    // Pointer target in field space, eased toward each frame.
    const target = { x: 99, z: 99, force: 0 };
    function onPointer(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = nx * 16;
      target.z = ny * 9;
      target.force = Math.abs(nx) < 0.75 && Math.abs(ny) < 0.75 ? 1 : 0;
    }
    function onLeave() {
      target.force = 0;
    }
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let swellTarget = 0;
    function onScroll() {
      const rect = host!.getBoundingClientRect();
      swellTarget = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let visible = true;
    let raf = 0;
    let last = performance.now();
    let readyFired = false;

    function frame(now: number) {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;
      const p = uniforms.uPointer.value;
      p[0] += (target.x - p[0]) * 0.08;
      p[1] += (target.z - p[1]) * 0.08;
      uniforms.uPointerForce.value += (target.force - uniforms.uPointerForce.value) * 0.05;
      uniforms.uSwell.value += (swellTarget - uniforms.uSwell.value) * 0.06;
      points.rotation.y = (p[0] / 16) * 0.12 * uniforms.uPointerForce.value;
      renderer.render(scene, camera);
      if (!readyFired) {
        readyFired = true;
        onReady?.();
      }
      schedule();
    }
    function schedule() {
      if (!raf && visible && document.visibilityState === "visible") raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          last = performance.now();
          schedule();
        }
      },
      { threshold: 0 },
    );
    io.observe(host);
    function onVisibility() {
      last = performance.now();
      schedule();
    }
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={hostRef} className="absolute inset-0" />;
}
