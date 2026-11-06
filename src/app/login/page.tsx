"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { useStore } from "@/lib/StoreContext";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { loginCustomer, customer, isAuthenticated, showToast } = useStore();

  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState(customer.email || "alex.morgan@nexova.io");
  const [password, setPassword] = useState("NexovaVIP@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP Login State
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["4", "8", "2", "9", "1", "6"]);

  // Forgot Password Modal State
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("alex.morgan@nexova.io");
  const [resetSent, setResetSent] = useState(false);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginCustomer({ email });
    router.push("/account");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      showToast(`6-digit security OTP sent to ${email}`);
      return;
    }
    loginCustomer({ email });
    router.push("/account");
  };

  const handleSocialLogin = (provider: string) => {
    loginCustomer({
      email: "alex.morgan@nexova.io",
      name: `Alex Morgan (${provider})`,
    });
    router.push("/account");
  };

  const handleOtpChange = (idx: number, val: string) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[idx] = clean;
    setOtpDigits(next);
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="NEXOVA CUSTOMER AUTHENTICATION"
        title="Customer Sign In &"
        highlight="VIP Member Access"
        subtitle="Access your complete Nexova Customer Panel—track live GPS shipments, manage 2-Year Care+ device warranties, redeem VIP points, and download GST/Tax invoices."
        breadcrumbs={[
          { label: "Customer Panel", href: "/account" },
          { label: "Customer Login" },
        ]}
        rightStats={[
          { value: "256-Bit", label: "Encrypted Auth" },
          { value: "2-Year", label: "Warranty Vault" },
          { value: "5% Back", label: "VIP Cashback" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {/* Top Portal Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#eaeaea]">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-[#141233] text-white text-[12.5px] font-extrabold uppercase tracking-wider shadow-sm"
            >
              🔐 Customer Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-full bg-[#f4f5f9] hover:bg-[#eef2ff] text-[#333333] hover:text-[#4f46e5] text-[12.5px] font-extrabold uppercase tracking-wider transition-colors"
            >
              ✨ Customer Signup (+500 Pts)
            </Link>
            <Link
              href="/account"
              className="px-5 py-2.5 rounded-full bg-[#eef2ff] hover:bg-[#4f46e5] text-[#4f46e5] hover:text-white text-[12.5px] font-extrabold uppercase tracking-wider transition-colors"
            >
              📊 Open Customer Panel →
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3 text-[13px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] font-bold">
                ● Active Session: {customer.name}
              </span>
              <Link
                href="/account"
                className="font-extrabold text-[#4f46e5] hover:underline"
              >
                Go to Dashboard →
              </Link>
            </div>
          )}
        </div>

        {/* Main 12-Col Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-[1260px] mx-auto">
          {/* Left 6 Cols: Advanced Customer Login Card */}
          <div className="lg:col-span-6 rounded-[28px] border border-[#e6e8f0] bg-white p-6 sm:p-10 shadow-[0_22px_60px_rgba(20,18,51,0.08)]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[11px] font-extrabold uppercase tracking-wider">
                OFFICIAL CUSTOMER PORTAL
              </span>
              <span className="text-[12px] font-bold text-[#10b981]">
                🛡️ Passkey & 2FA Ready
              </span>
            </div>

            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#141233] mt-2">
              Welcome Back to Nexova
            </h2>
            <p className="text-[14px] text-[#666666] mt-1 mb-6">
              Sign in with your email, password, or instant 6-digit one-time security code.
            </p>

            {/* Dual Login Mode Switcher: Password vs Instant OTP */}
            <div className="grid grid-cols-2 p-1.5 rounded-[14px] bg-[#f4f5f9] mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`py-2.5 rounded-[10px] text-[12.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  loginMethod === "password"
                    ? "bg-[#141233] text-white shadow-sm"
                    : "text-[#555555] hover:text-[#141233]"
                }`}
              >
                🔑 Email & Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("otp")}
                className={`py-2.5 rounded-[10px] text-[12.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  loginMethod === "otp"
                    ? "bg-[#4f46e5] text-white shadow-sm"
                    : "text-[#555555] hover:text-[#141233]"
                }`}
              >
                📱 Instant OTP Code
              </button>
            </div>

            {loginMethod === "password" ? (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Customer Email or Phone *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@nexova.io"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[12px] font-extrabold uppercase tracking-wider text-[#141233]">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotModalOpen(true);
                        setResetSent(false);
                      }}
                      className="text-[12px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-[48px] pl-4 pr-20 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[8px] bg-[#eef2ff] text-[#4f46e5] text-[11px] font-extrabold uppercase cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 text-[13px] text-[#555555] font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-[#4f46e5] rounded"
                    />
                    <span>Keep me signed in for 30 days</span>
                  </label>
                  <span className="text-[11.5px] font-semibold text-[#888888]">
                    SSL Encrypted
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-shine w-full h-[50px] rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[13px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Sign In to Customer Panel →
                </button>

                {/* 1-Click VIP Demo Fill & Login */}
                <button
                  type="button"
                  onClick={() => {
                    loginCustomer({
                      email: "alex.morgan@nexova.io",
                      name: "Alex Morgan",
                    });
                    router.push("/account");
                  }}
                  className="w-full h-[44px] rounded-full border border-[#4f46e5]/35 bg-[#eef2ff]/60 hover:bg-[#eef2ff] text-[#4f46e5] text-[12px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  ⚡ 1-Click Instant VIP Demo Customer Login
                </button>
              </form>
            ) : (
              /* OTP Passwordless Login Form */
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Registered Email or Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@nexova.io or +1 888-456-7890"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                  />
                </div>

                {otpSent && (
                  <div className="p-4 rounded-[16px] bg-[#f8f9fc] border border-[#e2e5f0] space-y-3 animate-fade-up">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-extrabold uppercase text-[#141233]">
                        Enter 6-Digit Verification Code
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpDigits(["7", "3", "9", "2", "0", "4"]);
                          showToast("New OTP code auto-filled!");
                        }}
                        className="text-[11.5px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                      >
                        Resend / Auto-Fill Code
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          aria-label={`OTP digit ${idx + 1}`}
                          className="h-[48px] rounded-[10px] border-2 border-[#4f46e5] bg-white text-center text-[18px] font-extrabold text-[#141233] focus:outline-none"
                        />
                      ))}
                    </div>
                    <p className="text-[11.5px] text-[#10b981] font-semibold">
                      ✓ Demo OTP pre-filled for instant verification
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-shine w-full h-[50px] rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[13px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  {otpSent ? "Verify OTP & Open Customer Panel →" : "Send 6-Digit OTP Code →"}
                </button>
              </form>
            )}

            {/* Social OAuth Quick Login Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-[#eaeaea]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">
                Or Continue With Social ID
              </span>
              <div className="h-[1px] flex-1 bg-[#eaeaea]" />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: "Google", icon: "G" },
                { name: "Apple ID", icon: "" },
                { name: "Passkey", icon: "🔑" },
              ].map((soc) => (
                <button
                  key={soc.name}
                  type="button"
                  onClick={() => handleSocialLogin(soc.name)}
                  className="h-[44px] rounded-[12px] border border-[#dcdce5] hover:border-[#4f46e5] bg-white hover:bg-[#fafbfe] flex items-center justify-center gap-2 text-[12.5px] font-bold text-[#141233] transition-all cursor-pointer"
                >
                  <span className="text-[15px] font-extrabold text-[#4f46e5]">{soc.icon}</span>
                  <span>{soc.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#f0f0f0] text-center text-[13.5px] text-[#555555]">
              Don’t have a Nexova Customer Account yet?{" "}
              <Link
                href="/register"
                className="font-extrabold text-[#4f46e5] hover:underline"
              >
                Create Free Account (+500 VIP Points) →
              </Link>
            </div>
          </div>

          {/* Right 6 Cols: Customer Panel Preview & Member Benefits */}
          <div className="lg:col-span-6 space-y-6">
            {/* Dark Gradient Customer Portal Showcase Card */}
            <div
              className="rounded-[28px] p-7 sm:p-8 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0b0a1f 0%, #1d1a4e 55%, #4f46e5 100%)",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/15 text-[10.5px] font-extrabold uppercase tracking-wider text-[#38bdf8]">
                  NEXOVA PLATINUM ECOSYSTEM
                </span>
                <span className="text-[12px] font-bold text-white/80">
                  Member ID: #NX-VIP-88421
                </span>
              </div>

              <h3 className="text-[24px] sm:text-[28px] font-extrabold leading-tight mb-3">
                Everything Inside Your Nexova Customer Panel
              </h3>
              <p className="text-[14px] text-white/80 leading-relaxed mb-6">
                One unified dashboard to track high-value electronics, manage Care+ hardware replacements, and spend cashback rewards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {[
                  {
                    icon: "📦",
                    title: "Live GPS Order Tracking",
                    desc: "Real-time hub telemetry, courier contact & downloadable GST/Tax invoices.",
                  },
                  {
                    icon: "🛡️",
                    title: "2-Year Care+ Warranty Vault",
                    desc: "Auto-registered serial numbers with 1-click express replacement claims.",
                  },
                  {
                    icon: "💳",
                    title: "Nexova Pay Wallet & Points",
                    desc: "Earn 5% cashback points on every order & convert directly into wallet cash.",
                  },
                  {
                    icon: "🎧",
                    title: "24/7 Priority Tech Concierge",
                    desc: "Direct ticket line to certified acoustic, PC, and camera engineers.",
                  },
                ].map((perk) => (
                  <div
                    key={perk.title}
                    className="p-4 rounded-[16px] bg-white/10 backdrop-blur-xs border border-white/15"
                  >
                    <div className="text-[18px] mb-1">{perk.icon}</div>
                    <div className="text-[14px] font-extrabold text-white">
                      {perk.title}
                    </div>
                    <p className="text-[12px] text-white/75 mt-1 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[18px] overflow-hidden border border-white/15 bg-[#0b0a1f]/60">
                <img
                  src="/assets/security-shield.svg"
                  alt="Nexova Customer Security"
                  className="w-full h-[170px] object-contain"
                />
              </div>
            </div>

            {/* Quick Customer Support & Order Lookup Card */}
            <div className="rounded-[22px] border border-[#eaeaea] bg-[#fafbfe] p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                  GUEST ORDER LOOKUP
                </div>
                <h4 className="text-[17px] font-extrabold text-[#141233] mt-0.5">
                  Tracking an order without signing in?
                </h4>
                <p className="text-[13px] text-[#666666]">
                  Use your Order ID (#NX-884920) on our Live GPS Tracker page.
                </p>
              </div>
              <Link
                href="/track-order"
                className="px-5 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider transition-colors"
              >
                Track Guest Order →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div
          onClick={() => setForgotModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[460px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl relative animate-fade-up"
          >
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f4f5f9] hover:bg-[#4f46e5] hover:text-white font-bold flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
              ACCOUNT RECOVERY
            </span>
            <h3 className="text-[22px] font-extrabold text-[#141233] mt-1 mb-2">
              Reset Your Password
            </h3>
            <p className="text-[13.5px] text-[#666666] mb-5">
              Enter your registered email address and we’ll send an instant password reset link and temporary security code.
            </p>

            {resetSent ? (
              <div className="p-4 rounded-[16px] bg-[#ecfdf5] border border-[#10b981]/30 text-[#065f46] text-[13.5px] font-semibold space-y-3">
                <div>
                  ✓ Reset link & temporary code sent to <strong>{resetEmail}</strong>!
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setLoginMethod("otp");
                    setOtpSent(true);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#141233] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Sign In with Temporary OTP Now →
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetSent(true);
                  showToast(`Password recovery email sent to ${resetEmail}`);
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-[46px] px-4 rounded-[12px] border border-[#dcdce5] text-[14px]"
                />
                <button
                  type="submit"
                  className="btn-shine w-full py-3 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  Send Recovery Link →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
