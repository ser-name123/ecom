"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CarouselTrack from "@/components/ui/CarouselTrack";
import { OFFICIAL_BRANDS, getProductsByBrand, getBrandInfo } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

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
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  const activeBrandInfo = selectedBrandName ? getBrandInfo(selectedBrandName) : undefined;
  const brandProducts = selectedBrandName ? getProductsByBrand(selectedBrandName).slice(0, 4) : [];

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
        {/* PART 1: Shop by Brands (7-Column Infinite Sliding Track + Interactive Brand Products Showcase) */}
        <ScrollReveal animation="fade-up">
          <div className="mb-[48px]">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-[20px]">
              <div className="flex items-center gap-3">
                <h2 className="text-[22px] md:text-[26px] font-semibold text-[#222222] tracking-tight">
                  Shop by Brands
                </h2>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[11.5px] font-bold">
                  Click any brand to explore products
                </span>
              </div>
              <Link
                href="/shop#brands"
                className="text-[14px] font-medium text-[#000000] hover:text-[#4f46e5] underline underline-offset-4 decoration-[1px] transition-colors"
              >
                View all
              </Link>
            </div>

            {/* 7-Column Brand Cards Carousel */}
            <CarouselTrack
              items={OFFICIAL_BRANDS}
              keyExtractor={(item) => item.id}
              visibleCount={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 7 }}
              gap={14}
              autoPlayMs={selectedBrandName ? 0 : 3500}
              arrowPositionClass="top-1/2 -translate-y-1/2"
              renderItem={(brand) => {
                const isSelected = selectedBrandName === brand.name;
                return (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedBrandName((prev) => (prev === brand.name ? null : brand.name))
                    }
                    draggable={false}
                    className={`w-full bg-white rounded-[14px] border p-2.5 flex flex-col items-center justify-center h-[92px] md:h-[100px] group overflow-hidden relative transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-[#4f46e5] ring-2 ring-[#4f46e5]/25 shadow-[0_12px_28px_rgba(79,70,229,0.16)] -translate-y-1"
                        : "border-[#eaeaea] hover:border-[#4f46e5]/60 card-hover-lift"
                    }`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      draggable={false}
                      className="max-h-[52px] w-auto object-contain group-hover:scale-108 transition-transform duration-500"
                    />
                    <span
                      className={`mt-1 text-[10.5px] font-extrabold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? "text-[#4f46e5]"
                          : "text-[#888888] group-hover:text-[#4f46e5]"
                      }`}
                    >
                      {brand.name}
                    </span>
                  </button>
                );
              }}
            />

            {/* Interactive Brand Products Drawer (Opens when any brand is clicked) */}
            {selectedBrandName && activeBrandInfo && (
              <div className="mt-6 rounded-[22px] border border-[#4f46e5]/25 bg-[#f8f9fc] p-5 sm:p-7 shadow-[0_18px_45px_rgba(20,18,51,0.08)] animate-fade-up">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#e2e5f0]">
                  <div className="flex items-center gap-4">
                    <div className="w-[74px] h-[54px] rounded-[12px] bg-white border border-[#eaeaea] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={activeBrandInfo.logo}
                        alt={activeBrandInfo.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4f46e5] text-white text-[10px] font-extrabold uppercase tracking-wider">
                          OFFICIAL PARTNER
                        </span>
                        <span className="text-[11.5px] font-bold text-[#4f46e5]">
                          {activeBrandInfo.specialty}
                        </span>
                      </div>
                      <h3 className="text-[19px] sm:text-[22px] font-extrabold text-[#141233] mt-0.5">
                        {activeBrandInfo.name} Flagship Collection
                      </h3>
                      <p className="text-[12.5px] text-[#666666] hidden sm:block">
                        {activeBrandInfo.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href={`/shop?brand=${encodeURIComponent(activeBrandInfo.name)}`}
                      className="btn-shine inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>View All {activeBrandInfo.name} in Shop</span>
                      <span>→</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedBrandName(null)}
                      aria-label="Close brand showcase"
                      className="w-9 h-9 rounded-full bg-white border border-[#dcdce5] hover:border-[#4f46e5] text-[#141233] font-bold flex items-center justify-center cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* 4 Brand Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {brandProducts.map((product) => {
                    const wished = isInWishlist(product.slug);
                    return (
                      <div
                        key={product.id}
                        className="group rounded-[18px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2.5 py-0.5 badge-leaf">
                              {product.discount || "OFFICIAL"}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleWishlist(product.slug)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] cursor-pointer ${
                                wished
                                  ? "bg-[#4f46e5] text-white"
                                  : "bg-[#f4f5f8] text-[#444444] hover:bg-[#4f46e5] hover:text-white"
                              }`}
                            >
                              ♥
                            </button>
                          </div>

                          <Link
                            href={`/product/${product.slug}`}
                            className="w-full h-[165px] rounded-[12px] bg-[#fafafa] p-3 flex items-center justify-center mb-3 overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                            />
                          </Link>

                          <div className="text-[10.5px] font-bold uppercase text-[#777777] mb-1">
                            {activeBrandInfo.name} • <span className="text-[#f59e0b]">★ {product.rating}</span>
                          </div>
                          <Link
                            href={`/product/${product.slug}`}
                            className="text-[14px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] line-clamp-2 leading-snug"
                          >
                            {product.title}
                          </Link>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#f0f0f0]">
                          <div className="flex items-baseline gap-2 mb-2.5">
                            <span className="text-[17px] font-extrabold text-[#4f46e5]">
                              AED {product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && (
                              <span className="text-[12px] text-[#999999] line-through">
                                AED {product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => addToCart(product, 1)}
                              className="btn-shine py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                            >
                              + Add Cart
                            </button>
                            <Link
                              href={`/product/${product.slug}`}
                              className="py-2 rounded-full border border-[#dcdce5] hover:border-[#141233] text-[#141233] text-[11px] font-bold uppercase tracking-wider text-center"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
                          ? "opacity-100 scale-108 ring-2 ring-[#4f46e5]"
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
                          ? "opacity-100 scale-108 ring-2 ring-[#4f46e5]"
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
                          ? "opacity-100 scale-108 ring-2 ring-[#4f46e5]"
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

                      <div className="text-[15px] md:text-[16px] font-semibold text-[#4f46e5] mb-5">
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
                    className="w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
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
                    className="w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-[#4f46e5] hover:scale-110 active:scale-95 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
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
