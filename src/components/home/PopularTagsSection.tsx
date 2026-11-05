import React from "react";

const POPULAR_TAGS = [
  "Camera 360",
  "Laptop Gaming",
  "Macbok Pro",
  "Galaxy Tab S10",
  "Huawei",
  "Apple Watch",
  "Robot Cleaner",
  "Laptop Lenovo",
  "Beat Solo Buds",
  "Headphone",
  "iPhone 17 Pro Max",
];

export default function PopularTagsSection() {
  const marqueeTags = [...POPULAR_TAGS, ...POPULAR_TAGS];

  return (
    <section className="w-full bg-[#f7f7f7] py-[24px] overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 overflow-hidden">
        <div className="flex items-center gap-[10px] w-max animate-marquee py-1">
          {marqueeTags.map((tag, idx) => (
            <a
              key={`${tag}-${idx}`}
              href={`/shop?q=${encodeURIComponent(tag)}`}
              className="bg-white hover:bg-[#4f46e5] text-[#000000] hover:text-white hover:-translate-y-0.5 text-[14px] font-normal px-[19px] py-[9px] rounded-[20px] shadow-[0_5px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_18px_rgba(79,70,229,0.22)] transition-all duration-300 whitespace-nowrap"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
