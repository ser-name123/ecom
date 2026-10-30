"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = () => {
    switch (animation) {
      case "fade-up":
        return "translate3d(0, 42px, 0) scale3d(0.97, 0.97, 1)";
      case "fade-down":
        return "translate3d(0, -42px, 0) scale3d(0.97, 0.97, 1)";
      case "fade-left":
        return "translate3d(-44px, 0, 0) scale3d(0.97, 0.97, 1)";
      case "fade-right":
        return "translate3d(44px, 0, 0) scale3d(0.97, 0.97, 1)";
      case "zoom-in":
        return "scale3d(0.92, 0.92, 1) translate3d(0, 18px, 0)";
      default:
        return "translate3d(0, 42px, 0) scale3d(0.97, 0.97, 1)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(5px)",
        transform: isVisible ? "translate3d(0, 0, 0) scale3d(1, 1, 1)" : getInitialTransform(),
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

