"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { STORE_SHOWROOMS } from "@/lib/storeData";

const TIMELINE = [
  {
    year: "2019",
    title: "Founded in Los Angeles",
    desc: "Started by acoustic and silicon engineers with a mission to democratize studio-grade electronics.",
  },
  {
    year: "2021",
    title: "Global Direct-to-Creator Model",
    desc: "Opened direct factory partnerships across California, Tokyo, and Shenzhen with 24-point quality labs.",
  },
  {
    year: "2024",
    title: "6 International Flagship Hubs",
    desc: "Expanded physical experience showrooms to New York, London, Paris, and Bangkok.",
  },
  {
    year: "2026",
    title: "1.2M+ Customers & AI Hardware Lab",
    desc: "Launched next-gen QD-OLED workstations, 50dB adaptive ANC audio, and same-day electric courier delivery.",
  },
];

const TEAM = [
  {
    name: "Alexander Vance",
    role: "Co-Founder & Chief Executive Officer",
    bio: "Former Principal Silicon Architect with 15+ years building ultra-low-latency consumer hardware.",
    image: "/assets/testimonial-1.jpg",
  },
  {
    name: "Elena Rostova",
    role: "VP of Industrial Design",
    bio: "Red Dot Award winner specializing in titanium wearables, CNC aluminum acoustics, and sustainable materials.",
    image: "/assets/testimonial-2.jpg",
  },
  {
    name: "Dr. Aris Thorne",
    role: "Head of Acoustic & Optical Engineering",
    bio: "PhD in Electro-Acoustics leading our 50dB Adaptive ANC and 8K full-frame sensor calibration labs.",
    image: "/assets/testimonial-3.jpg",
  },
  {
    name: "Sophia Chen",
    role: "Global Operations & Customer Experience",
    bio: "Architect of Nexova's 24-hour Express Air logistics network and 2-Year Care+ instant replacement program.",
    image: "/assets/testimonial-5.jpg",
  },
];

export default function AboutPage() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "24-Point Lab Calibration",
      subtitle: "Zero Compromise Quality",
      body: "Every laptop display, mirrorless camera sensor, and ANC headphone driver passes a 24-point automated optical and acoustic test bench before shipping.",
      stat: "99.94%",
      statLabel: "Defect-Free Dispatch Rate",
    },
    {
      title: "100% Recycled Aerospace Metals",
      subtitle: "Sustainable Engineering",
      body: "Our flagship enclosures and packaging utilize 100% recycled anodized aluminum, plastic-free soy-ink air-cell boxes, and carbon-neutral air freight.",
      stat: "100%",
      statLabel: "Carbon-Neutral Packaging",
    },
    {
      title: "2-Year Nexova Care+ Protection",
      subtitle: "Direct Engineer Support",
      body: "Skip scripted call centers. Every purchase includes 24/7 direct access to certified hardware specialists and free two-way express warranty replacement.",
      stat: "< 4 Mins",
      statLabel: "Average Live Engineer Response",
    },
  ];

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="OUR STORY & ENGINEERING DNA"
        title="Crafting the Future of"
        highlight="Next-Gen Electronics"
        subtitle="We bridge precision acoustic engineering, flagship silicon, and museum-grade industrial design for over 1.2 million creators, gamers, and professionals worldwide."
        breadcrumbs={[{ label: "About Us" }]}
        rightStats={[
          { value: "1.2M+", label: "Global Customers" },
          { value: "65+", label: "Countries Served" },
          { value: "4.9 ★", label: "Verified Rating" },
        ]}
      />

      {/* Section 1: Story & Custom Visual SVG */}
      <ScrollReveal animation="fade-up">
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block text-[12px] font-bold uppercase tracking-widest text-[#4f46e5]">
              WHO WE ARE
            </span>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#141233] leading-tight">
              Built by Hardware Obsessives for Everyday Pioneers
            </h2>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              At Nexova, we believe technology should feel invisible yet empowering. Whether you are grading 8K RAW cinema footage on a flight, competing in a 240Hz esports finals, or tracking an alpine marathon from your wrist, your gear should never hold you back.
            </p>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              By partnering directly with tier-1 silicon foundries and acoustic labs—and cutting out legacy retail middlemen—we deliver flagship titanium smartwatches, studio ANC headphones, and OLED ultrabooks at fair, transparent prices.
            </p>

            {/* Interactive Value Pillars */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap gap-2">
                {pillars.map((p, idx) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActivePillar(idx)}
                    className={`px-4 py-2 rounded-full text-[12.5px] font-bold transition-all cursor-pointer ${
                      activePillar === idx
                        ? "bg-[#141233] text-white shadow-md"
                        : "bg-[#f4f4f8] text-[#444444] hover:bg-[#e8e8f2]"
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <div className="p-5 rounded-[18px] bg-[#f8f9fc] border border-[#e6e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#4f46e5]">
                    {pillars[activePillar].subtitle}
                  </div>
                  <div className="text-[16px] font-extrabold text-[#141233] mt-0.5">
                    {pillars[activePillar].title}
                  </div>
                  <p className="text-[13.5px] text-[#555555] mt-1 leading-relaxed">
                    {pillars[activePillar].body}
                  </p>
                </div>
                <div className="px-5 py-3.5 rounded-[14px] bg-[#141233] text-white text-center shrink-0">
                  <div className="text-[24px] font-extrabold text-[#38bdf8]">
                    {pillars[activePillar].stat}
                  </div>
                  <div className="text-[10.5px] text-white/75 uppercase tracking-wider">
                    {pillars[activePillar].statLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(20,18,51,0.16)] border border-[#eaeaea] bg-[#0c0b22]">
              <img
                src="/assets/about-hero.svg"
                alt="Nexova Engineering Lab"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: Innovation Timeline */}
      <section className="w-full bg-[#f7f8fc] py-14 md:py-20 border-y border-[#eceef5]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-[680px] mx-auto mb-12">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#4f46e5]">
              MILESTONES
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#141233] mt-1">
              The Nexova Innovation Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className="group rounded-[20px] bg-white p-6 border border-[#eaeaea] hover:border-[#4f46e5] shadow-xs hover:shadow-[0_16px_40px_rgba(79,70,229,0.1)] transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#141233] group-hover:bg-[#4f46e5] text-white text-[13px] font-extrabold transition-colors">
                    {item.year}
                  </span>
                  <span className="text-[22px] font-black text-[#eceef5] group-hover:text-[#4f46e5]/20">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#141233] mb-2">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-[#666666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Leadership Team */}
      <ScrollReveal animation="fade-up">
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#4f46e5]">
                LEADERSHIP & ARCHITECTS
              </span>
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#141233] mt-1">
                Meet the Minds Behind Nexova
              </h2>
            </div>
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-bold uppercase tracking-wider transition-colors self-start"
            >
              Get in Touch With Us →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,18,51,0.1)]"
              >
                <div className="h-[230px] w-full bg-[#f5f6fa] p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-[17px] font-extrabold text-[#141233]">
                    {member.name}
                  </h3>
                  <div className="text-[12px] font-bold text-[#4f46e5] uppercase tracking-wider mt-0.5 mb-2.5">
                    {member.role}
                  </div>
                  <p className="text-[13px] text-[#666666] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Global Flagship Showrooms */}
      <section className="w-full bg-[#0c0b22] text-white py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-[680px] mx-auto mb-12">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#38bdf8]">
              EXPERIENCE CENTERS
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold mt-1">
              6 Global Flagship Showrooms
            </h2>
            <p className="text-[14px] text-white/70 mt-2">
              Test our 8K cameras, audiophile listening rooms, and 240Hz gaming pods in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORE_SHOWROOMS.map((hub) => (
              <div
                key={hub.city}
                className="rounded-[20px] bg-white/[0.05] border border-white/12 hover:border-[#38bdf8]/60 p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[18px] font-extrabold text-white">
                    {hub.city}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold uppercase tracking-wider">
                    {hub.badge}
                  </span>
                </div>
                <p className="text-[13px] text-white/75 mb-1.5">{hub.address}</p>
                <p className="text-[12.5px] text-[#38bdf8] font-semibold mb-1">
                  {hub.phone} • {hub.email}
                </p>
                <p className="text-[12px] text-white/60 mb-4">{hub.hours}</p>
                <div className="flex flex-wrap gap-1.5">
                  {hub.services.map((srv) => (
                    <span
                      key={srv}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-medium"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

