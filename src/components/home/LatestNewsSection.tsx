"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface BlogPost {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "noise-cancelling-journey",
    tag: "SUPPORT THEME",
    date: "JULY 17, 2026",
    title: "Noise-Cancelling Headphones for Every Journey",
    excerpt:
      "Excerpt: Stay immersed in your own soundtrack, no matter how busy the city gets.",
    image: "/assets/blog-1_c9731c10-c6dd-4c32-bb0f-1600b7e315b0.jpg",
  },
  {
    id: "style-meets-sound",
    tag: "SUPPORT THEME",
    date: "JULY 17, 2026",
    title: "Style Meets Sound: Chic White Headphones for City Rides",
    excerpt:
      "A stylish pair of on-ear headphones proves that great sound and great looks can go hand in hand on your daily commute.",
    image: "/assets/blog-2.jpg",
  },
  {
    id: "smartwatches-manage-life",
    tag: "SUPPORT THEME",
    date: "JULY 17, 2026",
    title: "Smartwatches: Manage Your Life Right From Your Wrist",
    excerpt:
      "Upgrade your daily routine with health tracking, instant notifications, and seamless connectivity.",
    image: "/assets/blog-3.jpg",
  },
  {
    id: "smart-speakers-workspace",
    tag: "SUPPORT THEME",
    date: "JULY 17, 2026",
    title: "Smart Speakers: Your Voice Assistant for a Modern Workspace",
    excerpt:
      "Learn how a compact smart speaker can streamline your workday with hands-free control and instant assistance.",
    image: "/assets/blog-4.jpg",
  },
];

export default function LatestNewsSection() {
  const total = BLOG_POSTS.length;
  // Clone 2 tail and 2 head items for seamless infinite horizontal sliding
  const cloneCount = 2;
  const extendedPosts = [
    ...BLOG_POSTS.slice(-cloneCount),
    ...BLOG_POSTS,
    ...BLOG_POSTS.slice(0, cloneCount),
  ];

  const [trackIdx, setTrackIdx] = useState(cloneCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const dragStartXRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const slideTo = useCallback((nextIdx: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setTrackIdx(nextIdx);
  }, []);

  const handleNext = useCallback(() => {
    slideTo(trackIdx + 1);
  }, [slideTo, trackIdx]);

  const handlePrev = useCallback(() => {
    slideTo(trackIdx - 1);
  }, [slideTo, trackIdx]);

  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;
    if (trackIdx >= total + cloneCount) {
      setIsTransitioning(false);
      setTrackIdx(trackIdx - total);
    } else if (trackIdx < cloneCount) {
      setIsTransitioning(false);
      setTrackIdx(trackIdx + total);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      isAnimatingRef.current = false;
      if (trackIdx >= total + cloneCount) {
        setIsTransitioning(false);
        setTrackIdx((p) => p - total);
      } else if (trackIdx < cloneCount) {
        setIsTransitioning(false);
        setTrackIdx((p) => p + total);
      }
    }, 640);
    return () => clearTimeout(timer);
  }, [trackIdx, total, cloneCount]);

  // Auto-play every 5.2s when not hovered
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(handleNext, 5200);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, handleNext]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    setIsTransitioning(false);
    dragStartXRef.current = e.clientX;
    setDragOffsetPx(0);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragOffsetPx(e.clientX - dragStartXRef.current);
  };

  const onPointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffsetPx < -45) {
      setIsTransitioning(true);
      isAnimatingRef.current = true;
      setTrackIdx((p) => p + 1);
    } else if (dragOffsetPx > 45) {
      setIsTransitioning(true);
      isAnimatingRef.current = true;
      setTrackIdx((p) => p - 1);
    } else {
      setIsTransitioning(true);
    }
    setDragOffsetPx(0);
  };

  // On desktop (lg+), each split-card slide takes 66.6667% width so 1.5 cards are visible (1 full card + left image half of next card, matching Screenshot 8!)
  const slideWidthPct = isDesktop ? 66.6667 : 100;
  const translatePct = -(trackIdx * slideWidthPct);

  return (
    <section id="all-blogs" className="w-full bg-white pt-[44px] pb-[36px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold text-[#1c1c1c] tracking-tight">
              Latest News
            </h2>
            <Link
              href="/blogs"
              className="text-[14px] font-medium text-[#000000] hover:text-[#4f46e5] underline underline-offset-4 decoration-[1px] transition-colors"
            >
              View all
            </Link>
          </div>
        </ScrollReveal>

        {/* Infinite Sliding Blog Carousel Wrapper */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div
            className="relative select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              if (isDragging) onPointerUpOrLeave();
            }}
          >
            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous article"
              className="flex absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] rounded-full bg-white/95 sm:bg-[#f5f5f5] hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-[#222222] hover:text-white shadow-sm items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
                <polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414" />
              </svg>
            </button>

            {/* Sliding Viewport */}
            <div
              className="overflow-hidden py-3 -my-3 cursor-grab active:cursor-grabbing"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUpOrLeave}
              onPointerCancel={onPointerUpOrLeave}
            >
              <div
                onTransitionEnd={handleTransitionEnd}
                className="flex items-stretch -mx-3"
                style={{
                  transform: `translate3d(calc(${translatePct}% + ${dragOffsetPx}px), 0, 0)`,
                  transition: isTransitioning
                    ? "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
                    : "none",
                  willChange: "transform",
                }}
              >
                {extendedPosts.map((post, idx) => (
                  <div
                    key={`${post.id}-${idx}`}
                    style={{ width: `${slideWidthPct}%` }}
                    className="shrink-0 px-3"
                    onClickCapture={(e) => {
                      if (Math.abs(dragOffsetPx) > 10) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <article className="h-full bg-white rounded-[18px] border border-[#eaeaea] overflow-hidden flex flex-col md:flex-row items-stretch card-hover-lift">
                      {/* Left 50%: Blog Image (Natural 3:2 Ratio — No Cropping) */}
                      <div className="banner-shine md:w-1/2 relative aspect-[3/2] overflow-hidden group shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          draggable={false}
                          className="w-full h-full object-contain rounded-[18px] transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Right 50%: Blog Content */}
                      <div className="md:w-1/2 p-5 md:p-6 flex flex-col justify-center">
                        {/* Tag & Date */}
                        <div className="flex items-center flex-wrap gap-2.5 mb-2.5">
                          <span className="bg-[#f5f5f5] text-[#222222] text-[10.5px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-[5px]">
                            {post.tag}
                          </span>
                          <span className="text-[11.5px] text-[#555555] font-normal uppercase">
                            {post.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[18px] md:text-[20px] font-semibold text-[#000000] hover:text-[#4f46e5] transition-colors leading-[26px] mb-2 line-clamp-2">
                          <Link href={`/blogs/${post.id}`} draggable={false}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[14px] md:text-[14.5px] text-[#666666] leading-[20px] mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Read More Pill Button */}
                        <div>
                          <Link
                            href={`/blogs/${post.id}`}
                            draggable={false}
                            className="btn-shine inline-flex items-center justify-center bg-[#f5f5f5] hover:bg-[#4f46e5] hover:-translate-y-0.5 active:scale-95 text-[#000000] hover:text-white text-[12px] font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300"
                          >
                            READ MORE
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next article"
              className="flex absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] rounded-full bg-white/95 sm:bg-[#f5f5f5] hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-[#222222] hover:text-white shadow-sm items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
                <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
