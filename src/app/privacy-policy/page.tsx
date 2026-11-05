"use client";

import React, { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import { useStore } from "@/lib/StoreContext";

export default function PrivacyPolicyPage() {
  const { showToast } = useStore();
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="GDPR, CCPA & ISO-27001 DATA PROTECTION"
        title="Privacy Policy &"
        highlight="Data Security Hub"
        subtitle="We believe privacy is a fundamental human right. Learn how Nexova encrypts your data and manage your cookie preferences below."
        breadcrumbs={[{ label: "Privacy Policy" }]}
        rightStats={[
          { value: "256-Bit", label: "TLS Encryption" },
          { value: "Zero", label: "Data Selling" },
          { value: "GDPR", label: "& CCPA Compliant" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: Privacy Sections */}
        <div className="lg:col-span-8 space-y-6">
          {[
            {
              title: "1. Information We Collect & Why",
              body: "When you browse or place an order at Nexova, we collect only the essential information required to fulfill your order, register your 2-Year Nexova Care+ hardware warranty, and provide real-time GPS shipment updates (such as your name, shipping address, email, and tokenized payment confirmation).",
            },
            {
              title: "2. Zero Third-Party Data Selling Guarantee",
              body: "Nexova never sells, rents, or trades your personal information, email list, or purchase history to data brokers or third-party ad networks. Information is shared strictly with logistics partners (such as DHL/FedEx) to deliver your package.",
            },
            {
              title: "3. Payment Security & PCI-DSS Level 1 Tokenization",
              body: "All credit card, UPI, and digital wallet transactions are processed through encrypted PCI-DSS Level 1 vaults using 256-bit TLS encryption. Raw card numbers never touch or persist on Nexova application servers.",
            },
            {
              title: "4. Your GDPR & CCPA Data Rights",
              body: "You have the right to request a complete portable export of your account data, rectify inaccurate details, or trigger permanent one-click account deletion at any time by contacting privacy@nexova.io.",
            },
          ].map((sec) => (
            <div
              key={sec.title}
              className="p-6 rounded-[20px] border border-[#eaeaea] bg-[#fafbfe]"
            >
              <h2 className="text-[18px] font-extrabold text-[#141233] mb-2">
                {sec.title}
              </h2>
              <p className="text-[14px] text-[#555555] leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Right 4 Cols: Interactive Privacy & Cookie Control Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-[22px] overflow-hidden bg-[#0c0b22] border border-[#eaeaea]">
            <img
              src="/assets/security-shield.svg"
              alt="Data Protection Shield"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="p-6 rounded-[22px] border border-[#eaeaea] bg-white space-y-4">
            <h3 className="text-[18px] font-extrabold text-[#141233]">
              Live Cookie & Telemetry Controls
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-[#f0f0f0]">
              <div>
                <div className="text-[13.5px] font-bold text-[#141233]">
                  Essential Cart & Security
                </div>
                <div className="text-[11.5px] text-[#777777]">Always active for checkout</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-[11px] font-bold">
                Required
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#f0f0f0]">
              <div>
                <div className="text-[13.5px] font-bold text-[#141233]">
                  Performance Analytics
                </div>
                <div className="text-[11.5px] text-[#777777]">Anonymous speed metrics</div>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-5 h-5 accent-[#4f46e5] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-[13.5px] font-bold text-[#141233]">
                  Personalized Offers
                </div>
                <div className="text-[11.5px] text-[#777777]">Bundle deal reminders</div>
              </div>
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-5 h-5 accent-[#4f46e5] cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={() => showToast("Your privacy preferences have been saved!")}
              className="w-full py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
            >
              Save Privacy Preferences
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

