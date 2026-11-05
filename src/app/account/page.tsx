"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { SAMPLE_ORDERS } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function AccountPage({
  defaultAuthMode = "login",
}: {
  defaultAuthMode?: "login" | "register" | "dashboard";
}) {
  const [view, setView] = useState<"login" | "register" | "dashboard">(defaultAuthMode);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "security">(
    "overview"
  );
  const [userName, setUserName] = useState("Alex Morgan");
  const [userEmail, setUserEmail] = useState("alex.morgan@nexova.io");
  const [password, setPassword] = useState("••••••••••••");

  const { wishlistCount, cartCount, showToast } = useStore();
  const ordersList = Object.values(SAMPLE_ORDERS);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView("dashboard");
    showToast(`Welcome back, ${userName}!`);
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="NEXOVA MEMBER PORTAL"
        title={view === "dashboard" ? `Welcome, ${userName}` : "My Account &"}
        highlight={view === "dashboard" ? "• VIP Platinum" : "Member Access"}
        subtitle="Manage your orders, 2-Year Nexova Care+ hardware warranties, saved shipping addresses, and member rewards in one place."
        breadcrumbs={[{ label: "My Account" }]}
        rightStats={[
          { value: "2,450", label: "Nexova Points" },
          { value: `${ordersList.length}`, label: "Active Orders" },
          { value: `${wishlistCount}`, label: "Saved Wishlist" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {/* Top Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#eaeaea]">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setView("login")}
              className={`px-5 py-2.5 rounded-full text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer transition-all ${
                view === "login"
                  ? "bg-[#141233] text-white"
                  : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setView("register")}
              className={`px-5 py-2.5 rounded-full text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer transition-all ${
                view === "register"
                  ? "bg-[#4f46e5] text-white"
                  : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setView("dashboard")}
              className={`px-5 py-2.5 rounded-full text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer transition-all ${
                view === "dashboard"
                  ? "bg-[#10b981] text-white"
                  : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
              }`}
            >
              Member Dashboard (Demo)
            </button>
          </div>
          {view === "dashboard" && (
            <button
              type="button"
              onClick={() => {
                setView("login");
                showToast("Signed out safely");
              }}
              className="text-[12.5px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
            >
              Sign Out →
            </button>
          )}
        </div>

        {view !== "dashboard" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-[1120px] mx-auto">
            {/* Left 6 Cols: Auth Form */}
            <div className="lg:col-span-6 rounded-[24px] border border-[#eaeaea] bg-white p-7 sm:p-9 shadow-[0_18px_45px_rgba(20,18,51,0.07)]">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#4f46e5]">
                {view === "login" ? "WELCOME BACK" : "JOIN NEXOVA VIP"}
              </span>
              <h2 className="text-[26px] font-extrabold text-[#141233] mt-1 mb-5">
                {view === "login" ? "Sign In to Your Account" : "Create Your Member Account"}
              </h2>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {view === "register" && (
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[12px] font-bold text-[#141233] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="alex.morgan@nexova.io"
                    className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#141233] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shine w-full py-3.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[13px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {view === "login" ? "Sign In & Open Dashboard →" : "Create Account & Claim 500 Pts →"}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-[#f0f0f0] text-center text-[13px] text-[#666666]">
                {view === "login" ? (
                  <>
                    New to Nexova?{" "}
                    <button
                      type="button"
                      onClick={() => setView("register")}
                      className="font-extrabold text-[#4f46e5] hover:underline cursor-pointer"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="font-extrabold text-[#4f46e5] hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right 6 Cols: Member Perks Card */}
            <div className="lg:col-span-6 space-y-5">
              <div className="rounded-[24px] overflow-hidden bg-[#0c0b22] border border-[#eaeaea]">
                <img
                  src="/assets/security-shield.svg"
                  alt="Nexova Member Security"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[16px] bg-[#fafbfe] border border-[#eceef5]">
                  <div className="text-[14px] font-extrabold text-[#141233]">
                    ⚡ Instant Warranty Registry
                  </div>
                  <p className="text-[12px] text-[#666666] mt-1">
                    Every serial number is automatically linked to your account for 1-click Care+ claims.
                  </p>
                </div>
                <div className="p-4 rounded-[16px] bg-[#fafbfe] border border-[#eceef5]">
                  <div className="text-[14px] font-extrabold text-[#141233]">
                    🎁 5% Cashback Points
                  </div>
                  <p className="text-[12px] text-[#666666] mt-1">
                    Earn 5 Nexova Points per $1 spent, redeemable on any future order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Member Dashboard View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
              {[
                { id: "overview", label: "📊 Account Overview" },
                { id: "orders", label: `📦 My Orders (${ordersList.length})` },
                { id: "addresses", label: "📍 Saved Addresses (2)" },
                { id: "security", label: "🔒 Profile & Security" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`w-full text-left px-4 py-3 rounded-[14px] text-[13.5px] font-bold transition-all cursor-pointer ${
                    activeTab === t.id
                      ? "bg-[#141233] text-white shadow-sm"
                      : "bg-[#fafbfe] text-[#444444] hover:bg-[#eef2ff]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <Link
                href="/wishlist"
                className="block px-4 py-3 rounded-[14px] bg-[#fafbfe] hover:bg-[#eef2ff] text-[#444444] text-[13.5px] font-bold"
              >
                ♥ Saved Wishlist ({wishlistCount})
              </Link>
              <Link
                href="/track-order"
                className="block px-4 py-3 rounded-[14px] bg-[#fafbfe] hover:bg-[#eef2ff] text-[#444444] text-[13.5px] font-bold"
              >
                🚚 Live Order Tracker
              </Link>
            </div>

            {/* Dashboard Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {activeTab === "overview" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-[18px] bg-[#141233] text-white">
                      <div className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-bold">
                        VIP REWARDS BALANCE
                      </div>
                      <div className="text-[26px] font-extrabold mt-1">2,450 Pts</div>
                      <div className="text-[12px] text-white/75 mt-1">Worth $24.50 instant credit</div>
                    </div>
                    <div className="p-5 rounded-[18px] border border-[#eaeaea] bg-[#fafbfe]">
                      <div className="text-[11px] uppercase tracking-wider text-[#4f46e5] font-bold">
                        ACTIVE WARRANTIES
                      </div>
                      <div className="text-[26px] font-extrabold text-[#141233] mt-1">3 Devices</div>
                      <div className="text-[12px] text-[#666666] mt-1">Covered through Nov 2028</div>
                    </div>
                    <div className="p-5 rounded-[18px] border border-[#eaeaea] bg-[#fafbfe]">
                      <div className="text-[11px] uppercase tracking-wider text-[#4f46e5] font-bold">
                        CART & WISHLIST
                      </div>
                      <div className="text-[26px] font-extrabold text-[#141233] mt-1">
                        {cartCount} / {wishlistCount}
                      </div>
                      <div className="text-[12px] text-[#666666] mt-1">Items saved across devices</div>
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="rounded-[20px] border border-[#eaeaea] bg-white p-6">
                    <h3 className="text-[18px] font-extrabold text-[#141233] mb-4">
                      Recent Shipments & Orders
                    </h3>
                    <div className="space-y-4">
                      {ordersList.map((ord) => (
                        <div
                          key={ord.orderId}
                          className="p-4 rounded-[16px] border border-[#eceef5] bg-[#fafbfe] flex flex-wrap items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[15px] font-extrabold text-[#141233]">
                                #{ord.orderId}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[11px] font-bold">
                                {ord.status}
                              </span>
                            </div>
                            <div className="text-[12.5px] text-[#666666] mt-1">
                              {ord.items.map((i) => i.title).join(" + ")}
                            </div>
                            <div className="text-[12px] text-[#10b981] font-semibold mt-0.5">
                              Est. Delivery: {ord.estimatedDelivery}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[16px] font-extrabold text-[#141233]">
                              ${ord.totalAmount.toFixed(2)}
                            </span>
                            <Link
                              href={`/track-order?order=${ord.orderId}`}
                              className="px-4 py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-bold uppercase tracking-wider"
                            >
                              Track GPS →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "orders" && (
                <div className="rounded-[20px] border border-[#eaeaea] bg-white p-6 space-y-4">
                  <h3 className="text-[19px] font-extrabold text-[#141233]">
                    All Orders ({ordersList.length})
                  </h3>
                  {ordersList.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-5 rounded-[16px] border border-[#eaeaea] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
                        <div>
                          <span className="font-extrabold text-[#141233]">Order #{ord.orderId}</span>
                          <span className="text-[12px] text-[#777777] ml-3">{ord.carrier}</span>
                        </div>
                        <Link
                          href={`/track-order?order=${ord.orderId}`}
                          className="text-[12px] font-bold text-[#4f46e5] hover:underline"
                        >
                          Live Tracking ({ord.trackingNumber}) →
                        </Link>
                      </div>
                      {ord.items.map((it) => (
                        <div key={it.slug} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.image}
                              alt={it.title}
                              className="w-12 h-12 rounded-[8px] object-contain bg-[#fafafa] p-1 border"
                            />
                            <div>
                              <Link
                                href={`/product/${it.slug}`}
                                className="text-[14px] font-bold text-[#141233] hover:text-[#4f46e5]"
                              >
                                {it.title}
                              </Link>
                              <div className="text-[12px] text-[#777777]">Qty: {it.qty}</div>
                            </div>
                          </div>
                          <span className="font-extrabold text-[#141233]">
                            ${it.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-6 rounded-[20px] border-2 border-[#4f46e5] bg-[#eef2ff]/30">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold uppercase">
                      Default Shipping
                    </span>
                    <h4 className="text-[16px] font-extrabold text-[#141233] mt-3">
                      {userName} (Home Studio)
                    </h4>
                    <p className="text-[13.5px] text-[#555555] mt-1 leading-relaxed">
                      452 Broadway, Suite 4B, SoHo Tech District
                      <br />
                      New York, NY 10013, United States
                      <br />
                      Phone: +1 (555) 234-8910
                    </p>
                  </div>
                  <div className="p-6 rounded-[20px] border border-[#eaeaea] bg-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#141233] text-white text-[10px] font-bold uppercase">
                      Office / Billing
                    </span>
                    <h4 className="text-[16px] font-extrabold text-[#141233] mt-3">
                      Nexova Creative Labs
                    </h4>
                    <p className="text-[13.5px] text-[#555555] mt-1 leading-relaxed">
                      8500 Beverly Blvd, Suite 410
                      <br />
                      Los Angeles, CA 90048, United States
                      <br />
                      Phone: +1 (888) 456-7890
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="rounded-[20px] border border-[#eaeaea] bg-white p-6 space-y-4">
                  <h3 className="text-[18px] font-extrabold text-[#141233]">
                    Profile & Security Preferences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[#141233] mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#141233] mb-1">
                        Account Email
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[14px]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Profile preferences saved!")}
                    className="px-6 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

