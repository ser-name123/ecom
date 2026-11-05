"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge: string;
  title: string;
  highlight?: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  rightStats?: { value: string; label: string }[];
}

export default function PageHero({
  badge,
  title,
  highlight,
  subtitle,
  breadcrumbs,
  rightStats,
}: PageHeroProps) {
  return (
    <section
      className="w-full relative overflow-hidden text-white border-b border-white/10"
      style={{
        background:
          "linear-gradient(135deg, #0c0b22 0%, #1d1a4a 55%, #2b1847 100%)",
      }}
    >
      {/* Ambient Glowing Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[340px] h-[340px] rounded-full bg-[#4f46e5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-[280px] h-[280px] rounded-full bg-[#4f46e5]/15 blur-3xl" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-9 md:py-13 relative z-10">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[12.5px] text-white/70 mb-4">
          <Link href="/" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span>Home</span>
          </Link>
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={item.label + idx}>
              <span className="text-white/35">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-[#38bdf8] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#38bdf8] font-semibold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[760px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#38bdf8] text-[11px] font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              {badge}
            </span>
            <h1 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold leading-[1.15] tracking-tight">
              {title}{" "}
              {highlight && (
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#4f46e5] bg-clip-text text-transparent">
                  {highlight}
                </span>
              )}
            </h1>
            <p className="text-[14px] sm:text-[15.5px] text-white/80 leading-relaxed mt-2.5">
              {subtitle}
            </p>
          </div>

          {rightStats && rightStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              {rightStats.map((st) => (
                <div
                  key={st.label}
                  className="px-4 py-3 rounded-[16px] bg-white/[0.06] border border-white/12 backdrop-blur-xs text-center"
                >
                  <div className="text-[20px] sm:text-[22px] font-extrabold text-white leading-tight">
                    {st.value}
                  </div>
                  <div className="text-[11px] text-white/70 font-medium uppercase tracking-wider mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

