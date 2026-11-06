"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const HERO_SLIDES = [
  {
    id: 0,
    badge: "UP TO 70% OFF",
    titleLine1: "VRG Pro",
    titleLine2: "Experience",
    subtitleLine1: "EXTREME GRADE WITH HIGH-END 4K",
    subtitleLine2: "AND VR GAMING EXPERIENCE.",
    cta: "EXPLORE NOW",
    image: "/assets/Slider-1-1.jpg",
    bgGradient: "linear-gradient(180deg, #010103 0%, #030305 62%, #022066 100%)",
  },
  {
    id: 1,
    badge: "UP TO 50% OFF",
    titleLine1: "Headphone",
    titleLine2: "Wireless",
    subtitleLine1: "ACTIVE NOISE CANCELLATION",
    subtitleLine2: "TECHNOLOGY IS AMAZING",
    cta: "EXPLORE NOW",
    image: "/assets/Slider-1-2.jpg",
    bgGradient: "linear-gradient(180deg, #000000 0%, #000000 68%, #211829 100%)",
  },
  {
    id: 2,
    badge: "UP TO 30% OFF",
    titleLine1: "Portable",
    titleLine2: "Speaker",
    subtitleLine1: "LIGHTWEIGHT AND COMPACT,",
    subtitleLine2: "GIVING YOU GREATER FLEXIBILITY",
    cta: "EXPLORE NOW",
    image: "/assets/Slider-1-3.jpg",
    bgGradient: "linear-gradient(180deg, #7F2A8F 0%, #6D217C 50%, #621A6C 100%)",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const dragStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: normX * 14, y: normY * 10 });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    if (delta < -50) handleNext();
    else if (delta > 50) handlePrev();
    dragStartXRef.current = null;
  };

  const current = HERO_SLIDES[activeSlide];

  return (
    <section className="w-full bg-[#f7f7f7] pb-[12px] sm:pb-[14px]">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[12px] sm:gap-[16px]">
          {/* Left Main Hero Slider (66.7% width -> 8 cols) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setMouseParallax({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="lg:col-span-8 relative rounded-[16px] sm:rounded-[20px] overflow-hidden min-h-[250px] sm:min-h-[340px] md:min-h-[390px] lg:h-[420px] xl:h-[436px] flex items-center group select-none cursor-grab active:cursor-grabbing"
          >
            {/* Background Studio Image Track — Full Uncropped Product Height */}
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                style={{ background: slide.bgGradient }}
                className={`absolute inset-0 flex items-center justify-end transition-opacity duration-700 ease-out ${idx === activeSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                  }`}
              >
                <img
                  src={slide.image}
                  alt={`${slide.titleLine1} ${slide.titleLine2}`}
                  draggable={false}
                  style={{
                    transform:
                      idx === activeSlide
                        ? `translate3d(${-mouseParallax.x * 0.5}px, 0px, 0)`
                        : "none",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, black 12%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, black 12%)",
                  }}
                  className="h-full w-auto max-w-none ml-auto object-contain object-right transition-transform duration-300 ease-out"
                />
                {/* Subtle left scrim on narrow mobile screens so text is 100% readable */}
                <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent pointer-events-none" />
              </div>
            ))}

            {/* Left Slide Arrow inside Hero Slider */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-3.5 top-[56%] sm:top-[58%] -translate-y-1/2 z-20 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-full border border-white/15 bg-black/15 backdrop-blur-[2px] hover:bg-[#4f46e5] hover:border-[#4f46e5] hover:scale-110 active:scale-95 text-white/85 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 48 48" fill="currentColor">
                <polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414" />
              </svg>
            </button>

            {/* Left Content Overlay with Staggered Blur-to-Crisp Slide Entrance & Foreground Parallax */}
            <div
              key={activeSlide}
              style={{
                transform: `translate3d(${mouseParallax.x * 0.45}px, ${mouseParallax.y * 0.45}px, 0)`,
              }}
              className="relative z-10 w-[75%] sm:w-full md:w-[64%] pl-10 sm:pl-14 md:pl-16 pr-3 sm:pr-6 py-4 sm:py-6 text-white transition-transform duration-300 ease-out"
            >
              {/* Leaf-Shaped Pink Badge with Pulse Glow */}
              <div className="mb-1.5 sm:mb-2.5 animate-fade-up">
                <span className="inline-block bg-[#4f46e5] text-white text-[10px] sm:text-[12px] md:text-[13px] font-semibold uppercase px-2.5 sm:px-3.5 py-0.5 sm:py-1 badge-leaf animate-pulse-glow">
                  {current.badge}
                </span>
              </div>

              {/* Bold Display Heading */}
              <h1 className="text-[24px] sm:text-[42px] xl:text-[50px] font-bold leading-[1.08] tracking-tight mb-2 sm:mb-3 animate-fade-up delay-75">
                {current.titleLine1}
                <br />
                {current.titleLine2}
              </h1>

              {/* Uppercase Subtitle */}
              <p className="text-[10px] sm:text-[13px] text-white/90 font-normal uppercase leading-[1.5] sm:leading-[1.6] mb-3.5 sm:mb-5 animate-fade-up delay-150">
                {current.subtitleLine1}
                <br />
                {current.subtitleLine2}
              </p>

              {/* White Pill CTA Button */}
              <div className="animate-fade-up delay-225">
                <Link
                  href="/shop"
                  className="btn-shine inline-flex items-center justify-center bg-white text-[#1c1c1c] hover:bg-[#4f46e5] hover:text-white hover:-translate-y-0.5 active:scale-95 text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-wider px-5 sm:px-7 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-300"
                >
                  {current.cta}
                </Link>
              </div>
            </div>

            {/* Right Slide Arrow inside Hero Slider */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next slide"
              className="absolute right-2 sm:right-3.5 top-[56%] sm:top-[58%] -translate-y-1/2 z-20 w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-full border border-white/15 bg-black/15 backdrop-blur-[2px] hover:bg-[#4f46e5] hover:border-[#4f46e5] hover:scale-110 active:scale-95 text-white/85 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 48 48" fill="currentColor">
                <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
              </svg>
            </button>

            {/* Bottom Center Slider Dots with Active Live Progress Fill */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${idx === activeSlide
                      ? "w-8 sm:w-9 h-[6px] sm:h-[7px] bg-white/35 shadow-sm"
                      : "w-[6px] sm:w-[7px] h-[6px] sm:h-[7px] bg-white/45 hover:bg-white/80"
                    }`}
                >
                  {idx === activeSlide && (
                    <span
                      key={`${activeSlide}-${isPaused}`}
                      className="block h-full bg-white rounded-full animate-pill-progress"
                      style={{
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Stacked Promo Cards (2 cols on tablet sm/md, stacked on desktop lg) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-[12px] sm:gap-[16px] lg:h-[420px] xl:h-[436px]">
            {/* Top Right Card: Headphones Wireless (Banner-1.jpg) */}
            <div
              style={{ backgroundColor: "#54BAA2" }}
              className="banner-shine flex-1 relative rounded-[16px] sm:rounded-[20px] overflow-hidden min-h-[165px] sm:min-h-[195px] flex items-center group"
            >
              <img
                src="/assets/Banner-1.jpg"
                alt="Headphones Wireless"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 10%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%)",
                }}
                className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right group-hover:-translate-x-1 transition-transform duration-500 ease-out"
              />
              <div className="relative z-10 w-[62%] pl-5 sm:pl-7 md:pl-8 py-3.5 sm:py-4 text-white">
                <h2 className="text-[19px] sm:text-[22px] xl:text-[26px] font-bold text-white leading-[1.16] mb-1 sm:mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  Headphones
                  <br />
                  Wireless
                </h2>
                <p className="text-[11px] sm:text-[12px] font-normal text-white uppercase tracking-wide mb-2.5 sm:mb-3.5">
                  STARTING AT AED 100
                </p>
                <Link
                  href="/categories/headphone"
                  className="btn-shine inline-flex items-center justify-center bg-[#1c1c1c] hover:bg-[#4f46e5] hover:-translate-y-0.5 active:scale-95 text-white text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>

            {/* Bottom Right Card: Camera 4K Ultra HD (Banner-2.jpg) */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, #C18C2C 0%, #C7912D 50%, #CF9A34 100%)",
              }}
              className="banner-shine flex-1 relative rounded-[16px] sm:rounded-[20px] overflow-hidden min-h-[165px] sm:min-h-[195px] flex items-center group"
            >
              <img
                src="/assets/Banner-2.jpg"
                alt="Camera 4K Ultra HD"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 10%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%)",
                }}
                className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right group-hover:-translate-x-1 transition-transform duration-500 ease-out"
              />
              <div className="relative z-10 w-[62%] pl-5 sm:pl-7 md:pl-8 py-3.5 sm:py-4 text-white">
                <h2 className="text-[19px] sm:text-[22px] xl:text-[26px] font-bold text-white leading-[1.16] mb-1 sm:mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  Camera 4K Ultra
                  <br />
                  HD
                </h2>
                <p className="text-[11px] sm:text-[12px] font-normal text-white uppercase tracking-wide mb-2.5 sm:mb-3.5">
                  STARTING AT AED 200
                </p>
                <Link
                  href="/categories/camera"
                  className="btn-shine inline-flex items-center justify-center bg-[#1c1c1c] hover:bg-[#4f46e5] hover:-translate-y-0.5 active:scale-95 text-white text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
