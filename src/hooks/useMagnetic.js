import { useEffect, useRef } from "react";

/**
 * Magnetic hover: the element gently pulls toward the cursor when nearby.
 */
export default function useMagnetic({ strength = 0.35, radius = 120 } = {}) {
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
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = "";
        });
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength, radius]);

  return ref;
}
