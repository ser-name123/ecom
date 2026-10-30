"use client";

import React from "react";

interface MegaMenuProps {
  activeDropdown: string | null;
}

export default function MegaMenu({ activeDropdown }: MegaMenuProps) {
  if (!activeDropdown) return null;

  return (
    <>
      {/* =====================================================
          MEGA MENU 1: HOME (Quick Section & Concept Showcase)
          ===================================================== */}
      {activeDropdown === "Home" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-7 z-50 animate-fade-up">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#efefef]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f43777]">
                EXPLORE STORE SECTIONS
              </span>
              <h4 className="text-[18px] font-bold text-[#141233]">
                Nexova Flagship Tech Showcase
              </h4>
            </div>
            <a
              href="/#new-arrivals"
              className="btn-shine px-4 py-2 rounded-full bg-[#141233] hover:bg-[#f43777] text-white text-[11.5px] font-semibold uppercase tracking-wider transition-colors"
            >
              Explore All Sections →
            </a>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {[
              {
                title: "New Arrivals",
                sub: "Just Launched",
                badge: "NEW",
                badgeColor: "bg-[#686cff]",
                img: "/assets/laptop-9.jpg",
                href: "/#new-arrivals",
              },
              {
                title: "Flash Sale Off",
                sub: "Up to 50% Deal",
                badge: "HOT",
                badgeColor: "bg-[#f43777]",
                img: "/assets/watch-2.jpg",
                href: "/#sale-off",
              },
              {
                title: "Bundle & Save",
                sub: "Buy 3 Save 30%",
                badge: "-30%",
                badgeColor: "bg-[#10b981]",
                img: "/assets/audio-10.jpg",
                href: "/#bundle",
              },
              {
                title: "Featured Gear",
                sub: "Top Rated Picks",
                badge: "PRO",
                badgeColor: "bg-[#141233]",
                img: "/assets/game-1.jpg",
                href: "/#featured",
              },
              {
                title: "Collections",
                sub: "Editorial Lookbook",
                badge: "TREND",
                badgeColor: "bg-[#f43777]",
                img: "/assets/collection-1.jpg",
                href: "/#collections",
              },
              {
                title: "Tech Journal",
                sub: "Reviews & Guides",
                badge: "BLOG",
                badgeColor: "bg-[#686cff]",
                img: "/assets/blog-2.jpg",
                href: "/#all-blogs",
              },
            ].map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-[14px] border border-[#eaeaea] hover:border-[#f43777] bg-[#fafafa] hover:bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(244,55,119,0.1)] relative"
              >
                <span
                  className={`absolute top-2.5 left-2.5 z-10 ${card.badgeColor} text-white text-[9px] font-bold uppercase px-2 py-0.5 badge-leaf`}
                >
                  {card.badge}
                </span>
                <div className="w-full h-[110px] rounded-[10px] bg-white overflow-hidden flex items-center justify-center mb-2.5 p-2">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <div className="text-[13.5px] font-bold text-[#141233] group-hover:text-[#f43777] transition-colors">
                  {card.title}
                </div>
                <div className="text-[11.5px] text-[#777777]">{card.sub}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          MEGA MENU 2: SHOP (Categories + Layouts + Promo Card)
          ===================================================== */}
      {activeDropdown === "Shop" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-8 z-50 grid grid-cols-12 gap-7 animate-fade-up">
          {/* Left 3 Cols: Highlighted Collection Pills with Icons & Counts */}
          <div className="col-span-3 space-y-2.5 border-r border-[#f0f0f0] pr-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#f43777] mb-2">
              TOP DEPARTMENTS
            </div>
            {[
              { name: "Laptop & Tablet", icon: "/assets/laptop.svg", count: "42" },
              { name: "Computer & PC", icon: "/assets/computer.svg", count: "38" },
              { name: "Smartphones 5G", icon: "/assets/smartphone.svg", count: "29" },
              { name: "Smartwatches", icon: "/assets/watch.svg", count: "19" },
              { name: "Pro Headphones", icon: "/assets/headphone.svg", count: "34" },
            ].map((c) => (
              <a
                key={c.name}
                href="#collection"
                className="group/cat flex items-center justify-between px-3.5 py-2.5 rounded-[12px] bg-[#f7f7f7] hover:bg-[#f43777] text-[#1c1c1c] hover:text-white text-[13.5px] font-semibold transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={c.icon}
                    alt={c.name}
                    className="w-[18px] h-[18px] object-contain group-hover/cat:invert group-hover/cat:brightness-0 transition-all"
                  />
                  <span>{c.name}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/80 text-[#222222] font-bold">
                  {c.count}
                </span>
              </a>
            ))}
          </div>

          {/* Center 6 Cols: 3 Columns of Collection Pages with Badges */}
          <div className="col-span-6 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Shop Layouts
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Collection Left Sidebar", badge: "HOT" },
                  { label: "Collection Right Sidebar" },
                  { label: "Collection Top Filter" },
                  { label: "Collection Without Sidebar" },
                  { label: "Flash Deals Grid", badge: "SALE" },
                  { label: "Shop All Categories" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#shop"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#f43777] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Filter & Canvas
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Canvas Filter on Left", badge: "NEW" },
                  { label: "Canvas Filter on Top" },
                  { label: "Canvas Filter on Bottom" },
                  { label: "Full-Width 5 Columns", badge: "PRO" },
                  { label: "Masonry Lookbook Grid" },
                  { label: "Compare Products View" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#shop"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#686cff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Pagination & Features
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Numbered Pagination" },
                  { label: "AJAX Load More Button" },
                  { label: "Infinity Scroll Load", badge: "HOT" },
                  { label: "Bundle Builder 30% Off", badge: "-30%" },
                  { label: "Live Stock Progress Bar" },
                  { label: "Express Quick-Add Shop" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#shop"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#10b981] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 3 Cols: Visual Promo Banner inside Shop Mega Menu */}
          <div className="col-span-3 pl-2">
            <div
              style={{ backgroundColor: "#54BAA2" }}
              className="banner-shine relative rounded-[16px] overflow-hidden h-full min-h-[235px] flex items-center p-6 text-white group"
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
                className="absolute right-0 top-0 h-full w-auto max-w-none object-contain object-right group-hover:-translate-x-1 transition-transform duration-500"
              />
              <div className="relative z-10 max-w-[65%]">
                <span className="inline-block bg-[#f43777] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 badge-leaf mb-2">
                  UP TO 50% OFF
                </span>
                <h5 className="text-[20px] font-extrabold leading-tight mb-1.5">
                  Headphones
                  <br />
                  Wireless
                </h5>
                <p className="text-[11.5px] text-white/90 mb-4">
                  Starting at $100
                </p>
                <a
                  href="#headphones"
                  className="btn-shine inline-flex px-4 py-2 rounded-full bg-[#141233] hover:bg-[#f43777] text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MEGA MENU 3: PRODUCT (Layouts + 3D/AR + Featured Pick)
          ===================================================== */}
      {activeDropdown === "Product" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-8 z-50 grid grid-cols-12 gap-8 animate-fade-up">
          <div className="col-span-9 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Product Detail Layouts
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Product Detail Default", badge: "HOT" },
                  { label: "Product Thumb Left v1" },
                  { label: "Product Thumb Left v2" },
                  { label: "Product Thumb Right" },
                  { label: "Product Deals Countdown", badge: "SALE" },
                  { label: "Product Tab Accordion v1" },
                  { label: "Product Tab Accordion v2" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#product"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#f43777] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Gallery & Media Styles
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Product Thumb Grid v1" },
                  { label: "Product Thumb Grid v2" },
                  { label: "Product Image Grid" },
                  { label: "Product Sticky Image Scroll" },
                  { label: "Product Carousel Slider v1" },
                  { label: "Product Carousel Slider v2" },
                  { label: "Interactive 3D & AR Models", badge: "3D/AR" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#product"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#686cff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Conversion Features
              </h4>
              <ul className="space-y-2.5 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Product Studio Video", badge: "VIDEO" },
                  { label: "Product Pre-Order Mode", badge: "NEW" },
                  { label: "Variant Dropdown Style" },
                  { label: "Variant Visual Image Swatch", badge: "HOT" },
                  { label: "Variant Color & Pattern" },
                  { label: "Sticky Bar Add To Cart" },
                  { label: "Frequently Bought Together" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#product"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#141233] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 3 Cols: Featured Product Card */}
          <div className="col-span-3 border-l border-[#f0f0f0] pl-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[15px] font-bold text-[#141233]">Featured Deal</h4>
              <span className="bg-[#f43777] text-white text-[10px] font-bold px-2 py-0.5 badge-leaf">
                -17%
              </span>
            </div>
            <a
              href="#featured"
              className="block group rounded-[16px] border border-[#eaeaea] hover:border-[#f43777] bg-[#fafafa] hover:bg-white p-3.5 hover:shadow-[0_14px_30px_rgba(244,55,119,0.1)] transition-all"
            >
              <div className="aspect-square w-full overflow-hidden rounded-[12px] bg-white p-3 mb-3 flex items-center justify-center">
                <img
                  src="/assets/computer-4.jpg"
                  alt="Angular Tempered Glass PC Case"
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="text-[13.5px] font-bold text-[#141233] group-hover:text-[#f43777] line-clamp-1 mb-1.5">
                Angular Tempered Glass PC Case
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-[16px] font-extrabold text-[#f43777]">$91.00</span>
                  <span className="text-[12.5px] text-[#999999] line-through">$110.00</span>
                </div>
                <span className="text-[11px] font-bold uppercase text-white bg-[#141233] group-hover:bg-[#f43777] px-3 py-1 rounded-full transition-colors">
                  Buy
                </span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* =====================================================
          MEGA MENU 4: PAGES (Store Pages + Editorial Banner)
          ===================================================== */}
      {activeDropdown === "Pages" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-8 z-50 grid grid-cols-12 gap-8 animate-fade-up">
          <div className="col-span-3 space-y-2.5 border-r border-[#f0f0f0] pr-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#f43777] mb-2">
              QUICK CATEGORIES
            </div>
            {["4K Cameras", "Video Games", "Smart Electronics", "Mechanical Keyboards", "Pro Laptops"].map((c) => (
              <a
                key={c}
                href="#collection"
                className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-[#f7f7f7] hover:bg-[#f43777] text-[#1c1c1c] hover:text-white text-[13.5px] font-semibold transition-all"
              >
                <span>{c}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
          </div>

          <div className="col-span-5 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Store & Company
              </h4>
              <ul className="space-y-3 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "About Nexova Story", badge: "NEW" },
                  { label: "Contact Support 24/7" },
                  { label: "Interactive Store Direction" },
                  { label: "Global Store Locations", badge: "6 CITIES" },
                  { label: "Careers & Press Kit" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#page"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#686cff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Customer Care
              </h4>
              <ul className="space-y-3 text-[13.5px] font-normal text-[#555555]">
                {[
                  { label: "Help Center & FAQs", badge: "HOT" },
                  { label: "My Saved Wishlist" },
                  { label: "Track Express Order" },
                  { label: "30-Day Money Guarantee" },
                  { label: "Coming Soon Launchpad" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href="#page"
                      className="flex items-center justify-between hover:text-[#f43777] hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{l.label}</span>
                      {l.badge && (
                        <span className="bg-[#f43777] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-4">
            <a
              href="#collections"
              className="banner-shine block rounded-[16px] overflow-hidden group h-full relative"
            >
              <img
                src="/assets/blog-detail-2-2.jpg"
                alt="Featured Collection"
                className="w-full h-[225px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141233]/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff73a3]">
                  EDITORIAL LOOKBOOK
                </span>
                <div className="text-[17px] font-bold leading-snug">
                  Next-Gen Audio & Smart Wearables
                </div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* =====================================================
          MEGA MENU 5: BLOGS (Layouts + Tags + Featured Articles)
          ===================================================== */}
      {activeDropdown === "Blogs" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-8 z-50 grid grid-cols-12 gap-8 animate-fade-up">
          <div className="col-span-7 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Blog Layouts
              </h4>
              <ul className="space-y-3 text-[13.5px] font-normal text-[#555555]">
                {["Blog Editorial Grid", "Blog Classic List", "Blog 3-Column Masonry", "Blog Split Cards"].map((l) => (
                  <li key={l}>
                    <a href="#all-blogs" className="hover:text-[#f43777] hover:translate-x-1 transition-all block">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Sidebar & Single
              </h4>
              <ul className="space-y-3 text-[13.5px] font-normal text-[#555555]">
                {["Article Left Sidebar", "Article Right Sidebar", "Full-Width Longread", "Video Review Post"].map((l) => (
                  <li key={l}>
                    <a href="#all-blogs" className="hover:text-[#f43777] hover:translate-x-1 transition-all block">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-[#141233] mb-3.5 pb-2 border-b border-[#f3f3f3]">
                Trending Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "#SpatialAudio",
                  "#VRGaming",
                  "#Smartwatch",
                  "#8KCamera",
                  "#MacBookM3",
                  "#Mechanical",
                  "#SmartHome",
                ].map((tag) => (
                  <a
                    key={tag}
                    href="#all-blogs"
                    className="px-2.5 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#f43777] text-[#333333] hover:text-white text-[11.5px] font-medium transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-5 border-l border-[#f0f0f0] pl-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[15px] font-bold text-[#141233]">Latest Tech Stories</h4>
              <a href="#all-blogs" className="text-[12px] font-semibold text-[#f43777] hover:underline">
                View all →
              </a>
            </div>
            {[
              {
                title: "Noise-Cancelling Headphones for Every Journey",
                tag: "AUDIO REVIEW",
                img: "/assets/blog-1_c9731c10-c6dd-4c32-bb0f-1600b7e315b0.jpg",
              },
              {
                title: "Style Meets Sound: Chic White Headphones for City Rides",
                tag: "LIFESTYLE",
                img: "/assets/blog-2.jpg",
              },
              {
                title: "Smartwatches: Manage Your Life Right From Your Wrist",
                tag: "WEARABLES",
                img: "/assets/blog-3.jpg",
              },
            ].map((b) => (
              <a
                key={b.title}
                href="#all-blogs"
                className="flex items-center gap-3.5 group p-1.5 rounded-[12px] hover:bg-[#fafafa] transition-colors"
              >
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-[82px] h-[58px] rounded-[10px] object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#f43777]">
                    {b.tag} • JULY 17, 2026
                  </span>
                  <div className="text-[13px] font-bold text-[#141233] group-hover:text-[#f43777] line-clamp-1 leading-snug mt-0.5">
                    {b.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          MEGA MENU 6: SPECIAL OFFER! (Flash Deals + Bundle 30%)
          ===================================================== */}
      {activeDropdown === "SpecialOffer" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-[1360px] bg-white text-[#1c1c1c] rounded-[20px] shadow-[0_28px_65px_rgba(12,11,34,0.22)] border border-[#eaeaea] p-7 z-50 grid grid-cols-12 gap-6 animate-fade-up">
          {/* Left 8 Cols: 4 Live Flash Deal Product Cards */}
          <div className="col-span-8">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#efefef]">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#f43777] text-white text-[10px] font-bold uppercase px-2.5 py-1 badge-leaf">
                  LIMITED TIME
                </span>
                <h4 className="text-[17px] font-bold text-[#141233]">
                  Today’s Flash Sale Deals
                </h4>
              </div>
              <a
                href="#sale-off"
                className="text-[12.5px] font-bold text-[#f43777] hover:underline"
              >
                View All Flash Deals →
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  title: "Smartwatch Sport Edition Pro",
                  price: 385.0,
                  oldPrice: 480.0,
                  discount: "-20%",
                  img: "/assets/watch-2.jpg",
                },
                {
                  title: "Waterproof Portable Speaker",
                  price: 70.0,
                  oldPrice: 90.0,
                  discount: "-22%",
                  img: "/assets/audio-3.jpg",
                },
                {
                  title: "15-inch Slim Metal Laptop",
                  price: 215.0,
                  oldPrice: 250.0,
                  discount: "-14%",
                  img: "/assets/laptop-9.jpg",
                },
                {
                  title: "Wireless Over-Ear Headphones",
                  price: 265.0,
                  oldPrice: 320.0,
                  discount: "-17%",
                  img: "/assets/audio-8.jpg",
                },
              ].map((deal) => (
                <a
                  key={deal.title}
                  href="#sale-off"
                  className="group rounded-[14px] border border-[#eaeaea] hover:border-[#f43777] bg-[#fafafa] hover:bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(244,55,119,0.1)] relative"
                >
                  <span className="absolute top-2.5 left-2.5 z-10 bg-[#f43777] text-white text-[9.5px] font-bold px-2 py-0.5 badge-leaf">
                    {deal.discount}
                  </span>
                  <div className="w-full h-[115px] rounded-[10px] bg-white p-2 flex items-center justify-center mb-2.5 overflow-hidden">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[12.5px] font-bold text-[#141233] group-hover:text-[#f43777] line-clamp-1 mb-1">
                    {deal.title}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[14.5px] font-extrabold text-[#f43777]">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="text-[11.5px] text-[#999999] line-through">
                      ${deal.oldPrice.toFixed(2)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Bundle & Save 30% Callout Banner */}
          <div className="col-span-4">
            <div
              className="h-full rounded-[18px] p-6 text-white flex flex-col justify-between relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #141233 0%, #251f5e 55%, #f43777 100%)",
              }}
            >
              <div>
                <span className="inline-block bg-white/15 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  EXCLUSIVE BUNDLE DEAL
                </span>
                <h4 className="text-[22px] font-extrabold leading-tight mb-2">
                  Buy Any 3 Products & Save 30% Instantly
                </h4>
                <p className="text-[13px] text-white/80 leading-relaxed mb-5">
                  Mix and match headphones, smartwatches, mice, or cameras to unlock 30% off your entire bundle.
                </p>
              </div>

              <a
                href="#bundle"
                className="btn-shine inline-flex items-center justify-center w-full py-3 rounded-full bg-white text-[#141233] hover:bg-[#f43777] hover:text-white text-[12px] font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                Build Your Bundle →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

