"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    let mx = 0, my = 0, tx = 0, ty = 0, raf;

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
    }

    function loop() {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.left = tx - 20 + "px";
        trailRef.current.style.top = ty - 20 + "px";
      }
      raf = requestAnimationFrame(loop);
    }

    function onEnter() {
      if (trailRef.current) {
        trailRef.current.style.width = "60px";
        trailRef.current.style.height = "60px";
        trailRef.current.style.opacity = "0.5";
      }
    }
    function onLeave() {
      if (trailRef.current) {
        trailRef.current.style.width = "40px";
        trailRef.current.style.height = "40px";
        trailRef.current.style.opacity = "1";
      }
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    const interactive = document.querySelectorAll("a, button, .cursor-hover");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} className="hidden md:block" />
      <div id="cursor-trail" ref={trailRef} className="hidden md:block" />
    </>
  );
}
