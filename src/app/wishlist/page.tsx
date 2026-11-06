"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function WishlistPage() {
  const { wishlist, wishlistCount, toggleWishlist, addToCart, showToast } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  const moveAllToCart = () => {
    savedProducts.forEach((p) => addToCart(p, 1));
    showToast(`Added all ${savedProducts.length} wishlist items to your Cart!`, "View Cart", "/cart");
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="SAVED FAVORITES & PRICE ALERTS"
        title="My Saved"
        highlight={`Wishlist (${wishlistCount})`}
        subtitle="Keep track of your favorite flagship laptops, headphones, and 4K cameras. Move items to your cart anytime or share your list."
        breadcrumbs={[{ label: "Wishlist" }]}
        rightStats={[
          { value: `${wishlistCount}`, label: "Saved Items" },
          { value: "In Stock", label: "Ready to Ship" },
          { value: "-30%", label: "Bundle Eligible" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {savedProducts.length === 0 ? (
          <div className="rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-12 text-center max-w-[600px] mx-auto">
            <h2 className="text-[24px] font-extrabold text-[#141233] mb-2">
              Your Wishlist is Currently Empty
            </h2>
            <p className="text-[14px] text-[#666666] mb-6">
              Tap the heart icon on any product across our store to save it here for instant comparison.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="btn-shine px-7 py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider"
              >
                Explore All Products →
              </Link>
              <button
                type="button"
                onClick={() => toggleWishlist(PRODUCTS[0].slug)}
                className="px-6 py-3 rounded-full border border-[#dcdce5] text-[#141233] text-[12.5px] font-bold uppercase cursor-pointer"
              >
                + Restore Demo Wishlist
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-[#eaeaea]">
              <div className="text-[15px] font-bold text-[#141233]">
                Showing {savedProducts.length} saved flagship products
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => showToast("Wishlist share link copied to clipboard!")}
                  className="px-5 py-2.5 rounded-full border border-[#dcdce5] hover:border-[#141233] text-[#141233] text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  🔗 Share Wishlist
                </button>
                <button
                  type="button"
                  onClick={moveAllToCart}
                  className="btn-shine px-6 py-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  + Add All {savedProducts.length} Items to Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold">
                        ● In Stock ({product.stockCount})
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.slug)}
                        title="Remove from Wishlist"
                        className="w-8 h-8 rounded-full bg-[#fff1f5] text-[#4f46e5] hover:bg-[#4f46e5] hover:text-white flex items-center justify-center text-[13px] font-bold transition-colors cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      className="w-full h-[190px] rounded-[14px] bg-[#fafafa] p-4 flex items-center justify-center mb-3"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                      />
                    </Link>

                    <div className="text-[11px] font-bold uppercase text-[#777777] mb-1">
                      {product.brand} • <span className="text-[#f59e0b]">★ {product.rating}</span>
                    </div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-[15px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] line-clamp-2"
                    >
                      {product.title}
                    </Link>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#f0f0f0]">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[18px] font-extrabold text-[#4f46e5]">
                        AED {product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[12.5px] text-[#999999] line-through">
                          AED {product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1)}
                      className="btn-shine w-full py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

