"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { resolveStoreProduct } from "@/lib/storeData";

interface CollectionData {
  id: string;
  name: string;
  description: string;
  thumbnails: string[];
  bannerImage: string;
}

const COLLECTIONS: CollectionData[] = [
  {
    id: "headphones",
    name: "Headphones",
    description:
      "Precisely engineered for immersive sound and lasting all-day comfort.",
    thumbnails: [
      "/assets/audio-1.jpg",
      "/assets/audio-10.jpg",
      "/assets/audio-8.jpg",
      "/assets/audio-9.jpg",
    ],
    bannerImage: "/assets/collection-1.jpg",
  },
  {
    id: "portable-speakers",
    name: "Portable Speakers",
    description:
      "Fill any room with rich, 360-degree sound from a compact, rugged form factor.",
    thumbnails: [
      "/assets/laptop-9.jpg",
      "/assets/tablet-3.jpg",
      "/assets/laptop-6.jpg",
      "/assets/camera-8.jpg",
    ],
    bannerImage: "/assets/collection-3.jpg",
  },
  {
    id: "smartwatch",
    name: "Smartwatch",
    description:
      "Stay connected and track your wellness with elegant, responsive intelligence on your wrist.",
    thumbnails: [
      "/assets/watch-7.jpg",
      "/assets/watch-1.jpg",
      "/assets/watch-10.jpg",
      "/assets/watch-9.jpg",
    ],
    bannerImage: "/assets/collection-2.jpg",
  },
];

export default function ShopByCollectionSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeThumbIdx, setActiveThumbIdx] = useState<number | null>(null);

  const current = COLLECTIONS[activeIdx];

  return (
    <section id="collections" className="w-full bg-[#f7f7f7] py-[28px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Indented Interactive Collection Selector + 4 Thumbnails + Description + CTA */}
          <div className="lg:col-span-6 py-3 lg:py-6 lg:pl-[55px] xl:pl-[75px]">
            <ScrollReveal animation="fade-right">
              {/* Pink Eyebrow Label */}
              <div className="text-[14px] font-semibold text-[#4f46e5] mb-3.5">
                Shop by Collection
              </div>

              {/* 3 Interactive Collection Titles */}
              <div className="flex flex-col items-start space-y-2 mb-6">
                {COLLECTIONS.map((col, idx) => {
                  const isSelected = idx === activeIdx;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onMouseEnter={() => {
                        setActiveIdx(idx);
                        setActiveThumbIdx(null);
                      }}
                      onClick={() => {
                        setActiveIdx(idx);
                        setActiveThumbIdx(null);
                      }}
                      className={`flex items-center gap-2.5 text-left text-[22px] md:text-[28px] font-semibold leading-[1.2] transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "text-[#000000] translate-x-1"
                          : "text-[#b8b8b8] hover:text-[#666666]"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-[#000000] shrink-0 animate-fade-up"
                        >
                          <polygon
                            fillRule="evenodd"
                            points="17.586 13 3 13 3 11 17.586 11 11.293 4.707 12.707 3.293 21.414 12 12.707 20.707 11.293 19.293"
                          />
                        </svg>
                      )}
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* 4 Mini Product Thumbnail Cards Keyed to activeIdx */}
              <div key={activeIdx} className="flex items-center gap-[10px] mb-5">
                {current.thumbnails.map((thumb, idx) => {
                  const isThumbActive = activeThumbIdx === idx;
                  const thumbProd = resolveStoreProduct({ image: thumb });
                  return (
                    <Link
                      key={idx}
                      href={`/product/${thumbProd.slug}`}
                      onMouseEnter={() => setActiveThumbIdx(idx)}
                      style={{ animationDelay: `${idx * 65}ms` }}
                      className={`w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-[12px] bg-white p-2 flex items-center justify-center transition-all duration-300 border animate-fade-up ${
                        isThumbActive
                          ? "border-[#4f46e5] shadow-md -translate-y-1"
                          : "border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#eaeaea] hover:-translate-y-0.5"
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`${current.name} item ${idx + 1}`}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-108"
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Collection Description */}
              <p
                key={`desc-${activeIdx}`}
                className="text-[14px] md:text-[15px] text-[#555555] leading-[1.55] max-w-[380px] mb-6 animate-fade-up"
              >
                {current.description}
              </p>

              {/* Dark Rounded Pill Button */}
              <Link
                href="/categories"
                className="btn-shine inline-flex items-center justify-center bg-[#141233] hover:bg-[#4f46e5] hover:-translate-y-0.5 active:scale-95 text-white text-[11.5px] font-semibold uppercase tracking-wider px-7 py-3 rounded-full shadow-md transition-all duration-300"
              >
                SHOP COLLECTION
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column: Compact 1:1 Uncropped Editorial Lifestyle Portrait (/assets/collection-1..3.jpg) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal animation="fade-left" delay={120} className="w-full max-w-[350px] md:max-w-[390px]">
              <div className="banner-shine w-full aspect-square rounded-[20px] overflow-hidden relative bg-white shadow-sm group">
                {COLLECTIONS.map((col, idx) => (
                  <img
                    key={col.id}
                    src={col.bannerImage}
                    alt={col.name}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out ${
                      idx === activeIdx
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
