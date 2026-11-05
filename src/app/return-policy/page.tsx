"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function ReturnPolicyPage() {
  const [returnOrder, setReturnOrder] = useState("");
  const [returnReason, setReturnReason] = useState("Changed my mind / Exchange model");
  const [rmaCode, setRmaCode] = useState<string | null>(null);

  const handleRmaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrder.trim()) return;
    setRmaCode("RMA-" + Math.floor(100000 + Math.random() * 900000));
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="30-DAY RISK-FREE TRIAL & 2-YEAR WARRANTY"
        title="Return, Exchange &"
        highlight="Refund Policy"
        subtitle="Every purchase at Nexova is backed by our 30-Day Money-Back Guarantee, zero restocking fees, and free prepaid express return labels."
        breadcrumbs={[{ label: "Return & Refund Policy" }]}
        rightStats={[
          { value: "30 Days", label: "Return Window" },
          { value: "$0", label: "Restocking Fee" },
          { value: "24 Hours", label: "Refund Processing" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-12">
        {/* 4-Step Visual Return Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Request Instant RMA",
              desc: "Enter your Order ID in our self-service portal below within 30 days of delivery.",
            },
            {
              step: "02",
              title: "Download Prepaid Label",
              desc: "Receive an insured prepaid DHL/FedEx Express return label via email in seconds.",
            },
            {
              step: "03",
              title: "Drop Off or Pickup",
              desc: "Hand the package to your courier or any of our 6 global flagship showrooms.",
            },
            {
              step: "04",
              title: "24-Hour Full Refund",
              desc: "Once scanned at our hub, 100% of your payment is refunded to your original method.",
            },
          ].map((st) => (
            <div
              key={st.step}
              className="p-6 rounded-[20px] border border-[#eaeaea] bg-[#fafbfe] hover:border-[#4f46e5] transition-all"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#141233] text-[#38bdf8] text-[12px] font-extrabold mb-3">
                STEP {st.step}
              </span>
              <h3 className="text-[17px] font-extrabold text-[#141233] mb-1.5">
                {st.title}
              </h3>
              <p className="text-[13.5px] text-[#666666] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Cols: Detailed Return & Refund Terms */}
          <div className="lg:col-span-7 space-y-6">
            {[
              {
                title: "1. 30-Day Money-Back Guarantee Eligibility",
                body: "You may return any item purchased on Nexova within 30 calendar days from the delivery date for a full refund or model exchange. Items should be returned in good physical condition along with original accessories, charging cables, and packaging.",
              },
              {
                title: "2. Defective or Damaged-on-Arrival (DOA) Priority Replacement",
                body: "In the rare event that a product arrives with a shipping defect or hardware anomaly, Nexova dispatches a brand-new replacement unit via overnight air before you even ship back the original unit.",
              },
              {
                title: "3. Refund Timelines by Payment Method",
                body: "Credit/Debit Cards: 2–3 business days after scan • PayPal / Apple Pay / UPI: Instant within 24 hours • Nexova Store Credit / Gift Card: Instant + 5% bonus credit.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-[20px] border border-[#eaeaea] bg-white"
              >
                <h3 className="text-[18px] font-extrabold text-[#141233] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Right 5 Cols: Interactive Self-Service Return Label Generator */}
          <div className="lg:col-span-5 rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 sm:p-8 space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
              SELF-SERVICE PORTAL
            </span>
            <h3 className="text-[22px] font-extrabold text-[#141233]">
              Start an Instant Return or Exchange
            </h3>

            {rmaCode ? (
              <div className="p-5 rounded-[16px] bg-[#f0fdf4] border border-[#86efac] space-y-3 text-center">
                <div className="text-[18px] font-extrabold text-[#065f46]">
                  Prepaid Return Label Generated: {rmaCode}
                </div>
                <p className="text-[13px] text-[#444444]">
                  We have emailed your prepaid Express return shipping label for Order{" "}
                  <strong>{returnOrder}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setRmaCode(null)}
                  className="px-5 py-2 rounded-full bg-[#141233] text-white text-[12px] font-bold uppercase cursor-pointer"
                >
                  Start Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleRmaSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#141233] mb-1">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={returnOrder}
                    onChange={(e) => setReturnOrder(e.target.value)}
                    placeholder="e.g. NX-98421"
                    className="w-full h-[44px] px-3.5 rounded-[10px] bg-white border border-[#dcdce5] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#141233] mb-1">
                    Reason for Return / Exchange
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[10px] bg-white border border-[#dcdce5] text-[13.5px]"
                  >
                    <option>Changed my mind / Exchange model</option>
                    <option>Ordered wrong configuration / color</option>
                    <option>Warranty or technical inspection</option>
                    <option>Arrived later than expected</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn-shine w-full py-3.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  Generate Free Prepaid Return Label →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

