"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/StoreContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, cartCount, subtotal, updateCartQty, removeFromCart } = useStore();

  if (!open) return null;

  const freeShippingThreshold = 500;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col justify-between text-[#1c1c1c] animate-fade-up"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#eaeaea] bg-[#141233] text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#4f46e5] text-white text-[12px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
              <h3 className="text-[17px] font-extrabold tracking-tight">
                Your Shopping Cart
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#4f46e5] text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-white/10 rounded-[10px] p-2.5">
            <div className="text-[11.5px] font-semibold text-white/90 mb-1.5 flex items-center justify-between">
              {remainingForFree === 0 ? (
                <span className="text-[#38bdf8]">
                  🎉 You unlocked FREE Express Air Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#38bdf8]">AED {remainingForFree.toFixed(2)}</strong> more for FREE Express Shipping
                </span>
              )}
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#06b6d4] via-[#4f46e5] to-[#10b981] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-[#eef2ff] text-[#4f46e5] flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-[15px] text-[#555555] font-semibold mb-1">
              Your shopping cart is empty
            </p>
            <p className="text-[12.5px] text-[#888888] mb-5">
              Explore our flagship laptops, headphones, and 4K gear.
            </p>
            <Link
              href="/shop"
              onClick={onClose}
              className="btn-shine px-7 py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.slug}
                className="flex items-center gap-3.5 p-3 rounded-[14px] border border-[#ececec] bg-[#fafafa] hover:bg-white transition-colors"
              >
                <Link
                  href={`/product/${item.product.slug}`}
                  onClick={onClose}
                  className="w-[68px] h-[68px] rounded-[10px] bg-white border border-[#efefef] p-1.5 flex items-center justify-center shrink-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={onClose}
                    className="text-[13px] font-bold text-[#141233] hover:text-[#4f46e5] line-clamp-1 transition-colors"
                  >
                    {item.product.title}
                  </Link>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    {item.selectedColor} • {item.selectedEdition}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="inline-flex items-center border border-[#e0e0e0] rounded-full bg-white">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.slug, item.quantity - 1)}
                        className="w-6 h-6 text-[13px] font-bold text-[#333333] hover:text-[#4f46e5] cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-2 text-[12px] font-bold text-[#141233]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.slug, item.quantity + 1)}
                        className="w-6 h-6 text-[13px] font-bold text-[#333333] hover:text-[#4f46e5] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[14px] font-extrabold text-[#141233]">
                      AED {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.slug)}
                  aria-label="Remove item"
                  className="text-[#999999] hover:text-[#4f46e5] p-1 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#eaeaea] bg-[#fcfcfd] space-y-3">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-[#666666] font-medium">Subtotal</span>
            <span className="text-[18px] font-extrabold text-[#141233]">
              AED {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/cart"
              onClick={onClose}
              className="py-3 rounded-full border-2 border-[#141233] text-[#141233] hover:bg-[#141233] hover:text-white text-[12px] font-bold uppercase tracking-wider text-center transition-colors"
            >
              View Full Cart
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-shine py-3 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider text-center transition-colors shadow-md"
            >
              Checkout →
            </Link>
          </div>
          <div className="text-center text-[11.5px] text-[#777777]">
            🔒 256-Bit SSL Encrypted Checkout • 30-Day Money Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}
