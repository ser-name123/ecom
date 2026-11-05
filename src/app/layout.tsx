import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StoreProvider } from "@/lib/StoreContext";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nexova - Next-Gen Electronics & Gadgets Store",
  description:
    "Shop the latest electronics, wireless headphones, 4K cameras, laptops, smartwatches, and gaming gear.",
  icons: {
    icon: [
      { url: "/assets/favicon-new.svg", type: "image/svg+xml" },
    ],
    shortcut: "/assets/favicon-new.svg",
    apple: "/assets/favicon-new.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunitoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>
          <div className="min-h-screen flex bg-white text-gray-900 font-sans">
            {/* Global Left Vertical Category Sidebar */}
            <Sidebar />

            {/* Main Content Column (Header + Page Content + Footer) */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Global Top Header & Mega Menu Navigation */}
              <Header />

              {/* Dynamic Page Content */}
              <main className="flex-1 bg-white">{children}</main>

              {/* Global Multi-Band Footer */}
              <Footer />
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
