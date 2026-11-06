"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { SAMPLE_ORDERS, OrderTrackingRecord } from "@/lib/storeData";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("order") || "NX-98421";

  const [orderInput, setOrderInput] = useState(initialId);
  const [emailInput, setEmailInput] = useState("alex.morgan@nexova.io");
  const [activeRecord, setActiveRecord] = useState<OrderTrackingRecord>(
    SAMPLE_ORDERS[initialId] || SAMPLE_ORDERS["NX-98421"]
  );

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = orderInput.trim().toUpperCase().replace("#", "");
    if (SAMPLE_ORDERS[clean]) {
      setActiveRecord(SAMPLE_ORDERS[clean]);
    } else {
      setActiveRecord({
        ...SAMPLE_ORDERS["NX-98421"],
        orderId: clean || "NX-98421",
        email: emailInput || "customer@nexova.io",
      });
    }
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="REAL-TIME GPS LOGISTICS TELEMETRY"
        title="Track Your Express"
        highlight="Nexova Shipment"
        subtitle="Enter your Order ID below or click one of our live demo tracking numbers to inspect real-time air freight and courier progress."
        breadcrumbs={[{ label: "Order Tracking" }]}
        rightStats={[
          { value: activeRecord.orderId, label: "Active Order" },
          { value: activeRecord.status, label: "Live Status" },
          { value: "Insured", label: "Up to AED 10,000" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-10">
        {/* Search & Demo Quick-Fill Bar */}
        <div className="rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 sm:p-8">
          <form onSubmit={handleLookup} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#141233] mb-1.5">
                Order Number *
              </label>
              <input
                type="text"
                required
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. NX-98421"
                className="w-full h-[46px] px-4 rounded-[12px] bg-white border border-[#dcdce5] text-[14px] font-bold uppercase focus:outline-none focus:border-[#4f46e5]"
              />
            </div>
            <div className="md:col-span-5">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#141233] mb-1.5">
                Billing Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="alex.morgan@nexova.io"
                className="w-full h-[46px] px-4 rounded-[12px] bg-white border border-[#dcdce5] text-[14px] focus:outline-none focus:border-[#4f46e5]"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="btn-shine w-full h-[46px] rounded-[12px] bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer"
              >
                Track Live →
              </button>
            </div>
          </form>

          {/* Quick-Select Demo Orders */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#eceef5] text-[12px]">
            <span className="text-[#777777] font-semibold">Try Live Demo Orders:</span>
            {Object.keys(SAMPLE_ORDERS).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setOrderInput(id);
                  setActiveRecord(SAMPLE_ORDERS[id]);
                }}
                className={`px-3 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                  activeRecord.orderId === id
                    ? "bg-[#4f46e5] text-white"
                    : "bg-white border border-[#dcdce5] text-[#141233] hover:border-[#4f46e5]"
                }`}
              >
                #{id} ({SAMPLE_ORDERS[id].status})
              </button>
            ))}
          </div>
        </div>

        {/* 5-Stage Progress Stepper */}
        <div className="rounded-[24px] border border-[#eaeaea] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#eaeaea]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4f46e5]">
                CARRIER: {activeRecord.carrier} • TRACKING #{activeRecord.trackingNumber}
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#141233] mt-0.5">
                Order #{activeRecord.orderId} —{" "}
                <span className="text-[#10b981]">{activeRecord.status}</span>
              </h2>
            </div>
            <div className="px-4 py-2 rounded-[12px] bg-[#f0fdf4] border border-[#86efac] text-[#065f46] text-[13px] font-extrabold">
              🚚 Estimated Arrival: {activeRecord.estimatedDelivery}
            </div>
          </div>

          {/* Visual 5-Step Progress Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              "Order Confirmed",
              "Lab Quality Check",
              "Dispatched",
              "In Transit",
              "Out for Delivery",
            ].map((label, idx) => {
              const done = idx <= activeRecord.currentStep;
              return (
                <div
                  key={label}
                  className={`p-4 rounded-[16px] border transition-all ${
                    done
                      ? "border-[#4f46e5] bg-[#eef2ff]/60"
                      : "border-[#eaeaea] bg-[#fafafa] opacity-65"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-full text-[12px] font-extrabold flex items-center justify-center ${
                        done ? "bg-[#4f46e5] text-white" : "bg-[#e0e0e0] text-[#666666]"
                      }`}
                    >
                      {done ? "✓" : idx + 1}
                    </span>
                    <span className="text-[10.5px] font-bold uppercase text-[#777777]">
                      Step 0{idx + 1}
                    </span>
                  </div>
                  <div className="text-[13.5px] font-extrabold text-[#141233]">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map + Telemetry Log + Package Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[24px] overflow-hidden border border-[#eaeaea] bg-[#0b0f29] shadow-md">
              <img
                src="/assets/tracking-map.svg"
                alt="Live Shipment Route Map"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Package Items */}
            <div className="rounded-[22px] border border-[#eaeaea] bg-white p-6 space-y-4">
              <h3 className="text-[18px] font-extrabold text-[#141233]">
                Items in This Shipment ({activeRecord.items.length})
              </h3>
              {activeRecord.items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center justify-between gap-4 p-3 rounded-[14px] bg-[#fafbfe] border border-[#eceef5]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-[10px] bg-white p-1.5 border object-contain"
                    />
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-[14px] font-extrabold text-[#141233] hover:text-[#4f46e5]"
                      >
                        {item.title}
                      </Link>
                      <div className="text-[12px] text-[#666666]">Qty: {item.qty}</div>
                    </div>
                  </div>
                  <span className="text-[15px] font-extrabold text-[#141233]">
                    AED {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Detailed Checkpoints Timeline */}
          <div className="lg:col-span-5 rounded-[24px] border border-[#eaeaea] bg-[#fafbfe] p-6 sm:p-7">
            <h3 className="text-[19px] font-extrabold text-[#141233] mb-5">
              Live Telemetry Checkpoints
            </h3>
            <div className="space-y-5 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dcdce5]">
              {activeRecord.timeline.map((log) => (
                <div key={log.step} className="relative pl-10">
                  <span
                    className={`absolute left-1 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                      log.completed
                        ? "bg-[#10b981] border-[#10b981] text-white"
                        : "bg-white border-[#999999] text-[#999999]"
                    }`}
                  >
                    {log.completed ? "✓" : "•"}
                  </span>
                  <div className="p-4 rounded-[14px] bg-white border border-[#eaeaea]">
                    <div className="text-[14px] font-extrabold text-[#141233]">{log.step}</div>
                    <div className="text-[11.5px] font-bold text-[#4f46e5] mt-0.5">
                      {log.location} • {log.timestamp}
                    </div>
                    <p className="text-[12.5px] text-[#666666] mt-1">{log.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-bold">Loading Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}

