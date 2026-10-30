"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CarouselTrack from "@/components/ui/CarouselTrack";

interface FeaturedProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discountBadge?: string;
  preorderBadge?: boolean;
  image: string;
  secondImage: string;
}

const TABS = [
  "Mobile & Tablet",
  "Computer",
  "Game",
  "Electronics",
  "Audio",
] as const;

type TabCategory = (typeof TABS)[number];

const PRODUCTS_BY_TAB: Record<TabCategory, FeaturedProduct[]> = {
  "Mobile & Tablet": [
    {
      id: "smartphone-pro-triple",
      title: "Smartphone - Pro Triple Camera Series",
      price: 392.0,
      oldPrice: 434.0,
      discountBadge: "-10%",
      preorderBadge: true,
      image: "/assets/mobile-1.jpg",
      secondImage: "/assets/mobile-2.jpg",
    },
    {
      id: "smartphone-compact-dual",
      title: "Smartphone - Compact Dual Camera",
      price: 157.0,
      image: "/assets/mobile-9.jpg",
      secondImage: "/assets/mobile-1.jpg",
    },
    {
      id: "smartphone-foldable-dual",
      title: "Smartphone - Foldable Dual Screen",
      price: 322.0,
      image: "/assets/mobile-3.jpg",
      secondImage: "/assets/mobile-4.jpg",
    },
    {
      id: "smartphone-spen-ultra",
      title: "Smartphone - S Pen Ultra Series",
      price: 52.0,
      oldPrice: 60.0,
      discountBadge: "-13%",
      image: "/assets/mobile-4.jpg",
      secondImage: "/assets/mobile-3.jpg",
    },
    {
      id: "tablet-pro-oled",
      title: "Tablet Pro 12.9 - Ultra Retina Display",
      price: 490.0,
      image: "/assets/tablet-3.jpg",
      secondImage: "/assets/mobile-2.jpg",
    },
  ],
  Computer: [
    {
      id: "vertical-mouse-comp",
      title: "Wireless Vertical Mouse - Lift Series",
      price: 220.0,
      image: "/assets/computer-5.jpg",
      secondImage: "/assets/computer-6.jpg",
    },
    {
      id: "intel-i9-comp",
      title: "Intel Core i9 9th Gen Unlocked CPU",
      price: 247.0,
      oldPrice: 250.0,
      discountBadge: "-1%",
      image: "/assets/computer-9.jpg",
      secondImage: "/assets/computer-12.jpg",
    },
    {
      id: "gaming-laptop-comp",
      title: "Gaming Laptop - 15.6 Inch RGB Display",
      price: 450.0,
      image: "/assets/laptop-9.jpg",
      secondImage: "/assets/laptop-6.jpg",
    },
    {
      id: "ultrabook-pro-comp",
      title: "Ultrabook Pro 14 - Sleek Aluminum",
      price: 520.0,
      oldPrice: 590.0,
      discountBadge: "-12%",
      image: "/assets/laptop-6.jpg",
      secondImage: "/assets/laptop-9.jpg",
    },
  ],
  Game: [
    {
      id: "wireless-controller-game",
      title: "Wireless Controller - Classic Series",
      price: 334.0,
      oldPrice: 477.0,
      discountBadge: "-30%",
      preorderBadge: true,
      image: "/assets/game-8.jpg",
      secondImage: "/assets/game-1.jpg",
    },
    {
      id: "racing-wheel-game",
      title: "Racing Wheel Controller",
      price: 81.0,
      image: "/assets/game-4.jpg",
      secondImage: "/assets/game-5.jpg",
    },
    {
      id: "clip-on-controller",
      title: "Mobile Clip-On Game Controller",
      price: 215.0,
      oldPrice: 230.0,
      discountBadge: "-7%",
      image: "/assets/game-3.jpg",
      secondImage: "/assets/game-2.jpg",
    },
    {
      id: "pro-gamepad-elite",
      title: "Pro Wireless Gamepad Elite Edition",
      price: 165.0,
      image: "/assets/game-1.jpg",
      secondImage: "/assets/game-8.jpg",
    },
  ],
  Electronics: [
    {
      id: "action-cam-elec",
      title: "Action Camera - Premium Lens Edition",
      price: 67.0,
      image: "/assets/camera-8.jpg",
      secondImage: "/assets/camera-8a.jpg",
    },
    {
      id: "360-cam-elec",
      title: "360 Camera - Handheld Cylindrical",
      price: 412.0,
      image: "/assets/camera-3.jpg",
      secondImage: "/assets/camera-3b.jpg",
    },
    {
      id: "vr-cam-elec",
      title: "360 VR Camera - Dual Lens Spherical",
      price: 138.0,
      oldPrice: 150.0,
      discountBadge: "-8%",
      image: "/assets/camera-1.jpg",
      secondImage: "/assets/camera-1a.jpg",
    },
    {
      id: "smartwatch-sport-elec",
      title: "Smartwatch - Advanced Sport Edition Pro",
      price: 385.0,
      oldPrice: 480.0,
      discountBadge: "-20%",
      image: "/assets/watch-2.jpg",
      secondImage: "/assets/watch-1.jpg",
    },
  ],
  Audio: [
    {
      id: "anc-headphones-audio",
      title: "Wireless Noise Cancelling Headphones",
      price: 418.0,
      image: "/assets/audio-6.jpg",
      secondImage: "/assets/audio-7.jpg",
    },
    {
      id: "studio-headphones-audio",
      title: "Studio Monitor Headphones",
      price: 184.0,
      oldPrice: 210.0,
      discountBadge: "-12%",
      image: "/assets/audio-10.jpg",
      secondImage: "/assets/audio-8.jpg",
    },
    {
      id: "earbuds-pro-audio",
      title: "Wireless Earbuds Pro",
      price: 238.0,
      image: "/assets/audio-5.jpg",
      secondImage: "/assets/audio-4.jpg",
    },
    {
      id: "over-ear-audio",
      title: "Wireless Over-Ear Headphones",
      price: 265.0,
      oldPrice: 320.0,
      discountBadge: "-17%",
      image: "/assets/audio-8.jpg",
      secondImage: "/assets/audio-8a.jpg",
    },
  ],
};

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState<TabCategory>("Mobile & Tablet");

  const items = PRODUCTS_BY_TAB[activeTab];

  return (
    <section id="featured" className="w-full bg-white pt-[44px] pb-[48px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* 1. Section Header: Title + Category Filter Tabs */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-[20px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold text-[#222222] tracking-tight">
              Featured Products
            </h2>

            {/* Right Category Tabs */}
            <div className="flex items-center flex-wrap gap-5 md:gap-7">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 text-[15px] md:text-[16px] font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-[#f43777]"
                        : "text-[#222222] hover:text-[#f43777]"
                    }`}
                  >
                    <span
                      className={`rounded-full bg-[#f43777] transition-all duration-300 ${isActive ? "w-1.5 h-1.5 opacity-100 scale-100" : "w-0 h-0 opacity-0 scale-0"
                        }`}
                    />
                    <span>{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Content Row: Left Promo Banner (40%) + Right 3-Column Infinite Sliding Carousel (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[18px] items-stretch">
          {/* Left Promo Card: Galaxy S30 Ultra (/assets/Banner-tab-1.jpg) */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right" delay={80} className="h-full">
              <div
                style={{ backgroundColor: "#35283C" }}
                className="banner-shine h-full relative rounded-[18px] overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col justify-between group"
              >
                <img
                  src="/assets/Banner-tab-1.jpg"
                  alt="Galaxy S30 Ultra"
                  className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom-right group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="relative z-10 p-6 md:p-7 text-white">
                  <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.15] mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                    Galaxy S30 Ultra
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-white uppercase tracking-wide mb-3.5">
                    Starting at $479
                  </p>
                  <a
                    href="#galaxy-s30"
                    className="btn-shine inline-flex items-center justify-center bg-white text-[#1c1c1c] hover:bg-[#f43777] hover:text-white hover:-translate-y-0.5 active:scale-95 text-[11.5px] font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md transition-all duration-300"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right 3-Column Product Carousel */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div key={activeTab} className="w-full animate-fade-up">
              <CarouselTrack
                items={items}
                keyExtractor={(item) => item.id}
                visibleCount={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                gap={15}
                autoPlayMs={4600}
                arrowPositionClass="top-[40%] -translate-y-1/2"
                renderItem={(product) => (
                  <div className="group bg-white rounded-[18px] p-3 border border-transparent hover:border-[#eaeaea] card-hover-lift flex flex-col justify-between h-full">
                    {/* Top Image & Badges */}
                    <div className="relative w-full h-[180px] p-2 rounded-[12px] overflow-hidden flex items-center justify-center mb-3">
                      {/* Top-Left Badges */}
                      {(product.discountBadge || product.preorderBadge) && (
                        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1.5">
                          {product.discountBadge && (
                            <span className="bg-[#f43777] text-white text-[10px] font-semibold uppercase px-3 py-1.5 badge-leaf leading-none">
                              {product.discountBadge}
                            </span>
                          )}
                          {product.preorderBadge && (
                            <span className="bg-[#686cff] text-white text-[10px] font-semibold uppercase px-3 py-1.5 badge-leaf leading-none">
                              PRE-ORDER
                            </span>
                          )}
                        </div>
                      )}

                      {/* Top-Right Hover Action Icons (Staggered Cascade) */}
                      <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-2">
                        <button
                          aria-label="Add to Wishlist"
                          className="w-[34px] h-[34px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#f43777] hover:text-white hover:border-[#f43777] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <button
                          aria-label="Quick View"
                          className="w-[34px] h-[34px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#f43777] hover:text-white hover:border-[#f43777] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                        </button>
                      </div>

                      {/* Primary Image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        draggable={false}
                        className="w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
                      />
                      {/* Secondary Hover Image */}
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

                    {/* Product Info */}
                    <div className="flex flex-col flex-1 px-1">
                      <h3 className="text-[14px] font-semibold text-[#222222] group-hover:text-[#f43777] transition-colors leading-[20px] line-clamp-2 mb-2.5 min-h-[40px]">
                        <a href={`#${product.id}`} draggable={false}>
                          {product.title}
                        </a>
                      </h3>

                      {/* 5 Gray Stars */}
                      <div className="flex items-center gap-0.5 mb-2 text-[#d4d4d4]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-auto flex items-center gap-2 pt-1">
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
          </div>
        </div>
      </div>
    </section>
  );
}
