"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { CATEGORIES, PRODUCTS, getCategoryBySlug } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

export default function CategoryDetailClient({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeSub, setActiveSub] = useState<string>("All");

  const departmentProducts = PRODUCTS.filter((p) => p.category === category.id);
  const displayProducts =
    departmentProducts.length > 0 ? departmentProducts : PRODUCTS.slice(0, 6);

  return (
    <div className="bg-white text-[#1c1c1c]">
      <PageHero
        badge={`OFFICIAL ${category.shortName.toUpperCase()} DEPARTMENT`}
        title={category.name}
        highlight={`(${category.itemCount} Models)`}
        subtitle={category.description}
        breadcrumbs={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
        rightStats={[
          { value: `${category.itemCount}`, label: "Models Available" },
          { value: "2-Year", label: "Care+ Warranty" },
          { value: "24h", label: "Express Dispatch" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        {/* Subcategory Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-[#eaeaea]">
          <button
            type="button"
            onClick={() => setActiveSub("All")}
            className={`px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap cursor-pointer ${activeSub === "All"
                ? "bg-[#141233] text-white"
                : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
              }`}
          >
            All {category.shortName}
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setActiveSub(sub)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap cursor-pointer ${activeSub === sub
                  ? "bg-[#4f46e5] text-white"
                  : "bg-[#f4f5f9] text-[#444444] hover:bg-[#e5e7f0]"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const wished = isInWishlist(product.slug);
            return (
              <div
                key={product.id}
                className="group rounded-[20px] border border-[#eaeaea] hover:border-[#4f46e5] bg-white p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2.5 py-0.5 badge-leaf">
                      {product.discount || "NEW"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.slug)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${wished ? "bg-[#4f46e5] text-white" : "bg-[#f4f5f8] text-[#444444]"
                        }`}
                    >
                      ♥
                    </button>
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="w-full h-[195px] rounded-[14px] bg-[#fafafa] p-4 flex items-center justify-center mb-3"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    />
                  </Link>
                  <div className="text-[11px] font-bold uppercase text-[#777777] mb-1">
                    {product.brand} • <span className="text-[#f59e0b]">★ {product.rating}</span>
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-[15px] font-extrabold text-[#141233] group-hover:text-[#4f46e5] line-clamp-2"
                  >
                    {product.title}
                  </Link>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0f0f0]">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[18px] font-extrabold text-[#141233]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[12.5px] text-[#999999] line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="btn-shine w-full py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Switch to Other Departments Strip */}
        <div className="mt-14 pt-10 border-t border-[#eaeaea]">
          <h3 className="text-[20px] font-extrabold text-[#141233] mb-5">
            Explore Other Departments
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.filter((c) => c.slug !== category.slug)
              .slice(0, 5)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="p-3.5 rounded-[14px] border border-[#eaeaea] hover:border-[#4f46e5] bg-[#fafbfe] flex items-center gap-3 transition-all"
                >
                  <img src={c.icon} alt={c.shortName} className="w-6 h-6 object-contain" />
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#141233] truncate">{c.shortName}</div>
                    <div className="text-[11px] text-[#777777]">{c.itemCount} items</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

