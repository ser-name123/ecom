"use client";

import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const POLICIES = [
  {
    id: "shipping",
    title: "Free Shipping",
    subtitle: "Free Shipping for orders over AED 99",
    icon: "/assets/policy-1.svg",
  },
  {
    id: "guarantee",
    title: "Money Guarantee",
    subtitle: "Within 30 days for an exchange",
    icon: "/assets/policy-2.svg",
  },
  {
    id: "support",
    title: "Online Support",
    subtitle: "24 hours a day, 7 days on week",
    icon: "/assets/policy-3.svg",
  },
  {
    id: "payment",
    title: "Flexible Payment",
    subtitle: "Pay with Multiple Credit Cards",
    icon: "/assets/policy-4.svg",
  },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-[#f7f7f7] pt-1 pb-5 sm:pb-6">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 pt-1 sm:pt-2">
          {POLICIES.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 90} animation="fade-up">
              <div className="flex items-center gap-2.5 sm:gap-3.5 group p-2.5 sm:py-1.5 sm:px-0 rounded-[12px] bg-white sm:bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:shadow-none cursor-default">
                <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] shrink-0 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] object-contain icon-flip-hover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[12.5px] sm:text-[15px] font-semibold text-[#000000] group-hover:text-[#4f46e5] transition-colors duration-300 leading-tight sm:leading-[20px] mb-0.5 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-[#535353] font-normal leading-tight sm:leading-[18px] line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
