import React from "react";
import { PRODUCTS } from "@/lib/storeData";
import ProductDetailClient from "./[slug]/ProductDetailClient";

export default function DefaultProductPage() {
  return <ProductDetailClient slug={PRODUCTS[0].slug} />;
}

