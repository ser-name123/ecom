"use client";

import React, { useState, useRef, useEffect } from "react";

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
  HOT: "bg-[#f43777] text-white",
  NEW: "bg-[#686cff] text-white",
  SALE: "bg-[#10b981] text-white",
  PRO: "bg-[#141233] text-white",
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<SidebarCategory | null>(null);
  const [drawerReady, setDrawerReady] = useState(false);
  const readyTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const showFlyout = Boolean(expanded && drawerReady && hoveredItem);

  return (
    <>
      {/* Smooth Dark Backdrop Overlay when Sidebar is Expanded */}
      <div
        onClick={() => {
          setExpanded(false);
          setHoveredItem(null);
        }}
        className={`fixed inset-0 bg-black/45 backdrop-blur-[1px] z-40 transition-opacity duration-400 hidden lg:block ${
          expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-[#eaeaea] select-none z-50 transition-[width,box-shadow] duration-400 ${
          expanded ? "w-[250px] shadow-[12px_0_36px_rgba(0,0,0,0.14)]" : "w-[60px]"
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
            className={`h-[42px] rounded-full bg-[#f43777] hover:bg-[#e02d6b] text-white flex items-center transition-all duration-400 cursor-pointer overflow-hidden shadow-[0_4px_14px_rgba(244,55,119,0.3)] ${
              expanded ? "w-full pl-[13px] pr-4" : "w-[42px] pl-[13px]"
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
              className={`ml-[14px] text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
                expanded
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
                <a
                  href={`#${item.id}`}
                  onMouseEnter={() => {
                    if (expanded) setHoveredItem(item);
                  }}
                  className={`group/item w-full h-[52px] pl-[9px] pr-[8px] rounded-[10px] flex items-center justify-between transition-all duration-200 relative shrink-0 ${
                    isHovered
                      ? "text-[#f43777] bg-[#fff3f7]"
                      : "text-[#222222] hover:text-[#f43777] hover:bg-[#fafafa]"
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
                      className={`ml-[18px] text-[14px] font-medium whitespace-nowrap transition-all duration-300 group-hover/item:translate-x-1 ${
                        expanded
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
                      className={`shrink-0 transition-all duration-300 ${
                        isHovered ? "translate-x-1 text-[#f43777]" : "group-hover/item:translate-x-0.5"
                      } ${
                        expanded
                          ? "opacity-75 translate-x-0"
                          : "opacity-0 -translate-x-2 pointer-events-none"
                      }`}
                    >
                      <polygon points="14.586,9.414 29.171,24 14.586,38.586 17.414,41.414 34.829,24 17.414,6.586" />
                    </svg>
                  )}
                </a>
              </div>
            );
          })}

          {/* Bottom "A.." (Collapsed) -> "All Categories" Underlined (Expanded) */}
          <div className="mx-[10px] mt-1">
            <a
              href="#all-categories"
              onMouseEnter={() => setHoveredItem(null)}
              className="w-full h-[48px] pl-[9px] pr-[8px] flex items-center text-[#222222] hover:text-[#f43777] transition-colors shrink-0 relative"
            >
              <span
                className={`text-[13px] font-medium whitespace-nowrap transition-all duration-200 absolute left-[11px] ${
                  expanded ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                }`}
              >
                A..
              </span>

              <span
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: expanded ? "300ms" : "0ms",
                }}
                className={`text-[13.5px] font-medium underline underline-offset-4 decoration-[#222222]/60 hover:decoration-[#f43777] whitespace-nowrap transition-all duration-300 ${
                  expanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-3 pointer-events-none"
                }`}
              >
                All Categories
              </span>
            </a>
          </div>
        </nav>

        {/* ============================================================
            ADVANCED FULL-HEIGHT MEGA MENU FLYOUT FOR ALL 9 CATEGORIES
            ============================================================ */}
        <div
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={`fixed left-[250px] top-0 h-screen w-[820px] xl:w-[880px] bg-white shadow-[24px_0_60px_rgba(12,11,34,0.16)] border-l border-[#efefef] z-50 overflow-y-auto custom-scrollbar transition-all duration-350 ${
            showFlyout
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
                    <div className="w-[44px] h-[44px] rounded-[12px] bg-[#fff2f7] border border-[#f43777]/20 flex items-center justify-center shrink-0">
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
                    href={`#${hoveredItem.id}`}
                    className="btn-shine inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141233] hover:bg-[#f43777] text-white text-[11.5px] font-semibold uppercase tracking-wider transition-colors shrink-0"
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f43777]" />
                        </h4>
                        <ul className="space-y-2.5">
                          {grp.links.map((lnk) => (
                            <li key={lnk.label}>
                              <a
                                href={`#${hoveredItem.id}`}
                                className="group/lnk flex items-center justify-between text-[13.5px] font-normal text-[#444444] hover:text-[#f43777] transition-all duration-200"
                              >
                                <span className="group-hover/lnk:translate-x-1.5 transition-transform duration-200">
                                  {lnk.label}
                                </span>
                                {lnk.badge && (
                                  <span
                                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[4px] leading-none shrink-0 ${
                                      BADGE_STYLES[lnk.badge]
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
                    <div className="rounded-[18px] border border-[#eaeaea] bg-[#fafafa] p-4 relative group/prod hover:border-[#f43777] hover:bg-white hover:shadow-[0_14px_32px_rgba(244,55,119,0.1)] transition-all duration-300">
                      <span className="absolute top-3 left-3 z-10 bg-[#f43777] text-white text-[10px] font-bold uppercase px-2.5 py-1 badge-leaf">
                        {hoveredItem.featuredProduct.discount}
                      </span>
                      <span className="absolute top-3 right-3 z-10 bg-[#141233] text-white text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        TOP PICK
                      </span>

                      <div className="w-full h-[170px] rounded-[12px] bg-white p-3 flex items-center justify-center mb-3.5 overflow-hidden">
                        <img
                          src={hoveredItem.featuredProduct.image}
                          alt={hoveredItem.featuredProduct.title}
                          className="w-full h-full object-contain group-hover/prod:scale-108 transition-transform duration-500"
                        />
                      </div>

                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#999999] mb-1">
                        {hoveredItem.featuredProduct.category}
                      </div>
                      <h5 className="text-[14px] font-bold text-[#141233] group-hover/prod:text-[#f43777] transition-colors line-clamp-1 mb-2">
                        {hoveredItem.featuredProduct.title}
                      </h5>

                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[17px] font-extrabold text-[#f43777]">
                            ${hoveredItem.featuredProduct.price.toFixed(2)}
                          </span>
                          <span className="text-[13px] text-[#999999] line-through">
                            ${hoveredItem.featuredProduct.oldPrice.toFixed(2)}
                          </span>
                        </div>
                        <a
                          href={`#${hoveredItem.id}`}
                          className="btn-shine px-3.5 py-1.5 rounded-full bg-[#141233] hover:bg-[#f43777] text-white text-[11px] font-semibold uppercase transition-colors"
                        >
                          Shop Now
                        </a>
                      </div>
                    </div>

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
                            "linear-gradient(135deg, #141233 0%, #2a2468 60%, #f43777 100%)",
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
                          className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#ff85ad] hover:text-white transition-colors"
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
                    <a
                      key={brand}
                      href={`#brand-${brand.toLowerCase()}`}
                      className="px-3 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#f43777] text-[#333333] hover:text-white text-[12px] font-medium transition-all duration-200"
                    >
                      {brand}
                    </a>
                  ))}
                </div>
                <span className="text-[11.5px] text-[#f43777] font-semibold">
                  Free Express Shipping $500+
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
