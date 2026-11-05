"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/storeData";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedEdition: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[]; // array of product slugs
  couponCode: string;
  discountPercent: number;
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  addToCart: (product: Product, quantity?: number, color?: string, edition?: string) => void;
  removeFromCart: (slug: string) => void;
  updateCartQty: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slugOrProduct: string | Product) => void;
  isInWishlist: (slug: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  showToast: (message: string, actionLabel?: string, actionHref?: string) => void;
}

const DEFAULT_CART: CartItem[] = [
  {
    product: PRODUCTS[0],
    quantity: 1,
    selectedColor: PRODUCTS[0].colors[0].name,
    selectedEdition: PRODUCTS[0].editions[0],
  },
  {
    product: PRODUCTS[1],
    quantity: 1,
    selectedColor: PRODUCTS[1].colors[0].name,
    selectedEdition: PRODUCTS[1].editions[0],
  },
];

const DEFAULT_WISHLIST: string[] = [
  PRODUCTS[0].slug,
  PRODUCTS[2].slug,
  PRODUCTS[3].slug,
  PRODUCTS[6].slug,
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cart, setCart] = useState<CartItem[]>(DEFAULT_CART);
  const [wishlist, setWishlist] = useState<string[]>(DEFAULT_WISHLIST);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toast, setToast] = useState<{ message: string; actionLabel?: string; actionHref?: string } | null>(null);

  // Always scroll to top (header) on every route change unless navigating to a hash anchor
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nexova_cart_v1");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
      const savedWish = localStorage.getItem("nexova_wishlist_v1");
      if (savedWish) {
        const parsedW = JSON.parse(savedWish);
        if (Array.isArray(parsedW)) setWishlist(parsedW);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nexova_cart_v1", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("nexova_wishlist_v1", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string, actionLabel?: string, actionHref?: string) => {
    setToast({ message, actionLabel, actionHref });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3800);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    color = product.colors[0]?.name || "Default",
    edition = product.editions[0] || "Standard"
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.product.slug === product.slug);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
          selectedColor: color,
          selectedEdition: edition,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color,
          selectedEdition: edition,
        },
      ];
    });
    showToast(`Added "${product.title}" to Cart`, "View Cart", "/cart");
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((item) => item.product.slug !== slug));
    showToast("Item removed from your cart");
  };

  const updateCartQty = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.slug === slug ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setDiscountPercent(0);
  };

  const toggleWishlist = (slugOrProduct: string | Product) => {
    const slug = typeof slugOrProduct === "string" ? slugOrProduct : slugOrProduct.slug;
    const prod = PRODUCTS.find((p) => p.slug === slug);
    setWishlist((prev) => {
      const exists = prev.includes(slug);
      if (exists) {
        showToast(`Removed "${prod?.title || "Item"}" from Wishlist`);
        return prev.filter((s) => s !== slug);
      } else {
        showToast(`Saved "${prod?.title || "Item"}" to Wishlist`, "Wishlist", "/wishlist");
        return [...prev, slug];
      }
    });
  };

  const isInWishlist = (slug: string) => wishlist.includes(slug);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NEXOVA30" || clean === "BUNDLE30") {
      setCouponCode(clean);
      setDiscountPercent(30);
      showToast("Coupon applied: 30% OFF unlocked!");
      return { success: true, message: "30% Bundle Discount applied!" };
    }
    if (clean === "WELCOME10" || clean === "SAVE10") {
      setCouponCode(clean);
      setDiscountPercent(10);
      showToast("Coupon applied: 10% OFF unlocked!");
      return { success: true, message: "10% Welcome Discount applied!" };
    }
    return {
      success: false,
      message: "Invalid code. Try NEXOVA30 (30% off) or WELCOME10 (10% off).",
    };
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingCost = afterDiscount === 0 || afterDiscount >= 500 ? 0 : 19;
  const total = afterDiscount + shippingCost;

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        couponCode,
        discountPercent,
        cartCount,
        wishlistCount,
        subtotal,
        discountAmount,
        shippingCost,
        total,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        showToast,
      }}
    >
      {children}

      {/* Global Floating Action Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-7 right-4 sm:right-7 z-50 max-w-[380px] bg-[#141233] text-white border border-white/15 rounded-[16px] px-4 py-3.5 shadow-[0_20px_50px_rgba(12,11,34,0.45)] flex items-center gap-3.5 animate-fade-up">
          <span className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 text-[14px] font-bold">
            ✓
          </span>
          <div className="flex-1 min-w-0 text-[13px] font-semibold leading-snug line-clamp-2">
            {toast.message}
          </div>
          {toast.actionLabel && toast.actionHref && (
            <Link
              href={toast.actionHref}
              onClick={() => setToast(null)}
              className="px-3 py-1.5 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              {toast.actionLabel}
            </Link>
          )}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return ctx;
}

