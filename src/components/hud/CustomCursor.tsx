'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
      const customLabel = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

      if (customLabel) {
        setCursorText(customLabel);
      } else {
        setCursorText(null);
      }

      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for trailing ring
    let animationId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.18);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.18);
      setTrailingPos({ x: posRef.current.x, y: posRef.current.y });
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-avinya-cyan rounded-full shadow-[0_0_8px_#00F0FF] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.6 : isHovered ? 1.4 : 1})`,
        }}
      />

      {/* Trailing Fluid Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 border-avinya-cyan/70 bg-avinya-cyan/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(0,240,255,0.35)]'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-avinya-magenta bg-avinya-magenta/20 shadow-[0_0_15px_rgba(255,0,127,0.5)]'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 border-white/30 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-avinya-cyan font-bold px-1 animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

