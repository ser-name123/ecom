"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface CarouselTrackProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  /** Number of items visible on desktop (lg/xl), tablet (md), small (sm), mobile (xs) */
  visibleCount?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap in pixels between items (default 20) */
  gap?: number;
  /** Auto-play interval in ms (0 to disable) */
  autoPlayMs?: number;
  /** Custom class for the outer wrapper */
  className?: string;
  /** Custom positioning for Prev/Next arrows */
  arrowPositionClass?: string;
  /** Show arrows (default true) */
  showArrows?: boolean;
  /** Show bottom dots (default false) */
  showDots?: boolean;
}

export default function CarouselTrack<T>({
  items,
  renderItem,
  keyExtractor,
  visibleCount = { xs: 1, sm: 2, md: 3, lg: 5, xl: 5 },
  gap = 20,
  autoPlayMs = 0,
  className = "",
  arrowPositionClass = "top-1/2 -translate-y-1/2",
  showArrows = true,
  showDots = false,
}: CarouselTrackProps<T>) {
  const total = items.length;
  const [perView, setPerView] = useState(visibleCount.xl || visibleCount.lg || 5);

  // Update perView responsively based on window width
  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setPerView(visibleCount.xs ?? 1);
      } else if (w < 768) {
        setPerView(visibleCount.sm ?? 2);
      } else if (w < 1024) {
        setPerView(visibleCount.md ?? 3);
      } else if (w < 1280) {
        setPerView(visibleCount.lg ?? 4);
      } else {
        setPerView(visibleCount.xl ?? visibleCount.lg ?? 5);
      }
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, [visibleCount.xs, visibleCount.sm, visibleCount.md, visibleCount.lg, visibleCount.xl]);

  // Clone count = max possible visible items so infinite loop never shows empty space
  const cloneCount = Math.min(total, Math.max(perView, 7));

  // Extended array: [tailClones..., ...originalItems, ...headClones]
  const extendedItems = React.useMemo(() => {
    if (total === 0) return [];
    const tail = items.slice(-cloneCount);
    const head = items.slice(0, cloneCount);
    return [...tail, ...items, ...head];
  }, [items, total, cloneCount]);

  // trackIndex starts at cloneCount (which is original item 0)
  const [trackIndex, setTrackIndex] = useState(cloneCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Drag / Swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const dragStartXRef = useRef(0);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Reset position cleanly if items array changes (e.g. tab switch)
  useEffect(() => {
    setIsTransitioning(false);
    setTrackIndex(cloneCount);
    isAnimatingRef.current = false;
  }, [items, cloneCount]);

  const slideTo = useCallback((newIndex: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setTrackIndex(newIndex);
  }, []);

  const handleNext = useCallback(() => {
    slideTo(trackIndex + 1);
  }, [slideTo, trackIndex]);

  const handlePrev = useCallback(() => {
    slideTo(trackIndex - 1);
  }, [slideTo, trackIndex]);

  // Handle seamless infinite loop snap after CSS transition completes
  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;
    if (trackIndex >= total + cloneCount) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex - total);
    } else if (trackIndex < cloneCount) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex + total);
    }
  };

  // Fallback unlock in case transitionend doesn't fire (e.g. tab hidden)
  useEffect(() => {
    const timer = setTimeout(() => {
      isAnimatingRef.current = false;
      if (trackIndex >= total + cloneCount) {
        setIsTransitioning(false);
        setTrackIndex((prev) => prev - total);
      } else if (trackIndex < cloneCount) {
        setIsTransitioning(false);
        setTrackIndex((prev) => prev + total);
      }
    }, 640);
    return () => clearTimeout(timer);
  }, [trackIndex, total, cloneCount]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlayMs || isHovered || isDragging || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayMs);
    return () => clearInterval(interval);
  }, [autoPlayMs, isHovered, isDragging, total, handleNext]);

  // Pointer / Touch Drag Handlers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks on buttons or interactive controls if needed, or allow drag threshold
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.clientX;
    setDragOffsetPx(0);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setDragOffsetPx(deltaX);
  };

  const onPointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 45;
    if (dragOffsetPx < -threshold) {
      setIsTransitioning(true);
      isAnimatingRef.current = true;
      setTrackIndex((prev) => prev + 1);
    } else if (dragOffsetPx > threshold) {
      setIsTransitioning(true);
      isAnimatingRef.current = true;
      setTrackIndex((prev) => prev - 1);
    } else {
      setIsTransitioning(true);
    }
    setDragOffsetPx(0);
  };

  // Active logical index (0 .. total - 1)
  const activeLogicalIndex = ((trackIndex - cloneCount) % total + total) % total;

  // Each item width is `100% / perView` inside the padded flex track
  const itemWidthPercent = 100 / perView;
  const translatePercent = -(trackIndex * itemWidthPercent);

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) onPointerUpOrLeave();
      }}
    >
      {/* Left Arrow */}
      {showArrows && total > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className={`hidden sm:flex absolute -left-4 md:-left-5 ${arrowPositionClass} z-20 w-[38px] h-[38px] rounded-full bg-[#f5f5f5] hover:bg-[#f43777] hover:scale-110 active:scale-95 text-[#222222] hover:text-white items-center justify-center transition-all duration-300 cursor-pointer`}
        >
          <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
            <polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414" />
          </svg>
        </button>
      )}

      {/* Viewport */}
      <div
        ref={trackContainerRef}
        className="overflow-hidden py-3 -my-3 px-1 -mx-1 cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUpOrLeave}
        onPointerCancel={onPointerUpOrLeave}
      >
        {/* Sliding Flex Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex items-stretch"
          style={{
            marginLeft: `-${gap / 2}px`,
            marginRight: `-${gap / 2}px`,
            transform: `translate3d(calc(${translatePercent}% + ${dragOffsetPx}px), 0, 0)`,
            transition: isTransitioning
              ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {extendedItems.map((item, idx) => (
            <div
              key={`${keyExtractor(item, idx)}-${idx}`}
              style={{
                width: `${itemWidthPercent}%`,
                paddingLeft: `${gap / 2}px`,
                paddingRight: `${gap / 2}px`,
              }}
              className="shrink-0 flex flex-col"
              onClickCapture={(e) => {
                // Prevent accidental link navigation when dragging
                if (Math.abs(dragOffsetPx) > 10) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {showArrows && total > 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className={`hidden sm:flex absolute -right-4 md:-right-5 ${arrowPositionClass} z-20 w-[38px] h-[38px] rounded-full bg-[#f5f5f5] hover:bg-[#f43777] hover:scale-110 active:scale-95 text-[#222222] hover:text-white items-center justify-center transition-all duration-300 cursor-pointer`}
        >
          <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
            <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
          </svg>
        </button>
      )}

      {/* Optional Dots */}
      {showDots && total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => slideTo(cloneCount + idx)}
              aria-label={`Go to item ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeLogicalIndex
                  ? "w-7 h-[6px] bg-[#f43777]"
                  : "w-[6px] h-[6px] bg-[#d4d4d4] hover:bg-[#999999]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

