"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { PRODUCTS } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    discountPercent,
    discountAmount,
    shippingCost,
    total,
    couponCode,
    updateCartQty,
    removeFromCart,
    clearCart,
    addToCart,
    toggleWishlist,
    applyCoupon,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState(couponCode || "");
  const [couponFeedback, setCouponFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [orderNote, setOrderNote] = useState("");

  const freeShippingThreshold = 500;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(inputCoupon);
    setCouponFeedback({ ok: res.success, text: res.message });
  };

  const upsellProducts = PRODUCTS.filter(
    (p) => !cart.some((c) => c.product.slug === p.slug)
  ).slice(0, 4);

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="YOUR SHOPPING BAG"
        title="Shopping Cart &"
        highlight="Bundle Summary"
        subtitle="Review your selected flagship gear, apply bundle promo code NEXOVA30 for 30% off, and proceed to encrypted express checkout."
        breadcrumbs={[{ label: "Shopping Cart" }]}
        rightStats={[
          { value: `${cartCount}`, label: "Items in Bag" },
          { value: `$${total.toFixed(0)}`, label: "Estimated Total" },
          { value: "SSL", label: "256-Bit Secure" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {/* Free Express Shipping Progress Banner */}
        <div className="rounded-[20px] bg-[#141233] text-white p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-[14px] font-bold mb-2">
              {remaining === 0 ? (
                <span className="text-[#38bdf8]">
                  🎉 Congratulations! Your order qualifies for FREE Insured Express Air Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#38bdf8]">${remaining.toFixed(2)}</strong> more to unlock{" "}
                  <strong>FREE Insured Express Air Shipping ($500+ Tier)</strong>
                </span>
              )}
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#06b6d4] via-[#4f46e5] to-[#10b981] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setInputCoupon("NEXOVA30");
              const res = applyCoupon("NEXOVA30");
              setCouponFeedback({ ok: res.success, text: res.message });
            }}
            className="px-4 py-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[11.5px] font-extrabold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
          >
            ⚡ Apply NEXOVA30 (-30%)
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-12 text-center max-w-[620px] mx-auto">
            <h2 className="text-[24px] font-extrabold text-[#141233] mb-2">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-[14px] text-[#666666] mb-6">
              Looks like you haven&apos;t added any hardware to your bag yet. Explore our flagship catalog or restore sample items below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/shop"
                className="btn-shine px-7 py-3.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider"
              >
                Explore All Products →
              </Link>
              <button
                type="button"
                onClick={() => addToCart(PRODUCTS[0], 1)}
                className="px-6 py-3.5 rounded-full border border-[#dcdce5] hover:border-[#4f46e5] text-[#141233] text-[12.5px] font-bold uppercase tracking-wider cursor-pointer"
              >
                + Add Demo Smartwatch
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaeaea]">
                <h2 className="text-[18px] font-extrabold text-[#141233]">
                  Cart Items ({cartCount})
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[12px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                >
                  Clear Entire Cart
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.product.slug}
                  className="rounded-[20px] border border-[#eaeaea] bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 hover:border-[#4f46e5] transition-colors"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="w-[100px] h-[100px] rounded-[14px] bg-[#fafafa] border border-[#efefef] p-2.5 flex items-center justify-center shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="text-[11px] font-bold uppercase text-[#4f46e5]">
                      {item.product.brand} • SKU: {item.product.sku}
                    </div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-[16px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <div className="text-[12.5px] text-[#666666] mt-0.5">
                      Color: <strong>{item.selectedColor}</strong> • Edition:{" "}
                      <strong>{item.selectedEdition}</strong>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-2.5 text-[12px]">
                      <button
                        type="button"
                        onClick={() => {
                          toggleWishlist(item.product.slug);
                          removeFromCart(item.product.slug);
                        }}
                        className="font-bold text-[#4f46e5] hover:underline cursor-pointer"
                      >
                        ♥ Move to Wishlist
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.slug)}
                        className="font-bold text-[#4f46e5] hover:underline cursor-pointer"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0f0f0]">
                    <div className="inline-flex items-center border border-[#dcdce5] rounded-full bg-[#fafbfe] px-1.5 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.slug, item.quantity - 1)}
                        className="w-7 h-7 font-bold text-[#141233] hover:text-[#4f46e5] cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-3 text-[13.5px] font-extrabold text-[#141233]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.slug, item.quantity + 1)}
                        className="w-7 h-7 font-bold text-[#141233] hover:text-[#4f46e5] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-[18px] font-extrabold text-[#141233]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[11px] text-[#888888]">
                        ${item.product.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Note */}
              <div className="p-5 rounded-[18px] bg-[#fafbfe] border border-[#eceef5]">
                <label className="block text-[12.5px] font-bold text-[#141233] mb-2">
                  Special Delivery or Gift Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Add gate code, gift wrap note, or preferred delivery window..."
                  className="w-full p-3 rounded-[10px] bg-white border border-[#dcdce5] text-[13px] focus:outline-none focus:border-[#4f46e5]"
                />
              </div>
            </div>

            {/* Right 4 Cols: Sticky Order Summary & Promo Code */}
            <div className="lg:col-span-4 rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 sm:p-7 space-y-5 sticky top-24">
              <h3 className="text-[20px] font-extrabold text-[#141233] pb-3 border-b border-[#e5e7f0]">
                Order Summary
              </h3>

              {/* Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#555555]">
                  Promo / Bundle Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Try NEXOVA30"
                    className="flex-1 h-[42px] px-3.5 rounded-[10px] bg-white border border-[#dcdce5] text-[13px] font-bold uppercase focus:outline-none focus:border-[#4f46e5]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-[42px] rounded-[10px] bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <p
                    className={`text-[12px] font-semibold ${
                      couponFeedback.ok ? "text-[#10b981]" : "text-[#4f46e5]"
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}
              </form>

              <div className="space-y-2.5 text-[14px] pt-2 border-t border-[#e5e7f0]">
                <div className="flex justify-between text-[#555555]">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-bold text-[#141233]">${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#10b981] font-bold">
                    <span>Discount ({couponCode} -{discountPercent}%)</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#555555]">
                  <span>Insured Express Shipping</span>
                  <span className="font-bold text-[#141233]">
                    {shippingCost === 0 ? (
                      <span className="text-[#10b981]">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[18px] font-extrabold text-[#141233] pt-3 border-t border-[#e5e7f0]">
                  <span>Total</span>
                  <span className="text-[#4f46e5]">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-shine w-full py-4 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[13px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <span>Proceed to Secure Checkout</span>
                <span>→</span>
              </Link>

              <Link
                href="/shop"
                className="block text-center text-[12.5px] font-bold text-[#141233] hover:text-[#4f46e5]"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Complete Your Setup Upsell Row */}
        <div className="mt-16 pt-12 border-t border-[#eaeaea]">
          <h3 className="text-[22px] font-extrabold text-[#141233] mb-6">
            Complete Your Setup (Add & Unlock Bundle Savings)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upsellProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-[18px] border border-[#eaeaea] p-4 flex flex-col justify-between bg-white hover:border-[#4f46e5] transition-all"
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="h-[150px] rounded-[12px] bg-[#fafafa] p-3 flex items-center justify-center mb-3"
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                </Link>
                <div>
                  <Link
                    href={`/product/${p.slug}`}
                    className="text-[14px] font-extrabold text-[#141233] line-clamp-1"
                  >
                    {p.title}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[15px] font-extrabold text-[#4f46e5]">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(p, 1)}
                      className="px-3.5 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold cursor-pointer"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

