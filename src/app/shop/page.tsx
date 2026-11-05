"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import {
  PRODUCTS,
  CATEGORIES,
  OFFICIAL_BRANDS,
  getProductsByBrand,
  getBrandInfo,
  Product,
} from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

const BRANDS = [
  "All Brands",
  "Samsung",
  "Sony",
  "Apple",
  "Canon",
  "Dell",
  "ThinkPad",
  "Vivo",
  "Huawei",
  "HP",
  "Sharp",
  "Digital",
  "Corsair",
  "Keychron",
  "Logitech",
  "JBL",
  "Meta",
];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 99999 },
  { label: "Under $150", min: 0, max: 150 },
  { label: "$150 – $400", min: 150, max: 400 },
  { label: "$400 – $900", min: 400, max: 900 },
  { label: "$900+", min: 900, max: 99999 },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "All Brands";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [priceIdx, setPriceIdx] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const catParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const qParam = searchParams.get("q");
    if (catParam) setSelectedCategory(catParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (qParam !== null) setSearchQuery(qParam);
  }, [searchParams]);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const activeBrandInfo = selectedBrand !== "All Brands" ? getBrandInfo(selectedBrand) : undefined;

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES[priceIdx];
    const basePool =
      selectedBrand === "All Brands" ? PRODUCTS : getProductsByBrand(selectedBrand);
    return basePool
      .filter((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
        if (p.price < range.min || p.price > range.max) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.categoryLabel.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.soldCount - a.soldCount;
      });
  }, [selectedCategory, selectedBrand, priceIdx, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("All Brands");
    setPriceIdx(0);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="OFFICIAL NEXOVA CATALOG"
        title="Shop All Flagship"
        highlight="Tech & Gadgets"
        subtitle="Filter by department, brand, or specification. Every item ships factory-sealed with a 2-Year Nexova Care+ Warranty and 30-Day Money-Back Guarantee."
        breadcrumbs={[{ label: "Shop All Products" }]}
        rightStats={[
          { value: `${PRODUCTS.length}+`, label: "Flagship Models" },
          { value: "9", label: "Departments" },
          { value: "Free", label: "Shipping $500+" },
        ]}
      />

      {/* Horizontal Department Quick-Filter Bar */}
      <div className="border-b border-[#eceef5] bg-[#fafbfe]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#141233] text-white shadow-sm"
                : "bg-white border border-[#e2e4ec] text-[#333333] hover:border-[#4f46e5]"
            }`}
          >
            All Departments ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#4f46e5] text-white shadow-sm"
                  : "bg-white border border-[#e2e4ec] text-[#333333] hover:border-[#4f46e5]"
              }`}
            >
              <img
                src={cat.icon}
                alt={cat.shortName}
                className={`w-4 h-4 object-contain ${selectedCategory === cat.id ? "invert brightness-0" : ""}`}
              />
              <span>{cat.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Official Partner Brands Logo Bar */}
      <div id="brands" className="border-b border-[#eceef5] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#141233]">
              Shop by Official Brand Partner
            </span>
            {selectedBrand !== "All Brands" && (
              <button
                type="button"
                onClick={() => setSelectedBrand("All Brands")}
                className="text-[12px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
              >
                Show All Brands ✕
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {OFFICIAL_BRANDS.map((b) => {
              const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() =>
                    setSelectedBrand(isSelected ? "All Brands" : b.name)
                  }
                  className={`h-[68px] rounded-[12px] border p-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#4f46e5] bg-[#eef2ff] shadow-sm scale-[1.02]"
                      : "border-[#eaeaea] bg-white hover:border-[#4f46e5]/50"
                  }`}
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-[34px] w-auto object-contain"
                  />
                  <span
                    className={`mt-1 text-[10px] font-extrabold uppercase ${
                      isSelected ? "text-[#4f46e5]" : "text-[#777777]"
                    }`}
                  >
                    {b.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Catalog Layout: Sidebar Filters + Product Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 3 Cols: Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Search Within Shop */}
          <div className="p-5 rounded-[18px] border border-[#eaeaea] bg-[#fafbfe]">
            <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-2">
              Search Catalog
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, brand, feature..."
                className="w-full h-[40px] pl-3.5 pr-8 rounded-[10px] bg-white border border-[#dcdce5] text-[13px] focus:border-[#4f46e5] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#141233] text-[12px]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Price Tier Filter */}
          <div className="p-5 rounded-[18px] border border-[#eaeaea] bg-white">
            <h3 className="text-[14px] font-extrabold uppercase tracking-wider text-[#141233] mb-3 pb-2 border-b border-[#f0f0f0]">
              Price Range
            </h3>
            <div className="space-y-2">
              {PRICE_RANGES.map((r, idx) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setPriceIdx(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer ${
                    priceIdx === idx
                      ? "bg-[#eef2ff] text-[#4f46e5]"
                      : "text-[#555555] hover:bg-[#f7f7fa]"
                  }`}
                >
                  <span>{r.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      priceIdx === idx ? "border-[#4f46e5] bg-[#4f46e5] text-white" : "border-[#cccccc]"
                    }`}
                  >
                    {priceIdx === idx && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="p-5 rounded-[18px] border border-[#eaeaea] bg-white">
            <h3 className="text-[14px] font-extrabold uppercase tracking-wider text-[#141233] mb-3 pb-2 border-b border-[#f0f0f0]">
              Official Brands
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors cursor-pointer ${
                    selectedBrand === b
                      ? "bg-[#141233] text-white"
                      : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Bundle Promo Card inside Sidebar */}
          <div
            className="rounded-[20px] p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #141233 0%, #312e81 60%, #4f46e5 100%)",
            }}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider mb-2">
              BUNDLE & SAVE 30%
            </span>
            <h4 className="text-[18px] font-extrabold leading-snug mb-2">
              Use Code <span className="text-[#38bdf8]">NEXOVA30</span> at Cart
            </h4>
            <p className="text-[12.5px] text-white/80 leading-relaxed mb-4">
              Mix any 3 accessories, headphones, or wearables to unlock 30% off instantly.
            </p>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center w-full py-2.5 rounded-full bg-white text-[#141233] text-[12px] font-extrabold uppercase tracking-wider hover:bg-[#38bdf8] hover:text-white transition-colors"
            >
              Go to Shopping Cart →
            </Link>
          </div>
        </aside>

        {/* Right 9 Cols: Toolbar + Product Cards */}
        <div className="lg:col-span-9">
          {/* Active Brand Spotlight Banner */}
          {selectedBrand !== "All Brands" && (
            <div className="mb-6 rounded-[20px] border border-[#4f46e5]/25 bg-[#f8f9fc] p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {activeBrandInfo && (
                  <div className="w-[74px] h-[54px] rounded-[12px] bg-white border border-[#eaeaea] p-2 flex items-center justify-center shrink-0">
                    <img
                      src={activeBrandInfo.logo}
                      alt={activeBrandInfo.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                    OFFICIAL {selectedBrand.toUpperCase()} STOREFRONT
                  </span>
                  <h2 className="text-[20px] font-extrabold text-[#141233]">
                    {selectedBrand} Flagship Products ({filteredProducts.length})
                  </h2>
                  {activeBrandInfo && (
                    <p className="text-[12.5px] text-[#666666]">{activeBrandInfo.tagline}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBrand("All Brands")}
                className="px-4 py-2 rounded-full bg-white border border-[#dcdce5] hover:border-[#4f46e5] text-[12px] font-bold text-[#141233] cursor-pointer"
              >
                All Brands ✕
              </button>
            </div>
          )}

          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#eaeaea]">
            <div className="text-[14px] text-[#555555]">
              Showing <strong className="text-[#141233]">{filteredProducts.length}</strong> of{" "}
              <strong>{PRODUCTS.length}</strong> flagship products
              {(selectedCategory !== "all" || selectedBrand !== "All Brands" || priceIdx !== 0 || searchQuery) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-3 text-[12px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                >
                  Clear All Filters ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="h-[38px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px] font-semibold text-[#141233] focus:outline-none focus:border-[#4f46e5]"
              >
                <option value="featured">Sort by: Best Selling</option>
                <option value="rating">Sort by: Highest Rated</option>
                <option value="price-asc">Sort by: Price Low to High</option>
                <option value="price-desc">Sort by: Price High to Low</option>
              </select>

              <div className="hidden sm:flex items-center border border-[#dcdce5] rounded-[10px] p-0.5 bg-[#f7f8fc]">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-2.5 py-1.5 rounded-[8px] text-[12px] font-bold cursor-pointer ${
                    viewMode === "grid" ? "bg-[#141233] text-white" : "text-[#666666]"
                  }`}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`px-2.5 py-1.5 rounded-[8px] text-[12px] font-bold cursor-pointer ${
                    viewMode === "list" ? "bg-[#141233] text-white" : "text-[#666666]"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[20px] border border-[#eaeaea] bg-[#fafbfe] p-12 text-center">
              <h3 className="text-[20px] font-extrabold text-[#141233] mb-2">
                No matching products found
              </h3>
              <p className="text-[14px] text-[#666666] mb-5">
                Try clearing one of your active brand, category, or price filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-3 rounded-full bg-[#141233] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const wished = isInWishlist(product.slug);
                return (
                  <div
                    key={product.id}
                    className="group rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,18,51,0.1)] relative"
                  >
                    <div>
                      {/* Top Badges & Wishlist Button */}
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-1.5">
                          {product.discount && (
                            <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2.5 py-0.5 badge-leaf">
                              {product.discount}
                            </span>
                          )}
                          {product.badge && (
                            <span className="bg-[#141233] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.slug)}
                          aria-label="Toggle Wishlist"
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            wished
                              ? "bg-[#4f46e5] text-white"
                              : "bg-[#f4f5f8] text-[#444444] hover:bg-[#4f46e5] hover:text-white"
                          }`}
                        >
                          ♥
                        </button>
                      </div>

                      {/* Product Image */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="w-full h-[200px] rounded-[14px] bg-[#fafafa] p-4 flex items-center justify-center mb-3.5 overflow-hidden relative"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                        />
                      </Link>

                      {/* Meta & Title */}
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-1">
                        <span>{product.brand}</span>
                        <span className="text-[#f59e0b]">★ {product.rating} ({product.reviewsCount})</span>
                      </div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-[15px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] line-clamp-2 leading-snug transition-colors"
                      >
                        {product.title}
                      </Link>
                      <p className="text-[12px] text-[#666666] line-clamp-1 mt-1">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-4 mt-4 border-t border-[#f0f0f0]">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[18px] font-extrabold text-[#141233]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-[12.5px] text-[#999999] line-through">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuickViewProduct(product)}
                          className="text-[11.5px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                        >
                          Quick View
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="btn-shine py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          + Add to Cart
                        </button>
                        <Link
                          href={`/product/${product.slug}`}
                          className="py-2.5 rounded-full border border-[#dcdce5] hover:border-[#141233] text-[#141233] text-[11.5px] font-bold uppercase tracking-wider text-center transition-colors"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-5 flex flex-col sm:flex-row items-center gap-6 transition-all"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="w-full sm:w-[190px] h-[170px] rounded-[14px] bg-[#fafafa] p-4 flex items-center justify-center shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#4f46e5] mb-1">
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span>{product.categoryLabel}</span>
                      <span className="text-[#f59e0b]">★ {product.rating}</span>
                    </div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-[18px] font-extrabold text-[#141233] hover:text-[#4f46e5]"
                    >
                      {product.title}
                    </Link>
                    <p className="text-[13.5px] text-[#555555] mt-1.5 leading-relaxed">
                      {product.shortDesc}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-[#f2f2f2]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[20px] font-extrabold text-[#141233]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[13px] text-[#999999] line-through">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="btn-shine px-6 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <Link
                          href={`/product/${product.slug}`}
                          className="px-5 py-2.5 rounded-full border border-[#dcdce5] text-[12px] font-bold uppercase text-[#141233]"
                        >
                          Full Specs
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[760px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 relative animate-fade-up"
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f4f4f8] hover:bg-[#4f46e5] hover:text-white font-bold flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="md:col-span-5 rounded-[16px] bg-[#f8f9fc] p-5 flex items-center justify-center">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.title}
                className="w-full h-[220px] object-contain"
              />
            </div>
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4f46e5]">
                  {quickViewProduct.brand} • {quickViewProduct.sku}
                </span>
                <h3 className="text-[20px] font-extrabold text-[#141233] mt-1">
                  {quickViewProduct.title}
                </h3>
                <div className="flex items-baseline gap-2.5 my-3">
                  <span className="text-[24px] font-extrabold text-[#4f46e5]">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-[14px] text-[#999999] line-through">
                      ${quickViewProduct.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-[13.5px] text-[#555555] leading-relaxed mb-4">
                  {quickViewProduct.shortDesc}
                </p>
                <ul className="space-y-1.5 text-[12.5px] text-[#333333] mb-5">
                  {quickViewProduct.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-[#10b981] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct, 1);
                    setQuickViewProduct(null);
                  }}
                  className="btn-shine flex-1 py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Add to Cart
                </button>
                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  className="px-6 py-3 rounded-full border-2 border-[#141233] text-[#141233] text-[12.5px] font-bold uppercase tracking-wider"
                >
                  Full Page →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-[#141233] font-bold">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

