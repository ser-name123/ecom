"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { CATEGORIES, PRODUCTS } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function CategoriesPage() {
  const { addToCart } = useStore();

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge="9 SPECIALIZED TECH DEPARTMENTS"
        title="Explore All Product"
        highlight="Categories & Ecosystems"
        subtitle="Browse our 9 curated hardware departments—from M-Series OLED Ultrabooks and 8K Mirrorless Cameras to 50dB Studio ANC Headphones."
        breadcrumbs={[{ label: "Product Categories" }]}
        rightStats={[
          { value: "9", label: "Core Departments" },
          { value: "320+", label: "Total Items" },
          { value: "100%", label: "Official Warranty" },
        ]}
      />

      {/* 9-Department Bento Showcase Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {CATEGORIES.map((cat) => {
            const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
            return (
              <div
                key={cat.id}
                className="group rounded-[24px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white overflow-hidden shadow-xs hover:shadow-[0_20px_50px_rgba(20,18,51,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Band with Category Image */}
                  <div className="p-6 bg-[#f7f8fc] border-b border-[#eceef5] flex items-center justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141233] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                        {cat.itemCount} Products
                      </span>
                      <h2 className="text-[20px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] transition-colors">
                        {cat.name}
                      </h2>
                      <p className="text-[12px] text-[#666666] mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                    <div className="w-[84px] h-[84px] rounded-[16px] bg-white p-2.5 border border-[#eaeaea] flex items-center justify-center shrink-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Description & Subcategory Links */}
                  <div className="p-6">
                    <p className="text-[13.5px] text-[#555555] leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-2">
                      Popular Subcategories
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/categories/${cat.slug}`}
                          className="px-2.5 py-1 rounded-full bg-[#f4f5f9] hover:bg-[#4f46e5] text-[#333333] hover:text-white text-[11.5px] font-semibold transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>

                    {/* Featured Pick inside Department */}
                    {catProducts[0] && (
                      <div className="p-3 rounded-[14px] bg-[#fafbfe] border border-[#eceef5] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={catProducts[0].image}
                            alt={catProducts[0].title}
                            className="w-12 h-12 rounded-[8px] bg-white p-1 border border-[#eeeeee] object-contain shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase text-[#4f46e5]">
                              TOP PICK
                            </div>
                            <Link
                              href={`/product/${catProducts[0].slug}`}
                              className="text-[12.5px] font-bold text-[#141233] hover:text-[#4f46e5] truncate block"
                            >
                              {catProducts[0].title}
                            </Link>
                            <div className="text-[12.5px] font-extrabold text-[#141233]">
                              AED {catProducts[0].price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(catProducts[0], 1)}
                          className="px-3 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <div className="text-[11.5px] text-[#777777] font-medium">
                    Brands: <strong className="text-[#141233]">{cat.brands.slice(0, 3).join(", ")}</strong>
                  </div>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#4f46e5] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore {cat.shortName}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

