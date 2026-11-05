"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { BLOG_POSTS } from "@/lib/storeData";

const BLOG_CATEGORIES = ["All", "Audio Review", "Lifestyle", "Wearables", "Gaming", "Cameras", "Laptops"];

export default function BlogsPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = BLOG_POSTS.filter((b) => {
    if (selectedCat !== "All" && b.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="NEXOVA TECH JOURNAL & LAB REVIEWS"
        title="Editorial Stories,"
        highlight="Deep-Dive Reviews & Guides"
        subtitle="Acoustic lab tests, 8K filmmaking workflows, esports latency benchmarks, and buying guides written by our hardware engineers."
        breadcrumbs={[{ label: "Blogs & Tech Journal" }]}
        rightStats={[
          { value: `${BLOG_POSTS.length}`, label: "Featured Articles" },
          { value: "Weekly", label: "Lab Benchmarks" },
          { value: "100%", label: "Engineer Tested" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-12">
        {/* Featured Editorial Story Banner */}
        <div className="rounded-[26px] border border-[#eaeaea] bg-[#0c0b22] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-xl">
          <div className="lg:col-span-6 p-7 sm:p-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#4f46e5] text-white text-[10.5px] font-extrabold uppercase tracking-wider">
                FEATURED COVER STORY
              </span>
              <span className="text-[12px] text-[#38bdf8] font-bold">
                {featuredPost.category} • {featuredPost.readTime}
              </span>
            </div>
            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="block text-[24px] sm:text-[32px] font-extrabold leading-tight hover:text-[#38bdf8] transition-colors"
            >
              {featuredPost.title}
            </Link>
            <p className="text-[14.5px] text-white/80 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.authorAvatar}
                  alt={featuredPost.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/25"
                />
                <div>
                  <div className="text-[13px] font-bold">{featuredPost.author}</div>
                  <div className="text-[11px] text-white/65">{featuredPost.date}</div>
                </div>
              </div>
              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="btn-shine px-6 py-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider"
              >
                Read Article →
              </Link>
            </div>
          </div>

          <Link
            href={`/blogs/${featuredPost.slug}`}
            className="lg:col-span-6 h-[280px] sm:h-[380px] bg-[#141233] p-4 flex items-center justify-center overflow-hidden"
          >
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-contain rounded-[16px]"
            />
          </Link>
        </div>

        {/* Category Filter Tabs + Search Input */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#eaeaea]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCat === cat
                    ? "bg-[#141233] text-white"
                    : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles or #tags..."
            className="w-full sm:w-[260px] h-[40px] px-4 rounded-full border border-[#dcdce5] text-[13px] focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="group rounded-[22px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(20,18,51,0.1)]"
            >
              <div>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="block h-[220px] bg-[#f7f8fc] p-3 overflow-hidden relative"
                >
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#141233] text-white text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain rounded-[14px] group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6">
                  <div className="text-[11.5px] font-bold text-[#777777] mb-2">
                    {post.date} • <span className="text-[#4f46e5]">{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-[18px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] leading-snug line-clamp-2 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="text-[13.5px] text-[#555555] leading-relaxed mt-2.5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-[#f4f5f9] text-[#555555] text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#f2f2f2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-[12.5px] font-bold text-[#141233]">{post.author}</span>
                </div>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-[12.5px] font-extrabold text-[#4f46e5] group-hover:translate-x-1 transition-transform"
                >
                  Read Story →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

