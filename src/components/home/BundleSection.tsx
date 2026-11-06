"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useStore } from "@/lib/StoreContext";
import { resolveStoreProduct } from "@/lib/storeData";

interface BundleProduct {
  id: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number;
  discountBadge?: string;
  image: string;
  secondImage?: string;
}

const BUNDLE_PRODUCTS: BundleProduct[] = [
  {
    id: "vertical-mouse",
    category: "MOUSE",
    title: "Wireless Vertical Mouse - Lift Series",
    price: 220.0,
    image: "/assets/computer-5.jpg",
    secondImage: "/assets/computer-6.jpg",
  },
  {
    id: "smartwatch-sport",
    category: "SMARTWATCH",
    title: "Smartwatch - Advanced Sport Edition Pro",
    price: 385.0,
    oldPrice: 480.0,
    discountBadge: "-20%",
    image: "/assets/watch-2.jpg",
    secondImage: "/assets/watch-1.jpg",
  },
  {
    id: "studio-headphones",
    category: "HEADPHONES",
    title: "Studio Monitor Headphones",
    price: 184.0,
    oldPrice: 210.0,
    discountBadge: "-12%",
    image: "/assets/audio-10.jpg",
  },
  {
    id: "intel-core-i9",
    category: "CPU",
    title: "Intel Core i9 9th Gen Unlocked CPU",
    price: 247.0,
    oldPrice: 250.0,
    discountBadge: "-1%",
    image: "/assets/computer-9.jpg",
    secondImage: "/assets/computer-12.jpg",
  },
  {
    id: "smartphone-spen",
    category: "SMARTPHONE",
    title: "Smartphone - S Pen Ultra Series",
    price: 52.0,
    oldPrice: 60.0,
    discountBadge: "-13%",
    image: "/assets/mobile-4.jpg",
    secondImage: "/assets/mobile-3.jpg",
  },
  {
    id: "earbuds-pro",
    category: "EARBUDS",
    title: "Wireless Earbuds Pro",
    price: 238.0,
    image: "/assets/audio-5.jpg",
  },
  {
    id: "racing-wheel",
    category: "CONTROLLER",
    title: "Racing Wheel Controller",
    price: 81.0,
    image: "/assets/game-4.jpg",
    secondImage: "/assets/game-5.jpg",
  },
  {
    id: "360-camera",
    category: "360 CAMERA",
    title: "360 Camera - Handheld Cylindrical",
    price: 412.0,
    image: "/assets/camera-3.jpg",
    secondImage: "/assets/camera-3b.jpg",
  },
  {
    id: "over-ear-headphones",
    category: "HEADPHONES",
    title: "Wireless Over-Ear Headphones",
    price: 265.0,
    oldPrice: 320.0,
    discountBadge: "-17%",
    image: "/assets/audio-8.jpg",
    secondImage: "/assets/audio-8a.jpg",
  },
];

export default function BundleSection() {
  const { addToCart, toggleWishlist, applyCoupon } = useStore();
  const [selectedBundle, setSelectedBundle] = useState<BundleProduct[]>([]);

  const handleAddBundleToCart = () => {
    if (selectedBundle.length === 0) return;
    selectedBundle.forEach((item) => {
      const storeProd = resolveStoreProduct({ title: item.title, image: item.image });
      addToCart(storeProd, 1);
    });
    if (selectedBundle.length === 3) {
      applyCoupon("BUNDLE30");
    }
  };

  const handleToggleBundle = (product: BundleProduct) => {
    const exists = selectedBundle.some((p) => p.id === product.id);
    if (exists) {
      setSelectedBundle((prev) => prev.filter((p) => p.id !== product.id));
    } else if (selectedBundle.length < 3) {
      setSelectedBundle((prev) => [...prev, product]);
    }
  };

  const handleRemoveSlot = (id: string) => {
    setSelectedBundle((prev) => prev.filter((p) => p.id !== id));
  };

  const rawTotal = selectedBundle.reduce((acc, item) => acc + item.price, 0);
  const isComplete = selectedBundle.length === 3;
  const finalTotal = isComplete ? rawTotal * 0.7 : rawTotal;
  const progressPercent = (selectedBundle.length / 3) * 100;

  return (
    <section id="bundle" className="w-full bg-[#f7f7f7] py-[44px] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <ScrollReveal animation="fade-up">
          <div className="mb-[20px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold text-[#222222] tracking-tight">
              Buy 3 Products and{" "}
              <strong className="text-[#4f46e5] font-semibold">Save up to 30%</strong>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main Layout: Left 9-Product Grid (9 cols) + Right Sticky Bundle Card (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[16px] sm:gap-[20px] items-start">
          {/* Left 3x3 Product Cards Grid (2 Cols on Mobile) */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-[18px]">
            {BUNDLE_PRODUCTS.map((product, idx) => {
              const isAdded = selectedBundle.some((p) => p.id === product.id);
              const storeProd = resolveStoreProduct({ title: product.title, image: product.image });
              return (
                <ScrollReveal key={product.id} delay={(idx % 3) * 80} animation="fade-up">
                  <div
                    className={`group bg-white rounded-[14px] sm:rounded-[18px] p-2 sm:p-3 flex flex-col justify-between card-hover-lift border h-full ${
                      isAdded
                        ? "border-[#4f46e5] shadow-[0_8px_28px_rgba(79,70,229,0.14)]"
                        : "border-transparent hover:border-[#eaeaea]"
                    }`}
                  >
                    {/* Top Image Container */}
                    <div className="relative w-full h-[135px] sm:h-[175px] p-1.5 sm:p-2 rounded-[10px] sm:rounded-[12px] overflow-hidden flex items-center justify-center mb-2 sm:mb-3">
                      {/* Discount Badge */}
                      {product.discountBadge && (
                        <span className="absolute top-2.5 left-2.5 z-10 bg-[#4f46e5] text-white text-[10px] font-semibold px-2.5 py-1 badge-leaf leading-none pointer-events-none">
                          {product.discountBadge}
                        </span>
                      )}

                      {/* Top-Right Hover Wishlist & Quick View (Staggered Cascade) */}
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => toggleWishlist(storeProd)}
                          aria-label="Add to Wishlist"
                          className="w-[34px] h-[34px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#4f46e5] hover:text-white hover:border-[#4f46e5] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <Link
                          href={`/product/${storeProd.slug}`}
                          aria-label="View Product Details"
                          className="w-[34px] h-[34px] rounded-full bg-white shadow-md border border-[#eaeaea] flex items-center justify-center text-[#222222] hover:bg-[#4f46e5] hover:text-white hover:border-[#4f46e5] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                        </Link>
                      </div>

                      {/* Clickable Product Image -> Goes to Product Details */}
                      <Link
                        href={`/product/${storeProd.slug}`}
                        className="w-full h-full flex items-center justify-center relative"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className={`w-full h-full object-contain transition-all duration-500 ${
                            product.secondImage ? "group-hover:opacity-0" : "group-hover:scale-103"
                          }`}
                        />
                        {product.secondImage && (
                          <img
                            src={product.secondImage}
                            alt={product.title}
                            className="absolute inset-0 w-full h-full p-2 object-contain opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-103"
                          />
                        )}
                      </Link>

                      {/* Bottom Hover "Add to bundle" + "Add to Cart" Pill Buttons */}
                      <div className="absolute bottom-3 left-2.5 right-2.5 z-20 flex items-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBundle(product);
                          }}
                          className={`btn-shine flex-1 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer ${
                            isAdded
                              ? "bg-[#4f46e5] text-white"
                              : "bg-[#1c1c1c] hover:bg-[#4f46e5] text-white"
                          }`}
                        >
                          {isAdded ? "In Bundle ✓" : "+ Bundle"}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(storeProd);
                          }}
                          className="btn-shine flex-1 py-2 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[11px] font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-1 px-1">
                      <span className="text-[11px] font-normal uppercase tracking-wider text-[#999999] mb-1">
                        {product.category}
                      </span>

                      <h3 className="text-[14px] font-semibold text-[#222222] group-hover:text-[#4f46e5] transition-colors leading-[20px] line-clamp-2 mb-2.5 min-h-[40px]">
                        <Link href={`/product/${storeProd.slug}`}>
                          {product.title}
                        </Link>
                      </h3>

                      {/* 5 Gray Stars */}
                      <div className="flex items-center gap-0.5 mb-2 text-[#d4d4d4]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>

                      {/* Price Row */}
                      <div className="mt-auto flex items-center gap-2 pt-1">
                        {product.oldPrice ? (
                          <>
                            <span className="text-[16px] font-semibold text-[#4f46e5]">
                              AED {product.price.toFixed(2)}
                            </span>
                            <span className="text-[14px] text-[#999999] line-through font-normal">
                              AED {product.oldPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-[16px] font-semibold text-[#000000]">
                            AED {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Sticky "Your bundle" Panel (3 cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-[84px]">
            <ScrollReveal animation="fade-left" delay={150}>
              <div
                className="rounded-[20px] p-6 text-white shadow-xl flex flex-col justify-between"
                style={{
                  background: "linear-gradient(180deg, rgba(34, 32, 81, 1), rgba(12, 11, 34, 1) 98%)",
                }}
              >
                {/* Header & Progress Bar */}
                <div>
                  <h3 className="text-[24px] font-semibold text-white mb-1">
                    Your bundle
                  </h3>
                  <p className="text-[13px] text-[#e0e0e0] mb-4">
                    Add 3 products and save 30%
                  </p>

                  {/* Progress Bar Track with Shimmer */}
                  <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-[#4f46e5] rounded-full transition-all duration-500 progress-shimmer"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* 3 Bundle Slots */}
                  <div className="space-y-4 mb-8">
                    {[0, 1, 2].map((slotIdx) => {
                      const item = selectedBundle[slotIdx];
                      if (item) {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3.5 bg-white/[0.06] rounded-[12px] p-2.5 border border-white/10 relative group animate-fade-up"
                          >
                            <div className="w-[56px] h-[56px] rounded-[10px] bg-white p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0 pr-5">
                              <p className="text-[13px] font-semibold text-white truncate">
                                {item.title}
                              </p>
                              <p className="text-[13px] font-semibold text-[#4f46e5] mt-0.5">
                                AED {item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveSlot(item.id)}
                              aria-label="Remove from bundle"
                              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/10 hover:bg-[#4f46e5] text-white/70 hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      }

                      // Empty Placeholder Slot
                      return (
                        <div
                          key={slotIdx}
                          className="flex items-center gap-3.5 py-1"
                        >
                          <div className="w-[62px] h-[62px] rounded-[12px] bg-[#2a2852] shrink-0" />
                          <div className="flex-1 space-y-2.5">
                            <div className="h-[12px] w-full rounded-full bg-[#2a2852]" />
                            <div className="h-[10px] w-[48%] rounded-full bg-[#2a2852]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer: Total & Add to Cart Button */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[14px] text-white/80 font-normal">
                      Total:
                    </span>
                    <div className="flex items-baseline gap-2">
                      {isComplete && (
                        <span className="text-[13px] text-white/45 line-through">
                          AED {rawTotal.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[18px] font-semibold text-white">
                        AED {finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBundleToCart}
                    disabled={selectedBundle.length === 0}
                    className={`btn-shine w-full h-[46px] rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isComplete
                        ? "bg-[#4f46e5] hover:bg-[#4338ca] active:scale-95 text-white shadow-[0_4px_15px_rgba(79,70,229,0.4)]"
                        : selectedBundle.length > 0
                        ? "bg-white/20 hover:bg-white/30 active:scale-95 text-white"
                        : "bg-[#1e1c38] text-white/60 cursor-not-allowed"
                    }`}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
