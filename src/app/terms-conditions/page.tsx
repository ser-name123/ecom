"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "agreement",
      title: "1. Acceptance of Terms & Conditions",
      body: "By accessing or placing an order on Nexova ('the Platform'), you agree to be bound by these Terms & Conditions, our 30-Day Return Policy, and our 2-Year Nexova Care+ Hardware Warranty Agreement. Last updated: November 2026.",
    },
    {
      id: "authenticity",
      title: "2. Product Authenticity & Pricing Accuracy",
      body: "All products sold on Nexova are 100% brand-new, factory-sealed, and sourced directly from authorized manufacturers. Prices are displayed in USD and include applicable promotional discounts such as our 'Buy 3 Save 30%' bundle program.",
    },
    {
      id: "warranty",
      title: "3. 2-Year Nexova Care+ Hardware Warranty",
      body: "Every hardware device purchased on Nexova includes a complimentary 24-month warranty against manufacturing defects, battery degradation below 80% capacity, and optical/acoustic calibration drift, with free two-way express repair or replacement shipping.",
    },
    {
      id: "ip",
      title: "4. Intellectual Property & Trademarks",
      body: "All industrial designs, product photography, SVG schematics, code architecture, and the Nexova brand mark are the exclusive intellectual property of Nexova Inc. and its respective brand partners.",
    },
    {
      id: "liability",
      title: "5. Limitation of Liability & Governing Law",
      body: "Nexova's maximum liability for any claim arising out of an order shall not exceed the total purchase price paid for the product, plus insured transit coverage up to $10,000.",
    },
  ];

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="OFFICIAL USER & COMMERCIAL AGREEMENT"
        title="Terms &"
        highlight="Conditions of Service"
        subtitle="Clear, fair, and transparent terms governing purchases, bundle promotions, and our 2-Year Nexova Care+ hardware warranty."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
        rightStats={[
          { value: "Nov 2026", label: "Last Updated" },
          { value: "2-Year", label: "Hardware Warranty" },
          { value: "100%", label: "Factory Authentic" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 4 Cols: Sticky Quick Navigation */}
        <aside className="lg:col-span-4">
          <div className="p-6 rounded-[22px] border border-[#eaeaea] bg-[#fafbfe] space-y-3 sticky top-24">
            <h3 className="text-[16px] font-extrabold text-[#141233] uppercase tracking-wider">
              Legal & Policy Directory
            </h3>
            <ul className="space-y-2 text-[13.5px] font-bold">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block px-3.5 py-2 rounded-[10px] bg-white border border-[#eceef5] hover:border-[#4f46e5] text-[#141233] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-[#e5e7f0] space-y-2 text-[13px]">
              <Link href="/shipping-policy" className="block font-bold text-[#4f46e5] hover:underline">
                → Shipping & Delivery Policy
              </Link>
              <Link href="/return-policy" className="block font-bold text-[#4f46e5] hover:underline">
                → Return & Refund Policy
              </Link>
              <Link href="/privacy-policy" className="block font-bold text-[#4f46e5] hover:underline">
                → Privacy & Cookie Policy
              </Link>
            </div>
          </div>
        </aside>

        {/* Right 8 Cols: Clauses */}
        <div className="lg:col-span-8 space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="p-7 rounded-[22px] border border-[#eaeaea] bg-white space-y-2.5"
            >
              <h2 className="text-[19px] font-extrabold text-[#141233]">
                {sec.title}
              </h2>
              <p className="text-[14.5px] text-[#555555] leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

