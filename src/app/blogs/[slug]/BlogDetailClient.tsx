"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { BLOG_POSTS, PRODUCTS, getBlogBySlug } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const post = getBlogBySlug(slug);
  const { addToCart } = useStore();

  const relatedProducts = PRODUCTS.filter((p) =>
    post.relatedProductSlugs.includes(p.slug)
  );
  const otherPosts = BLOG_POSTS.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge={`${post.category} • ${post.readTime}`}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: post.title },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: Full Editorial Article */}
        <article className="lg:col-span-8 space-y-8">
          {/* Author Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[18px] bg-[#fafbfe] border border-[#eceef5]">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-[14.5px] font-extrabold text-[#141233]">
                  {post.author}
                </div>
                <div className="text-[12px] text-[#666666]">
                  {post.authorRole} • Published {post.date}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white border border-[#dcdce5] text-[11.5px] font-bold text-[#4f46e5]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Main Cover Image */}
          <div className="rounded-[24px] bg-[#f7f8fc] border border-[#eaeaea] p-4 flex items-center justify-center overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="max-h-[420px] w-auto object-contain rounded-[16px]"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-[20px] bg-[#141233] text-white space-y-3">
            <div className="text-[11.5px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
              ⚡ KEY ENGINEERING TAKEAWAYS
            </div>
            <ul className="space-y-2 text-[14px] text-white/90">
              {post.keyTakeaways.map((kt) => (
                <li key={kt} className="flex items-start gap-2.5">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>{kt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className="space-y-6">
            {post.sections.map((sec) => (
              <div key={sec.heading} className="space-y-2.5">
                <h2 className="text-[22px] font-extrabold text-[#141233]">
                  {sec.heading}
                </h2>
                <p className="text-[15.5px] text-[#444444] leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* Right 4 Cols: Shoppable Gear Featured in Article + More Stories */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[22px] border border-[#eaeaea] bg-[#fafbfe] space-y-4">
            <h3 className="text-[17px] font-extrabold text-[#141233]">
              Hardware Tested in This Story
            </h3>
            {relatedProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-[16px] bg-white border border-[#eceef5] flex items-center gap-3.5"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-16 h-16 rounded-[10px] object-contain bg-[#fafafa] p-1.5 border shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${prod.slug}`}
                    className="text-[13.5px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-1"
                  >
                    {prod.title}
                  </Link>
                  <div className="text-[14px] font-extrabold text-[#4f46e5] mt-0.5">
                    AED {prod.price.toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(prod, 1)}
                    className="mt-1.5 px-3 py-1 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold cursor-pointer"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-[22px] border border-[#eaeaea] bg-white space-y-4">
            <h3 className="text-[17px] font-extrabold text-[#141233]">
              More from Nexova Journal
            </h3>
            {otherPosts.map((op) => (
              <Link
                key={op.id}
                href={`/blogs/${op.slug}`}
                className="flex items-center gap-3 group p-2 rounded-[12px] hover:bg-[#fafbfe]"
              >
                <img
                  src={op.image}
                  alt={op.title}
                  className="w-16 h-14 rounded-[8px] object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#4f46e5]">
                    {op.category}
                  </span>
                  <div className="text-[13px] font-bold text-[#141233] group-hover:text-[#4f46e5] line-clamp-2">
                    {op.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

