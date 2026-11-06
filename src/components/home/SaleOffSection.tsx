"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useStore } from "@/lib/StoreContext";
import { resolveStoreProduct } from "@/lib/storeData";

interface SaleDealProduct {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  discountBadge?: string;
  ctaLabel: string;
  image: string;
}

const DEAL_PRODUCTS: SaleDealProduct[] = [
  {
    id: "studio-headphones",
    title: "Studio Monitor Headphones",
    price: 184.0,
    oldPrice: 210.0,
    discountBadge: "-12%",
    ctaLabel: "ADD TO CART",
    image: "/assets/audio-10.jpg",
  },
  {
    id: "game-controller",
    title: "Mobile Clip-On Game Controller",
    price: 215.0,
    oldPrice: 230.0,
    discountBadge: "-7%",
    ctaLabel: "ADD TO CART",
    image: "/assets/game-3.jpg",
  },
  {
    id: "smartwatch-pro",
    title: "Smartwatch - Advanced Sport Edition Pro",
    price: 385.0,
    oldPrice: 480.0,
    discountBadge: "-20%",
    ctaLabel: "QUICK ADD",
    image: "/assets/watch-2.jpg",
  },
  {
    id: "vr-camera",
    title: "360 VR Camera - Dual Lens Spherical",
    price: 138.0,
    oldPrice: 150.0,
    discountBadge: "-8%",
    ctaLabel: "ADD TO CART",
    image: "/assets/camera-1.jpg",
  },
  {
    id: "waterproof-speaker",
    title: "Waterproof Portable Speaker",
    price: 70.0,
    oldPrice: 90.0,
    discountBadge: "-22%",
    ctaLabel: "ADD TO CART",
    image: "/assets/audio-3.jpg",
  },
];

export default function SaleOffSection() {
  const { addToCart, toggleWishlist } = useStore();
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 8,
    mins: 15,
    secs: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) {
          secs -= 1;
        } else {
          secs = 59;
          if (mins > 0) {
            mins -= 1;
          } else {
            mins = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                days = 0;
                hours = 8;
                mins = 15;
                secs = 20;
              }
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance deal showcase every 6.5s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const autoSlide = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEAL_PRODUCTS.length);
    }, 6500);
    return () => clearInterval(autoSlide);
  }, [isPaused]);

  const currentProduct = DEAL_PRODUCTS[activeIndex];
  const currentStoreProd = resolveStoreProduct({
    title: currentProduct.title,
    image: currentProduct.image,
  });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DEAL_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DEAL_PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    if (delta < -40) handleNext();
    else if (delta > 40) handlePrev();
    dragStartXRef.current = null;
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="sale-off" className="w-full bg-white pt-[24px] pb-[44px] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <ScrollReveal animation="zoom-in">
          {/* Main Pink-Bordered Deal Container */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="w-full rounded-[22px] border-[2px] border-[#4f46e5] bg-[#f7f7f7] p-2.5 md:p-3.5 flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5"
          >
            {/* 1. Left Column: 5 Vertical Product Thumbnails with Pop-out Active Card */}
            <div className="flex lg:flex-col items-center justify-between bg-white rounded-[12px] divide-x lg:divide-x-0 lg:divide-y divide-[#f2f2f2] shrink-0 lg:w-[92px] py-1">
              {DEAL_PRODUCTS.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={item.title}
                    className={`relative w-[62px] h-[62px] sm:w-[74px] sm:h-[74px] lg:w-[92px] lg:h-[74px] flex items-center justify-center p-2 transition-all duration-300 cursor-pointer ${isSelected
                        ? "bg-white shadow-[0_8px_25px_rgba(0,0,0,0.09)] lg:w-[106px] lg:-mr-3 rounded-[8px] z-10"
                        : "bg-white hover:bg-gray-50 opacity-85 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-108"
                    />
                  </button>
                );
              })}
            </div>

            {/* 2. Center Column: SALE OFF Watermark, Title, Price, Countdown, Actions */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-5 lg:py-6">
              {/* Large Embossed White "SALE OFF" Heading */}
              <div className="text-[44px] sm:text-[62px] xl:text-[74px] font-extrabold uppercase tracking-tight leading-none mb-1.5 select-none sale-off-watermark">
                SALE OFF
              </div>

              {/* Animated Product Info Block Keyed to activeIndex */}
              <div key={activeIndex} className="flex flex-col items-center animate-fade-up">
                <h2 className="text-[20px] sm:text-[24px] xl:text-[26px] font-semibold text-[#000000] hover:text-[#4f46e5] transition-colors max-w-[400px] leading-[1.22] mb-2">
                  <Link href={`/product/${currentStoreProd.slug}`}>
                    {currentProduct.title}
                  </Link>
                </h2>

                {/* 5 Gray Stars */}
                <div className="flex items-center justify-center gap-1 mb-3 text-[#d4d4d4]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Price & Compare Price */}
                <div className="flex items-baseline justify-center gap-2.5 mb-4">
                  <span className="text-[22px] sm:text-[26px] font-semibold text-[#4f46e5]">
                    AED {currentProduct.price.toFixed(2)}
                  </span>
                  <span className="text-[20px] sm:text-[23px] font-normal text-[#999999] line-through">
                    AED {currentProduct.oldPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 4 Pink Countdown Boxes with Live Tick-Pop Animation */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5">
                {[
                  { value: pad(timeLeft.days), label: "DAYS" },
                  { value: pad(timeLeft.hours), label: "HOURS" },
                  { value: pad(timeLeft.mins), label: "MINS" },
                  { value: pad(timeLeft.secs), label: "SECS" },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="w-[48px] h-[42px] sm:w-[54px] sm:h-[46px] rounded-[10px] bg-[#4f46e5] text-white text-[16px] sm:text-[18px] font-semibold flex items-center justify-center shadow-[0_4px_12px_rgba(79,70,229,0.28)] transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
                      <span key={unit.value} className="inline-block animate-tick-pop">
                        {unit.value}
                      </span>
                    </div>
                    <span className="text-[9.5px] font-medium uppercase tracking-wider text-[#000000] mt-1.5">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Action Row: Wishlist Circle + Dark Pill CTA + Search/Quickview Circle */}
              <div className="flex items-center justify-center gap-2.5 w-full max-w-[330px]">
                <button
                  type="button"
                  onClick={() => toggleWishlist(currentStoreProd)}
                  aria-label="Add to wishlist"
                  className="w-[42px] h-[42px] rounded-full bg-white hover:bg-[#4f46e5] hover:scale-108 active:scale-95 text-[#222222] hover:text-white shadow-sm flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => addToCart(currentStoreProd)}
                  className="btn-shine flex-1 h-[42px] rounded-full bg-[#1c1c1c] hover:bg-[#4f46e5] hover:-translate-y-0.5 active:scale-95 text-white text-[11.5px] font-semibold uppercase tracking-wider shadow-md transition-all duration-300 cursor-pointer"
                >
                  {currentProduct.ctaLabel}
                </button>

                <Link
                  href={`/product/${currentStoreProd.slug}`}
                  aria-label="View product details"
                  className="w-[42px] h-[42px] rounded-full bg-white hover:bg-[#4f46e5] hover:scale-108 active:scale-95 text-[#222222] hover:text-white shadow-sm flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 3. Right Column: True Sliding Studio Showcase Track with Prev/Next Arrows & Swipe */}
            <div
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              className="lg:w-[45%] bg-white rounded-[16px] relative min-h-[290px] sm:min-h-[360px] flex items-center justify-center overflow-hidden group select-none cursor-grab active:cursor-grabbing"
            >
              {/* Top-Left Discount Badge */}
              {currentProduct.discountBadge && (
                <span className="absolute top-3 left-3 z-10 bg-[#4f46e5] text-white text-[11px] font-semibold px-3 py-1 badge-leaf">
                  {currentProduct.discountBadge}
                </span>
              )}

              {/* Left Slide Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous deal product"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full bg-[#f5f5f5] hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-[#222222] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
                  <polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414" />
                </svg>
              </button>

              {/* Horizontal Sliding Track of All 5 Deal Products */}
              <div className="w-full h-full overflow-hidden flex items-center">
                <div
                  className="flex w-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
                  }}
                >
                  {DEAL_PRODUCTS.map((item) => {
                    const itemStoreProd = resolveStoreProduct({
                      title: item.title,
                      image: item.image,
                    });
                    return (
                      <div
                        key={item.id}
                        className="w-full shrink-0 flex items-center justify-center p-4"
                      >
                        <Link
                          href={`/product/${itemStoreProd.slug}`}
                          draggable={false}
                          className="w-[210px] h-[210px] sm:w-[275px] sm:h-[275px] flex items-center justify-center"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            draggable={false}
                            className="w-full h-full object-contain animate-float-slow group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Slide Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next deal product"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full bg-[#f5f5f5] hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-[#222222] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 48 48" fill="currentColor">
                  <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
