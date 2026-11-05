"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { FAQ_ITEMS } from "@/lib/storeData";

const FAQ_CATEGORIES = [
  "All",
  "Orders & Billing",
  "Shipping & Delivery",
  "Returns & Warranty",
  "Product & Tech Support",
  "Account & Security",
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory !== "All" && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="KNOWLEDGE BASE & INSTANT ANSWERS"
        title="Frequently Asked"
        highlight="Questions (FAQs)"
        subtitle="Find instant answers about bundle discounts, Express Air shipping, 30-day returns, and our 2-Year Nexova Care+ hardware warranty."
        breadcrumbs={[{ label: "FAQs & Help Center" }]}
        rightStats={[
          { value: "24/7", label: "Engineer Support" },
          { value: "30-Day", label: "Money Guarantee" },
          { value: "2-Year", label: "Care+ Warranty" },
        ]}
      />

      <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 space-y-8">
        {/* Search & Category Filter */}
        <div className="p-6 rounded-[24px] bg-[#fafbfe] border border-[#eaeaea] space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., 'bundle discount', 'free shipping', 'warranty')..."
            className="w-full h-[48px] px-5 rounded-full bg-white border border-[#dcdce5] text-[14px] focus:outline-none focus:border-[#4f46e5]"
          />

          <div className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[12.5px] font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#141233] text-white"
                    : "bg-white border border-[#dcdce5] text-[#444444] hover:border-[#4f46e5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-[20px] border transition-all overflow-hidden ${
                  isOpen
                    ? "border-[#4f46e5] bg-[#fafbfe] shadow-md"
                    : "border-[#eaeaea] bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#4f46e5] block mb-1">
                      {faq.category}
                    </span>
                    <span className="text-[16px] sm:text-[17px] font-extrabold text-[#141233]">
                      {faq.q}
                    </span>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 transition-transform ${
                      isOpen
                        ? "bg-[#4f46e5] text-white rotate-180"
                        : "bg-[#f4f5f9] text-[#141233]"
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-[14.5px] text-[#555555] leading-relaxed border-t border-[#eceef5]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Escalation Banner */}
        <div className="rounded-[24px] bg-[#141233] text-white p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] font-extrabold">Still have a technical question?</h3>
            <p className="text-[14px] text-white/75 mt-1">
              Our hardware engineers and order specialists are online 24/7 to help you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="btn-shine px-6 py-3 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider"
            >
              Contact Support →
            </Link>
            <Link
              href="/track-order"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[12.5px] font-bold uppercase tracking-wider"
            >
              Track an Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

