"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Revelado al entrar en pantalla.
 * Donde hay animaciones ligadas al scroll, lo resuelve el CSS.
 * Donde no (Firefox), este respaldo por IntersectionObserver hace lo mismo.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) return;

    el.dataset.io = "pending";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.io = "shown";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
