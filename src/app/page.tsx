import CategorySlider from "@/components/home/CategorySlider";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import SaleOffSection from "@/components/home/SaleOffSection";
import BundleSection from "@/components/home/BundleSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import ShopByCollectionSection from "@/components/home/ShopByCollectionSection";
import BrandsAndTestimonialSection from "@/components/home/BrandsAndTestimonialSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import PopularTagsSection from "@/components/home/PopularTagsSection";

export default function Home() {
  return (
    <>
      {/* 1. 7-Item Category Carousel */}
      <CategorySlider />

      {/* 2. Hero Bento Grid (Main Slider + 2 Right Promo Banners) */}
      <HeroSection />

      {/* 3. 4-Item Trust & Service Bar */}
      <TrustBar />

      {/* 4. New Arrivals / Bestsellers + 2 Wide Promo Banners */}
      <NewArrivalsSection />

      {/* 5. SALE OFF Featured Deal with Vertical Thumbnails & Live Timer */}
      <SaleOffSection />

      {/* 6. Buy 3 Products and Save up to 30% Bundle Builder */}
      <BundleSection />

      {/* 7. Featured Products (Galaxy S30 Ultra Banner + 3-Col Product Slider) */}
      <FeaturedProductsSection />

      {/* 8. Shop by Collection (Headphones / Portable Speakers / Smartwatch) */}
      <ShopByCollectionSection />

      {/* 9. Shop by Brands + Dark Futuristic Customer Testimonial Banner */}
      <BrandsAndTestimonialSection />

      {/* 10. Latest News (Blog Carousel) */}
      <LatestNewsSection />

      {/* 11. Popular Search Tags Marquee Strip */}
      <PopularTagsSection />
    </>
  );
}
