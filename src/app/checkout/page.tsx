"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { useStore } from "@/lib/StoreContext";

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    subtotal,
    discountPercent,
    discountAmount,
    shippingCost,
    total,
    couponCode,
    applyCoupon,
    clearCart,
  } = useStore();

  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@nexova.io");
  const [phone, setPhone] = useState("+1 (555) 234-8910");
  const [address, setAddress] = useState("452 Broadway, Suite 4B");
  const [city, setCity] = useState("New York");
  const [zip, setZip] = useState("10013");
  const [country, setCountry] = useState("United States");

  const [deliveryMethod, setDeliveryMethod] = useState<"express" | "sameday">("express");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8891");
  const [cardExpiry, setCardExpiry] = useState("09/29");
  const [cardCvc, setCardCvc] = useState("842");

  const [promoInput, setPromoInput] = useState(couponCode || "");
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  const extraShipping = deliveryMethod === "sameday" ? 15 : 0;
  const finalTotal = total + extraShipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedTotal(finalTotal);
    setOrderPlacedId("NX-98421");
    clearCart();
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="256-BIT ENCRYPTED EXPRESS CHECKOUT"
        title="Complete Your"
        highlight="Nexova Order"
        subtitle="Fast, tokenized PCI-DSS Level 1 checkout with instant order confirmation and live GPS shipment tracking."
        breadcrumbs={[
          { label: "Shopping Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {orderPlacedId ? (
          <div className="max-w-[740px] mx-auto rounded-[28px] border border-[#86efac] bg-[#f0fdf4] p-8 sm:p-12 text-center space-y-5 shadow-xl animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-[#10b981] text-white text-[30px] font-bold flex items-center justify-center mx-auto shadow-md">
              ✓
            </div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#10b981]/15 text-[#065f46] text-[11.5px] font-extrabold uppercase tracking-widest">
              ORDER CONFIRMED & ALLOCATED
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#141233]">
              Thank You, {fullName}!
            </h2>
            <p className="text-[15px] text-[#444444] max-w-[540px] mx-auto leading-relaxed">
              Your order <strong className="text-[#141233]">#{orderPlacedId}</strong> totaling{" "}
              <strong className="text-[#4f46e5]">${confirmedTotal.toFixed(2)}</strong> has been confirmed and sent to our Los Angeles Fulfillment Lab. A receipt was emailed to{" "}
              <strong>{email}</strong>.
            </p>

            <div className="p-5 rounded-[18px] bg-white border border-[#dcfce7] text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
              <div>
                <div className="text-[#777777] text-[11px] uppercase font-bold">Order ID</div>
                <div className="font-extrabold text-[#141233] mt-0.5">#{orderPlacedId}</div>
              </div>
              <div>
                <div className="text-[#777777] text-[11px] uppercase font-bold">Shipping To</div>
                <div className="font-extrabold text-[#141233] mt-0.5">
                  {city}, {country}
                </div>
              </div>
              <div>
                <div className="text-[#777777] text-[11px] uppercase font-bold">Est. Delivery</div>
                <div className="font-extrabold text-[#10b981] mt-0.5">
                  Tomorrow by 6:00 PM
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href={`/track-order?order=${orderPlacedId}`}
                className="btn-shine px-8 py-3.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-extrabold uppercase tracking-wider"
              >
                Track Live Order #{orderPlacedId} →
              </Link>
              <Link
                href="/shop"
                className="px-7 py-3.5 rounded-full border border-[#141233] text-[#141233] text-[12.5px] font-extrabold uppercase tracking-wider"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Shipping, Delivery & Payment Steps */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Shipping Information */}
              <div className="rounded-[24px] border border-[#eaeaea] bg-white p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#f0f0f0]">
                  <span className="w-7 h-7 rounded-full bg-[#141233] text-white text-[12px] font-extrabold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-[19px] font-extrabold text-[#141233]">
                    Shipping & Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Email Address (For Tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Country / Region *
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[14px]"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>India</option>
                      <option>Canada</option>
                      <option>Thailand</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#141233] mb-1">
                    Street Address & Suite *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Speed */}
              <div className="rounded-[24px] border border-[#eaeaea] bg-white p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#f0f0f0]">
                  <span className="w-7 h-7 rounded-full bg-[#141233] text-white text-[12px] font-extrabold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-[19px] font-extrabold text-[#141233]">
                    Shipping Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("express")}
                    className={`p-4 rounded-[16px] border-2 text-left transition-all cursor-pointer ${
                      deliveryMethod === "express"
                        ? "border-[#4f46e5] bg-[#eef2ff]/60"
                        : "border-[#eaeaea] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-[14px] text-[#141233]">
                      <span>Insured Express Air</span>
                      <span className="text-[#10b981]">
                        {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#666666] mt-1">
                      1–2 Business Days • Full GPS Telemetry
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("sameday")}
                    className={`p-4 rounded-[16px] border-2 text-left transition-all cursor-pointer ${
                      deliveryMethod === "sameday"
                        ? "border-[#4f46e5] bg-[#eef2ff]/60"
                        : "border-[#eaeaea] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-[14px] text-[#141233]">
                      <span>Same-Day Priority Courier</span>
                      <span className="text-[#4f46e5]">+$15.00</span>
                    </div>
                    <p className="text-[12px] text-[#666666] mt-1">
                      Arrives Today by 8:00 PM • Direct Van
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="rounded-[24px] border border-[#eaeaea] bg-white p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#f0f0f0]">
                  <span className="w-7 h-7 rounded-full bg-[#141233] text-white text-[12px] font-extrabold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-[19px] font-extrabold text-[#141233]">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "card", label: "💳 Credit / Debit" },
                    { id: "paypal", label: "⚡ PayPal / UPI" },
                    { id: "cod", label: "📦 Pay on Delivery" },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as typeof paymentMethod)}
                      className={`py-3 px-3 rounded-[12px] border text-[12.5px] font-extrabold transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? "border-[#141233] bg-[#141233] text-white"
                          : "border-[#dcdce5] bg-[#fafbfe] text-[#444444]"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[12px] font-bold text-[#141233] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#141233] mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#141233] mb-1">
                          Security Code (CVC)
                        </label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="p-4 rounded-[14px] bg-[#f8f9fc] border border-[#e2e8f0] text-[13.5px] text-[#444444]">
                    You will be connected to Express Instant Auth to complete your payment with zero fees.
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="p-4 rounded-[14px] bg-[#f8f9fc] border border-[#e2e8f0] text-[13.5px] text-[#444444]">
                    Pay via Cash, Card, or QR upon doorstep inspection when our courier delivers your package.
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Order Summary */}
            <div className="lg:col-span-5 rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 sm:p-8 space-y-5 sticky top-24">
              <h3 className="text-[20px] font-extrabold text-[#141233] pb-3 border-b border-[#e5e7f0]">
                Order Review ({cartCount} Items)
              </h3>

              <div className="space-y-3 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.slug}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-[12px] bg-white border border-[#eceef5]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-[8px] object-contain bg-[#fafafa] p-1 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-[#141233] truncate">
                          {item.product.title}
                        </div>
                        <div className="text-[11px] text-[#777777]">
                          Qty: {item.quantity} • {item.selectedColor}
                        </div>
                      </div>
                    </div>
                    <span className="text-[13.5px] font-extrabold text-[#141233] shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Coupon (NEXOVA30)"
                  className="flex-1 h-[40px] px-3.5 rounded-[10px] bg-white border border-[#dcdce5] text-[13px] font-bold uppercase"
                />
                <button
                  type="button"
                  onClick={() => applyCoupon(promoInput)}
                  className="px-4 h-[40px] rounded-[10px] bg-[#141233] text-white text-[12px] font-bold uppercase cursor-pointer"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-2 text-[14px] pt-3 border-t border-[#e5e7f0]">
                <div className="flex justify-between text-[#555555]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#141233]">${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#10b981] font-bold">
                    <span>Discount (-{discountPercent}%)</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#555555]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#141233]">
                    {shippingCost + extraShipping === 0
                      ? "FREE"
                      : `$${(shippingCost + extraShipping).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[20px] font-extrabold text-[#141233] pt-3 border-t border-[#e5e7f0]">
                  <span>Total Due</span>
                  <span className="text-[#4f46e5]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-shine w-full py-4 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[13.5px] font-extrabold uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
              >
                🔒 Complete Order • ${finalTotal.toFixed(2)}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

