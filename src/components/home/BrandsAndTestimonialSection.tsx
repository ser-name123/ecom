"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CarouselTrack from "@/components/ui/CarouselTrack";

const BRAND_LOGOS = [
  { id: "brand-1", url: "/assets/brand-1.jpg" },
  { id: "brand-2", url: "/assets/brand-2.jpg" },
  { id: "brand-3", url: "/assets/brand-3.jpg" },
  { id: "brand-4", url: "/assets/brand-4.jpg" },
  { id: "brand-5", url: "/assets/brand-5.jpg" },
  { id: "brand-6", url: "/assets/brand-6.jpg" },
  { id: "brand-7", url: "/assets/brand-7.jpg" },
  { id: "brand-8", url: "/assets/brand-8.jpg" },
  { id: "brand-9", url: "/assets/brand-9.jpg" },
  { id: "brand-10", url: "/assets/brand-10.jpg" },
];

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Donald Trump",
    avatar: "/assets/testimonial-1.jpg",
    quote:
      "“Last week I bought a portable speaker here, the product is great and the customer service team is very dedicated.”",
  },
  {
    id: 1,
    name: "Daniel",
    avatar: "/assets/testimonial-2.jpg",
    quote:
      "“Honest and in-depth gaming gear reviews. I finally found the right mouse and keyboard for my setup.”",
  },
  {
    id: 2,
    name: "Matthew",
    avatar: "/assets/testimonial-3.jpg",
    quote:
      "“Great insights on smartwatches and wearables. I found the perfect fitness tracker thanks to these reviews.”",
  },
  {
    id: 3,
    name: "William",
    avatar: "/assets/testimonial-4.jpg",
    quote:
      "“Superb gaming peripherals and unbeatable bundle discounts. My new wireless controller feels ultra-responsive.”",
  },
  {
    id: 4,
    name: "Jennifer",
    avatar: "/assets/testimonial-5.jpg",
    quote:
      "“Customer support helped me choose the right 4K action camera for my travel vlogs. The image stabilization is incredible.”",
  },
  {
    id: 5,
    name: "Rebecca",
    avatar: "/assets/testimonial-6.jpg",
    quote:
      "“Sleek packaging, genuine electronics, and the 30% bundle deal saved me a lot on my new studio setup!”",
  },
];

export default function BrandsAndTestimonialSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTestimonialPaused) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isTestimonialPaused]);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    if (delta < -40) handleNextTestimonial();
    else if (delta > 40) handlePrevTestimonial();
    dragStartXRef.current = null;
  };

  return (
    <section className="w-full bg-white pt-[44px] pb-[16px] overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* PART 1: Shop by Brands (7-Column Infinite Sliding Track) */}
        <ScrollReveal animation="fade-up">
          <div className="mb-[48px]">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-[20px]">
              <h2 className="text-[22px] md:text-[26px] font-semibold text-[#222222] tracking-tight">
                Shop by Brands
              </h2>
              <a
                href="#all-brands"
                className="text-[14px] font-medium text-[#000000] hover:text-[#f43777] underline underline-offset-4 decoration-[1px] transition-colors"
              >
                View all
              </a>
            </div>

            {/* 7-Column Brand Cards Carousel */}
            <CarouselTrack
              items={BRAND_LOGOS}
              keyExtractor={(item) => item.id}
              visibleCount={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 7 }}
              gap={14}
              autoPlayMs={3500}
              arrowPositionClass="top-1/2 -translate-y-1/2"
              renderItem={(brand) => (
                <a
                  href="#brand"
                  draggable={false}
                  className="bg-white rounded-[14px] border border-[#eaeaea] hover:border-transparent card-hover-lift p-2.5 flex items-center justify-center h-[88px] md:h-[96px] group overflow-hidden"
                >
                  <img
                    src={brand.url}
                    alt="Brand Logo"
                    draggable={false}
                    className="max-h-[58px] w-auto object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                </a>
              )}
            />
          </div>
        </ScrollReveal>

        {/* PART 2: Futuristic Dark Navy Testimonial Banner (Flush to Right Viewport Edge on Desktop) */}
        <ScrollReveal animation="zoom-in" delay={100}>
          <div
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative rounded-[28px] md:rounded-[34px] lg:rounded-r-none lg:-mr-[max(24px,calc((100vw-1440px)/2+24px))] overflow-hidden min-h-[280px] md:min-h-[310px] flex items-center px-6 sm:px-10 md:px-14 py-[42px] bg-[#06061b] bg-cover bg-center select-none cursor-grab active:cursor-grabbing"
            style={{
              backgroundImage: "url('/assets/testimonial-bg.jpg')",
            }}
          >
            {/* Right Outlined Quote Graphic with Gentle Float */}
            <img
              src="/assets/icon-quote.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute right-[8%] md:right-[14%] top-1/2 -translate-y-1/2 w-[130px] md:w-[165px] h-auto object-contain opacity-95 animate-float-slow"
            />

            {/* Content Grid: Left Avatar Cluster (3 cols) + Right Sliding Quote Track (9 cols) */}
            <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              {/* Left 3-Row Staggered Avatar Grid (3 + 2 + 1) */}
              <div className="flex flex-col gap-[8px] shrink-0">
                {/* Row 1: 3 Avatars */}
                <div className="flex items-center gap-[8px]">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-[48px] h-[48px] rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer ${
                        activeTestimonial === idx
                          ? "opacity-100 scale-108 ring-2 ring-[#f43777]"
                          : "opacity-45 hover:opacity-85 hover:scale-105"
                      }`}
                    >
                      <img
                        src={TESTIMONIALS[idx].avatar}
                        alt={TESTIMONIALS[idx].name}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Row 2: 2 Avatars */}
                <div className="flex items-center gap-[8px]">
                  {[3, 4].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-[48px] h-[48px] rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer ${
                        activeTestimonial === idx
                          ? "opacity-100 scale-108 ring-2 ring-[#f43777]"
                          : "opacity-45 hover:opacity-85 hover:scale-105"
                      }`}
                    >
                      <img
                        src={TESTIMONIALS[idx].avatar}
                        alt={TESTIMONIALS[idx].name}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Row 3: 1 Avatar */}
                <div className="flex items-center gap-[8px]">
                  {[5].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-[48px] h-[48px] rounded-[8px] overflow-hidden transition-all duration-300 cursor-pointer ${
                        activeTestimonial === idx
                          ? "opacity-100 scale-108 ring-2 ring-[#f43777]"
                          : "opacity-45 hover:opacity-85 hover:scale-105"
                      }`}
                    >
                      <img
                        src={TESTIMONIALS[idx].avatar}
                        alt={TESTIMONIALS[idx].name}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Horizontal Sliding Quote Track & Prev/Next Buttons */}
              <div className="max-w-[650px] w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translate3d(-${activeTestimonial * 100}%, 0, 0)`,
                  }}
                >
                  {TESTIMONIALS.map((review) => (
                    <div key={review.id} className="w-full shrink-0 pr-4">
                      <blockquote className="text-[18px] sm:text-[22px] md:text-[24px] font-normal text-white leading-[1.45] mb-3.5">
                        {review.quote}
                      </blockquote>

                      <div className="text-[15px] md:text-[16px] font-semibold text-[#f43777] mb-5">
                        {review.name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prev / Next Navigation Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevTestimonial();
                    }}
                    aria-label="Previous testimonial"
                    className="w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-[#f43777] hover:scale-110 active:scale-95 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="30.586,6.586 13.171,24 30.586,41.414 33.414,38.586 18.829,24 33.414,9.414" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextTestimonial();
                    }}
                    aria-label="Next testimonial"
                    className="w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-[#f43777] hover:scale-110 active:scale-95 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
