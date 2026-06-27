import { useEffect, useRef } from "react";

/**
 * Adds a soft 3D tilt + spotlight glow to an element via mouse-move events.
 * Sets CSS variables --mouse-x, --mouse-y (for spotlight) and applies
 * transform: perspective(...) rotateX/Y(...).
 */
export default function useTilt({ max = 8, scale = 1.01 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    let raf = 0;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * (max * 2);
      const ry = (px - 0.5) * (max * 2);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mouse-x", `${px * 100}%`);
        el.style.setProperty("--mouse-y", `${py * 100}%`);
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale}) translateY(-4px)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.removeProperty("--mouse-x");
      el.style.removeProperty("--mouse-y");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [max, scale]);

  return ref;
}
