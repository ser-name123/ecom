"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CarouselTrack from "@/components/ui/CarouselTrack";

interface ProductBadge {
  text: string;
  type: "discount" | "preorder" | "stock";
}

interface ProductItem {
  id: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number;
  badges?: ProductBadge[];
  image: string;
  secondImage: string;
}

const NEW_ARRIVALS: ProductItem[] = [
  {
    id: "action-camera",
    category: "ACTION CAMERA",
    title: "Action Camera - Premium Lens Edition",
    price: 67.0,
    image: "/assets/camera-8.jpg",
    secondImage: "/assets/camera-8a.jpg",
  },
  {
    id: "wireless-controller",
    category: "CONTROLLER",
    title: "Wireless Controller - Classic Series",
    price: 334.0,
    oldPrice: 477.0,
    badges: [
      { text: "-30%", type: "discount" },
      { text: "PRE-ORDER", type: "preorder" },
    ],
    image: "/assets/game-8.jpg",
    secondImage: "/assets/game-1.jpg",
  },
  {
    id: "smartwatch-sport",
    category: "SMARTWATCH",
    title: "Smartwatch - Advanced Sport Edition Pro",
    price: 385.0,
    oldPrice: 480.0,
    badges: [{ text: "-20%", type: "discount" }],
    image: "/assets/watch-2.jpg",
    secondImage: "/assets/watch-1.jpg",
  },
  {
    id: "anc-headphones",
    category: "HEADPHONES",
    title: "Wireless Noise Cancelling Headphones",
    price: 418.0,
    badges: [{ text: "LIMITED STOCK", type: "stock" }],
    image: "/assets/audio-6.jpg",
    secondImage: "/assets/audio-7.jpg",
  },
  {
    id: "smartphone-pro",
    category: "SMARTPHONE",
    title: "Smartphone - Pro Triple Camera Series",
    price: 392.0,
    oldPrice: 434.0,
    badges: [
      { text: "-10%", type: "discount" },
      { text: "PRE-ORDER", type: "preorder" },
    ],
    image: "/assets/mobile-1.jpg",
    secondImage: "/assets/mobile-2.jpg",
  },
  {
    id: "vertical-mouse",
    category: "MOUSE",
    title: "Wireless Vertical Mouse - Lift Series",
    price: 220.0,
    image: "/assets/computer-5.jpg",
    secondImage: "/assets/computer-6.jpg",
  },
  {
    id: "vr-camera-360",
    category: "VR CAMERA",
    title: "360 VR Camera - Dual Lens Spherical",
    price: 138.0,
    oldPrice: 150.0,
    badges: [{ text: "-8%", type: "discount" }],
    image: "/assets/camera-1.jpg",
    secondImage: "/assets/camera-1a.jpg",
  },
  {
    id: "gaming-laptop-rgb",
    category: "LAPTOP",
    title: "Gaming Laptop - 15.6 Inch RGB Display",
    price: 450.0,
    image: "/assets/laptop-9.jpg",
    secondImage: "/assets/laptop-6.jpg",
  },
];

const BESTSELLERS: ProductItem[] = [
  {
    id: "smartwatch-sport-bs",
    category: "SMARTWATCH",
    title: "Smartwatch - Advanced Sport Edition Pro",
    price: 385.0,
    oldPrice: 480.0,
    badges: [{ text: "-20%", type: "discount" }],
    image: "/assets/watch-2.jpg",
    secondImage: "/assets/watch-1.jpg",
  },
  {
    id: "smartphone-pro-bs",
    category: "SMARTPHONE",
    title: "Smartphone - Pro Triple Camera Series",
    price: 392.0,
    oldPrice: 434.0,
    badges: [
      { text: "-10%", type: "discount" },
      { text: "PRE-ORDER", type: "preorder" },
    ],
    image: "/assets/mobile-1.jpg",
    secondImage: "/assets/mobile-2.jpg",
  },
  {
    id: "studio-headphones-bs",
    category: "HEADPHONES",
    title: "Studio Monitor Headphones",
    price: 184.0,
    oldPrice: 210.0,
    badges: [{ text: "-12%", type: "discount" }],
    image: "/assets/audio-10.jpg",
    secondImage: "/assets/audio-8.jpg",
  },
  {
    id: "intel-cpu-bs",
    category: "CPU",
    title: "Intel Core i9 9th Gen Unlocked CPU",
    price: 247.0,
    oldPrice: 250.0,
    badges: [{ text: "-1%", type: "discount" }],
    image: "/assets/computer-9.jpg",
    secondImage: "/assets/computer-12.jpg",
  },
  {
    id: "action-camera-bs",
    category: "ACTION CAMERA",
    title: "Action Camera - Premium Lens Edition",
    price: 67.0,
    image: "/assets/camera-8.jpg",
    secondImage: "/assets/camera-8a.jpg",
  },
  {
    id: "earbuds-pro-bs",
    category: "EARBUDS",
    title: "Wireless Earbuds Pro",
    price: 238.0,
    image: "/assets/audio-5.jpg",
    secondImage: "/assets/audio-4.jpg",
  },
  {
    id: "racing-wheel-bs",
    category: "CONTROLLER",
    title: "Racing Wheel Controller",
    price: 81.0,
    image: "/assets/game-4.jpg",
    secondImage: "/assets/game-5.jpg",
  },
];

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState<"new" | "bestsellers">("new");

  const items = activeTab === "new" ? NEW_ARRIVALS : BESTSELLERS;

  const getBadgeStyle = (type: ProductBadge["type"]) => {
    switch (type) {
      case "discount":
        return "bg-[#f43777] text-white";
      case "preorder":
        return "bg-[#686cff] text-white";
      case "stock":
        return "bg-[#208e30] text-white";
    }
  };

  return (
    <section id="new-arrivals" className="w-full bg-white pt-[44px] pb-[28px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* 1. Section Header: Tabs + View all */}
        <ScrollReveal animation="fade-up">
          <div className="flex items-center justify-between mb-[20px]">
            <div className="flex items-center gap-6 md:gap-8">
              {/* New Arrivals Tab */}
              <button
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-2.5 text-[22px] md:text-[26px] font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "new"
                    ? "text-[#222222]"
                    : "text-[#b2b2b2] hover:text-[#666666]"
                }`}
              >
                <span
                  className={`h-[2.5px] bg-[#222222] inline-block rounded-full transition-all duration-300 ${
                    activeTab === "new" ? "w-5 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <span>New Arrivals</span>
              </button>

              {/* Bestsellers Tab */}
              <button
                onClick={() => setActiveTab("bestsellers")}
                className={`flex items-center gap-2.5 text-[22px] md:text-[26px] font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "bestsellers"
                    ? "text-[#222222]"
                    : "text-[#b2b2b2] hover:text-[#666666]"
                }`}
              >
                <span
                  className={`h-[2.5px] bg-[#222222] inline-block rounded-full transition-all duration-300 ${
                    activeTab === "bestsellers" ? "w-5 opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <span>Bestsellers</span>
              </button>
            </div>

            {/* Right View all link */}
            <a
              href="#view-all"
              className="text-[14px] font-medium text-[#000000] hover:text-[#f43777] underline underline-offset-4 decoration-[1px] transition-colors"
            >
              View all
            </a>
          </div>
        </ScrollReveal>

        {/* 2. 5-Column Infinite Sliding Product Carousel (2 Cols on Mobile) */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div key={activeTab} className="mb-[28px] sm:mb-[36px] animate-fade-up">
            <CarouselTrack
              items={items}
              keyExtractor={(item) => item.id}
              visibleCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
              gap={12}
              autoPlayMs={4800}
              arrowPositionClass="top-[38%] -translate-y-1/2"
              renderItem={(product) => (
                <div className="group bg-white rounded-[14px] sm:rounded-[18px] p-2 sm:p-3 border border-[#f0f0f0] sm:border-transparent hover:border-[#eaeaea] card-hover-lift flex flex-col h-full">
                  {/* Image & Badges Container */}
                  <div className="relative w-full h-[140px] sm:h-[185px] p-1.5 sm:p-2 rounded-[10px] sm:rounded-[12px] overflow-hidden bg-white mb-2 sm:mb-3 flex items-center justify-center">
                    {/* Top-Left Badges */}
                    {product.badges && product.badges.length > 0 && (
                      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1.5">
                        {product.badges.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className={`${getBadgeStyle(
                              b.type
                            )} text-[10px] font-semibold uppercase px-2.5 py-1 badge-leaf tracking-wide leading-none`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Top-Right Hover Action Icons (Staggered Cascade) */}
                    <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-2">
                      <button
                        aria-label="Add to Wishlist"
                        className="w-[36px] h-[36px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#f43777] hover:text-white hover:border-[#f43777] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        aria-label="Quick View"
                        className="w-[36px] h-[36px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#f43777] hover:text-white hover:border-[#f43777] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 cursor-pointer"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                    </div>

                    {/* Primary Studio Image */}
                    <img
                      src={product.image}
                      alt={product.title}
                      draggable={false}
                      className="w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
                    />
                    {/* Secondary Hover Studio Image */}
                    <img
                      src={product.secondImage}
                      alt={product.title}
                      draggable={false}
                      className="absolute inset-0 w-full h-full p-2 object-contain opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-103"
                    />

                    {/* Bottom Hover Quick Add Button */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button className="btn-shine w-full py-2.5 rounded-full bg-[#1c1c1c] hover:bg-[#f43777] active:scale-95 text-white text-[12px] font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer">
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="flex flex-col flex-1 px-1">
                    <span className="text-[11px] font-normal uppercase tracking-wider text-[#999999] mb-1">
                      {product.category}
                    </span>

                    <h3 className="text-[14px] font-semibold text-[#222222] group-hover:text-[#f43777] transition-colors leading-[20px] line-clamp-2 mb-2.5 min-h-[40px]">
                      <a href={`#${product.id}`} draggable={false}>
                        {product.title}
                      </a>
                    </h3>

                    {/* 5 Gray Stars */}
                    <div className="flex items-center gap-0.5 mb-2 text-[#d6d6d6]">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <svg key={sIdx} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    {/* Price Row */}
                    <div className="mt-auto flex items-center gap-2">
                      {product.oldPrice ? (
                        <>
                          <span className="text-[16px] font-semibold text-[#f43777]">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-[14px] text-[#999999] line-through font-normal">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-[16px] font-semibold text-[#000000]">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </ScrollReveal>

        {/* 3. Bottom Two Promotional Banners (Banner-3.jpg & Banner-4.jpg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {/* Left Banner: Apple Watch Ultra GPS */}
          <ScrollReveal animation="fade-right" delay={80}>
            <div
              style={{
                background:
                  "linear-gradient(180deg, #F18A4F 0%, #F08243 50%, #EF8F53 100%)",
              }}
              className="banner-shine relative rounded-[18px] overflow-hidden min-h-[210px] md:min-h-[235px] flex items-center group"
            >
              <img
                src="/assets/Banner-3.jpg"
                alt="Apple Watch Ultra GPS"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 12%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 12%)",
                }}
                className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right group-hover:-translate-x-1 transition-transform duration-500 ease-out"
              />
              <div className="relative z-10 w-[55%] pl-7 md:pl-10 py-6 text-white">
                <h3 className="text-[22px] md:text-[28px] font-bold leading-[1.16] mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  Apple Watch
                  <br />
                  Ultra GPS
                </h3>
                <p className="text-[12px] md:text-[13px] text-white uppercase tracking-wide mb-4">
                  Starting at $499
                </p>
                <a
                  href="#apple-watch"
                  className="btn-shine inline-flex items-center justify-center bg-white text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white hover:-translate-y-0.5 active:scale-95 text-[11.5px] font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md transition-all duration-300"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Banner: PS5 Wireless Controller */}
          <ScrollReveal animation="fade-left" delay={160}>
            <div
              style={{
                background:
                  "linear-gradient(180deg, #4F628A 0%, #475681 50%, #516691 100%)",
              }}
              className="banner-shine relative rounded-[18px] overflow-hidden min-h-[210px] md:min-h-[235px] flex items-center group"
            >
              <img
                src="/assets/Banner-4.jpg"
                alt="PS5 Wireless Controller"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 12%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 12%)",
                }}
                className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right group-hover:-translate-x-1 transition-transform duration-500 ease-out"
              />
              <div className="relative z-10 w-[55%] pl-7 md:pl-10 py-6 text-white">
                <h3 className="text-[22px] md:text-[28px] font-bold leading-[1.16] mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  PS5 Wireless
                  <br />
                  Controller
                </h3>
                <p className="text-[12px] md:text-[13px] text-white uppercase tracking-wide mb-4">
                  Starting at $100
                </p>
                <a
                  href="#ps5-controller"
                  className="btn-shine inline-flex items-center justify-center bg-white text-[#1c1c1c] hover:bg-[#f43777] hover:text-white hover:-translate-y-0.5 active:scale-95 text-[11.5px] font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md transition-all duration-300"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
