import { useEffect, useRef } from "react";
import "../styles/cursor.css";

/**
 * Zero-lag custom cursor — no framer-motion, no React state.
 *
 * · DOT  → transform set synchronously inside mousemove (as fast as native cursor)
 * · RING → lerped in a rAF loop with a high lerp factor (0.22) so it feels
 *           smooth but catches up almost immediately
 */
const CustomCursor = ({ mode }) => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only on pointer devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouse  = { x: -200, y: -200 };
    let ringPos = { x: -200, y: -200 };
    let rafId  = null;
    let visible = false;

    // ── Dot: update transform synchronously in the event handler ──
    // This is the fastest possible path — no rAF, no spring, no React.
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Dot follows at native speed
      dot.style.transform = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`;

      if (!visible) {
        visible = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }
    };

    // ── Ring: lerp loop ──
    const LERP = 0.22; // 0 = never catches up, 1 = instant; 0.22 feels silky

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * LERP;
      ringPos.y += (mouse.y - ringPos.y) * LERP;
      ring.style.transform = `translate(${ringPos.x - 15}px, ${ringPos.y - 15}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Hover detection (direct class toggle, no React state) ──
    const onOver = (e) => {
      const t = e.target;
      const isInteractive = !!(
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("button") ||
        t.closest("a") ||
        t.closest(".bento-card") ||
        t.closest(".photo-item-simple") ||
        t.closest(".recipe-card-wrapper") ||
        t.closest(".art-card-item") ||
        t.closest(".video-card")
      );
      dot.classList.toggle("hovered",  isInteractive);
      ring.classList.toggle("hovered", isInteractive);
    };

    // ── Click feedback ──
    const onDown = () => {
      dot.classList.add("clicked");
      ring.classList.add("clicked");
    };
    const onUp = () => {
      dot.classList.remove("clicked");
      ring.classList.remove("clicked");
    };

    // ── Show/hide when pointer leaves the window ──
    const onLeave = () => {
      visible = false;
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []); // intentionally empty — mode handled via CSS class on the elements

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${mode}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${mode}`}
        style={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
