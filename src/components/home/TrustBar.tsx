"use client";

import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const POLICIES = [
  {
    id: "shipping",
    title: "Free Shipping",
    subtitle: "Free Shipping for orders over $99",
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
    <section className="w-full bg-[#f7f7f7] pt-1 pb-6">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {POLICIES.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 90} animation="fade-up">
              <div className="flex items-center gap-3.5 group py-1.5 cursor-default">
                <div className="w-[40px] h-[40px] shrink-0 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-[36px] h-[36px] object-contain icon-flip-hover"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#000000] group-hover:text-[#f43777] transition-colors duration-300 leading-[20px] mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#535353] font-normal leading-[18px]">
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
