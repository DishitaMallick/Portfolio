// src/components/CustomCursor.jsx

import { useEffect, useRef, useState } from "react";
import cursorArrow from "../assets/cursor-arrow.svg";
import cursorHand from "../assets/cursor-hand.svg";
import "../styles/cursor.css";

/**
 * Pixel-art space/cyber custom cursor matching the background and dark theme.
 * Features instant hardware tracking, hover hand pointer switching and click feedback.
 */
const CustomCursor = () => {
  const pointerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    // Only on pointer devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("has-custom-cursor");

    let mouse   = { x: -200, y: -200 };
    let visible = false;
    let hovered = false;

    // Pointer positioning (Zero lag)
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Adjust hotspot offset: Arrow hotspot is (0,0), Hand hotspot is (13,0)
      const offsetX = hovered ? 13 : 0;
      const offsetY = 0;

      pointer.style.transform = `translate3d(${mouse.x - offsetX}px, ${mouse.y - offsetY}px, 0)`;

      if (!visible) {
        visible = true;
        pointer.style.opacity = "1";
      }
    };

    // Hover detection for interactive elements
    const onOver = (e) => {
      const t = e.target;
      const isInteractive = !!(
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("button") ||
        t.closest("a") ||
        t.closest(".project-card") ||
        t.closest(".creative-card") ||
        t.closest(".skill-card") ||
        t.closest(".what-card") ||
        t.closest(".filter-btn") ||
        t.closest(".resume-btn") ||
        t.closest(".close-modal-btn") ||
        t.closest(".close-lightbox-btn") ||
        t.getAttribute("role") === "button"
      );

      if (isInteractive !== hovered) {
        hovered = isInteractive;
        setIsHovered(isInteractive);
        pointer.classList.toggle("hovered", isInteractive);

        // Immediate position offset adjustment on state change
        const offsetX = isInteractive ? 13 : 0;
        pointer.style.transform = `translate3d(${mouse.x - offsetX}px, ${mouse.y}px, 0)`;
      }
    };

    // Click feedback
    const onDown = () => {
      pointer.classList.add("clicked");
    };
    const onUp = () => {
      pointer.classList.remove("clicked");
    };

    // Show/hide on mouse leave/enter
    const onLeave = () => {
      visible = false;
      pointer.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      pointer.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={pointerRef}
      className="custom-cursor-pointer"
      style={{ opacity: 0 }}
    >
      <img
        src={isHovered ? cursorHand : cursorArrow}
        alt="custom cursor"
        draggable="false"
      />
    </div>
  );
};

export default CustomCursor;


