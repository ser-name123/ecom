"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { STORE_SHOWROOMS } from "@/lib/storeData";

export default function ContactPage() {
  const [department, setDepartment] = useState("Technical & Product Support");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const randomId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);
  };

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="24/7 CONCIERGE & ENGINEER DESK"
        title="Contact Our Global"
        highlight="Support Specialists"
        subtitle="Have a question about an order, product compatibility, warranty claim, or enterprise bulk quote? Our hardware engineers respond in under 4 minutes."
        breadcrumbs={[{ label: "Contact Us" }]}
        rightStats={[
          { value: "< 4 Min", label: "Live Chat Response" },
          { value: "24/7", label: "Phone & Ticket Desk" },
          { value: "6 Hubs", label: "Global Showrooms" },
        ]}
      />

      {/* Top 3 Instant Contact Channels */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "24/7 Direct Hotline",
              sub: "Toll-Free Hardware & Order Desk",
              value: "+1 (888) 456-7890",
              action: "tel:18884567890",
              btnLabel: "Call Now",
              accent: "bg-[#4f46e5]",
            },
            {
              title: "Priority Email Concierge",
              sub: "Guaranteed Reply Under 2 Hours",
              value: "support@nexova.io",
              action: "mailto:support@nexova.io",
              btnLabel: "Send Email",
              accent: "bg-[#4f46e5]",
            },
            {
              title: "Express Order Tracking",
              sub: "Real-Time GPS Telemetry Lookup",
              value: "Track Order #NX-98421",
              action: "/track-order",
              btnLabel: "Track Package",
              accent: "bg-[#141233]",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-[#fafbfe] p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span className={`inline-block w-3 h-3 rounded-full ${card.accent} mb-3`} />
                <h3 className="text-[18px] font-extrabold text-[#141233]">{card.title}</h3>
                <p className="text-[13px] text-[#666666] mt-0.5">{card.sub}</p>
                <div className="text-[17px] font-extrabold text-[#4f46e5] mt-3 mb-5">
                  {card.value}
                </div>
              </div>
              <Link
                href={card.action}
                className="inline-flex items-center justify-center py-2.5 px-5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider transition-colors self-start"
              >
                {card.btnLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Main Split Contact Form + Global Hub Map */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 7 Cols: Interactive Support Ticket Form */}
        <div className="lg:col-span-7 rounded-[24px] border border-[#eaeaea] bg-white p-6 sm:p-9 shadow-[0_14px_40px_rgba(20,18,51,0.06)]">
          <div className="mb-6">
            <span className="text-[11.5px] font-bold uppercase tracking-widest text-[#4f46e5]">
              PRIORITY SUPPORT TICKET
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#141233] mt-1">
              Send Us a Direct Message
            </h2>
          </div>

          {ticketId ? (
            <div className="rounded-[18px] bg-[#f0fdf4] border border-[#86efac] p-7 text-center space-y-3 animate-fade-up">
              <div className="w-14 h-14 rounded-full bg-[#10b981] text-white text-[24px] font-bold flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="text-[20px] font-extrabold text-[#141233]">
                Support Ticket Created: <span className="text-[#10b981]">{ticketId}</span>
              </h3>
              <p className="text-[14px] text-[#444444] max-w-[480px] mx-auto">
                Thank you, <strong>{name}</strong>! We have routed your inquiry to our{" "}
                <strong>{department}</strong> team and sent a confirmation to{" "}
                <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTicketId(null);
                  setName("");
                  setEmail("");
                  setOrderId("");
                  setMessage("");
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#141233] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Department Selector Pills */}
              <div>
                <label className="block text-[12.5px] font-bold text-[#141233] uppercase tracking-wider mb-2">
                  Select Department
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Technical & Product Support",
                    "Orders & Shipping",
                    "Warranty & Returns",
                    "B2B Corporate Bulk",
                    "Press & Partnerships",
                  ].map((dep) => (
                    <button
                      key={dep}
                      type="button"
                      onClick={() => setDepartment(dep)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                        department === dep
                          ? "bg-[#4f46e5] text-white shadow-xs"
                          : "bg-[#f3f4f8] text-[#444444] hover:bg-[#e5e7f0]"
                      }`}
                    >
                      {dep}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#141233] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full h-[44px] px-4 rounded-[12px] border border-[#dcdce5] focus:border-[#4f46e5] focus:outline-none text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-[#141233] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full h-[44px] px-4 rounded-[12px] border border-[#dcdce5] focus:border-[#4f46e5] focus:outline-none text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-bold text-[#141233] mb-1.5">
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. NX-98421"
                  className="w-full h-[44px] px-4 rounded-[12px] border border-[#dcdce5] focus:border-[#4f46e5] focus:outline-none text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-bold text-[#141233] mb-1.5">
                  How Can We Help You? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question, technical setup, or order request..."
                  className="w-full p-4 rounded-[12px] border border-[#dcdce5] focus:border-[#4f46e5] focus:outline-none text-[14px]"
                />
              </div>

              <button
                type="submit"
                className="btn-shine w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Priority Message →
              </button>
            </form>
          )}
        </div>

        {/* Right 5 Cols: Interactive Global Map + Flagship Directory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[22px] overflow-hidden border border-[#eaeaea] bg-[#0b0f29] shadow-md">
            <img
              src="/assets/tracking-map.svg"
              alt="Nexova Global Hubs Map"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="rounded-[22px] border border-[#eaeaea] bg-[#fafbfe] p-6 space-y-4">
            <h3 className="text-[18px] font-extrabold text-[#141233]">
              Global Flagship Showrooms
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {STORE_SHOWROOMS.map((s) => (
                <div
                  key={s.city}
                  className="p-3.5 rounded-[14px] bg-white border border-[#eceef5] hover:border-[#4f46e5] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#141233]">
                      {s.city}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#4f46e5]">
                      {s.badge}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-[#666666] mt-1">{s.address}</div>
                  <div className="text-[12px] font-semibold text-[#141233] mt-1">
                    {s.phone} • <span className="text-[#777777]">{s.hours}</span>
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

