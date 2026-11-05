"use client";

import React from "react";
import CarouselTrack from "@/components/ui/CarouselTrack";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "mobile-tablet", name: "Mobile & Tablet", image: "/assets/cate-1.jpg", href: "/categories/mobile" },
  { id: "camera", name: "Camera", image: "/assets/cate-2.jpg", href: "/categories/camera" },
  { id: "laptop", name: "Laptop", image: "/assets/cate-3.jpg", href: "/categories/laptop" },
  { id: "headphone", name: "Headphone", image: "/assets/cate-4.jpg", href: "/categories/headphone" },
  { id: "keyboard", name: "Keyboard", image: "/assets/cate-5.jpg", href: "/categories/keyboard" },
  { id: "game", name: "Game", image: "/assets/cate-6.jpg", href: "/categories/game" },
  { id: "electronics", name: "Electronics", image: "/assets/cate-7.jpg", href: "/categories/accessories" },
  { id: "computer", name: "Computer", image: "/assets/cate-8.jpg", href: "/categories/computer" },
];

export default function CategorySlider() {
  return (
    <section className="w-full bg-[#f7f7f7] pt-[8px] sm:pt-[10px] pb-[6px] sm:pb-[8px]">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-4 md:px-8">
        <CarouselTrack
          items={CATEGORIES}
          keyExtractor={(item) => item.id}
          visibleCount={{ xs: 3, sm: 4, md: 5, lg: 7, xl: 7 }}
          gap={10}
          autoPlayMs={4200}
          arrowPositionClass="top-[37%] -translate-y-1/2"
          renderItem={(cat) => (
            <a
              href={cat.href}
              draggable={false}
              className="group flex flex-col items-center"
            >
              <div className="w-full h-[68px] sm:h-[80px] md:h-[88px] bg-white rounded-[12px] sm:rounded-[14px] p-2 sm:p-2.5 flex items-center justify-center overflow-hidden transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  draggable={false}
                  className="max-h-[48px] sm:max-h-[58px] md:max-h-[64px] w-auto object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                />
              </div>
              <span className="mt-1 sm:mt-1.5 text-[11.5px] sm:text-[13px] font-semibold text-[#1c1c1c] group-hover:text-[#4f46e5] transition-colors duration-300 text-center leading-tight line-clamp-1">
                {cat.name}
              </span>
            </a>
          )}
        />
      </div>
    </section>
  );
}
