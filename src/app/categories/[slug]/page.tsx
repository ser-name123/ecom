import React, { Suspense } from "react";
import { CATEGORIES } from "@/lib/storeData";
import CategoryDetailClient from "./CategoryDetailClient";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

async function CategoryDetailLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryDetailClient slug={slug} />;
}

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center font-bold">
          Loading Department...
        </div>
      }
    >
      <CategoryDetailLoader params={params} />
    </Suspense>
  );
}
