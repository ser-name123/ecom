"use client";

import React from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] bg-white h-full shadow-2xl p-6 flex flex-col justify-between text-[#1c1c1c] animate-fade-up"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#eaeaea]">
          <h3 className="text-[18px] font-extrabold text-[#141233]">
            Shopping Cart (0)
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f5] hover:bg-[#f43777] hover:text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#fff2f7] text-[#f43777] flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <p className="text-[15px] text-[#666666] font-medium mb-5">
            Your shopping cart is currently empty.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="btn-shine px-7 py-3 rounded-full bg-[#f43777] hover:bg-[#db316b] text-white text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

        <div className="pt-4 border-t border-[#eaeaea] text-center text-[12px] text-[#888888]">
          Free Express Shipping on all orders over $500!
        </div>
      </div>
    </div>
  );
}

