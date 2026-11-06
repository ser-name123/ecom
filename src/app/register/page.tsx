"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { useStore } from "@/lib/StoreContext";

const TECH_INTERESTS = [
  "Pro Laptops",
  "5G Smartphones",
  "Hi-Res Audio",
  "8K Cameras",
  "Gaming & VR",
  "Smartwatches",
  "Custom PCs",
  "Smart Home",
];

export default function CustomerSignupPage() {
  const router = useRouter();
  const { registerCustomer, showToast } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [referralCode, setReferralCode] = useState("WELCOME500");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Pro Laptops",
    "5G Smartphones",
    "Hi-Res Audio",
  ]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  // Live Password Strength Checks
  const passChecks = useMemo(() => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = Object.values(passChecks).filter(Boolean).length;
  const strengthLabel =
    strengthScore === 0
      ? "Enter a password"
      : strengthScore === 1
        ? "Weak"
        : strengthScore === 2
          ? "Fair"
          : strengthScore === 3
            ? "Strong"
            : "Military-Grade";

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && confirmPassword && password !== confirmPassword) {
      showToast("Passwords do not match. Please verify.");
      return;
    }
    const bonus = referralCode.trim().toUpperCase() === "WELCOME500" ? 500 : 250;
    registerCustomer({
      name: fullName || "Alex Morgan",
      email: email || "alex.morgan@nexova.io",
      phone: `${countryCode} ${phone || "(888) 456-7890"}`,
      interests: selectedInterests,
      bonusPoints: bonus,
    });
    router.push("/account");
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="JOIN NEXOVA VIP CLUB"
        title="Create Customer Account &"
        highlight="Claim 500 Free Points"
        subtitle="Register in 30 seconds to unlock automatic 2-Year Nexova Care+ warranty registration, 5% cashback points on every order, and member-only bundle discounts."
        breadcrumbs={[
          { label: "Customer Panel", href: "/account" },
          { label: "Customer Signup" },
        ]}
        rightStats={[
          { value: "+500 Pts", label: "Welcome Bonus" },
          { value: "2-Year", label: "Care+ Coverage" },
          { value: "Free", label: "VIP Membership" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        {/* Top Portal Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#eaeaea]">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-[#f4f5f9] hover:bg-[#eef2ff] text-[#333333] hover:text-[#4f46e5] text-[12.5px] font-extrabold uppercase tracking-wider transition-colors"
            >
              🔐 Customer Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-full bg-[#4f46e5] text-white text-[12.5px] font-extrabold uppercase tracking-wider shadow-sm"
            >
              ✨ Customer Signup (+500 Pts)
            </Link>
            <Link
              href="/account"
              className="px-5 py-2.5 rounded-full bg-[#eef2ff] hover:bg-[#141233] text-[#4f46e5] hover:text-white text-[12.5px] font-extrabold uppercase tracking-wider transition-colors"
            >
              📊 Open Customer Panel →
            </Link>
          </div>
          <span className="text-[12.5px] font-bold text-[#10b981]">
            🎁 Promo Code WELCOME500 Auto-Applied (+500 VIP Points)
          </span>
        </div>

        {/* Main 12-Col Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-[1280px] mx-auto">
          {/* Left 7 Cols: Rich Customer Registration Form */}
          <div className="lg:col-span-7 rounded-[28px] border border-[#e6e8f0] bg-white p-6 sm:p-10 shadow-[0_22px_60px_rgba(20,18,51,0.08)]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[11px] font-extrabold uppercase tracking-wider">
                NEW CUSTOMER REGISTRATION
              </span>
              <span className="text-[12px] font-bold text-[#4f46e5]">
                ⚡ Instant Activation
              </span>
            </div>

            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#141233] mt-2">
              Create Your Nexova Account
            </h2>
            <p className="text-[14px] text-[#666666] mt-1 mb-6">
              Complete your profile below to activate your VIP Customer Panel and claim 500 welcome points.
            </p>

            <form onSubmit={handleSignupSubmit} className="space-y-5">
              {/* Row 1: Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Alex Morgan"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Email Address *
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
              </div>

              {/* Row 2: Mobile Phone + Welcome Bonus Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Mobile Phone (For SMS GPS Alerts) *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                      className="h-[48px] px-2.5 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] text-[13.5px] font-bold text-[#141233]"
                    >
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+66">🇹🇭 +66</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(888) 456-7890"
                      className="flex-1 h-[48px] px-4 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    VIP Referral / Bonus Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="WELCOME500"
                      className="w-full h-[48px] pl-4 pr-24 rounded-[12px] border border-[#4f46e5] bg-[#eef2ff]/40 text-[14px] font-extrabold text-[#4f46e5] uppercase"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-[#10b981] text-white text-[10px] font-extrabold uppercase">
                      +500 PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Password + Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full h-[48px] pl-4 pr-16 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-extrabold uppercase text-[#4f46e5] cursor-pointer"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#141233] mb-1.5">
                    Confirm Password *
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full h-[48px] px-4 rounded-[12px] border border-[#dcdce5] bg-[#fafbfe] focus:bg-white focus:border-[#4f46e5] focus:outline-none text-[14px] font-medium"
                  />
                </div>
              </div>

              {/* Live Password Strength Meter */}
              <div className="p-3.5 rounded-[14px] bg-[#f8f9fc] border border-[#e6e8f0]">
                <div className="flex items-center justify-between text-[11.5px] font-bold mb-2">
                  <span className="text-[#141233]">Password Security Strength:</span>
                  <span
                    className={
                      strengthScore >= 3
                        ? "text-[#10b981]"
                        : strengthScore === 2
                          ? "text-[#f59e0b]"
                          : "text-[#4f46e5]"
                    }
                  >
                    {strengthLabel}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5 mb-2.5">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`rounded-full transition-colors ${
                        strengthScore >= bar
                          ? strengthScore >= 3
                            ? "bg-[#10b981]"
                            : "bg-[#4f46e5]"
                          : "bg-[#e2e4ec]"
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold">
                  <span className={passChecks.length ? "text-[#10b981]" : "text-[#888888]"}>
                    {passChecks.length ? "✓" : "○"} 8+ Characters
                  </span>
                  <span className={passChecks.upper ? "text-[#10b981]" : "text-[#888888]"}>
                    {passChecks.upper ? "✓" : "○"} Uppercase (A-Z)
                  </span>
                  <span className={passChecks.number ? "text-[#10b981]" : "text-[#888888]"}>
                    {passChecks.number ? "✓" : "○"} Number (0-9)
                  </span>
                  <span className={passChecks.symbol ? "text-[#10b981]" : "text-[#888888]"}>
                    {passChecks.symbol ? "✓" : "○"} Symbol (!@#$)
                  </span>
                </div>
              </div>

              {/* Tech Preferences Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-[#141233]">
                    Personalize Your Tech Feed (Select Interests)
                  </label>
                  <span className="text-[11px] font-bold text-[#4f46e5]">
                    {selectedInterests.length} Selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TECH_INTERESTS.map((tag) => {
                    const active = selectedInterests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                          active
                            ? "bg-[#4f46e5] text-white shadow-xs"
                            : "bg-[#f4f5f9] text-[#555555] hover:bg-[#e5e7f0]"
                        }`}
                      >
                        {active ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1 text-[13px] text-[#555555]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#4f46e5] rounded"
                  />
                  <span>
                    Auto-register my purchases for the <strong>2-Year Nexova Care+ Warranty</strong> & send flash-sale alerts.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#4f46e5] rounded"
                  />
                  <span>
                    I agree to Nexova’s{" "}
                    <Link href="/terms-conditions" className="text-[#4f46e5] font-bold hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-[#4f46e5] font-bold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-shine w-full h-[52px] rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[13.5px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
              >
                Create Customer Account & Claim 500 Points →
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#f0f0f0] text-center text-[13.5px] text-[#555555]">
              Already have a Nexova Customer Account?{" "}
              <Link
                href="/login"
                className="font-extrabold text-[#4f46e5] hover:underline"
              >
                Sign In Here →
              </Link>
            </div>
          </div>

          {/* Right 5 Cols: VIP Membership Tiers & Instant Bonus Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Welcome Bonus Highlight Card */}
            <div
              className="rounded-[26px] p-7 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #141233 0%, #2a2468 55%, #4f46e5 100%)",
              }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[10.5px] font-extrabold uppercase tracking-wider text-[#38bdf8] mb-3">
                INSTANT SIGNUP REWARD
              </span>
              <h3 className="text-[24px] font-extrabold leading-tight mb-2">
                Get 500 VIP Points (AED 5.00 Value) Instantly
              </h3>
              <p className="text-[13.5px] text-white/80 leading-relaxed mb-5">
                Every new customer account starts with 500 bonus points in their Nexova Wallet plus a 30% Bundle Coupon (`NEXOVA30`).
              </p>

              <div className="space-y-3">
                {[
                  { tier: "Silver Member (Free)", pts: "0 – 999 Pts", perk: "3% Cashback + Free Shipping AED 500+" },
                  { tier: "Gold VIP", pts: "1,000 – 2,000 Pts", perk: "4% Cashback + Priority Dispatch" },
                  { tier: "Platinum VIP", pts: "2,000+ Pts", perk: "5% Cashback + 2-Yr Care+ Express Swap" },
                ].map((t, i) => (
                  <div
                    key={t.tier}
                    className={`p-3.5 rounded-[14px] border ${
                      i === 2
                        ? "bg-white/15 border-[#38bdf8]"
                        : "bg-white/8 border-white/12"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[13px] font-extrabold">
                      <span>{t.tier}</span>
                      <span className="text-[#38bdf8]">{t.pts}</span>
                    </div>
                    <div className="text-[12px] text-white/80 mt-0.5">{t.perk}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Register Card */}
            <div className="rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 space-y-4">
              <h4 className="text-[18px] font-extrabold text-[#141233]">
                Why 1.2M+ Tech Enthusiasts Join Nexova
              </h4>
              <ul className="space-y-3 text-[13px] text-[#444444]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    <strong>Paperless Warranty Vault:</strong> Never lose a receipt—all serial numbers are stored in your Customer Panel.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    <strong>1-Click Reorder & Invoices:</strong> Download official GST/Tax PDF invoices anytime for business expenses.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>
                    <strong>Price-Drop Protection:</strong> Get automatic wallet credits if an item you bought drops in price within 14 days.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
