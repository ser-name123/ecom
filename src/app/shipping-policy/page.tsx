"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function ShippingPolicyPage() {
  const [region, setRegion] = useState("United States & Canada");
  const [orderValue, setOrderValue] = useState(550);

  const isFree = orderValue >= 500;

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="GLOBAL LOGISTICS & INSURED DISPATCH"
        title="Shipping &"
        highlight="Delivery Policy"
        subtitle="Fast, insured, climate-neutral express shipping from our 6 global fulfillment hubs directly to your doorstep."
        breadcrumbs={[{ label: "Shipping & Delivery Policy" }]}
        rightStats={[
          { value: "Free", label: "Orders Over $500" },
          { value: "1–2 Days", label: "Express Air" },
          { value: "$10,000", label: "Transit Insurance" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: Shipping Tiers Table & Policy Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-[24px] border border-[#eaeaea] bg-white overflow-hidden">
            <div className="p-6 bg-[#141233] text-white">
              <h2 className="text-[20px] font-extrabold">
                Official Nexova Shipping Tiers & Transit Times
              </h2>
              <p className="text-[13px] text-white/75 mt-1">
                Orders placed before 4:00 PM local hub time ship the same business day.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="bg-[#f8f9fc] border-b border-[#eaeaea] text-[#141233] font-extrabold">
                    <th className="p-4">Service Tier</th>
                    <th className="p-4">Delivery Window</th>
                    <th className="p-4">Orders Under $500</th>
                    <th className="p-4">Orders $500+</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef5]">
                  <tr>
                    <td className="p-4 font-bold text-[#141233]">Standard Ground Insured</td>
                    <td className="p-4 text-[#555555]">3 – 5 Business Days</td>
                    <td className="p-4 font-semibold">$9.00</td>
                    <td className="p-4 font-extrabold text-[#10b981]">FREE</td>
                  </tr>
                  <tr className="bg-[#fafbfe]">
                    <td className="p-4 font-bold text-[#4f46e5]">Express Air Priority (DHL / FedEx)</td>
                    <td className="p-4 text-[#555555]">1 – 2 Business Days</td>
                    <td className="p-4 font-semibold">$19.00</td>
                    <td className="p-4 font-extrabold text-[#10b981]">FREE</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#141233]">Same-Day Electric Courier</td>
                    <td className="p-4 text-[#555555]">Same Day by 8:00 PM (6 Flagship Cities)</td>
                    <td className="p-4 font-semibold">$29.00</td>
                    <td className="p-4 font-extrabold text-[#4f46e5]">$15.00</td>
                  </tr>
                  <tr className="bg-[#fafbfe]">
                    <td className="p-4 font-bold text-[#141233]">International Priority DDP</td>
                    <td className="p-4 text-[#555555]">3 – 6 Business Days (65+ Countries)</td>
                    <td className="p-4 font-semibold">$24.00</td>
                    <td className="p-4 font-extrabold text-[#10b981]">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Policy Clauses */}
          <div className="space-y-6">
            {[
              {
                title: "1. 24-Point Lab Inspection Before Dispatch",
                body: "Before any laptop, camera, smartwatch, or headphone leaves our fulfillment center, our technicians verify packaging seal integrity, register the hardware serial number to your 2-Year Nexova Care+ warranty, and pack the unit inside anti-static air-cell cushioning.",
              },
              {
                title: "2. Full Replacement Transit Insurance ($10,000 Coverage)",
                body: "Every shipment is insured against loss, theft, or carrier damage up to $10,000 at zero additional cost. High-value orders ($750+) require an adult signature or secure one-time delivery PIN upon arrival.",
              },
              {
                title: "3. International Customs, Duties & Taxes (DDP)",
                body: "Because Nexova operates 6 regional hubs across the USA (Los Angeles, New York, California), Europe (London, Paris), and Asia-Pacific (Bangkok), over 92% of orders ship domestically without import duties.",
              },
            ].map((sec) => (
              <div
                key={sec.title}
                className="p-6 rounded-[20px] border border-[#eaeaea] bg-[#fafbfe]"
              >
                <h3 className="text-[18px] font-extrabold text-[#141233] mb-2">
                  {sec.title}
                </h3>
                <p className="text-[14px] text-[#555555] leading-relaxed">{sec.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Interactive Shipping Cost & ETA Calculator */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] space-y-4 sticky top-24">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
              INSTANT CALCULATOR
            </span>
            <h3 className="text-[20px] font-extrabold text-[#141233]">
              Estimate Delivery Time & Cost
            </h3>

            <div>
              <label className="block text-[12px] font-bold text-[#141233] mb-1">
                Destination Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-[42px] px-3.5 rounded-[10px] bg-white border border-[#dcdce5] text-[13.5px] font-semibold"
              >
                <option>United States & Canada</option>
                <option>United Kingdom & Europe</option>
                <option>Asia-Pacific & India</option>
                <option>Middle East & Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#141233] mb-1">
                Estimated Cart Value: <strong>${orderValue}</strong>
              </label>
              <input
                type="range"
                min={50}
                max={1500}
                step={50}
                value={orderValue}
                onChange={(e) => setOrderValue(Number(e.target.value))}
                className="w-full accent-[#4f46e5]"
              />
            </div>

            <div className="p-4 rounded-[16px] bg-white border border-[#e2e8f0] space-y-2 text-[13.5px]">
              <div className="flex justify-between">
                <span className="text-[#666666]">Dispatch Hub:</span>
                <strong className="text-[#141233]">
                  {region.includes("United States")
                    ? "Los Angeles / NY"
                    : region.includes("Europe")
                    ? "London / Paris"
                    : "Bangkok Regional Hub"}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Express Air ETA:</span>
                <strong className="text-[#4f46e5]">1 – 2 Business Days</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Shipping Fee:</span>
                <strong className={isFree ? "text-[#10b981]" : "text-[#141233]"}>
                  {isFree ? "FREE ($500+ Tier)" : "$19.00"}
                </strong>
              </div>
            </div>

            <Link
              href="/track-order"
              className="btn-shine block w-full py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-extrabold uppercase tracking-wider text-center"
            >
              Track an Existing Order →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

