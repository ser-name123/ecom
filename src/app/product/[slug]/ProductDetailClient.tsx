"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS, getProductBySlug, ProductReview } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [isHoverZooming, setIsHoverZooming] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(2.2);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxScale, setLightboxScale] = useState<number>(1.8);
  const [lightboxPos, setLightboxPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "Default"
  );
  const [selectedEdition, setSelectedEdition] = useState<string>(
    product.editions[0] || "Standard"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "shipping">(
    "description"
  );

  // Interactive Review State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);
  const [revName, setRevName] = useState("");
  const [revTitle, setRevTitle] = useState("");
  const [revComment, setRevComment] = useState("");
  const [revRating, setRevRating] = useState(5);

  const wished = isInWishlist(product.slug);
  const relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedEdition);
    router.push("/checkout");
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLightboxPos({ x, y });
  };

  const cycleGalleryImage = (dir: -1 | 1) => {
    const idx = product.gallery.indexOf(activeImage);
    const nextIdx = (idx + dir + product.gallery.length) % product.gallery.length;
    setActiveImage(product.gallery[nextIdx]);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    const newRev: ProductReview = {
      id: "rev-" + Date.now(),
      author: revName,
      role: "Verified Customer",
      avatar: "/assets/testimonial-4.jpg",
      rating: revRating,
      date: "Just Now",
      title: revTitle || "Great flagship product!",
      comment: revComment,
      verified: true,
    };
    setReviewsList([newRev, ...reviewsList]);
    setRevName("");
    setRevTitle("");
    setRevComment("");
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge={`${product.brand} • SKU: ${product.sku}`}
        title={product.title}
        subtitle={product.subtitle}
        breadcrumbs={[
          { label: "Shop", href: "/shop" },
          { label: product.categoryLabel, href: `/categories/${product.category}` },
          { label: product.title },
        ]}
      />

      {/* Main Product Showcase Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 6 Cols: Interactive Multi-Angle Image Gallery with HD Magnifier & Lightbox Zoom */}
        <div className="lg:col-span-6 space-y-4">
          <div
            onMouseEnter={() => setIsHoverZooming(true)}
            onMouseLeave={() => {
              setIsHoverZooming(false);
              setZoomPos({ x: 50, y: 50 });
            }}
            onMouseMove={handleImageMouseMove}
            onClick={() => setLightboxOpen(true)}
            className="w-full h-[380px] sm:h-[470px] rounded-[24px] border border-[#eaeaea] hover:border-[#4f46e5]/50 bg-[#fafafa] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden group cursor-zoom-in select-none"
          >
            {product.discount && (
              <span className="absolute top-5 left-5 z-20 bg-[#4f46e5] text-white text-[12px] font-extrabold px-3.5 py-1 badge-leaf shadow-md pointer-events-none">
                SAVE {product.discount}
              </span>
            )}

            {/* Selected Color & Edition Live Badge on Image */}
            <div className="absolute top-14 left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#e2e4ec] text-[11px] font-extrabold text-[#141233] shadow-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{
                    backgroundColor:
                      product.colors.find((c) => c.name === selectedColor)?.hex || "#4f46e5",
                  }}
                />
                <span>{selectedColor}</span>
              </span>
            </div>

            {/* Top-Right Floating Zoom Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#e2e4ec] rounded-full px-2.5 py-1.5 shadow-[0_8px_24px_rgba(20,18,51,0.1)]"
            >
              <button
                type="button"
                onClick={() => {
                  const next = Math.max(1, Number((zoomScale - 0.5).toFixed(1)));
                  setZoomScale(next);
                  setIsHoverZooming(next > 1);
                }}
                aria-label="Zoom Out"
                title="Zoom Out"
                className="w-7 h-7 rounded-full hover:bg-[#eef2ff] text-[#141233] hover:text-[#4f46e5] font-extrabold text-[15px] flex items-center justify-center transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="text-[11px] font-extrabold text-[#4f46e5] px-1.5 min-w-[38px] text-center">
                {isHoverZooming ? `${zoomScale}x` : "1.0x"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const next = Math.min(3.5, Number((zoomScale + 0.5).toFixed(1)));
                  setZoomScale(next);
                  setIsHoverZooming(true);
                }}
                aria-label="Zoom In"
                title="Zoom In"
                className="w-7 h-7 rounded-full hover:bg-[#eef2ff] text-[#141233] hover:text-[#4f46e5] font-extrabold text-[15px] flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
              <div className="w-[1px] h-4 bg-[#e2e4ec] mx-0.5" />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Open Fullscreen Zoom"
                title="Fullscreen HD Zoom"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[10.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Zoom</span>
              </button>
            </div>

            {/* Main Zoomable Product Image */}
            <img
              src={activeImage}
              alt={product.title}
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isHoverZooming ? `scale(${zoomScale})` : "scale(1)",
              }}
              className="w-full h-full object-contain transition-transform duration-200 ease-out pointer-events-none"
            />

            {/* Bottom Interactive Hint Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141233]/80 backdrop-blur-xs text-white text-[11px] font-semibold shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>
                  {isHoverZooming
                    ? `Magnifying ${zoomScale}x • Move cursor to inspect or click for Fullscreen`
                    : "Hover to magnify or click for Fullscreen HD Zoom"}
                </span>
              </span>
            </div>
          </div>

          {/* Thumbnail Strip + Quick Zoom Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={imgUrl + idx}
                  type="button"
                  onClick={() => {
                    setActiveImage(imgUrl);
                    if (product.colors[idx]) {
                      setSelectedColor(product.colors[idx].name);
                    }
                  }}
                  className={`w-[82px] h-[82px] rounded-[14px] border-2 p-2 bg-[#fafafa] flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? "border-[#4f46e5] bg-white shadow-md"
                      : "border-[#eaeaea] opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Quick Zoom Level Selector Pills */}
            <div className="flex items-center gap-1.5 bg-[#f8f9fc] border border-[#e6e8f0] rounded-full p-1">
              {[1, 1.8, 2.5, 3.2].map((lvl) => {
                const active = isHoverZooming ? zoomScale === lvl : lvl === 1;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      if (lvl === 1) {
                        setIsHoverZooming(false);
                        setZoomScale(2.2);
                      } else {
                        setZoomScale(lvl);
                        setIsHoverZooming(true);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                      active
                        ? "bg-[#4f46e5] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#141233]"
                    }`}
                  >
                    {lvl}x
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Product Configuration & Conversion Box */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-[12px] font-bold">
              ● In Stock ({product.stockCount} units ready for Express Dispatch)
            </span>
            <span className="text-[13px] font-bold text-[#f59e0b]">
              ★★★★★ {product.rating} ({reviewsList.length} Verified Reviews)
            </span>
          </div>

          <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#141233] leading-tight">
            {product.title}
          </h2>

          {/* Price Block */}
          <div className="p-4 rounded-[18px] bg-[#f8f9fc] border border-[#e6e8f0] flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-[32px] font-extrabold text-[#4f46e5]">
                AED {product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-[17px] text-[#999999] line-through font-semibold">
                  AED {product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[12px] font-bold text-[#4f46e5] bg-[#eef2ff] px-3 py-1 rounded-full">
              ⚡ Or 4 interest-free payments of AED {(product.price / 4).toFixed(2)}
            </span>
          </div>

          <p className="text-[14.5px] text-[#555555] leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Key Highlights */}
          <ul className="space-y-2 text-[13.5px] text-[#333333] bg-[#fafbfe] p-4 rounded-[16px] border border-[#eceef5]">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Color Selector (Clicking switches the active product image) */}
          <div>
            <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#141233] mb-2">
              Finish / Color: <span className="text-[#4f46e5]">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {product.colors.map((c, idx) => {
                const colorImage = product.gallery[idx % product.gallery.length] || product.image;
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c.name);
                      setActiveImage(colorImage);
                    }}
                    className={`inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border text-[12.5px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#4f46e5] bg-[#eef2ff] text-[#141233] shadow-[0_6px_16px_rgba(79,70,229,0.16)] scale-[1.02]"
                        : "border-[#dcdce5] bg-white text-[#555555] hover:border-[#4f46e5]"
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-white border border-[#e2e4ec] p-1 flex items-center justify-center shrink-0 overflow-hidden relative">
                      <img
                        src={colorImage}
                        alt={c.name}
                        className="w-full h-full object-contain"
                      />
                      <span
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: c.hex }}
                      />
                    </span>
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Edition / Configuration Selector */}
          <div>
            <div className="text-[12.5px] font-bold uppercase tracking-wider text-[#141233] mb-2">
              Configuration: <span className="text-[#4f46e5]">{selectedEdition}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.editions.map((ed, idx) => (
                <button
                  key={ed}
                  type="button"
                  onClick={() => {
                    setSelectedEdition(ed);
                    const editionImg =
                      product.gallery[(idx + product.colors.length) % product.gallery.length] ||
                      product.gallery[idx % product.gallery.length];
                    if (editionImg) setActiveImage(editionImg);
                  }}
                  className={`px-4 py-2 rounded-[12px] border text-[12.5px] font-bold transition-all cursor-pointer ${
                    selectedEdition === ed
                      ? "border-[#141233] bg-[#141233] text-white shadow-sm"
                      : "border-[#dcdce5] bg-white text-[#444444] hover:border-[#4f46e5]"
                  }`}
                >
                  {ed}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart + Buy Now + Wishlist */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center h-[48px] rounded-full border border-[#dcdce5] bg-[#fafafa] px-2">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full hover:bg-white text-[18px] font-bold text-[#141233] cursor-pointer"
              >
                −
              </button>
              <span className="px-4 text-[15px] font-extrabold text-[#141233]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full hover:bg-white text-[18px] font-bold text-[#141233] cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product, quantity, selectedColor, selectedEdition)}
              className="btn-shine flex-1 min-w-[170px] h-[48px] rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[13px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Add to Cart • AED {(product.price * quantity).toFixed(2)}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="btn-shine px-7 h-[48px] rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[13px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Buy It Now →
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Save to Wishlist"
              className={`w-[48px] h-[48px] rounded-full border flex items-center justify-center text-[18px] transition-colors cursor-pointer ${
                wished
                  ? "bg-[#4f46e5] border-[#4f46e5] text-white"
                  : "border-[#dcdce5] text-[#141233] hover:border-[#4f46e5]"
              }`}
            >
              ♥
            </button>
          </div>

          {/* Trust & Delivery Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#eaeaea] text-[12px]">
            <div className="p-3 rounded-[12px] bg-[#fafbfe] border border-[#eceef5]">
              <strong className="block text-[#141233]">🚀 Express Air Delivery</strong>
              <span className="text-[#666666]">Free on orders AED 500+</span>
            </div>
            <div className="p-3 rounded-[12px] bg-[#fafbfe] border border-[#eceef5]">
              <strong className="block text-[#141233]">🛡️ 2-Year Care+ Warranty</strong>
              <span className="text-[#666666]">Official factory coverage</span>
            </div>
            <div className="p-3 rounded-[12px] bg-[#fafbfe] border border-[#eceef5] col-span-2 sm:col-span-1">
              <strong className="block text-[#141233]">↩️ 30-Day Returns</strong>
              <span className="text-[#666666]">100% money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabs Section (Overview, Technical Specs, Reviews, Shipping) */}
      <section className="w-full bg-[#f8f9fc] border-y border-[#e6e8f0] py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-[#dcdce5]">
            {[
              { id: "description", label: "Product Overview" },
              { id: "specs", label: `Technical Specifications (${product.specs.length})` },
              { id: "reviews", label: `Customer Reviews (${reviewsList.length})` },
              { id: "shipping", label: "Shipping & Warranty" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`px-6 py-3 rounded-full text-[13px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === t.id
                    ? "bg-[#141233] text-white shadow-md"
                    : "bg-white text-[#555555] hover:text-[#141233] border border-[#dcdce5]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-9 rounded-[24px] border border-[#eaeaea]">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[11.5px] font-bold uppercase tracking-widest text-[#4f46e5]">
                  ENGINEERED FOR EXCELLENCE
                </span>
                <h3 className="text-[24px] font-extrabold text-[#141233]">
                  Why {product.title} Leads Its Class
                </h3>
                <p className="text-[15px] text-[#555555] leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.highlights.map((h) => (
                    <div
                      key={h}
                      className="p-3.5 rounded-[14px] bg-[#f8f9fc] border border-[#eceef5] text-[13px] font-semibold text-[#141233]"
                    >
                      ✓ {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex items-center justify-center p-6 rounded-[20px] bg-[#fafafa]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[260px] w-auto object-contain"
                />
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="bg-white rounded-[24px] border border-[#eaeaea] overflow-hidden">
              <div className="divide-y divide-[#eceef5]">
                {product.specs.map((sp, i) => (
                  <div
                    key={sp.label}
                    className={`grid grid-cols-1 sm:grid-cols-12 px-6 py-4 text-[14px] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fafbfe]"
                    }`}
                  >
                    <div className="sm:col-span-4 font-extrabold text-[#141233]">
                      {sp.label}
                    </div>
                    <div className="sm:col-span-8 text-[#555555] font-medium">
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-[20px] bg-white border border-[#eaeaea] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-[14.5px] font-extrabold text-[#141233]">
                            {rev.author}
                          </div>
                          <div className="text-[11.5px] text-[#777777]">
                            {rev.role} • {rev.date}
                          </div>
                        </div>
                      </div>
                      <span className="text-[#f59e0b] font-bold text-[14px]">
                        {"★".repeat(rev.rating)}
                      </span>
                    </div>
                    <h4 className="text-[15.5px] font-extrabold text-[#141233]">
                      {rev.title}
                    </h4>
                    <p className="text-[13.5px] text-[#555555] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-[20px] border border-[#eaeaea] self-start">
                <h3 className="text-[18px] font-extrabold text-[#141233] mb-4">
                  Write a Customer Review
                </h3>
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Rating
                    </label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRevRating(star)}
                          className={`px-3 py-1 rounded-full text-[13px] font-bold cursor-pointer ${
                            revRating >= star
                              ? "bg-[#f59e0b] text-white"
                              : "bg-[#f0f0f0] text-[#777777]"
                          }`}
                        >
                          {star} ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                  />
                  <input
                    type="text"
                    value={revTitle}
                    onChange={(e) => setRevTitle(e.target.value)}
                    placeholder="Review Headline"
                    className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                  />
                  <textarea
                    rows={3}
                    required
                    value={revComment}
                    onChange={(e) => setRevComment(e.target.value)}
                    placeholder="Share your experience with this product *"
                    className="w-full p-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="bg-white p-7 rounded-[24px] border border-[#eaeaea] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[17px] font-extrabold text-[#141233] mb-2">
                  Insured Global Express Delivery
                </h4>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-3">
                  Orders placed before 4:00 PM local hub time dispatch the same business day. Orders over AED 500 receive complimentary Express Air shipping with live GPS tracking.
                </p>
                <Link
                  href="/shipping-policy"
                  className="text-[13px] font-bold text-[#4f46e5] hover:underline"
                >
                  Read Full Shipping & Delivery Policy →
                </Link>
              </div>
              <div>
                <h4 className="text-[17px] font-extrabold text-[#141233] mb-2">
                  30-Day Money-Back & 2-Year Warranty
                </h4>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-3">
                  Every product includes our 30-day no-questions-asked return window plus a 2-year Nexova Care+ hardware warranty with free two-way express replacement.
                </p>
                <Link
                  href="/return-policy"
                  className="text-[13px] font-bold text-[#4f46e5] hover:underline"
                >
                  Read Full Return & Refund Policy →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[24px] font-extrabold text-[#141233]">
            Frequently Bought Together & Related Gear
          </h3>
          <Link href="/shop" className="text-[13px] font-bold text-[#4f46e5] hover:underline">
            View Full Catalog →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-4 flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <Link
                href={`/product/${rel.slug}`}
                className="w-full h-[170px] rounded-[12px] bg-[#fafafa] p-3 flex items-center justify-center mb-3"
              >
                <img src={rel.image} alt={rel.title} className="w-full h-full object-contain" />
              </Link>
              <div>
                <Link
                  href={`/product/${rel.slug}`}
                  className="text-[14.5px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-1"
                >
                  {rel.title}
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[16px] font-extrabold text-[#4f46e5]">
                    AED {rel.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(rel, 1)}
                    className="px-3.5 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Interactive HD Zoom Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-[#0b0a1f]/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none"
        >
          {/* Top Lightbox Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1200px] flex flex-wrap items-center justify-between gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 text-white"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-0.5 rounded-full bg-[#4f46e5] text-[10px] font-extrabold uppercase tracking-wider">
                HD STUDIO ZOOM
              </span>
              <span className="text-[13.5px] font-bold truncate">{product.title}</span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 1.5, 2, 3, 4].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setLightboxScale(scale)}
                  className={`px-3 py-1 rounded-full text-[11.5px] font-extrabold transition-all cursor-pointer ${
                    lightboxScale === scale
                      ? "bg-[#38bdf8] text-[#0b0a1f]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {scale}x
                </button>
              ))}
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Fullscreen Zoom"
                className="ml-2 w-8 h-8 rounded-full bg-white/15 hover:bg-[#4f46e5] text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center Interactive Pan & Zoom Viewport */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setLightboxScale((prev) => (prev >= 3 ? 1 : Number((prev + 0.8).toFixed(1))));
            }}
            onMouseMove={handleLightboxMouseMove}
            className="relative w-full max-w-[1100px] h-[62vh] sm:h-[68vh] rounded-[24px] bg-white border border-white/20 flex items-center justify-center overflow-hidden cursor-zoom-in shadow-2xl my-3"
          >
            {/* Prev Angle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cycleGalleryImage(-1);
              }}
              aria-label="Previous Image"
              className="absolute left-4 z-20 w-11 h-11 rounded-full bg-[#141233]/85 hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              ‹
            </button>

            <img
              src={activeImage}
              alt={product.title}
              style={{
                transformOrigin: `${lightboxPos.x}% ${lightboxPos.y}%`,
                transform: `scale(${lightboxScale})`,
              }}
              className="w-[80%] h-[80%] object-contain transition-transform duration-150 ease-out pointer-events-none"
            />

            {/* Next Angle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cycleGalleryImage(1);
              }}
              aria-label="Next Image"
              className="absolute right-4 z-20 w-11 h-11 rounded-full bg-[#141233]/85 hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#141233]/80 text-white text-[11.5px] font-semibold pointer-events-none">
              Move cursor to pan • Click image to step zoom ({lightboxScale}x)
            </div>
          </div>

          {/* Bottom Thumbnail Strip in Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1"
          >
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={imgUrl + idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`w-[68px] h-[68px] rounded-[12px] p-1.5 bg-white border-2 transition-all cursor-pointer ${
                  activeImage === imgUrl
                    ? "border-[#38bdf8] scale-105 shadow-lg"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

