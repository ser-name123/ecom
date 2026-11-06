"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/lib/StoreContext";
import { resolveStoreProduct } from "@/lib/storeData";

interface SubLink {
  label: string;
  badge?: "HOT" | "NEW" | "SALE" | "PRO";
}

interface SubCategoryGroup {
  heading: string;
  links: SubLink[];
}

interface FeaturedItem {
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
}

interface SidebarCategory {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  hasChevron: boolean;
  subGroups: SubCategoryGroup[];
  featuredProduct: FeaturedItem;
  banner?: string;
  popularBrands: string[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    id: "laptop",
    label: "Laptop & Tablet",
    subtitle: "High-performance laptops, 2-in-1 convertibles & pro tablets",
    icon: "/assets/laptop.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Laptops by Use",
        links: [
          { label: "Gaming Laptops", badge: "HOT" },
          { label: "Ultrabooks & Thin" },
          { label: "Business & Enterprise" },
          { label: "2-in-1 Convertibles", badge: "NEW" },
          { label: "Creator Workstations" },
        ],
      },
      {
        heading: "Apple Ecosystem",
        links: [
          { label: "MacBook Pro M3", badge: "PRO" },
          { label: "MacBook Air 15”" },
          { label: "iPad Pro OLED", badge: "NEW" },
          { label: "iPad Air & Mini" },
          { label: "Apple Pencil & Magic Keyboard" },
        ],
      },
      {
        heading: "Android & Windows Tablets",
        links: [
          { label: "Galaxy Tab S9 Ultra", badge: "HOT" },
          { label: "Microsoft Surface Pro" },
          { label: "Drawing & Graphic Tablets" },
          { label: "E-Readers & Paper Tablets" },
          { label: "Kids Learning Tablets" },
        ],
      },
      {
        heading: "Laptop Accessories",
        links: [
          { label: "USB-C & Thunderbolt Docks" },
          { label: "Laptop Sleeves & Backpacks" },
          { label: "Cooling Pads & Stands" },
          { label: "GaN Fast Chargers", badge: "SALE" },
          { label: "Privacy Screen Filters" },
        ],
      },
    ],
    featuredProduct: {
      title: "15-inch Slim Laptop - Metal Body",
      category: "LAPTOP",
      price: 215.0,
      oldPrice: 250.0,
      discount: "-14%",
      image: "/assets/laptop-9.jpg",
    },
    banner: "/assets/vertical-image_1.avif",
    popularBrands: ["Apple", "ASUS ROG", "Dell XPS", "Lenovo", "MSI"],
  },
  {
    id: "computer",
    label: "Computer",
    subtitle: "Custom gaming rigs, PC components, processors & ultra-wide monitors",
    icon: "/assets/computer.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Desktop Computers",
        links: [
          { label: "Liquid-Cooled Gaming PCs", badge: "HOT" },
          { label: "All-in-One Desktops" },
          { label: "Creator Workstations", badge: "PRO" },
          { label: "Compact Mini PCs" },
        ],
      },
      {
        heading: "Core Components",
        links: [
          { label: "Unlocked CPUs & Processors", badge: "HOT" },
          { label: "RTX Graphics Cards" },
          { label: "Z790 & B650 Motherboards" },
          { label: "DDR5 RGB Memory (RAM)", badge: "NEW" },
        ],
      },
      {
        heading: "Storage & Cooling",
        links: [
          { label: "NVMe Gen5 M.2 SSDs", badge: "NEW" },
          { label: "External Portable SSDs" },
          { label: "AIO Liquid Coolers" },
          { label: "Tempered Glass PC Cases", badge: "SALE" },
        ],
      },
      {
        heading: "Monitors & Displays",
        links: [
          { label: "240Hz OLED Gaming Monitors", badge: "HOT" },
          { label: "4K UltraFine Creator Displays" },
          { label: "Curved Ultra-Wide 49”" },
          { label: "Dual Monitor Arms" },
        ],
      },
    ],
    featuredProduct: {
      title: "Intel Core i9 9th Gen Unlocked CPU",
      category: "CPU",
      price: 247.0,
      oldPrice: 250.0,
      discount: "-1%",
      image: "/assets/computer-9.jpg",
    },
    banner: "/assets/vertical-image_2.avif",
    popularBrands: ["Intel", "NVIDIA", "AMD Ryzen", "Corsair", "NZXT"],
  },
  {
    id: "smartphone",
    label: "Smartphones",
    subtitle: "Flagship 5G smartphones, foldables & MagSafe power gear",
    icon: "/assets/smartphone.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Flagship Smartphones",
        links: [
          { label: "iPhone 16 Pro Max", badge: "HOT" },
          { label: "Galaxy S24 Ultra S-Pen", badge: "PRO" },
          { label: "Google Pixel Pro AI" },
          { label: "Xiaomi Ultra Camera Phone" },
        ],
      },
      {
        heading: "Foldable & Gaming",
        links: [
          { label: "Galaxy Z Fold & Flip", badge: "NEW" },
          { label: "ROG Gaming Phones 165Hz", badge: "HOT" },
          { label: "RedMagic Active Cooled" },
          { label: "Dual-Screen Smartphones" },
        ],
      },
      {
        heading: "Unlocked & Value",
        links: [
          { label: "5G Mid-Range Phones" },
          { label: "Budget Smartphones", badge: "SALE" },
          { label: "Certified Refurbished" },
          { label: "Dual-SIM Travel Phones" },
        ],
      },
      {
        heading: "Phone Accessories",
        links: [
          { label: "MagSafe Wireless Chargers", badge: "NEW" },
          { label: "Aramid & Leather Cases" },
          { label: "20,000mAh Power Banks" },
          { label: "Gimbal Phone Stabilizers" },
        ],
      },
    ],
    featuredProduct: {
      title: "Smartphone - S Pen Ultra Series",
      category: "SMARTPHONE",
      price: 52.0,
      oldPrice: 60.0,
      discount: "-13%",
      image: "/assets/mobile-4.jpg",
    },
    popularBrands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
  },
  {
    id: "keyboard",
    label: "Keyboard & Mouse",
    subtitle: "Custom mechanical keyboards, ultra-lightweight mice & desk mats",
    icon: "/assets/keyboard.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Keyboards",
        links: [
          { label: "Hot-Swappable Mechanical", badge: "HOT" },
          { label: "Low-Profile Wireless", badge: "NEW" },
          { label: "Magnetic Rapid-Trigger", badge: "PRO" },
          { label: "Ergonomic Split Keyboards" },
        ],
      },
      {
        heading: "Precision Mice",
        links: [
          { label: "Ultra-Light Esports Mice", badge: "HOT" },
          { label: "Ergonomic Vertical Lift", badge: "NEW" },
          { label: "Multi-Device Bluetooth Mice" },
          { label: "Wireless Trackballs" },
        ],
      },
      {
        heading: "Custom Keycaps & Switches",
        links: [
          { label: "PBT Double-Shot Keycaps" },
          { label: "Lubed Linear & Tactile Switches" },
          { label: "Coiled Aviator Cables", badge: "SALE" },
          { label: "Artisan Wrist Rests" },
        ],
      },
      {
        heading: "Desk Setup Gear",
        links: [
          { label: "XXL RGB Gaming Desk Mats" },
          { label: " Felt & Leather Desk Pads" },
          { label: "Mouse Bungees & Grips" },
          { label: "PTFE Superglide Skates" },
        ],
      },
    ],
    featuredProduct: {
      title: "Wireless Vertical Mouse - Lift Series",
      category: "MOUSE",
      price: 220.0,
      oldPrice: 260.0,
      discount: "-15%",
      image: "/assets/computer-5.jpg",
    },
    popularBrands: ["Logitech G", "Razer", "Keychron", "SteelSeries", "Glorious"],
  },
  {
    id: "watch",
    label: "Smartwatch",
    subtitle: "Titanium smartwatches, ECG health trackers & sport wearables",
    icon: "/assets/watch.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Premium Smartwatches",
        links: [
          { label: "Apple Watch Ultra Titanium", badge: "HOT" },
          { label: "Apple Watch Series 10", badge: "NEW" },
          { label: "Galaxy Watch Ultra LTE" },
          { label: "Pixel Watch Curved" },
        ],
      },
      {
        heading: "Sport & Multisport GPS",
        links: [
          { label: "Garmin Fenix Solar", badge: "PRO" },
          { label: "Marathon & Triathlon Watches" },
          { label: "Dive & rugged Outdoor" },
          { label: "Golf GPS Smartwatches" },
        ],
      },
      {
        heading: "Fitness & Wellness",
        links: [
          { label: "Fitbit Charge & Sense", badge: "SALE" },
          { label: "Smart Health Rings", badge: "NEW" },
          { label: "Sleep & Recovery Bands" },
          { label: "Kids GPS Safe Watches" },
        ],
      },
      {
        heading: "Bands & Chargers",
        links: [
          { label: "Milanese & Titanium Bands" },
          { label: "Fluoroelastomer Sport Straps" },
          { label: "3-in-1 Watch Charging Docks" },
          { label: "Sapphire Bumper Cases" },
        ],
      },
    ],
    featuredProduct: {
      title: "Smartwatch - Advanced Sport Edition Pro",
      category: "SMARTWATCH",
      price: 385.0,
      oldPrice: 480.0,
      discount: "-20%",
      image: "/assets/watch-2.jpg",
    },
    popularBrands: ["Apple", "Garmin", "Samsung", "Fitbit", "Amazfit"],
  },
  {
    id: "game",
    label: "Video Games",
    subtitle: "Next-gen consoles, VR headsets, racing sims & pro controllers",
    icon: "/assets/game.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Gaming Consoles",
        links: [
          { label: "PlayStation 5 Pro Console", badge: "HOT" },
          { label: "Xbox Series X 2TB" },
          { label: "Nintendo Switch OLED", badge: "SALE" },
          { label: "Handheld PC Gaming Decks", badge: "NEW" },
        ],
      },
      {
        heading: "Controllers & Simulators",
        links: [
          { label: "Force-Feedback Racing Wheels", badge: "PRO" },
          { label: "Hall-Effect Pro Controllers", badge: "HOT" },
          { label: "Mobile Clip-On Gamepads" },
          { label: "Flight Sim Joysticks" },
        ],
      },
      {
        heading: "Virtual Reality (VR)",
        links: [
          { label: "4K Mixed Reality Headsets", badge: "NEW" },
          { label: "PCVR Tethered Systems" },
          { label: "Haptic VR Gloves & Trackers" },
          { label: "VR Prescription Lenses" },
        ],
      },
      {
        heading: "Streaming & Capture",
        links: [
          { label: "4K60 HDMI Capture Cards" },
          { label: "Stream Decks & Mixers", badge: "PRO" },
          { label: "RGB Gaming Chairs" },
          { label: "Console Charging Stations" },
        ],
      },
    ],
    featuredProduct: {
      title: "Mobile Clip-On Game Controller",
      category: "CONTROLLER",
      price: 215.0,
      oldPrice: 230.0,
      discount: "-7%",
      image: "/assets/game-3.jpg",
    },
    popularBrands: ["PlayStation", "Xbox", "Nintendo", "Meta Quest", "Thrustmaster"],
  },
  {
    id: "camera",
    label: "Cameras",
    subtitle: "Full-frame mirrorless, 360° action cameras, drones & cinema lenses",
    icon: "/assets/camera.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Digital Cameras",
        links: [
          { label: "Full-Frame Mirrorless 8K", badge: "PRO" },
          { label: "APS-C Vlog Cameras", badge: "HOT" },
          { label: "Professional DSLR Bodies" },
          { label: "Compact Street Cameras", badge: "NEW" },
        ],
      },
      {
        heading: "Action & 360° Cameras",
        links: [
          { label: "360° Dual-Lens Spherical", badge: "HOT" },
          { label: "Waterproof 5.3K Action Cams" },
          { label: "Pocket Gimbal Cameras", badge: "NEW" },
          { label: "FPV & Cinema Drones" },
        ],
      },
      {
        heading: "Lenses & Optics",
        links: [
          { label: "f/1.4 Prime Portrait Lenses" },
          { label: "Telephoto Zoom Lenses" },
          { label: "Anamorphic Cinema Lenses", badge: "PRO" },
          { label: "ND & Polarizer Filters" },
        ],
      },
      {
        heading: "Studio & Smart Security",
        links: [
          { label: "360° Smart Home PTZ Cams", badge: "SALE" },
          { label: "Carbon Fiber Tripods" },
          { label: "CFexpress & V90 SD Cards" },
          { label: "LED Key Lights & Softboxes" },
        ],
      },
    ],
    featuredProduct: {
      title: "360 VR Camera - Dual Lens Spherical",
      category: "CAMERA",
      price: 138.0,
      oldPrice: 150.0,
      discount: "-8%",
      image: "/assets/camera-1.jpg",
    },
    popularBrands: ["Sony Alpha", "Canon", "Insta360", "GoPro", "DJI"],
  },
  {
    id: "headphone",
    label: "Headphones",
    subtitle: "Active noise-cancelling headphones, studio monitors & spatial audio",
    icon: "/assets/headphone.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Over-Ear & On-Ear",
        links: [
          { label: "Adaptive ANC Headphones", badge: "HOT" },
          { label: "Open-Back Studio Monitors", badge: "PRO" },
          { label: "Lossless Spatial Audio", badge: "NEW" },
          { label: "Foldable Travel Headphones" },
        ],
      },
      {
        heading: "True Wireless Earbuds",
        links: [
          { label: "Noise-Cancelling Earbuds Pro", badge: "HOT" },
          { label: "Hi-Res LDAC Audiophile Buds" },
          { label: "Open-Ear Bone Conduction", badge: "NEW" },
          { label: "Sweatproof Workout Buds" },
        ],
      },
      {
        heading: "Gaming & Communication",
        links: [
          { label: "7.1 Surround Gaming Headsets" },
          { label: "Dual-Wireless Low Latency", badge: "PRO" },
          { label: "Broadcast Boom Arm Mics" },
          { label: "Office ANC Call Headsets" },
        ],
      },
      {
        heading: "Portable & Home Speakers",
        links: [
          { label: "Waterproof Party Speakers", badge: "SALE" },
          { label: "360° Smart Wi-Fi Speakers" },
          { label: "Desktop DAC & Amplifiers" },
          { label: "Aluminum Headphone Stands" },
        ],
      },
    ],
    featuredProduct: {
      title: "Studio Monitor Headphones",
      category: "HEADPHONES",
      price: 184.0,
      oldPrice: 210.0,
      discount: "-12%",
      image: "/assets/audio-10.jpg",
    },
    popularBrands: ["Sony", "Bose", "Sennheiser", "Apple Beats", "JBL"],
  },
  {
    id: "accesories",
    label: "Accesories",
    subtitle: "GaN chargers, Thunderbolt hubs, smart home gadgets & cables",
    icon: "/assets/usb.svg",
    hasChevron: true,
    subGroups: [
      {
        heading: "Charging & Power",
        links: [
          { label: "140W GaN Fast Chargers", badge: "HOT" },
          { label: "3-in-1 MagSafe Stands", badge: "NEW" },
          { label: "Airline-Safe Power Banks" },
          { label: "Surge Protector Power Strips" },
        ],
      },
      {
        heading: "Hubs & Connectivity",
        links: [
          { label: "12-in-1 Thunderbolt 4 Docks", badge: "PRO" },
          { label: "USB-C Multiport Adapters" },
          { label: "240W Braided USB4 Cables" },
          { label: "8K HDMI 2.1 Fiber Cables" },
        ],
      },
      {
        heading: "Smart Home & Tracking",
        links: [
          { label: "Bluetooth Item Trackers", badge: "HOT" },
          { label: "Smart Wi-Fi Plugs & Strips" },
          { label: "Ambient RGB Monitor Bars", badge: "SALE" },
          { label: " NFC Smart Tags" },
        ],
      },
      {
        heading: "Care & Organization",
        links: [
          { label: "Tech Organizer Pouches" },
          { label: "Under-Desk Cable Trays" },
          { label: "Electronics Cleaning Kits" },
          { label: "Magnetic Cable Clips" },
        ],
      },
    ],
    featuredProduct: {
      title: "Wireless Earbuds Pro - MagSafe Case",
      category: "ACCESSORIES",
      price: 238.0,
      oldPrice: 275.0,
      discount: "-13%",
      image: "/assets/audio-5.jpg",
    },
    popularBrands: ["Anker", "Belkin", "UGREEN", "CalDigit", "Satechi"],
  },
];

const BADGE_STYLES: Record<string, string> = {
  HOT: "bg-[#4f46e5] text-white",
  NEW: "bg-[#686cff] text-white",
  SALE: "bg-[#10b981] text-white",
  PRO: "bg-[#141233] text-white",
};

export default function Sidebar() {
  const { addToCart } = useStore();
  const [expanded, setExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<SidebarCategory | null>(null);
  const [drawerReady, setDrawerReady] = useState(false);
  const readyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile & Tablet Drawer States (< lg)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"categories" | "menu">("categories");
  const [openCatId, setOpenCatId] = useState<string | null>("laptop");
  const [openMenuId, setOpenMenuId] = useState<string | null>("Home");
  const [mobileFilter, setMobileFilter] = useState("");

  useEffect(() => {
    if (expanded) {
      readyTimerRef.current = setTimeout(() => {
        setDrawerReady(true);
      }, 190);
    } else {
      if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
      setDrawerReady(false);
      setHoveredItem(null);
    }
    return () => {
      if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
    };
  }, [expanded]);

  // Listen for custom open events from Header or Mobile Bottom Bar
  useEffect(() => {
    const handleOpenDrawer = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: "categories" | "menu" }>;
      if (customEvent.detail?.tab) {
        setMobileTab(customEvent.detail.tab);
      }
      setMobileOpen(true);
    };
    window.addEventListener("nexova:open-mobile-drawer", handleOpenDrawer);
    return () => {
      window.removeEventListener("nexova:open-mobile-drawer", handleOpenDrawer);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const filteredCategories = SIDEBAR_ITEMS.filter((item) => {
    if (!mobileFilter.trim()) return true;
    const q = mobileFilter.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.subGroups.some(
        (g) =>
          g.heading.toLowerCase().includes(q) ||
          g.links.some((l) => l.label.toLowerCase().includes(q))
      )
    );
  });

  const showFlyout = Boolean(expanded && drawerReady && hoveredItem);

  return (
    <>
      {/* Smooth Dark Backdrop Overlay when Sidebar is Expanded */}
      <div
        onClick={() => {
          setExpanded(false);
          setHoveredItem(null);
        }}
        className={`fixed inset-0 bg-black/45 backdrop-blur-[1px] z-40 transition-opacity duration-400 hidden lg:block ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Spacer to keep main page layout shifted by 60px on desktop */}
      <div className="hidden lg:block w-[60px] shrink-0" />

      {/* Fixed Vertical Sidebar Rail (60px) -> Smoothly Expands to 250px on Hover */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setHoveredItem(null);
        }}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-[#eaeaea] select-none z-50 transition-[width,box-shadow] duration-400 ${expanded ? "w-[250px] shadow-[12px_0_36px_rgba(0,0,0,0.14)]" : "w-[60px]"
          }`}
      >
        {/* Top Pink Circle -> Smoothly Morphs into Full-Width "Shop by Categories" Pill */}
        <div
          onMouseEnter={() => setHoveredItem(null)}
          className="w-full pt-[10px] pb-[6px] px-[9px] flex items-center shrink-0"
        >
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-label="Shop by Categories"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className={`h-[42px] rounded-full bg-[#141233] hover:bg-[#252159] text-white flex items-center transition-all duration-400 cursor-pointer overflow-hidden shadow-[0_4px_14px_rgba(20,18,51,0.28)] ${expanded ? "w-full pl-[13px] pr-4" : "w-[42px] pl-[13px]"
              }`}
          >
            {/* 3-Line Menu Icon locked at exact left offset so it never jumps */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="shrink-0"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>

            {/* Smoothly Fading/Sliding Label */}
            <span
              style={{
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: expanded ? "60ms" : "0ms",
              }}
              className={`ml-[14px] text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${expanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3 pointer-events-none"
                }`}
            >
              Shop by Categories
            </span>
          </button>
        </div>

        {/* Category Items List */}
        <nav className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden no-scrollbar pt-1">
          {SIDEBAR_ITEMS.map((item, idx) => {
            const isHovered = expanded && hoveredItem?.id === item.id;
            const isLastIconItem = idx === SIDEBAR_ITEMS.length - 1;
            return (
              <div
                key={item.id}
                className={!isLastIconItem ? "border-b border-[#efefef] mx-[10px]" : "mx-[10px]"}
              >
                <Link
                  href={`/categories/${item.id}`}
                  onMouseEnter={() => {
                    if (expanded) setHoveredItem(item);
                  }}
                  className={`group/item w-full h-[52px] pl-[9px] pr-[8px] rounded-[10px] flex items-center justify-between transition-all duration-200 relative shrink-0 ${isHovered
                      ? "text-[#4f46e5] bg-[#eef2ff]"
                      : "text-[#222222] hover:text-[#4f46e5] hover:bg-[#fafafa]"
                    }`}
                >
                  <div className="flex items-center min-w-0">
                    {/* Icon locked at exact left position */}
                    <div className="w-[22px] h-[22px] flex items-center justify-center shrink-0">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-[21px] h-[21px] object-contain transition-transform duration-300 group-hover/item:scale-110"
                      />
                    </div>

                    {/* Staggered Category Title */}
                    <span
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: expanded ? `${70 + idx * 25}ms` : "0ms",
                      }}
                      className={`ml-[18px] text-[14px] font-medium whitespace-nowrap transition-all duration-300 group-hover/item:translate-x-1 ${expanded
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-3 pointer-events-none"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Staggered Right Chevron */}
                  {item.hasChevron && (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: expanded ? `${85 + idx * 25}ms` : "0ms",
                      }}
                      className={`shrink-0 transition-all duration-300 ${isHovered ? "translate-x-1 text-[#4f46e5]" : "group-hover/item:translate-x-0.5"
                        } ${expanded
                          ? "opacity-75 translate-x-0"
                          : "opacity-0 -translate-x-2 pointer-events-none"
                        }`}
                    >
                      <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
                    </svg>
                  )}
                </Link>
              </div>
            );
          })}

          {/* Bottom "A.." (Collapsed) -> "All Categories" Underlined (Expanded) */}
          <div className="mx-[10px] mt-1">
            <Link
              href="/categories"
              onMouseEnter={() => setHoveredItem(null)}
              className="w-full h-[48px] pl-[9px] pr-[8px] flex items-center text-[#222222] hover:text-[#4f46e5] transition-colors shrink-0 relative"
            >
              <span
                className={`text-[13px] font-medium whitespace-nowrap transition-all duration-200 absolute left-[11px] ${expanded ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                  }`}
              >
                A..
              </span>

              <span
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: expanded ? "300ms" : "0ms",
                }}
                className={`text-[13.5px] font-medium underline underline-offset-4 decoration-[#222222]/60 hover:decoration-[#4f46e5] whitespace-nowrap transition-all duration-300 ${expanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-3 pointer-events-none"
                  }`}
              >
                All Categories
              </span>
            </Link>
          </div>
        </nav>

        {/* ============================================================
            ADVANCED FULL-HEIGHT MEGA MENU FLYOUT FOR ALL 9 CATEGORIES
            ============================================================ */}
        <div
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={`fixed left-[250px] top-0 h-screen w-[820px] xl:w-[880px] bg-white shadow-[24px_0_60px_rgba(12,11,34,0.16)] border-l border-[#efefef] z-50 overflow-y-auto custom-scrollbar transition-all duration-350 ${showFlyout
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
        >
          {hoveredItem && (
            <div
              key={hoveredItem.id}
              className="min-h-full flex flex-col justify-between p-7 xl:p-8 animate-fade-up"
            >
              {/* 1. Top Category Header Banner */}
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#efefef]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-[44px] h-[44px] rounded-[12px] bg-[#eef2ff] border border-[#4f46e5]/20 flex items-center justify-center shrink-0">
                      <img
                        src={hoveredItem.icon}
                        alt={hoveredItem.label}
                        className="w-[22px] h-[22px] object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-[#141233] leading-tight">
                        {hoveredItem.label}
                      </h3>
                      <p className="text-[12.5px] text-[#666666] mt-0.5">
                        {hoveredItem.subtitle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`/categories/${hoveredItem.id}`}
                    className="btn-shine inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-semibold uppercase tracking-wider transition-colors shrink-0"
                  >
                    <span>Explore All</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </div>

                {/* 2. Center Grid: Left 2x2 Subcategory Columns (7 cols) + Right Featured Deal / Visual Card (5 cols) */}
                <div className="grid grid-cols-12 gap-7 items-start">
                  {/* Left 7 Cols: 2x2 Sub-Category Groups with Badges */}
                  <div className="col-span-7 grid grid-cols-2 gap-x-6 gap-y-7">
                    {hoveredItem.subGroups.map((grp, gIdx) => (
                      <div
                        key={grp.heading}
                        style={{ animationDelay: `${gIdx * 55}ms` }}
                        className="animate-fade-up"
                      >
                        <h4 className="text-[14.5px] font-bold text-[#141233] mb-3 pb-1.5 border-b border-[#f3f3f3] flex items-center justify-between">
                          <span>{grp.heading}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                        </h4>
                        <ul className="space-y-2.5">
                          {grp.links.map((lnk) => (
                            <li key={lnk.label}>
                              <a
                                href={`/categories/${hoveredItem.id}`}
                                className="group/lnk flex items-center justify-between text-[13.5px] font-normal text-[#444444] hover:text-[#4f46e5] transition-all duration-200"
                              >
                                <span className="group-hover/lnk:translate-x-1.5 transition-transform duration-200">
                                  {lnk.label}
                                </span>
                                {lnk.badge && (
                                  <span
                                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[4px] leading-none shrink-0 ${BADGE_STYLES[lnk.badge]
                                      }`}
                                  >
                                    {lnk.badge}
                                  </span>
                                )}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Right 5 Cols: Featured Category Deal Card + Optional Promo Art */}
                  <div className="col-span-5 flex flex-col gap-4">
                    {/* Featured Best-Seller Card */}
                    {(() => {
                      const resolvedProd = resolveStoreProduct(hoveredItem.featuredProduct);
                      return (
                        <div className="rounded-[18px] border border-[#eaeaea] bg-[#fafafa] p-4 relative group/prod hover:border-[#4f46e5] hover:bg-white hover:shadow-[0_14px_32px_rgba(79,70,229,0.1)] transition-all duration-300">
                          <span className="absolute top-3 left-3 z-10 bg-[#4f46e5] text-white text-[10px] font-bold uppercase px-2.5 py-1 badge-leaf">
                            {hoveredItem.featuredProduct.discount}
                          </span>
                          <span className="absolute top-3 right-3 z-10 bg-[#141233] text-white text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            TOP PICK
                          </span>

                          <Link
                            href={`/product/${resolvedProd.slug}`}
                            onClick={() => {
                              setExpanded(false);
                              setHoveredItem(null);
                            }}
                            className="w-full h-[170px] rounded-[12px] bg-white p-3 flex items-center justify-center mb-3.5 overflow-hidden"
                          >
                            <img
                              src={hoveredItem.featuredProduct.image}
                              alt={hoveredItem.featuredProduct.title}
                              className="w-full h-full object-contain group-hover/prod:scale-108 transition-transform duration-500"
                            />
                          </Link>

                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#999999] mb-1">
                            {hoveredItem.featuredProduct.category}
                          </div>
                          <Link
                            href={`/product/${resolvedProd.slug}`}
                            onClick={() => {
                              setExpanded(false);
                              setHoveredItem(null);
                            }}
                            className="block text-[14px] font-bold text-[#141233] group-hover/prod:text-[#4f46e5] transition-colors line-clamp-1 mb-2"
                          >
                            {hoveredItem.featuredProduct.title}
                          </Link>

                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[17px] font-extrabold text-[#4f46e5]">
                                AED {hoveredItem.featuredProduct.price.toFixed(2)}
                              </span>
                              <span className="text-[13px] text-[#999999] line-through">
                                AED {hoveredItem.featuredProduct.oldPrice.toFixed(2)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => addToCart(resolvedProd, 1)}
                              className="btn-shine px-3.5 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-semibold uppercase transition-colors cursor-pointer"
                            >
                              + Add Cart
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Secondary Promo Banner or VIP Perks Card */}
                    {hoveredItem.banner ? (
                      <a
                        href={`#${hoveredItem.id}`}
                        className="banner-shine flex items-center justify-center rounded-[16px] overflow-hidden h-[160px] bg-[#f8f8fa] border border-[#efefef] p-2 relative group/bnr"
                      >
                        <img
                          src={hoveredItem.banner}
                          alt={hoveredItem.label}
                          className="w-full h-full object-contain group-hover/bnr:scale-103 transition-transform duration-500"
                        />
                      </a>
                    ) : (
                      <div
                        className="rounded-[16px] p-4 text-white relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, #141233 0%, #2a2468 60%, #4f46e5 100%)",
                        }}
                      >
                        <span className="inline-block bg-white/15 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5">
                          BUNDLE & SAVE
                        </span>
                        <h5 className="text-[15px] font-bold leading-snug mb-1">
                          Save up to 30% on {hoveredItem.label}
                        </h5>
                        <p className="text-[12px] text-white/80 mb-3">
                          Combine any 3 accessories or gadgets for instant discount.
                        </p>
                        <a
                          href="#bundle"
                          className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#38bdf8] hover:text-white transition-colors"
                        >
                          <span>Build Your Bundle</span>
                          <span>→</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Bottom Popular Brands Quick-Bar */}
              <div className="mt-7 pt-4 border-t border-[#efefef] flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#888888] mr-1">
                    Top Brands:
                  </span>
                  {hoveredItem.popularBrands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/shop?brand=${encodeURIComponent(brand)}`}
                      onClick={() => {
                        setExpanded(false);
                        setHoveredItem(null);
                      }}
                      className="px-3 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#4f46e5] text-[#333333] hover:text-white text-[12px] font-medium transition-all duration-200"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
                <span className="text-[11.5px] text-[#4f46e5] font-semibold">
                  Free Express Shipping AED 500+
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* =====================================================================
          MOBILE & TABLET ADVANCED MEGA DRAWER (< lg)
          - Dual Segmented Tabs: "Categories (9)" & "Main Menu"
          - 2-Level Expandable Accordions + Badges + Featured Deal Cards
          ===================================================================== */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/55 backdrop-blur-[2px] z-50 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      <aside
        aria-label="Mobile Navigation Drawer"
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-[88vw] max-w-[380px] bg-white z-50 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.28)] transition-transform duration-350 select-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* 1. Drawer Dark Gradient Header (Logo + Close + Quick Filter) */}
        <div
          className="px-4 pt-4 pb-3.5 text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #0c0b22 0%, #222051 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center"
            >
              <img
                src="/assets/logo-new.svg"
                alt="Nexova"
                className="h-[28px] w-auto object-contain"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-[34px] h-[34px] rounded-full bg-white/10 hover:bg-[#4f46e5] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Segmented 2-Tab Switcher: Categories vs Main Menu */}
          <div className="grid grid-cols-2 p-1 rounded-[12px] bg-white/10">
            <button
              type="button"
              onClick={() => setMobileTab("categories")}
              className={`py-2 px-3 rounded-[9px] text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${mobileTab === "categories"
                  ? "bg-[#4f46e5] text-white shadow-sm"
                  : "text-white/80 hover:text-white"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Categories (9)</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("menu")}
              className={`py-2 px-3 rounded-[9px] text-[12.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${mobileTab === "menu"
                  ? "bg-[#4f46e5] text-white shadow-sm"
                  : "text-white/80 hover:text-white"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>Main Menu</span>
            </button>
          </div>
        </div>

        {/* 2. Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-2.5">
          {mobileTab === "categories" ? (
            <>
              {/* Quick Category Filter Input */}
              <div className="relative mb-2">
                <input
                  type="text"
                  value={mobileFilter}
                  onChange={(e) => setMobileFilter(e.target.value)}
                  placeholder="Filter categories, brands or gear..."
                  className="w-full h-[38px] pl-9 pr-8 rounded-[10px] bg-[#f5f5f7] border border-[#e8e8ec] text-[13px] text-[#222222] placeholder-[#888888] focus:outline-none focus:border-[#4f46e5] focus:bg-white transition-colors"
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888888"
                  strokeWidth="2.2"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="20" y1="20" x2="16" y2="16" strokeLinecap="round" />
                </svg>
                {mobileFilter && (
                  <button
                    type="button"
                    onClick={() => setMobileFilter("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#222222] text-[12px]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 9 Expandable Category Accordions */}
              {filteredCategories.map((cat) => {
                const isOpen = openCatId === cat.id || Boolean(mobileFilter.trim());
                return (
                  <div
                    key={cat.id}
                    className={`rounded-[14px] border transition-all duration-200 overflow-hidden ${isOpen
                        ? "border-[#4f46e5]/40 bg-[#f8faff] shadow-[0_6px_20px_rgba(79,70,229,0.08)]"
                        : "border-[#efefef] bg-white"
                      }`}
                  >
                    {/* Category Header Row */}
                    <button
                      type="button"
                      onClick={() => setOpenCatId(isOpen ? null : cat.id)}
                      className="w-full px-3.5 py-3 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#4f46e5]/15" : "bg-[#f6f6f8]"
                            }`}
                        >
                          <img
                            src={cat.icon}
                            alt={cat.label}
                            className="w-[19px] h-[19px] object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-[14px] font-bold leading-tight truncate ${isOpen ? "text-[#4f46e5]" : "text-[#141233]"
                              }`}
                          >
                            {cat.label}
                          </div>
                          <div className="text-[11px] text-[#777777] truncate mt-0.5">
                            {cat.subtitle}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                            ? "bg-[#4f46e5] text-white rotate-180"
                            : "bg-[#f5f5f7] text-[#555555]"
                          }`}
                      >
                        <svg width="11" height="11" viewBox="0 0 48 48" fill="currentColor">
                          <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                        </svg>
                      </span>
                    </button>

                    {/* Expanded Subcategory Groups + Featured Deal Card + Brand Chips */}
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-[#4f46e5]/15 space-y-3.5 bg-white">
                        {/* Subcategory Groups */}
                        <div className="grid grid-cols-1 gap-3 pt-2">
                          {cat.subGroups.map((grp) => (
                            <div
                              key={grp.heading}
                              className="rounded-[10px] bg-[#fafafa] p-2.5 border border-[#f0f0f0]"
                            >
                              <div className="text-[12px] font-bold text-[#141233] mb-2 flex items-center justify-between">
                                <span>{grp.heading}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                              </div>
                              <ul className="space-y-1.5">
                                {grp.links.map((lnk) => (
                                  <li key={lnk.label}>
                                    <a
                                      href={`#${cat.id}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center justify-between text-[12.5px] text-[#444444] hover:text-[#4f46e5] py-0.5 transition-colors"
                                    >
                                      <span>{lnk.label}</span>
                                      {lnk.badge && (
                                        <span
                                          className={`text-[8.5px] font-bold uppercase px-1.5 py-0.5 rounded-[4px] leading-none ${BADGE_STYLES[lnk.badge]
                                            }`}
                                        >
                                          {lnk.badge}
                                        </span>
                                      )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Compact Featured Deal Card inside Mobile Accordion */}
                        {(() => {
                          const resolvedProd = resolveStoreProduct(cat.featuredProduct);
                          return (
                            <div className="flex items-center gap-3 p-2.5 rounded-[12px] border border-[#eaeaea] bg-[#fdfdfd] hover:border-[#4f46e5] transition-all">
                              <Link
                                href={`/product/${resolvedProd.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="w-[62px] h-[62px] rounded-[10px] bg-white p-1.5 border border-[#f0f0f0] flex items-center justify-center shrink-0"
                              >
                                <img
                                  src={cat.featuredProduct.image}
                                  alt={cat.featuredProduct.title}
                                  className="w-full h-full object-contain"
                                />
                              </Link>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="bg-[#4f46e5] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] leading-none">
                                    {cat.featuredProduct.discount}
                                  </span>
                                  <span className="text-[9.5px] font-bold uppercase text-[#888888]">
                                    TOP PICK
                                  </span>
                                </div>
                                <Link
                                  href={`/product/${resolvedProd.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="block text-[12.5px] font-bold text-[#141233] hover:text-[#4f46e5] truncate"
                                >
                                  {cat.featuredProduct.title}
                                </Link>
                                <div className="flex items-center justify-between gap-2 mt-1">
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-[13.5px] font-extrabold text-[#4f46e5]">
                                      AED {cat.featuredProduct.price.toFixed(2)}
                                    </span>
                                    <span className="text-[11px] text-[#999999] line-through">
                                      AED {cat.featuredProduct.oldPrice.toFixed(2)}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => addToCart(resolvedProd, 1)}
                                    className="px-2.5 py-1 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[10px] font-bold uppercase cursor-pointer"
                                  >
                                    + Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Popular Brands Row */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          {cat.popularBrands.map((b) => (
                            <Link
                              key={b}
                              href={`/shop?brand=${encodeURIComponent(b)}`}
                              onClick={() => setMobileOpen(false)}
                              className="px-2.5 py-1 rounded-full bg-[#f4f4f6] hover:bg-[#4f46e5] text-[#333333] hover:text-white text-[11px] font-medium transition-colors"
                            >
                              {b}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            /* TAB 2: MAIN NAVIGATION MEGA MENU ACCORDIONS */
            <div className="space-y-2.5">
              {/* 1. Home Showcase Accordion */}
              <div className="rounded-[14px] border border-[#efefef] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(openMenuId === "Home" ? null : "Home")}
                  className="w-full px-3.5 py-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-[#141233]">Home Sections</span>
                  <span
                    className={`w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all ${openMenuId === "Home"
                        ? "bg-[#4f46e5] text-white rotate-180"
                        : "bg-[#f5f5f7] text-[#555555]"
                      }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                    </svg>
                  </span>
                </button>
                {openMenuId === "Home" && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-[#f3f3f3] grid grid-cols-2 gap-2.5">
                    {[
                      { title: "New Arrivals", badge: "NEW", img: "/assets/laptop-9.jpg", href: "/#new-arrivals" },
                      { title: "Flash Sale Off", badge: "HOT", img: "/assets/watch-2.jpg", href: "/#sale-off" },
                      { title: "Bundle & Save", badge: "-30%", img: "/assets/audio-10.jpg", href: "/#bundle" },
                      { title: "Featured Gear", badge: "PRO", img: "/assets/game-1.jpg", href: "/#featured" },
                      { title: "Collections", badge: "TREND", img: "/assets/collection-1.jpg", href: "/#collections" },
                      { title: "Tech Journal", badge: "BLOG", img: "/assets/blog-2.jpg", href: "/#all-blogs" },
                    ].map((c) => (
                      <a
                        key={c.title}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-[10px] border border-[#eaeaea] hover:border-[#4f46e5] p-2 bg-[#fafafa] flex flex-col items-center text-center relative"
                      >
                        <span className="absolute top-1.5 left-1.5 bg-[#4f46e5] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-[4px]">
                          {c.badge}
                        </span>
                        <div className="w-full h-[58px] bg-white rounded-[8px] p-1.5 flex items-center justify-center mb-1.5">
                          <img src={c.img} alt={c.title} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[11.5px] font-bold text-[#141233]">{c.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Shop Layouts Accordion */}
              <div className="rounded-[14px] border border-[#efefef] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(openMenuId === "Shop" ? null : "Shop")}
                  className="w-full px-3.5 py-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-[#141233]">Shop & Catalog</span>
                  <span
                    className={`w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all ${openMenuId === "Shop"
                        ? "bg-[#4f46e5] text-white rotate-180"
                        : "bg-[#f5f5f7] text-[#555555]"
                      }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                    </svg>
                  </span>
                </button>
                {openMenuId === "Shop" && (
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-[#f3f3f3] space-y-2">
                    {[
                      { label: "Collection Left Sidebar", badge: "HOT" },
                      { label: "Collection Top Filter" },
                      { label: "Flash Deals Grid", badge: "SALE" },
                      { label: "Canvas Filter Drawer", badge: "NEW" },
                      { label: "Bundle Builder 30% Off", badge: "-30%" },
                      { label: "Shop All Categories" },
                    ].map((l) => (
                      <a
                        key={l.label}
                        href="#shop"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between text-[13px] text-[#444444] hover:text-[#4f46e5] py-1"
                      >
                        <span>{l.label}</span>
                        {l.badge && (
                          <span className="bg-[#4f46e5] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                            {l.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Product Pages Accordion */}
              <div className="rounded-[14px] border border-[#efefef] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(openMenuId === "Product" ? null : "Product")}
                  className="w-full px-3.5 py-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-[#141233]">Product Features</span>
                  <span
                    className={`w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all ${openMenuId === "Product"
                        ? "bg-[#4f46e5] text-white rotate-180"
                        : "bg-[#f5f5f7] text-[#555555]"
                      }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                    </svg>
                  </span>
                </button>
                {openMenuId === "Product" && (
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-[#f3f3f3] space-y-2">
                    {[
                      { label: "Product Detail Default", badge: "HOT" },
                      { label: "Product Deals Countdown", badge: "SALE" },
                      { label: "Product 3D & AR Model", badge: "PRO" },
                      { label: "Color & Storage Swatches", badge: "NEW" },
                      { label: "Frequently Bought Together" },
                    ].map((l) => (
                      <a
                        key={l.label}
                        href="#product"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between text-[13px] text-[#444444] hover:text-[#4f46e5] py-1"
                      >
                        <span>{l.label}</span>
                        {l.badge && (
                          <span className="bg-[#686cff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                            {l.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Store Pages & Blogs Accordion */}
              <div className="rounded-[14px] border border-[#efefef] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenMenuId(openMenuId === "Pages" ? null : "Pages")}
                  className="w-full px-3.5 py-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-[#141233]">Pages & Tech Blog</span>
                  <span
                    className={`w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all ${openMenuId === "Pages"
                        ? "bg-[#4f46e5] text-white rotate-180"
                        : "bg-[#f5f5f7] text-[#555555]"
                      }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 48 48" fill="currentColor">
                      <polygon points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586" />
                    </svg>
                  </span>
                </button>
                {openMenuId === "Pages" && (
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-[#f3f3f3] grid grid-cols-2 gap-2">
                    {[
                      { label: "About Us", href: "/about" },
                      { label: "Contact Us", href: "/contact" },
                      { label: "Shop All", href: "/shop" },
                      { label: "Categories", href: "/categories" },
                      { label: "Shopping Cart", href: "/cart" },
                      { label: "Checkout", href: "/checkout" },
                      { label: "My Account", href: "/account" },
                      { label: "Wishlist", href: "/wishlist" },
                      { label: "Order Tracking", href: "/track-order" },
                      { label: "Blogs", href: "/blogs" },
                      { label: "FAQs", href: "/faq" },
                      { label: "Shipping Policy", href: "/shipping-policy" },
                      { label: "Return Policy", href: "/return-policy" },
                      { label: "Privacy Policy", href: "/privacy-policy" },
                      { label: "Terms & Conditions", href: "/terms-conditions" },
                    ].map((p) => (
                      <a
                        key={p.label}
                        href={p.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2 rounded-[8px] bg-[#f7f7f9] hover:bg-[#4f46e5] text-[#222222] hover:text-white text-[12px] font-semibold transition-colors"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Special Offer & Bundle Banner Card */}
              <div
                className="rounded-[16px] p-4 text-white"
                style={{
                  background: "linear-gradient(135deg, #141233 0%, #2a2468 55%, #4f46e5 100%)",
                }}
              >
                <span className="inline-block bg-white/15 text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5">
                  SPECIAL OFFER!
                </span>
                <h4 className="text-[16px] font-extrabold leading-snug mb-1">
                  Buy Any 3 Gear & Save 30%
                </h4>
                <p className="text-[12px] text-white/80 mb-3">
                  Mix & match headphones, watches, or accessories for instant 30% discount.
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="#bundle"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-2 rounded-full bg-white text-[#141233] text-center text-[11.5px] font-bold uppercase tracking-wide"
                  >
                    Build Bundle
                  </a>
                  <a
                    href="#sale-off"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-2 rounded-full bg-[#4f46e5] text-white text-center text-[11.5px] font-bold uppercase tracking-wide"
                  >
                    Flash Deals
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Drawer Footer: 24/7 Support & Quick Utility Links */}
        <div className="p-3.5 border-t border-[#efefef] bg-[#fafafa] shrink-0">
          <div className="flex items-center justify-between mb-2">
            <a
              href="tel:1888456789"
              className="flex items-center gap-2 text-[12.5px] font-bold text-[#141233] hover:text-[#4f46e5]"
            >
              <span className="w-[26px] h-[26px] rounded-full bg-[#4f46e5]/15 text-[#4f46e5] flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>24/7 Support: 1-888-456-789</span>
            </a>
            <span className="text-[11px] font-semibold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">
              Online
            </span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-[#666666] pt-1.5 border-t border-[#eaeaea]">
            <a href="/faq" onClick={() => setMobileOpen(false)} className="hover:text-[#4f46e5]">
              Help Center
            </a>
            <span>•</span>
            <a href="/about" onClick={() => setMobileOpen(false)} className="hover:text-[#4f46e5]">
              Find a Store
            </a>
            <span>•</span>
            <a href="/track-order" onClick={() => setMobileOpen(false)} className="hover:text-[#4f46e5]">
              Track Orders
            </a>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          FIXED MOBILE BOTTOM APP BAR (< lg)
          - Thumb-friendly quick access to Home, Categories, Menu, Deals, Cart
          ===================================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[62px] bg-white/95 backdrop-blur-md border-t border-[#e8e8ec] shadow-[0_-6px_24px_rgba(0,0,0,0.08)] grid grid-cols-5 items-center px-1 select-none"
      >
        <a
          href="/"
          className="flex flex-col items-center justify-center gap-1 py-1 text-[#141233] hover:text-[#4f46e5] transition-colors"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10.5px] font-bold">Home</span>
        </a>

        <a
          href="/categories"
          className="flex flex-col items-center justify-center gap-1 py-1 text-[#141233] hover:text-[#4f46e5] transition-colors cursor-pointer"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span className="text-[10.5px] font-bold">Categories</span>
        </a>

        {/* Center Highlighted Indigo Pill Button: Mega Menu */}
        <button
          type="button"
          onClick={() => {
            setMobileTab("menu");
            setMobileOpen(true);
          }}
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer group"
        >
          <span className="w-[44px] h-[44px] rounded-full bg-[#141233] text-white shadow-[0_6px_18px_rgba(20,18,51,0.35)] flex items-center justify-center group-active:scale-95 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>
          <span className="text-[10px] font-bold text-[#141233] mt-0.5">Menu</span>
        </button>

        <a
          href="/shop"
          className="relative flex flex-col items-center justify-center gap-1 py-1 text-[#141233] hover:text-[#4f46e5] transition-colors"
        >
          <span className="absolute top-0.5 right-3.5 w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="text-[10.5px] font-bold">Shop</span>
        </a>

        <a
          href="/cart"
          className="relative flex flex-col items-center justify-center gap-1 py-1 text-[#141233] hover:text-[#4f46e5] transition-colors cursor-pointer"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="text-[10.5px] font-bold">Cart</span>
        </a>
      </nav>
    </>
  );
}
