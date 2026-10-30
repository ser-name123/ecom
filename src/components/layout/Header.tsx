"use client";

import React, { useState, useEffect, useRef } from "react";
import MegaMenu from "@/components/layout/MegaMenu";
import CartDrawer from "@/components/layout/CartDrawer";

const SEARCH_CATEGORIES = [
  "All Categories",
  "Accesories",
  "Bestsellers",
  "Camera",
  "Computer",
  "Electronics",
  "Flash Deals",
  "Game",
  "Headphone",
  "Keyboard",
  "Laptop",
  "Mobile & Tablet",
  "New Arrivals",
  "Smartwatch",
  "Upsell",
];

const POPULAR_SEARCHES = [
  "Camera",
  "Laptop",
  "Headphone",
  "Keyboard",
  "Game",
  "Electronics",
  "Mobile & Tablet",
  "Glow",
];

const NAV_ITEMS = [
  { id: "Home", label: "Home", href: "/" },
  { id: "Shop", label: "Shop", href: "#shop" },
  { id: "Product", label: "Product", href: "#product" },
  { id: "Pages", label: "Pages", href: "#pages" },
  { id: "Blogs", label: "Blogs", href: "#blogs" },
];

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [stickyDropdown, setStickyDropdown] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const openMobileDrawer = (tab: "categories" | "menu") => {
    window.dispatchEvent(
      new CustomEvent("nexova:open-mobile-drawer", { detail: { tab } })
    );
  };

  useEffect(() => {
    const handleOpenCart = () => setCartDrawerOpen(true);
    window.addEventListener("nexova:open-cart", handleOpenCart);
    return () => window.removeEventListener("nexova:open-cart", handleOpenCart);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 190;
      setIsSticky(scrolled);
      if (!scrolled) setStickyDropdown(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="w-full text-white relative z-40 select-none"
        style={{
          background: "linear-gradient(0deg, rgba(12, 11, 34, 1), rgba(34, 32, 81, 1) 100%)",
        }}
      >
        {/* 1. Top Announcement Bar (#00000033) — Responsive Mobile Ticker + Desktop 3-Col Bar */}
        <div className="w-full bg-[#00000033] text-[12.5px]">
          <div className="max-w-[1720px] mx-auto px-3 sm:px-4 md:px-8 h-[30px] md:h-[34px] flex md:grid md:grid-cols-12 items-center justify-between">
            {/* Left Links (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 items-center gap-6 text-white/90 text-[13px] font-normal">
              <a href="#help-center" className="hover:text-[#f43777] transition-colors duration-200">
                Help Center
              </a>
              <a href="#find-store" className="hover:text-[#f43777] transition-colors duration-200">
                Find a Store
              </a>
              <a href="#track-orders" className="hover:text-[#f43777] transition-colors duration-200">
                Track Oders
              </a>
            </div>

            {/* Center Promo Message (Visible on All Screens) */}
            <div className="md:col-span-8 lg:col-span-4 flex items-center justify-center md:justify-start lg:justify-center gap-2 truncate">
              <span
                className="font-semibold uppercase leading-none animate-pulse-glow shrink-0"
                style={{
                  backgroundColor: "#f0457a",
                  fontSize: "10px",
                  color: "#ffffff",
                  padding: "3.5px 8px",
                  borderRadius: "10px",
                }}
              >
                HOT
              </span>
              <span className="text-[11.5px] sm:text-[13px] md:text-[14px] font-normal text-white truncate">
                Free Express Shipping on orders $500!
              </span>
            </div>

            {/* Right Links */}
            <div className="md:col-span-4 flex items-center justify-end gap-4 lg:gap-6 text-white/90 text-[11.5px] md:text-[13px] font-normal shrink-0">
              <a href="#sale-off" className="text-[#ff6097] md:text-white/90 font-semibold md:font-normal hover:text-[#f43777] transition-colors duration-200">
                Daily Deals
              </a>
              <a href="#gift-cards" className="hidden sm:inline hover:text-[#f43777] transition-colors duration-200">
                Gift Cards
              </a>
              <a href="#contact-us" className="hidden md:inline hover:text-[#f43777] transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* 2. Middle Header Content (Mobile Menu Triggers + Logo + Search Bar + Account/Wishlist/Cart) */}
        <div className="max-w-[1720px] mx-auto px-3 sm:px-4 md:px-8 pt-[10px] md:pt-[14px] pb-[8px] md:pb-[6px]">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
            {/* Left Column: Mobile Hamburger/Categories + Brand Logo */}
            <div className="col-span-7 sm:col-span-6 md:col-span-3 flex items-center gap-2 sm:gap-2.5">
              {/* Mobile/Tablet Hamburger Button -> Opens Main Menu Drawer */}
              <button
                type="button"
                onClick={() => openMobileDrawer("menu")}
                aria-label="Open Navigation Menu"
                className="lg:hidden w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-[#f43777] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              {/* Mobile/Tablet Categories Button -> Opens 9-Category Mega Drawer */}
              <button
                type="button"
                onClick={() => openMobileDrawer("categories")}
                aria-label="Shop by Categories"
                className="lg:hidden w-[36px] h-[36px] rounded-full bg-[#f43777] hover:bg-[#e02d6b] text-white flex items-center justify-center shrink-0 shadow-[0_3px_12px_rgba(244,55,119,0.4)] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </button>

              <a href="/" className="inline-flex items-center group min-w-0">
                <img
                  src="/assets/logo-new.svg"
                  alt="Nexova"
                  width={205}
                  height={38}
                  className="h-[26px] sm:h-[30px] lg:h-[36px] w-auto object-contain transition-transform duration-300 group-hover:scale-103"
                />
              </a>
            </div>

            {/* Center Column (6 cols): Pill Search Bar */}
            <div className="hidden md:flex md:col-span-6 items-center justify-center relative">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-[760px] relative"
              >
                <div className="w-full h-[42px] bg-white rounded-full flex items-center pl-5 pr-1 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                  {/* All Categories Selector */}
                  <div className="relative shrink-0 pr-3 mr-2">
                    <button
                      type="button"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className="flex items-center gap-2 text-[14px] font-medium text-[#000000] hover:text-[#f43777] transition-colors cursor-pointer"
                    >
                      <span className="max-w-[115px] truncate">{selectedCategory}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Category Dropdown List */}
                    {categoryOpen && (
                      <div className="absolute left-0 top-[38px] w-[200px] max-h-[280px] overflow-y-auto custom-scrollbar bg-white text-[#222222] rounded-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.16)] border border-[#eaeaea] py-2 z-50">
                        {SEARCH_CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCategoryOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f7f7f7] hover:text-[#f43777] transition-colors cursor-pointer ${
                              selectedCategory === cat ? "text-[#f43777] font-semibold" : "text-[#333333] font-normal"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-[22px] w-[1px] bg-[#e2e2e2] mr-3 shrink-0" />

                  {/* Search Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="flex-1 bg-transparent text-[#222222] placeholder-[#777777] text-[14px] focus:outline-none pr-2"
                  />

                  {/* Voice Search Microphone Icon */}
                  <button
                    type="button"
                    aria-label="Voice Search"
                    className="w-[34px] h-[34px] flex items-center justify-center text-[#333333] hover:text-[#f43777] transition-colors mr-1 shrink-0 cursor-pointer"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97zm6.08-3h-1.7c0 3.01-2.54 5.1-5.38 5.1s-5.38-2.09-5.38-5.1h-1.7c0 3.41 2.72 6.23 6.08 6.72v3.28h2v-3.28c3.36-.49 6.08-3.31 6.08-6.72z" />
                    </svg>
                  </button>

                  {/* Pink Pill Search Submit Button */}
                  <button
                    type="submit"
                    className="btn-shine h-[38px] px-6 rounded-full bg-[#f43777] hover:bg-[#db316b] text-white text-[12px] font-semibold uppercase tracking-wide flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="20" y1="20" x2="16" y2="16" strokeLinecap="round" />
                    </svg>
                    <span>SEARCH</span>
                  </button>
                </div>

                {/* Popular Searches Dropdown when Input Focused */}
                {searchFocused && (
                  <div className="absolute left-0 right-0 top-[54px] bg-white text-[#1c1c1c] rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-[#eaeaea] p-5 z-50 animate-fade-up">
                    <div className="text-[12px] font-bold uppercase tracking-wider text-[#888888] mb-3">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            setSearchFocused(false);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-[#f5f5f5] hover:bg-[#f43777] text-[#333333] hover:text-white text-[13px] font-medium transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: User Icon + Wishlist Icon + Cart Pill Button */}
            <div className="col-span-5 sm:col-span-6 md:col-span-3 flex items-center justify-end gap-2.5 sm:gap-4 md:gap-5">
              {/* Account Icon */}
              <button
                type="button"
                title="Account"
                className="text-white hover:text-[#f43777] transition-colors cursor-pointer p-1"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Wishlist Icon with Top-Right Pink Badge */}
              <a
                href="#wishlist"
                title="Wishlist"
                className="relative text-white hover:text-[#f43777] transition-colors p-1"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="absolute -top-0.5 -right-1 w-[17px] h-[17px] rounded-full bg-[#f43777] text-white text-[9.5px] font-bold flex items-center justify-center leading-none">
                  0
                </span>
              </a>

              {/* Cart Pill Button */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="h-[36px] sm:h-[40px] md:h-[42px] pl-3 sm:pl-4 pr-1.5 sm:pr-2 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] flex items-center gap-2 sm:gap-3.5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="hidden sm:inline text-[13.5px] md:text-[14px] font-normal text-white">
                    Cart
                  </span>
                </div>
                <span className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full bg-[#f43777] text-white text-[10.5px] sm:text-[11px] font-bold flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Row (< md) with Popular Searches Dropdown */}
          <div className="md:hidden mt-2.5 relative">
            <form onSubmit={(e) => e.preventDefault()} className="w-full relative">
              <div className="w-full h-[38px] bg-white rounded-full flex items-center pl-3.5 pr-1 shadow-[0_4px_16px_rgba(0,0,0,0.14)]">
                <button
                  type="button"
                  onClick={() => openMobileDrawer("categories")}
                  className="flex items-center gap-1 text-[11.5px] font-bold text-[#141233] pr-2.5 mr-2 border-r border-[#e2e2e2] shrink-0 cursor-pointer"
                >
                  <span>All</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search laptops, watches, audio..."
                  className="flex-1 min-w-0 bg-transparent text-[#222222] placeholder-[#777777] text-[13px] focus:outline-none pr-1.5"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="btn-shine h-[32px] px-3.5 rounded-full bg-[#f43777] text-white text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="20" y1="20" x2="16" y2="16" strokeLinecap="round" />
                  </svg>
                  <span className="hidden xs:inline">Search</span>
                </button>
              </div>

              {/* Mobile Popular Searches Dropdown */}
              {searchFocused && (
                <div className="absolute left-0 right-0 top-[44px] bg-white text-[#1c1c1c] rounded-[14px] shadow-[0_18px_40px_rgba(0,0,0,0.22)] border border-[#eaeaea] p-3.5 z-50 animate-fade-up">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">
                      Popular Searches
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchFocused(false)}
                      className="text-[11px] text-[#f43777] font-semibold"
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCHES.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setSearchFocused(false);
                        }}
                        className="px-3 py-1 rounded-full bg-[#f5f5f5] hover:bg-[#f43777] text-[#333333] hover:text-white text-[12px] font-medium transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Mobile & Tablet Horizontal Quick-Access Chip Bar (< lg) */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 pb-1">
            <button
              type="button"
              onClick={() => openMobileDrawer("categories")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f43777] text-white text-[11.5px] font-bold whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>All Categories</span>
            </button>
            <a
              href="#bundle"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[11.5px] font-semibold whitespace-nowrap shrink-0"
            >
              <span className="text-[#ff6097] font-bold">⚡ Save 30%</span>
              <span>Bundle</span>
            </a>
            <a
              href="#sale-off"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-[#ff6097] text-[11.5px] font-bold whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f43777] animate-pulse" />
              <span>Special Offer!</span>
            </a>
            <a
              href="#new-arrivals"
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 hover:bg-white/15 text-white/90 text-[11.5px] font-medium whitespace-nowrap shrink-0"
            >
              New Arrivals
            </a>
            <a
              href="#featured"
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 hover:bg-white/15 text-white/90 text-[11.5px] font-medium whitespace-nowrap shrink-0"
            >
              Featured
            </a>
            <a
              href="#collections"
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 hover:bg-white/15 text-white/90 text-[11.5px] font-medium whitespace-nowrap shrink-0"
            >
              Collections
            </a>
            <a
              href="#all-blogs"
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 hover:bg-white/15 text-white/90 text-[11.5px] font-medium whitespace-nowrap shrink-0"
            >
              Blogs
            </a>
          </div>
        </div>

        {/* 3. Full 12-Column Bottom Navigation Row (Desktop lg+ MegaMenu Nav) */}
        <div
          className="hidden lg:block w-full pb-[10px] pt-[2px]"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-[1720px] mx-auto px-4 md:px-8 grid grid-cols-12 items-center relative">
            {/* Left Column (3 cols, aligned under Logo): Bundle & Flash Coupon Pill */}
            <div
              className="col-span-3 flex items-center"
              onMouseEnter={() => setActiveDropdown(null)}
            >
              <a
                href="#bundle"
                className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#f43777]/50 transition-all duration-300"
              >
                <span className="w-[22px] h-[22px] rounded-full bg-[#f43777] text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(244,55,119,0.5)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <span className="text-[12.5px] text-white/90 font-normal whitespace-nowrap">
                  Bundle Deal:{" "}
                  <strong className="text-[#ff6097] group-hover:text-white font-semibold transition-colors">
                    Buy 3 Save 30%
                  </strong>
                </span>
              </a>
            </div>

            {/* Center Column (6 cols, aligned under Search Bar): Main Navigation Links */}
            <nav className="col-span-6 flex items-center justify-center gap-7 lg:gap-8 text-[14px] font-semibold">
              {NAV_ITEMS.map((navItem) => {
                const isOpen = activeDropdown === navItem.id;
                return (
                  <div
                    key={navItem.id}
                    className="py-2"
                    onMouseEnter={() => setActiveDropdown(navItem.id)}
                  >
                    <a
                      href={navItem.href}
                      className={`nav-link-underline flex items-center gap-1.5 transition-colors ${
                        isOpen ? "text-[#f43777]" : "text-white hover:text-[#f43777]"
                      }`}
                    >
                      <span>{navItem.label}</span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#f43777]" : ""
                        }`}
                      >
                        <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                      </svg>
                    </a>
                  </div>
                );
              })}

              {/* Special Offer! Flash Deals Mega Menu Trigger */}
              <div
                className="py-2"
                onMouseEnter={() => setActiveDropdown("SpecialOffer")}
              >
                <a
                  href="#special-offer"
                  className="nav-link-underline flex items-center gap-1.5 text-[#f43777] hover:text-[#ff6097] transition-colors font-semibold"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-[#f43777] animate-pulse-glow" />
                  <span>Special Offer!</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    className={`transition-transform duration-300 ${
                      activeDropdown === "SpecialOffer" ? "rotate-180" : ""
                    }`}
                  >
                    <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                  </svg>
                </a>
              </div>
            </nav>

            {/* Right Column (3 cols, aligned under Cart/Icons): 24/7 Support Hotline Pill */}
            <div
              className="col-span-3 flex items-center justify-end"
              onMouseEnter={() => setActiveDropdown(null)}
            >
              <a
                href="tel:1888456789"
                className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#f43777]/50 transition-all duration-300"
              >
                <span className="w-[22px] h-[22px] rounded-full bg-white/10 group-hover:bg-[#f43777] text-[#f43777] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-[12.5px] text-white/90 font-normal whitespace-nowrap">
                  24/7 Support:{" "}
                  <strong className="text-[#ff6097] group-hover:text-white font-semibold transition-colors">
                    1-888-456-789
                  </strong>
                </span>
              </a>
            </div>

            {/* Separated Main Navigation MegaMenu Component */}
            <MegaMenu activeDropdown={activeDropdown} />
          </div>
        </div>
      </header>

      {/* 4. Sticky Compact Header on Scroll (Works on Mobile, Tablet & Desktop) */}
      <div
        onMouseLeave={() => setStickyDropdown(null)}
        className={`fixed top-0 left-0 lg:left-[60px] right-0 z-40 transition-all duration-300 ${
          isSticky
            ? "translate-y-0 opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(0deg, rgba(12, 11, 34, 0.98), rgba(34, 32, 81, 0.98) 100%)",
        }}
      >
        <div className="max-w-[1720px] mx-auto px-3 sm:px-4 md:px-8 h-[56px] md:h-[64px] grid grid-cols-12 items-center text-white relative">
          <div className="col-span-7 md:col-span-3 flex items-center gap-2">
            {/* Mobile Menu & Categories triggers inside Sticky Header */}
            <button
              type="button"
              onClick={() => openMobileDrawer("menu")}
              aria-label="Open Menu"
              className="lg:hidden w-[34px] h-[34px] rounded-full bg-white/10 hover:bg-[#f43777] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => openMobileDrawer("categories")}
              aria-label="Categories"
              className="lg:hidden w-[34px] h-[34px] rounded-full bg-[#f43777] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <a href="/" className="inline-flex items-center group">
              <img
                src="/assets/logo-new.svg"
                alt="Nexova"
                className="h-[25px] sm:h-[29px] md:h-[34px] w-auto object-contain transition-transform duration-300 group-hover:scale-103"
              />
            </a>
          </div>

          <nav className="hidden lg:col-span-6 lg:flex items-center justify-center gap-7 text-[14px] font-semibold h-full">
            {NAV_ITEMS.map((navItem) => {
              const isOpen = stickyDropdown === navItem.id;
              return (
                <div
                  key={navItem.id}
                  className="h-full flex items-center"
                  onMouseEnter={() => setStickyDropdown(navItem.id)}
                >
                  <a
                    href={navItem.href}
                    className={`nav-link-underline flex items-center gap-1 transition-colors ${
                      isOpen ? "text-[#f43777]" : "text-white hover:text-[#f43777]"
                    }`}
                  >
                    <span>{navItem.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#f43777]" : ""
                      }`}
                    >
                      <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                    </svg>
                  </a>
                </div>
              );
            })}
            <div
              className="h-full flex items-center"
              onMouseEnter={() => setStickyDropdown("SpecialOffer")}
            >
              <a
                href="#special-offer"
                className="nav-link-underline flex items-center gap-1.5 text-[#f43777] font-semibold"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f43777] animate-pulse-glow" />
                <span>Special Offer!</span>
              </a>
            </div>
          </nav>

          <div className="col-span-5 md:col-span-9 lg:col-span-3 flex items-center justify-end gap-3 sm:gap-5">
            <button
              type="button"
              className="text-white hover:text-[#f43777] transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <a href="#wishlist" className="relative text-white hover:text-[#f43777] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#f43777] text-white text-[9px] font-bold flex items-center justify-center">
                0
              </span>
            </a>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 sm:gap-3 bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 rounded-full pl-3 sm:pl-3.5 pr-1.5 sm:pr-2 py-1 sm:py-1.5 text-[13px] cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              <span className="w-[19px] h-[19px] sm:w-[20px] sm:h-[20px] rounded-full bg-[#f43777] text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Separated MegaMenu inside Sticky Header */}
          <MegaMenu activeDropdown={stickyDropdown} />
        </div>
      </div>

      {/* 5. Separated Slide-Over Cart Drawer Component */}
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}
