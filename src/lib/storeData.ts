export interface ProductReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string;
  subtitle: string;
  brand: string;
  category: string;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  soldCount: number;
  badge?: "NEW" | "HOT" | "SALE" | "PRO" | "BESTSELLER";
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  editions: string[];
  shortDesc: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  reviews: ProductReview[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  heroBanner: string;
  accentColor: string;
  itemCount: number;
  subcategories: string[];
  brands: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  gallery: string[];
  tags: string[];
  keyTakeaways: string[];
  sections: { heading: string; body: string }[];
  relatedProductSlugs: string[];
}

export interface OrderTrackingRecord {
  orderId: string;
  email: string;
  status: "Confirmed" | "Quality Check" | "Dispatched" | "In Transit" | "Out for Delivery" | "Delivered";
  currentStep: number;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  totalAmount: number;
  items: { title: string; qty: number; price: number; image: string; slug: string }[];
  timeline: { step: string; location: string; timestamp: string; detail: string; completed: boolean }[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "laptop",
    slug: "laptop",
    name: "Laptop & Tablet",
    shortName: "Laptop",
    subtitle: "Ultrabooks, Creator Workstations & Pro Tablets",
    description:
      "Experience featherweight portability and workstation-grade silicon with OLED displays, all-day battery life, and AI neural acceleration.",
    icon: "/assets/laptop.svg",
    image: "/assets/cate-6.jpg",
    heroBanner: "/assets/Banner-3.jpg",
    accentColor: "#4f46e5",
    itemCount: 42,
    subcategories: ["MacBook & Ultrabooks", "RTX Gaming Laptops", "2-in-1 Convertible", "OLED Pro Tablets", "Creator Workstations"],
    brands: ["Apple", "Dell", "ThinkPad", "ASUS", "Samsung"],
  },
  {
    id: "computer",
    slug: "computer",
    name: "Computer & PC",
    shortName: "Computer",
    subtitle: "Custom Gaming Rigs, All-in-Ones & 4K Monitors",
    description:
      "Engineered for extreme frame rates, 3D rendering, and multi-display studio productivity with liquid-cooled thermal architecture.",
    icon: "/assets/computer.svg",
    image: "/assets/cate-3.jpg",
    heroBanner: "/assets/Banner-4.jpg",
    accentColor: "#06b6d4",
    itemCount: 38,
    subcategories: ["Liquid-Cooled Gaming PCs", "Tempered Glass Cases", "Curved 240Hz Monitors", "Mini-PC Workstations", "Graphics Cards"],
    brands: ["Dell", "ASUS", "MSI", "Corsair", "ThinkPad"],
  },
  {
    id: "mobile",
    slug: "mobile",
    name: "Mobile & Tablet",
    shortName: "Mobile & Tablet",
    subtitle: "5G Flagship Smartphones & Foldable Displays",
    description:
      "Capture cinema-grade 8K video and game at 120Hz with next-gen titanium 5G smartphones and ultra-thin foldable tablets.",
    icon: "/assets/smartphone.svg",
    image: "/assets/cate-4.jpg",
    heroBanner: "/assets/Banner-tab-1.jpg",
    accentColor: "#4f46e5",
    itemCount: 34,
    subcategories: ["5G Pro Smartphones", "Foldable Dual-Screen", "Pro Camera Phones", "MagSafe Chargers", "Rugged Cases"],
    brands: ["Samsung", "Apple", "Vivo", "Huawei", "Xiaomi"],
  },
  {
    id: "keyboard",
    slug: "keyboard",
    name: "Keyboard & Mouse",
    shortName: "Keyboard",
    subtitle: "Hot-Swappable Mechanical Boards & 8K Mice",
    description:
      "Precision tactile mechanical switches, CNC aluminum frames, and ultralight wireless esports mice for zero-latency control.",
    icon: "/assets/keyboard.svg",
    image: "/assets/cate-8.jpg",
    heroBanner: "/assets/Banner-2.jpg",
    accentColor: "#8b5cf6",
    itemCount: 27,
    subcategories: ["75% Gasket Mechanical", "Low-Profile Wireless", "Ultralight Gaming Mice", "Custom PBT Keycaps", "RGB Desk Mats"],
    brands: ["Logitech", "Keychron", "Razer", "SteelSeries", "Corsair"],
  },
  {
    id: "smartwatch",
    slug: "smartwatch",
    name: "Smartwatch & Wearables",
    shortName: "Smartwatch",
    subtitle: "Titanium GPS Multisport & ECG Health Trackers",
    description:
      "Track heart-rate variability, blood oxygen, sleep stages, and dual-frequency GPS trails right from a sapphire crystal wrist display.",
    icon: "/assets/watch.svg",
    image: "/assets/watch-2.jpg",
    heroBanner: "/assets/Banner-1.jpg",
    accentColor: "#10b981",
    itemCount: 29,
    subcategories: ["Titanium Adventure Watch", "AMOLED Fitness Bands", "ECG Health Monitors", "Milanese & Fluoro Bands", "Multi-Device Docks"],
    brands: ["Apple", "Samsung", "Garmin", "Huawei", "Fitbit"],
  },
  {
    id: "game",
    slug: "game",
    name: "Video Games & VR",
    shortName: "Game",
    subtitle: "Next-Gen Consoles, Pro Controllers & VR Headsets",
    description:
      "Step inside lifelike virtual worlds with 4K HDR spatial optics, hall-effect pro controllers, and low-latency surround gaming audio.",
    icon: "/assets/game.svg",
    image: "/assets/cate-1.jpg",
    heroBanner: "/assets/Slider-1-2.jpg",
    accentColor: "#f59e0b",
    itemCount: 31,
    subcategories: ["VR Mixed Reality Headsets", "Hall-Effect Controllers", "Handheld Gaming Consoles", "Force-Feedback Racing", "RGB Headsets"],
    brands: ["Sony", "PlayStation", "Xbox", "Meta", "Nintendo"],
  },
  {
    id: "camera",
    slug: "camera",
    name: "Camera & 4K Optics",
    shortName: "Camera",
    subtitle: "Mirrorless 8K Cinema, Action Cams & Smart Drones",
    description:
      "From full-frame mirrorless sensors to AI-tracked 360° PTZ security and 4K HDR pocket projectors for creators.",
    icon: "/assets/camera.svg",
    image: "/assets/cate-5.jpg",
    heroBanner: "/assets/Banner-2.jpg",
    accentColor: "#ec4899",
    itemCount: 24,
    subcategories: ["Full-Frame Mirrorless", "4K Action & Vlog Cams", "Smart Wi-Fi Security", "4K Portable Projectors", "Prime & Zoom Lenses"],
    brands: ["Canon", "Sony", "Nikon", "Fujifilm", "GoPro"],
  },
  {
    id: "headphone",
    slug: "headphone",
    name: "Headphone & Audio",
    shortName: "Headphone",
    subtitle: "Studio ANC Over-Ear, Hi-Res DACs & Spatial Speakers",
    description:
      "Immerse yourself in lossless studio acoustics with adaptive 50dB noise cancellation and 360-degree spatial audio drivers.",
    icon: "/assets/headphone.svg",
    image: "/assets/cate-7.jpg",
    heroBanner: "/assets/Banner-1.jpg",
    accentColor: "#06b6d4",
    itemCount: 46,
    subcategories: ["Studio ANC Over-Ear", "True Wireless Earbuds", "360° Waterproof Speakers", "Audiophile Planar", "Lossless USB-C DACs"],
    brands: ["Sony", "Bose", "Sennheiser", "Apple", "JBL"],
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Smart Electronics & Accessories",
    shortName: "Accessories",
    subtitle: "GaN Fast Chargers, Thunderbolt Hubs & Smart Home",
    description:
      "Complete your everyday carry with 140W GaN power stations, NVMe enclosures, smart robot vacuums, and braided kevlar cables.",
    icon: "/assets/usb.svg",
    image: "/assets/cate-2.jpg",
    heroBanner: "/assets/Slider-1-1.jpg",
    accentColor: "#6366f1",
    itemCount: 53,
    subcategories: ["140W GaN Chargers", "Thunderbolt 4 Docks", "Smart Home Automation", "MagSafe Power Banks", "NVMe SSD Enclosures"],
    brands: ["Anker", "Belkin", "Samsung", "Ugreen", "Sony"],
  },
];

const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    role: "Senior Audio & Hardware Engineer",
    avatar: "/assets/testimonial-1.jpg",
    rating: 5,
    date: "October 18, 2026",
    title: "Phenomenal build quality and flagship performance",
    comment:
      "I have tested dozens of flagship devices this year and Nexova's calibration on this unit is second to none. Battery life easily exceeds the official rating and thermal performance stays whisper-quiet under load.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "Creative Director & Tech Reviewer",
    avatar: "/assets/testimonial-2.jpg",
    rating: 5,
    date: "October 11, 2026",
    title: "Worth every penny — fast express delivery too!",
    comment:
      "Ordered on Monday morning and it arrived in pristine protective packaging within 24 hours. The ergonomics, display sharpness, and industrial finish feel truly next-generation.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Devon Brooks",
    role: "Verified Buyer",
    avatar: "/assets/testimonial-3.jpg",
    rating: 4,
    date: "September 29, 2026",
    title: "Sleek design and super intuitive setup",
    comment:
      "Paired effortlessly out of the box. The companion controls and multi-device switching save me hours every week in my studio workflow.",
    verified: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "smartwatch-sport-edition-pro-gps",
    sku: "NX-SW-901",
    title: "Smartwatch Sport Edition Pro Titanium GPS",
    subtitle: "Dual-Frequency GPS • Sapphire Crystal • 14-Day Battery",
    brand: "Apple",
    category: "smartwatch",
    categoryLabel: "Smartwatch & Wearables",
    price: 385.0,
    oldPrice: 480.0,
    discount: "-20%",
    rating: 4.9,
    reviewsCount: 148,
    inStock: true,
    stockCount: 18,
    soldCount: 412,
    badge: "HOT",
    image: "/assets/watch-2.jpg",
    gallery: ["/assets/watch-2.jpg", "/assets/watch-1.jpg", "/assets/watch-7.jpg", "/assets/watch-9.jpg", "/assets/watch-10.jpg"],
    colors: [
      { name: "Alpine Orange", hex: "#f97316" },
      { name: "Titanium Slate", hex: "#334155" },
      { name: "Starlight Silver", hex: "#e2e8f0" },
    ],
    editions: ["45mm GPS", "49mm Titanium GPS + LTE"],
    shortDesc:
      "Aerospace-grade titanium case with a 3000-nit sapphire LTPO OLED display, ECG telemetry, and 100m water resistance.",
    description:
      "Engineered for endurance athletes, divers, and everyday explorers, the Smartwatch Sport Edition Pro combines an aerospace-grade titanium chassis with dual-frequency L1+L5 precision GPS. Monitor real-time blood oxygen, ECG heart rhythms, VO2 max recovery, and custom trail waypoints with up to 14 days of multi-mode battery life.",
    highlights: [
      "Aerospace Grade 5 Titanium case with flat sapphire front crystal",
      "3000-nit Always-On Retina LTPO2 OLED display with Night Mode",
      "Dual-Frequency L1 + L5 GPS with offline topographic trail maps",
      "EN13319 certified dive computer up to 40m + 100m water resistance",
    ],
    specs: [
      { label: "Case Material", value: "Aerospace Grade 5 Titanium (49mm)" },
      { label: "Display", value: "1.98-inch LTPO2 AMOLED, 3000 nits peak" },
      { label: "Sensors", value: "Electrical Heart (ECG), SpO2, Depth, Temp, Compass" },
      { label: "Battery Life", value: "Up to 72 hrs normal / 14 days Expedition Mode" },
      { label: "Connectivity", value: "5G LTE, Wi-Fi 6, Bluetooth 5.3, Dual-Band GPS" },
      { label: "Water Resistance", value: "100 meters (WR100) / EN13319 Dive Certified" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-2",
    slug: "studio-anc-wireless-over-ear-headphones",
    sku: "NX-AU-402",
    title: "Studio Pro ANC Wireless Over-Ear Headphones",
    subtitle: "50dB Adaptive Noise Cancelling • LDAC Lossless • 60H Playtime",
    brand: "Sony",
    category: "headphone",
    categoryLabel: "Headphone & Audio",
    price: 265.0,
    oldPrice: 320.0,
    discount: "-17%",
    rating: 4.9,
    reviewsCount: 219,
    inStock: true,
    stockCount: 24,
    soldCount: 530,
    badge: "BESTSELLER",
    image: "/assets/audio-8.jpg",
    gallery: ["/assets/audio-8.jpg", "/assets/audio-8a.jpg", "/assets/audio-10.jpg", "/assets/audio-1.jpg", "/assets/audio-9.jpg"],
    colors: [
      { name: "Champagne Sand", hex: "#d6cfc2" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Platinum Silver", hex: "#cbd5e1" },
    ],
    editions: ["Standard Edition", "Studio Master + Hard Case + USB-C DAC"],
    shortDesc:
      "Custom 45mm beryllium-coated drivers with 8-microphone AI adaptive noise cancellation and spatial head tracking.",
    description:
      "Immerse yourself in master-quality studio sound. Equipped with dual-processor 50dB Active Noise Cancellation and custom 45mm carbon-fiber dome drivers, the Studio Pro ANC delivers thunderous sub-bass and crystalline vocals across Bluetooth LDAC and lossless USB-C audio.",
    highlights: [
      "8-Microphone AI Adaptive ANC blocks 99.2% of cabin and street noise",
      "Hi-Res Audio Wireless certified with LDAC 990kbps & USB-C DAC",
      "60-hour battery life with 5-minute hyper-charge for 6 hours of playback",
      "Ultra-plush memory-protein ear cushions for zero-fatigue studio sessions",
    ],
    specs: [
      { label: "Driver Unit", value: "45mm Neodymium Carbon-Composite Dynamic" },
      { label: "Frequency Response", value: "4 Hz – 40,000 Hz (Hi-Res Certified)" },
      { label: "Noise Cancellation", value: "Dual-Chip 8-Mic Hybrid Adaptive ANC (-50dB)" },
      { label: "Codecs Supported", value: "LDAC, aptX Adaptive, AAC, SBC, USB-C PCM" },
      { label: "Battery Life", value: "60 Hours (ANC On) / 80 Hours (ANC Off)" },
      { label: "Weight", value: "252 grams" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-3",
    slug: "15-inch-slim-metal-ultrabook-pro",
    sku: "NX-LP-109",
    title: "15-inch Slim Metal Ultrabook Pro M-Series",
    subtitle: "3.2K 120Hz OLED Display • 32GB Unified RAM • 1TB NVMe SSD",
    brand: "Apple",
    category: "laptop",
    categoryLabel: "Laptop & Tablet",
    price: 1199.0,
    oldPrice: 1399.0,
    discount: "-14%",
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    stockCount: 11,
    soldCount: 265,
    badge: "PRO",
    image: "/assets/laptop-9.jpg",
    gallery: ["/assets/laptop-9.jpg", "/assets/laptop-6.jpg", "/assets/tablet-3.jpg", "/assets/computer-9.jpg"],
    colors: [
      { name: "Space Titanium", hex: "#334155" },
      { name: "Midnight Blue", hex: "#1e1b4b" },
      { name: "Frost Silver", hex: "#cbd5e1" },
    ],
    editions: ["16GB / 512GB SSD", "32GB / 1TB SSD", "64GB / 2TB SSD Pro"],
    shortDesc:
      "Unibody CNC aluminum workstation featuring a 120Hz Liquid OLED display, 22-hour battery life, and silent vapor cooling.",
    description:
      "Designed for software architects, filmmakers, and 3D designers on the move. Precision-milled from a single block of recycled aerospace aluminum, this 15-inch Ultrabook Pro delivers desktop-class neural rendering without fan noise.",
    highlights: [
      "15.3-inch 3.2K 120Hz HDR OLED display with 100% DCI-P3 color accuracy",
      "Next-Gen 12-Core CPU + 18-Core GPU with hardware ray tracing",
      "6-speaker spatial sound system with force-cancelling woofers",
      "3x Thunderbolt 4 ports, HDMI 2.1, SDXC UHS-II reader & MagSafe charging",
    ],
    specs: [
      { label: "Display", value: "15.3-inch 3200x2000 120Hz OLED HDR1000" },
      { label: "Processor", value: "12-Core Flagship Silicon + 16-Core Neural Engine" },
      { label: "Memory", value: "32GB LPDDR5X Unified Memory (400GB/s)" },
      { label: "Storage", value: "1TB PCIe Gen4 NVMe SSD (7,400 MB/s)" },
      { label: "Battery", value: "Up to 22 hours video playback, 140W GaN Fast Charge" },
      { label: "Weight & Thickness", value: "1.48 kg • 11.5 mm thin" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-4",
    slug: "galaxy-s30-ultra-5g-titanium-256gb",
    sku: "NX-MB-501",
    title: "Smartphone Pro Triple Camera Series 5G Titanium",
    subtitle: "200MP Periscope Zoom • Snapdragon Flagship • 6.8\" 120Hz AMOLED",
    brand: "Samsung",
    category: "mobile",
    categoryLabel: "Mobile & Tablet",
    price: 892.0,
    oldPrice: 1099.0,
    discount: "-19%",
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    stockCount: 15,
    soldCount: 689,
    badge: "HOT",
    image: "/assets/mobile-1.jpg",
    gallery: ["/assets/mobile-1.jpg", "/assets/mobile-2.jpg", "/assets/mobile-3.jpg", "/assets/mobile-4.jpg", "/assets/mobile-9.jpg"],
    colors: [
      { name: "Rose Titanium", hex: "#e2b8ad" },
      { name: "Phantom Black", hex: "#18181b" },
      { name: "Glacier Violet", hex: "#8b5cf6" },
    ],
    editions: ["256GB / 12GB RAM", "512GB / 16GB RAM", "1TB Collector Edition"],
    shortDesc:
      "Pro-grade 200MP quad-telephoto camera system with integrated AI photo engine, titanium armor frame, and 2600-nit LTPO screen.",
    description:
      "Redefine mobile photography and 120fps gaming. Featuring a grade-5 titanium perimeter frame, anti-reflective Gorilla Armor glass, and a 200MP optical-quality periscope zoom sensor that captures razor-sharp night portraits and 8K 60fps cinema video.",
    highlights: [
      "200MP Main + 50MP 5x Optical Periscope + 12MP Ultra-Wide Pro Camera Array",
      "6.8-inch QHD+ Dynamic AMOLED 2X 1-120Hz Adaptive Display (2600 nits)",
      "Vapor chamber thermal cooling 1.9x larger for sustained ray-traced gaming",
      "5000mAh intelligent battery with 65W wired & 25W Qi2 magnetic wireless charging",
    ],
    specs: [
      { label: "Display", value: "6.8\" QHD+ (3120x1440) LTPO AMOLED, 1-120Hz" },
      { label: "Camera System", value: "200MP f/1.7 OIS + 50MP 5x Periscope + 12MP UW" },
      { label: "Chipset", value: "4nm Octa-Core Flagship SoC (3.4GHz)" },
      { label: "RAM & Storage", value: "12GB LPDDR5X + 256GB UFS 4.0" },
      { label: "Protection", value: "IP68 Dust/Water Resistant + Titanium Frame" },
      { label: "Battery", value: "5000mAh, 65W Super Fast Charge" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-5",
    slug: "angular-tempered-glass-gaming-pc-rtx",
    sku: "NX-PC-304",
    title: "Angular Tempered Glass Gaming PC Workstation",
    subtitle: "Liquid-Cooled Chassis • ARGB Airflow • Full-Tower Modular",
    brand: "Corsair",
    category: "computer",
    categoryLabel: "Computer & PC",
    price: 291.0,
    oldPrice: 350.0,
    discount: "-17%",
    rating: 4.8,
    reviewsCount: 87,
    inStock: true,
    stockCount: 9,
    soldCount: 174,
    badge: "SALE",
    image: "/assets/computer-4.jpg",
    gallery: ["/assets/computer-4.jpg", "/assets/computer-3.jpg", "/assets/computer-5.jpg", "/assets/computer-6.jpg"],
    colors: [
      { name: "Cyber Black / Amber", hex: "#f59e0b" },
      { name: "Stealth Matte Black", hex: "#111827" },
    ],
    editions: ["Chassis + 4x ARGB Fans", "Chassis + 360mm AIO Liquid Cooler"],
    shortDesc:
      "Futuristic open-frame angular tempered glass showcase chassis engineered for extreme liquid cooling and dual-chamber cable routing.",
    description:
      "Turn your desk into a command center. Crafted from 4mm CNC-anodized aluminum and panoramic smoked tempered glass, this angular gaming chassis supports dual 360mm radiators, vertical GPU mounting, and tool-free quick-release panels.",
    highlights: [
      "Panoramic 4mm smoked tempered glass panels with CNC aluminum exo-frame",
      "Supports E-ATX motherboards, 420mm GPUs, and dual 360mm liquid radiators",
      "Front I/O includes USB 3.2 Gen 2x2 Type-C (20Gbps) & ARGB controller hub",
      "Dedicated dual-chamber hidden cable management with velcro channels",
    ],
    specs: [
      { label: "Form Factor", value: "Mid/Full-Tower Angular Showcase (E-ATX / ATX / mATX)" },
      { label: "Materials", value: "3mm Anodized Aluminum + 4mm Tempered Glass" },
      { label: "Radiator Support", value: "Top 360mm, Front/Side 360mm, Rear 120mm" },
      { label: "Max GPU Length", value: "420mm (Horizontal & Vertical Mount Included)" },
      { label: "Front Ports", value: "1x USB-C 20Gbps, 2x USB 3.0, HD Audio, LED Control" },
      { label: "Dimensions", value: "515 x 245 x 530 mm" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-6",
    slug: "waterproof-360-spatial-portable-speaker",
    sku: "NX-AU-203",
    title: "Waterproof Portable Speaker 360° Bass Pulse",
    subtitle: "IP67 Waterproof & Floatable • 24H Battery • PartyBoost Stereo",
    brand: "JBL",
    category: "headphone",
    categoryLabel: "Headphone & Audio",
    price: 70.0,
    oldPrice: 90.0,
    discount: "-22%",
    rating: 4.7,
    reviewsCount: 163,
    inStock: true,
    stockCount: 32,
    soldCount: 590,
    badge: "SALE",
    image: "/assets/audio-3.jpg",
    gallery: ["/assets/audio-3.jpg", "/assets/audio-4.jpg", "/assets/audio-5.jpg", "/assets/audio-6.jpg", "/assets/audio-7.jpg"],
    colors: [
      { name: "Electric Teal", hex: "#06b6d4" },
      { name: "Crimson Coral", hex: "#4f46e5" },
      { name: "Midnight Black", hex: "#1e293b" },
    ],
    editions: ["Single Speaker", "Stereo Twin-Pack (-15%)"],
    shortDesc:
      "Pocket-sized acoustic powerhouse with dual passive bass radiators, IP67 waterproof protection, and integrated carabiner loop.",
    description:
      "Take bold 360-degree sound from poolside to mountain summits. Featuring an IP67 dustproof and waterproof enclosure that floats on water, dual passive bass radiators, and wireless stereo pairing for up to 100 speakers.",
    highlights: [
      "360° omnidirectional neodymium driver with dual passive bass radiators",
      "IP67 waterproof, sandproof, and shock-resistant rugged fabric shell",
      "Up to 24 hours of continuous playtime on a single USB-C charge",
      "Wireless Stereo Link pairs two units for true left-right soundstage",
    ],
    specs: [
      { label: "Output Power", value: "30W RMS Peak with Dual Passive Radiators" },
      { label: "Waterproof Rating", value: "IP67 Submersible (1m for 30 mins)" },
      { label: "Battery Life", value: "Up to 24 Hours • USB-C Fast Charging" },
      { label: "Bluetooth", value: "Bluetooth 5.3 with Multipoint & PartyLink" },
      { label: "Weight", value: "390 grams" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-7",
    slug: "wireless-hall-effect-pro-gaming-controller",
    sku: "NX-GM-101",
    title: "Wireless Pro Gaming Controller Hall-Effect Edition",
    subtitle: "Zero Stick Drift • 1000Hz Polling • Adaptive Impulse Triggers",
    brand: "Sony",
    category: "game",
    categoryLabel: "Video Games & VR",
    price: 89.0,
    oldPrice: 115.0,
    discount: "-23%",
    rating: 4.9,
    reviewsCount: 176,
    inStock: true,
    stockCount: 27,
    soldCount: 440,
    badge: "HOT",
    image: "/assets/game-1.jpg",
    gallery: ["/assets/game-1.jpg", "/assets/game-2.jpg", "/assets/game-3.jpg", "/assets/game-4.jpg", "/assets/game-5.jpg"],
    colors: [
      { name: "Glacier White", hex: "#f8fafc" },
      { name: "Stealth Carbon", hex: "#18181b" },
      { name: "Cobalt Blue", hex: "#3b82f6" },
    ],
    editions: ["Controller Only", "Controller + Magnetic Charging Dock"],
    shortDesc:
      "Esports-grade wireless controller with magnetic Hall-Effect joysticks, mechanical micro-switch face buttons, and 4 remappable back paddles.",
    description:
      "Dominate competitive lobbies with zero deadzone and zero stick drift. Built with magnetic Hall-Effect sensors, optical-mechanical tactile buttons, adjustable trigger stops, and dual-wireless 2.4GHz dongle + Bluetooth 5.3 connectivity.",
    highlights: [
      "Magnetic Hall-Effect joysticks & triggers eliminate stick drift forever",
      "4 programmable rear metal paddles + 3 onboard profile slots",
      "Ultra-low 1ms latency via 1000Hz 2.4GHz USB-C wireless receiver",
      "Compatible with PC, PlayStation, Nintendo Switch, iOS & Android",
    ],
    specs: [
      { label: "Thumbsticks", value: "Magnetic Hall-Effect Sensors with Metal Rings" },
      { label: "Polling Rate", value: "1000Hz Wired & 2.4GHz Wireless" },
      { label: "Triggers", value: "2-Stage Hair-Trigger Lock + Hall Linear Mode" },
      { label: "Battery", value: "1200mAh Rechargeable (Up to 28 Hours)" },
      { label: "Compatibility", value: "Windows PC, Console, Mac, iOS, Android" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-8",
    slug: "mirrorless-8k-cinema-camera-full-frame",
    sku: "NX-CM-701",
    title: "Mirrorless 8K Cinema Camera 45MP Full-Frame",
    subtitle: "45MP Stacked CMOS • 8K 60p RAW • 8-Stop In-Body Stabilization",
    brand: "Canon",
    category: "camera",
    categoryLabel: "Camera & 4K Optics",
    price: 1450.0,
    oldPrice: 1699.0,
    discount: "-15%",
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
    stockCount: 7,
    soldCount: 118,
    badge: "PRO",
    image: "/assets/camera-7.jpg",
    gallery: ["/assets/camera-7.jpg", "/assets/camera-7a.jpg", "/assets/camera-7b.jpg", "/assets/camera-7c.jpg", "/assets/camera-7d.jpg"],
    colors: [{ name: "Magnesium Black", hex: "#171717" }],
    editions: ["Body Only", "Body + 24-70mm f/2.8L Lens Kit"],
    shortDesc:
      "Flagship hybrid cinema camera featuring a 45MP full-frame stacked sensor, AI subject autofocus, and internal 8K 60fps RAW recording.",
    description:
      "Built for commercial cinematographers and wildlife photographers who refuse to compromise. Captures breathtaking 45-megapixel stills at 30 frames per second and oversampled 8K 60p / 4K 120p 10-bit 4:2:2 video with 8-stop 5-axis sensor-shift stabilization.",
    highlights: [
      "45MP Full-Frame Back-Illuminated Stacked CMOS Sensor",
      "Internal 8K 60p RAW & 4K 120p 10-bit Canon Log 3 recording",
      "Dual Pixel Intelligent AF II with eye, vehicle, and wildlife tracking",
      "Weather-sealed magnesium alloy body with 5.76M-dot OLED viewfinder",
    ],
    specs: [
      { label: "Sensor", value: "45MP Full-Frame (36x24mm) Stacked BSI CMOS" },
      { label: "Video Resolution", value: "8K 60p RAW, 4K 120p 10-Bit 4:2:2" },
      { label: "Stabilization", value: "5-Axis IBIS up to 8.5 Stops" },
      { label: "Autofocus", value: "1,053-Zone Dual Pixel AI Subject Tracking" },
      { label: "Storage Media", value: "Dual CFexpress Type B + SD UHS-II Slots" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-9",
    slug: "smart-ai-360-ptz-home-security-camera",
    sku: "NX-CM-101",
    title: "Smart AI 360° PTZ 4K Home Security Camera",
    subtitle: "4K Starlight Night Vision • AI Human/Pet Tracking • 2-Way Audio",
    brand: "Sony",
    category: "camera",
    categoryLabel: "Camera & 4K Optics",
    price: 118.0,
    oldPrice: 150.0,
    discount: "-21%",
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    stockCount: 29,
    soldCount: 380,
    badge: "NEW",
    image: "/assets/camera-1.jpg",
    gallery: ["/assets/camera-1.jpg", "/assets/camera-1a.jpg", "/assets/camera-6.jpg", "/assets/camera-6a.jpg"],
    colors: [
      { name: "Arctic White", hex: "#f8fafc" },
      { name: "Graphite Grey", hex: "#475569" },
    ],
    editions: ["Single 4K Cam + 128GB Card", "2-Cam Smart Security Bundle"],
    shortDesc:
      "360° pan-tilt-zoom 4K UHD smart camera with local edge AI motion detection, color night vision, and zero monthly fees.",
    description:
      "Protect your studio and home with crystal-clear 4K UHD surveillance. Equipped with whisper-quiet 360° pan and 115° tilt motors, on-device AI human and pet recognition, and encrypted local microSD + NAS storage.",
    highlights: [
      "True 4K 8MP Ultra-HD sensor with f/1.6 Starlight Color Night Vision",
      "360° horizontal pan & 115° vertical tilt with automatic AI motion tracking",
      "Instant mobile alerts with two-way noise-cancelling intercom audio",
      "Dual-band Wi-Fi 6 & local microSD up to 512GB (no subscription required)",
    ],
    specs: [
      { label: "Resolution", value: "4K UHD (3840 x 2160) @ 30fps HDR" },
      { label: "Field of View", value: "360° Pan / 115° Tilt / 8x Hybrid Zoom" },
      { label: "AI Detection", value: "On-Device Person, Pet, Vehicle & Sound Recognition" },
      { label: "Connectivity", value: "Dual-Band Wi-Fi 6 (2.4GHz / 5GHz) + Ethernet" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-10",
    slug: "custom-wireless-gasket-mechanical-keyboard",
    sku: "NX-KB-509",
    title: "75% CNC Aluminum Wireless Mechanical Keyboard",
    subtitle: "Hot-Swappable Gasket Mount • Tri-Mode Wireless • QMK/VIA",
    brand: "Keychron",
    category: "keyboard",
    categoryLabel: "Keyboard & Mouse",
    price: 149.0,
    oldPrice: 185.0,
    discount: "-19%",
    rating: 4.9,
    reviewsCount: 204,
    inStock: true,
    stockCount: 19,
    soldCount: 475,
    badge: "BESTSELLER",
    image: "/assets/computer-9.jpg",
    gallery: ["/assets/computer-9.jpg", "/assets/computer-11.jpg", "/assets/computer-12.jpg"],
    colors: [
      { name: "Space Silver", hex: "#cbd5e1" },
      { name: "Carbon Black", hex: "#18181b" },
      { name: "Navy Indigo", hex: "#312e81" },
    ],
    editions: ["Linear Creamy Switches", "Tactile Panda Switches"],
    shortDesc:
      "Full CNC 6063 aluminum 75% mechanical keyboard with double-gasket mount, south-facing RGB, rotary media knob, and QMK/VIA programming.",
    description:
      "Experience acoustic perfection on every keystroke. Built with a solid 1.8kg CNC-machined aluminum body, 5-layer Poron acoustic dampening foam, pre-lubed factory switches, and seamless switching between 2.4GHz wireless, Bluetooth 5.3, and wired USB-C.",
    highlights: [
      "Full CNC 6063 anodized aluminum case with double-gasket silicone mount",
      "Hot-swappable 5-pin PCB supports any MX-style mechanical switch",
      "Programmable CNC aluminum rotary encoder knob + QMK/VIA web configurator",
      "4000mAh battery delivers up to 200 hours of wireless typing",
    ],
    specs: [
      { label: "Layout", value: "75% Compact (81 Keys + Programmable Rotary Knob)" },
      { label: "Case Material", value: "Full CNC Machined 6063 Aluminum" },
      { label: "Connectivity", value: "2.4GHz (1000Hz) / Bluetooth 5.3 (3 Devices) / USB-C" },
      { label: "Keycaps", value: "Double-Shot PBT Cherry Profile Oil-Resistant" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-11",
    slug: "4k-ultra-hd-portable-laser-cinema-projector",
    sku: "NX-CM-301",
    title: "4K Ultra HD Portable Smart Laser Projector",
    subtitle: "150-Inch Cinema Screen • Auto Keystone • Harman Audio",
    brand: "Samsung",
    category: "camera",
    categoryLabel: "Camera & 4K Optics",
    price: 340.0,
    oldPrice: 420.0,
    discount: "-19%",
    rating: 4.8,
    reviewsCount: 91,
    inStock: true,
    stockCount: 14,
    soldCount: 230,
    badge: "HOT",
    image: "/assets/camera-3.jpg",
    gallery: ["/assets/camera-3.jpg", "/assets/camera-3b.jpg", "/assets/camera-8.jpg", "/assets/camera-8a.jpg"],
    colors: [
      { name: "Sahara Gold", hex: "#eab308" },
      { name: "Nordic Grey", hex: "#64748b" },
    ],
    editions: ["Projector Standard", "Projector + 100\" Ambient Screen Bundle"],
    shortDesc:
      "Ultra-compact 4K HDR smart projector with instant ToF laser autofocus, 360° Dolby audio speaker, and built-in streaming OS.",
    description:
      "Turn any wall or ceiling into a 150-inch 4K HDR movie theater. Featuring real-time Time-of-Flight laser autofocus, automatic obstacle avoidance, and a built-in battery for backyard movie nights.",
    highlights: [
      "Up to 150-inch 4K UHD HDR10 projection with 1200 ANSI lumens",
      "Instant ToF Laser Autofocus & 6-Axis Auto Keystone Correction",
      "Built-in 360° dual 10W acoustic chamber with Dolby Digital Plus",
      "HDMI 2.1 eARC, AirPlay 2, Chromecast & Wi-Fi 6 built in",
    ],
    specs: [
      { label: "Projection Size", value: "40\" to 150\" Diagonal (1.2:1 Throw Ratio)" },
      { label: "Resolution", value: "4K UHD (3840x2160) HDR10+ Support" },
      { label: "Focus & Keystone", value: "Instant Laser ToF Autofocus + Auto-Leveling" },
      { label: "Audio", value: "Dual 10W 360° Speakers (Dolby Audio)" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-12",
    slug: "curved-34-inch-ultrawide-oled-gaming-monitor",
    sku: "NX-PC-601",
    title: "34-inch Curved Ultrawide QD-OLED 240Hz Monitor",
    subtitle: "3440x1440 WQHD • 0.03ms GtG • USB-C 90W Power Delivery",
    brand: "Dell",
    category: "computer",
    categoryLabel: "Computer & PC",
    price: 749.0,
    oldPrice: 899.0,
    discount: "-17%",
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    stockCount: 8,
    soldCount: 198,
    badge: "PRO",
    image: "/assets/computer-6.jpg",
    gallery: ["/assets/computer-6.jpg", "/assets/computer-5.jpg", "/assets/computer-10.jpg"],
    colors: [{ name: "Silver / Obsidian", hex: "#334155" }],
    editions: ["34\" WQHD 240Hz QD-OLED", "38\" 4K+ IPS Black Creator"],
    shortDesc:
      "1800R curved Quantum-Dot OLED ultrawide display with infinite contrast, 240Hz refresh rate, and single-cable 90W USB-C docking.",
    description:
      "Engineered for sim-racers, video editors, and competitive gamers. Quantum Dot OLED technology delivers true 0.0005-nit blacks, 1000-nit HDR highlights, and an instantaneous 0.03ms response time.",
    highlights: [
      "34-inch 21:9 WQHD (3440x1440) 1800R Curved QD-OLED Panel",
      "240Hz refresh rate + 0.03ms GtG response time (G-Sync & FreeSync Pro)",
      "99.3% DCI-P3 color gamut factory calibrated to Delta E < 1.5",
      "Built-in KVM switch + 90W USB-C single-cable laptop charging",
    ],
    specs: [
      { label: "Panel Type", value: "Quantum-Dot OLED (QD-OLED) 1800R Curved" },
      { label: "Resolution", value: "3440 x 1440 (21:9 Ultrawide) @ 240Hz" },
      { label: "Response Time", value: "0.03ms (Gray-to-Gray)" },
      { label: "Ports", value: "2x HDMI 2.1, 1x DP 1.4, 1x USB-C (90W PD), 4x USB 3.2" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-13",
    slug: "smart-lidar-robot-vacuum-mop-station",
    sku: "NX-AC-802",
    title: "Smart LiDAR Robot Vacuum & Self-Cleaning Station",
    subtitle: "8000Pa HyperSuction • 3D Obstacle Avoidance • Auto Hot-Wash",
    brand: "Samsung",
    category: "accessories",
    categoryLabel: "Smart Electronics & Accessories",
    price: 429.0,
    oldPrice: 549.0,
    discount: "-22%",
    rating: 4.8,
    reviewsCount: 134,
    inStock: true,
    stockCount: 12,
    soldCount: 289,
    badge: "NEW",
    image: "/assets/cate-2.jpg",
    gallery: ["/assets/cate-2.jpg", "/assets/camera-1.jpg", "/assets/audio-4.jpg"],
    colors: [{ name: "Pearl White", hex: "#f8fafc" }],
    editions: ["Robot + Auto-Empty Dock", "Robot + Plumbing Refill Kit"],
    shortDesc:
      "Hands-free floor care with precision 360° LiDAR mapping, 8000Pa suction, auto-lifting dual rotary mops, and 60-day dust collection.",
    description:
      "Come home to spotless hardwood and carpets every day. Uses dual-laser 3D structured light and AI camera recognition to dodge cables and pet toys while automatically washing and warm-air drying its mop pads.",
    highlights: [
      "8000Pa Hurricane Suction lifts deep pet hair and fine dust",
      "3D LiDAR + AI RGB camera avoids shoes, cords, and pet obstacles",
      "All-in-One Base Station empties dust, washes mops at 60°C & dries",
      "Voice control via Siri, Alexa, Google Home & multi-floor 3D app map",
    ],
    specs: [
      { label: "Suction Power", value: "8,000 Pa Brushless Digital Motor" },
      { label: "Navigation", value: "360° dToF LiDAR + AI 3D Structured Light" },
      { label: "Battery", value: "5200mAh (Up to 210 mins runtime)" },
      { label: "Dock Capacity", value: "4L Clean Water / 3.5L Dirty / 60-Day Dust Bag" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-14",
    slug: "foldable-dual-screen-5g-creator-tablet-phone",
    sku: "NX-MB-704",
    title: "Smartphone Foldable Dual-Screen 5G Enterprise",
    subtitle: "7.8\" Creaseless Inner OLED • Stylus Support • Multitask OS",
    brand: "Samsung",
    category: "mobile",
    categoryLabel: "Mobile & Tablet",
    price: 1120.0,
    oldPrice: 1320.0,
    discount: "-15%",
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    stockCount: 10,
    soldCount: 164,
    badge: "PRO",
    image: "/assets/mobile-3.jpg",
    gallery: ["/assets/mobile-3.jpg", "/assets/mobile-4.jpg", "/assets/tablet-3.jpg"],
    colors: [
      { name: "Emerald Green", hex: "#065f46" },
      { name: "Obsidian Black", hex: "#18181b" },
    ],
    editions: ["512GB Unlocked 5G", "1TB Enterprise + S-Pen Bundle"],
    shortDesc:
      "Unfolds from a sleek 6.3-inch smartphone into a 7.8-inch tablet workstation with zero-gap carbon hinge and 3-app split screen.",
    description:
      "Carry a phone and a tablet in one pocket. Engineered with an aerospace carbon-fiber waterdrop hinge tested for 400,000 folds and dual 120Hz LTPO OLED displays.",
    highlights: [
      "7.8-inch QXGA+ Dynamic AMOLED unfolded + 6.3-inch cover screen",
      "Zero-gap titanium & carbon-fiber hinge rated for 400,000 folds",
      "Run 3 side-by-side productivity apps with desktop taskbar",
      "Triple 50MP OIS Pro Camera system with FlexCam hands-free mode",
    ],
    specs: [
      { label: "Main Display", value: "7.8\" QXGA+ (2208x1768) 120Hz Foldable OLED" },
      { label: "Cover Display", value: "6.3\" FHD+ 120Hz Gorilla Glass Victus 2" },
      { label: "Weight", value: "239 grams (Ultra-slim 5.6mm unfolded)" },
      { label: "Water Resistance", value: "IPX8 Water Resistant" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-15",
    slug: "rgb-vr-mixed-reality-headset-120hz-pancake",
    sku: "NX-GM-808",
    title: "4K Mixed Reality VR Headset 120Hz Pancake Optics",
    subtitle: "Dual 2.5K Micro-OLED • Full-Color Passthrough • Inside-Out Tracking",
    brand: "Meta",
    category: "game",
    categoryLabel: "Video Games & VR",
    price: 499.0,
    oldPrice: 599.0,
    discount: "-17%",
    rating: 4.9,
    reviewsCount: 155,
    inStock: true,
    stockCount: 16,
    soldCount: 342,
    badge: "HOT",
    image: "/assets/game-8.jpg",
    gallery: ["/assets/game-8.jpg", "/assets/game-6.jpg", "/assets/game-7.jpg"],
    colors: [{ name: "Cyber White / Silver", hex: "#e2e8f0" }],
    editions: ["128GB Standalone + PCVR", "512GB Pro + Elite Battery Strap"],
    shortDesc:
      "Next-generation standalone & PCVR headset with ultra-thin pancake lenses, full-color 3D mixed reality passthrough, and ringless haptic controllers.",
    description:
      "Blend virtual worlds with your physical room in full high-resolution color. Custom pancake optics reduce profile thickness by 40% while doubling edge-to-edge clarity.",
    highlights: [
      "Dual 2064x2208 per-eye Infinite Display with custom Pancake lenses",
      "Full-color high-res dual RGB passthrough cameras + depth projector",
      "Standalone XR2 Gen 2 processor + Wi-Fi 6E wireless PCVR streaming",
      "Includes pair of ringless TruTouch Haptic controllers",
    ],
    specs: [
      { label: "Optics", value: "Custom Pancake Lenses (110° Horizontal FOV)" },
      { label: "Refresh Rate", value: "90Hz / 120Hz Native" },
      { label: "Audio", value: "Integrated Spatial 3D Speakers + Dual Mics" },
      { label: "Tracking", value: "6DoF Inside-Out Camera + Direct Hand Tracking" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-16",
    slug: "ultralight-wireless-8k-esports-gaming-mouse",
    sku: "NX-KB-204",
    title: "Ultralight 49g Wireless 8000Hz Esports Mouse",
    subtitle: "30,000 DPI Optical Sensor • Optical Switches • Magnesium Shell",
    brand: "Logitech",
    category: "keyboard",
    categoryLabel: "Keyboard & Mouse",
    price: 109.0,
    oldPrice: 139.0,
    discount: "-22%",
    rating: 4.8,
    reviewsCount: 129,
    inStock: true,
    stockCount: 22,
    soldCount: 310,
    badge: "NEW",
    image: "/assets/computer-11.jpg",
    gallery: ["/assets/computer-11.jpg", "/assets/computer-12.jpg", "/assets/computer-9.jpg"],
    colors: [
      { name: "Frost White", hex: "#f8fafc" },
      { name: "Neon Magenta", hex: "#4f46e5" },
      { name: "Stealth Black", hex: "#18181b" },
    ],
    editions: ["Mouse + 4K/8K HyperDongle"],
    shortDesc:
      "Featherweight 49-gram symmetrical esports mouse featuring a 30,000 DPI flagship sensor, 8000Hz wireless polling, and 100% Virgin PTFE skates.",
    description:
      "Co-developed with world champion FPS pros. Zero holes, zero flex, and 0.125ms wireless click latency with crisp optical switches that never double-click.",
    highlights: [
      "49g featherweight zero-hole exoskeleton for effortless flicks",
      "30,000 DPI sensor with 750 IPS tracking and 50G acceleration",
      "True 8000Hz wireless polling rate dongle included in the box",
      "90-hour battery life with virgin-grade rounded PTFE glide feet",
    ],
    specs: [
      { label: "Weight", value: "49 grams (excluding cable)" },
      { label: "Sensor", value: "Focus Pro 30K Optical (30,000 DPI)" },
      { label: "Switches", value: "Gen-3 Optical Mouse Switches (90M clicks)" },
      { label: "Polling Rate", value: "Up to 8000Hz Wireless (0.125ms)" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-17",
    slug: "action-camera-premium-lens-edition",
    sku: "NX-CM-808",
    title: "Action Camera - Premium Lens Edition",
    subtitle: "5.3K60 HyperSmooth Video • Waterproof 33ft • Dual LCD Screens",
    brand: "Sony",
    category: "camera",
    categoryLabel: "Camera & 4K Optics",
    price: 67.0,
    oldPrice: 89.0,
    discount: "-25%",
    rating: 4.8,
    reviewsCount: 118,
    inStock: true,
    stockCount: 25,
    soldCount: 390,
    badge: "NEW",
    image: "/assets/camera-8.jpg",
    gallery: ["/assets/camera-8.jpg", "/assets/camera-8a.jpg", "/assets/camera-1.jpg", "/assets/camera-3.jpg"],
    colors: [
      { name: "Stealth Black", hex: "#18181b" },
      { name: "Arctic Grey", hex: "#64748b" },
    ],
    editions: ["Standard Action Kit", "Creator Adventure Bundle (+3 Batteries)"],
    shortDesc:
      "Rugged 5.3K60 waterproof action camera featuring a hydrophobic glass lens, 360° horizon lock, and Emmy-winning HyperSmooth stabilization.",
    description:
      "Capture every mountain trail, surf session, and city ride in ultra-crisp 5.3K60 HDR. Engineered with a scratch-resistant hydrophobic lens cover, front and rear touch displays, and cold-weather Enduro battery technology.",
    highlights: [
      "5.3K60 + 4K120 Ultra HD video with 27MP RAW photo capture",
      "HyperSmooth 6.0 video stabilization with built-in 360° Horizon Lock",
      "Waterproof to 33ft (10m) right out of the box without a housing",
      "10-bit color depth & GP-Log encoding for professional grading",
    ],
    specs: [
      { label: "Video Resolution", value: "5.3K60 / 4K120 / 2.7K240 Slow-Mo" },
      { label: "Photo Sensor", value: "1/1.9\" CMOS • 27 Megapixels RAW" },
      { label: "Waterproof", value: "10m (33ft) Native / 60m with Dive Case" },
      { label: "Battery", value: "1720mAh Cold-Weather Enduro Rechargeable" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-18",
    slug: "studio-monitor-headphones-pro",
    sku: "NX-AU-910",
    title: "Studio Monitor Headphones",
    subtitle: "50mm Reference Drivers • Detachable Coiled Cable • Zero-Fatigue Pads",
    brand: "Sony",
    category: "headphone",
    categoryLabel: "Headphone & Audio",
    price: 184.0,
    oldPrice: 210.0,
    discount: "-12%",
    rating: 4.9,
    reviewsCount: 164,
    inStock: true,
    stockCount: 21,
    soldCount: 410,
    badge: "BESTSELLER",
    image: "/assets/audio-10.jpg",
    gallery: ["/assets/audio-10.jpg", "/assets/audio-8.jpg", "/assets/audio-8a.jpg", "/assets/audio-6.jpg"],
    colors: [
      { name: "Studio Black", hex: "#18181b" },
      { name: "Silver Reference", hex: "#cbd5e1" },
    ],
    editions: ["Standard 3.5mm + 6.35mm", "Balanced Studio Edition + DAC"],
    shortDesc:
      "Closed-back reference studio monitor headphones tuned for flat, uncolored acoustic accuracy during mixing, mastering, and podcasting.",
    description:
      "Trusted by recording engineers worldwide. Large-aperture 50mm rare-earth magnet drivers deliver pinpoint stereo imaging and extended sub-bass clarity across the entire 5Hz–40kHz spectrum.",
    highlights: [
      "50mm copper-clad aluminum wire voice coils for reference-grade accuracy",
      "90° swiveling earcups for effortless single-ear studio monitoring",
      "Circumaural design contours around the ears for superior sound isolation",
      "Includes detachable coiled cable, straight cable & 1/4\" gold adapter",
    ],
    specs: [
      { label: "Driver Diameter", value: "50 mm Neodymium Reference" },
      { label: "Frequency Response", value: "5 – 40,000 Hz" },
      { label: "Impedance", value: "38 Ohms (Studio & Mobile Friendly)" },
      { label: "Weight", value: "285g (without cable)" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-19",
    slug: "wireless-vertical-mouse-lift-series",
    sku: "NX-KB-505",
    title: "Wireless Vertical Mouse - Lift Series",
    subtitle: "57° Ergonomic Handshake Angle • Silent Clicks • Multi-Device Flow",
    brand: "Logitech",
    category: "keyboard",
    categoryLabel: "Keyboard & Mouse",
    price: 220.0,
    oldPrice: 260.0,
    discount: "-15%",
    rating: 4.8,
    reviewsCount: 95,
    inStock: true,
    stockCount: 18,
    soldCount: 245,
    badge: "NEW",
    image: "/assets/computer-5.jpg",
    gallery: ["/assets/computer-5.jpg", "/assets/computer-6.jpg", "/assets/computer-11.jpg"],
    colors: [
      { name: "Graphite Matte", hex: "#334155" },
      { name: "Pale Grey", hex: "#e2e8f0" },
    ],
    editions: ["Right-Handed Edition", "Left-Handed Edition"],
    shortDesc:
      "Scientifically sculpted 57-degree vertical ergonomic mouse that reduces wrist pressure and forearm strain during 10-hour coding sessions.",
    description:
      "Realign your posture naturally. The 57° vertical angle places your hand in a relaxed handshake position while the magnetic SmartWheel shifts automatically from line-by-line precision to super-fast free spin.",
    highlights: [
      "Ergonomist-approved 57° vertical angle reduces muscular strain by 40%",
      "Whisper-quiet tactile switches with magnetic speed-adaptive scroll wheel",
      "Pair up to 3 computers via Bluetooth Low Energy or Logi Bolt USB receiver",
      "Up to 24 months of battery life with fast USB-C recharge",
    ],
    specs: [
      { label: "Ergonomic Angle", value: "57° Natural Handshake Tilt" },
      { label: "Sensor", value: "4000 DPI High-Precision Darkfield Optical" },
      { label: "Buttons", value: "6 Programmable Silent-Click Buttons" },
      { label: "Connectivity", value: "Bluetooth 5.2 + 2.4GHz USB Dongle" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-20",
    slug: "wireless-earbuds-pro-anc-magsafe",
    sku: "NX-AU-505",
    title: "Wireless Earbuds Pro",
    subtitle: "2x Active Noise Cancellation • Adaptive Transparency • Spatial Audio",
    brand: "Apple",
    category: "headphone",
    categoryLabel: "Headphone & Audio",
    price: 238.0,
    oldPrice: 275.0,
    discount: "-13%",
    rating: 4.9,
    reviewsCount: 240,
    inStock: true,
    stockCount: 30,
    soldCount: 620,
    badge: "HOT",
    image: "/assets/audio-5.jpg",
    gallery: ["/assets/audio-5.jpg", "/assets/audio-4.jpg", "/assets/audio-6.jpg", "/assets/audio-7.jpg"],
    colors: [
      { name: "Gloss White", hex: "#f8fafc" },
      { name: "Midnight Matte", hex: "#1e293b" },
    ],
    editions: ["USB-C MagSafe Case", "USB-C Case + Lossless Audio Transmitter"],
    shortDesc:
      "Pocket-sized acoustic brilliance featuring custom low-distortion drivers, conversation awareness, and a precision-finding speaker case.",
    description:
      "Engineered from the inside out for richer bass and crystal-clear highs at every volume. Adaptive Audio dynamically blends Transparency and Active Noise Cancellation based on your surroundings.",
    highlights: [
      "Up to 2x more Active Noise Cancellation than previous generation",
      "Personalized Spatial Audio with dynamic head tracking",
      "IP54 dust, sweat, and water resistant earbuds and MagSafe charging case",
      "30 hours of total listening time with MagSafe, Qi, or USB-C charging",
    ],
    specs: [
      { label: "Chipset", value: "Custom H2 Ultra-Low Latency Audio Silicon" },
      { label: "Battery Life", value: "6 hrs per charge / 30 hrs with Case" },
      { label: "Protection", value: "IP54 Dust, Sweat & Water Resistant" },
      { label: "Controls", value: "Capacitive Touch Volume Swipe + Force Sensor" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-21",
    slug: "racing-wheel-force-feedback-controller",
    sku: "NX-GM-404",
    title: "Racing Wheel Controller",
    subtitle: "Dual-Motor Force Feedback • 900° Rotation • Stainless Steel Pedals",
    brand: "Sony",
    category: "game",
    categoryLabel: "Video Games & VR",
    price: 81.0,
    oldPrice: 110.0,
    discount: "-26%",
    rating: 4.7,
    reviewsCount: 84,
    inStock: true,
    stockCount: 15,
    soldCount: 195,
    badge: "SALE",
    image: "/assets/game-4.jpg",
    gallery: ["/assets/game-4.jpg", "/assets/game-5.jpg", "/assets/game-3.jpg", "/assets/game-1.jpg"],
    colors: [{ name: "Motorsport Black", hex: "#18181b" }],
    editions: ["Wheel + Pedals", "Wheel + Pedals + 6-Speed H-Shifter"],
    shortDesc:
      "Feel every weight transfer, curb, and tire slip with helical-gear force feedback, hand-stitched leather rim, and responsive metal paddle shifters.",
    description:
      "Built for authentic sim-racing precision. Features 900-degree lock-to-lock wheel rotation, an integrated RPM shift-light LED bar, and pressure-sensitive nonlinear brake pedals.",
    highlights: [
      "Dual-motor force feedback simulates real road texture and understeer",
      "900-degree lock-to-lock rotation matching real GT cockpit cars",
      "Solid steel ball bearings and anodized aluminum paddle shifters",
      "Secure desk clamps and built-in racing rig bolt points",
    ],
    specs: [
      { label: "Rotation", value: "900 degrees lock-to-lock" },
      { label: "Sensors", value: "Hall-effect steering sensor" },
      { label: "Wheel Rim", value: "Hand-stitched perforated microfiber leather" },
      { label: "Compatibility", value: "PlayStation 5, PS4, Windows 11/10 PC" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
  {
    id: "prod-22",
    slug: "mobile-clip-on-game-controller-pro",
    sku: "NX-GM-303",
    title: "Mobile Clip-On Game Controller",
    subtitle: "Zero-Latency USB-C & Bluetooth • Hall Joysticks • Pass-Through Charge",
    brand: "Sony",
    category: "game",
    categoryLabel: "Video Games & VR",
    price: 215.0,
    oldPrice: 230.0,
    discount: "-7%",
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 19,
    soldCount: 278,
    badge: "HOT",
    image: "/assets/game-3.jpg",
    gallery: ["/assets/game-3.jpg", "/assets/game-2.jpg", "/assets/game-1.jpg", "/assets/game-8.jpg"],
    colors: [
      { name: "PlayStation White", hex: "#f8fafc" },
      { name: "Obsidian Black", hex: "#18181b" },
    ],
    editions: ["Universal USB-C (iPhone 15/16 & Android)", "Bluetooth Cloud Edition"],
    shortDesc:
      "Transform your smartphone into a console-grade handheld gaming deck with tactile microswitch buttons and Hall-Effect analog triggers.",
    description:
      "Play PS Remote Play, Xbox Cloud Gaming, Steam Link, and native mobile titles with console-level ergonomics. Expandable bridge fits phones even with protective cases attached.",
    highlights: [
      "Direct USB-C connection delivers zero-latency input & pass-through charging",
      "Full-size Hall-Effect analog sticks and laser-etched textured grips",
      "3.5mm headset jack with built-in DAC + dedicated capture button",
      "Fits all major smartphones from 5.5\" to 7.0\" with case support",
    ],
    specs: [
      { label: "Connection", value: "Direct Pivot USB-C + Bluetooth 5.3" },
      { label: "Charging", value: "36W Pass-Through Fast Charging Port" },
      { label: "Audio", value: "3.5mm 24-bit/96kHz Headphone Jack" },
      { label: "Weight", value: "138 grams (Collapsible Pocket Design)" },
    ],
    reviews: DEFAULT_REVIEWS,
  },
];

export function resolveStoreProduct(item: {
  slug?: string;
  title?: string;
  image?: string;
  price?: number;
}): Product {
  if (item.slug) {
    const bySlug = PRODUCTS.find((p) => p.slug === item.slug);
    if (bySlug) return bySlug;
  }
  if (item.image) {
    const byMainImg = PRODUCTS.find((p) => p.image === item.image);
    if (byMainImg) return byMainImg;
    const byGallery = PRODUCTS.find((p) => p.gallery.includes(item.image!));
    if (byGallery) return byGallery;
  }
  if (item.title) {
    const clean = item.title.toLowerCase();
    const byTitle = PRODUCTS.find(
      (p) =>
        p.title.toLowerCase() === clean ||
        p.title.toLowerCase().includes(clean.split(" - ")[0]) ||
        clean.includes(p.title.toLowerCase().split(" - ")[0])
    );
    if (byTitle) return byTitle;
  }
  return PRODUCTS[0];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "noise-cancelling-headphones-for-every-journey",
    title: "Noise-Cancelling Headphones for Every Journey: 2026 Acoustic Guide",
    excerpt:
      "Discover how dual-chip adaptive ANC and beryllium drivers transform noisy airline cabins and open offices into private mastering studios.",
    category: "Audio Review",
    author: "Liam Vance",
    authorRole: "Lead Acoustics Editor",
    authorAvatar: "/assets/testimonial-1.jpg",
    date: "July 17, 2026",
    readTime: "6 min read",
    image: "/assets/blog-1_c9731c10-c6dd-4c32-bb0f-1600b7e315b0.jpg",
    gallery: ["/assets/blog-detail-2-2.jpg", "/assets/audio-8.jpg", "/assets/audio-10.jpg"],
    tags: ["#SpatialAudio", "#ANC", "#Audiophile", "#TravelGear"],
    keyTakeaways: [
      "Hybrid 8-microphone arrays now cancel up to 50dB of low-frequency jet engine and subway rumble.",
      "LDAC and USB-C lossless modes preserve 24-bit/96kHz studio dynamics without compression.",
      "Memory-protein ear cushions with cooling gel prevent ear fatigue on 12-hour international flights.",
    ],
    sections: [
      {
        heading: "1. How Next-Gen Adaptive ANC Actually Works",
        body: "Traditional active noise cancellation relied on a single feedforward microphone that struggled with sudden midrange voices and wind shear. In 2026, flagship headphones like the Nexova Studio Pro ANC combine eight beamforming microphones with a dedicated real-time neural acoustic processor that samples ambient pressure 48,000 times per second.",
      },
      {
        heading: "2. Lossless Wireless vs. USB-C Direct DAC Mode",
        body: "While standard Bluetooth compresses audio streams down to 320kbps, Sony LDAC and aptX Lossless push nearly 1Mbps over the air. Even better, plugging in a single braided USB-C cable engages the internal 32-bit DAC for bit-perfect studio monitoring with zero latency.",
      },
      {
        heading: "3. Choosing the Right Pair for Commuting & Studio Work",
        body: "Look for a clamping force under 4.2 Newtons, replaceable magnetic ear pads, and multipoint Bluetooth 5.3 so your headphones switch seamlessly between your 15-inch Ultrabook Pro and your 5G smartphone.",
      },
    ],
    relatedProductSlugs: ["studio-anc-wireless-over-ear-headphones", "waterproof-360-spatial-portable-speaker"],
  },
  {
    id: "blog-2",
    slug: "style-meets-sound-chic-white-headphones-city-rides",
    title: "Style Meets Sound: Chic Minimalist Headphones for Urban Commuters",
    excerpt:
      "Why industrial designers are blending anodized titanium, matte ceramic finishes, and transparency-mode safety for daily city riders.",
    category: "Lifestyle",
    author: "Sophia Chen",
    authorRole: "Industrial Design Critic",
    authorAvatar: "/assets/testimonial-2.jpg",
    date: "July 24, 2026",
    readTime: "5 min read",
    image: "/assets/blog-2.jpg",
    gallery: ["/assets/collection-1.jpg", "/assets/audio-1.jpg"],
    tags: ["#Lifestyle", "#UrbanTech", "#MinimalDesign", "#Headphones"],
    keyTakeaways: [
      "Smart Transparency Mode lets sirens and bike bells pass through naturally while keeping music rich.",
      "PVD-coated aluminum yokes resist scratches inside everyday backpacks.",
      "5-minute rapid USB-C charging adds 6 hours of commute playback.",
    ],
    sections: [
      {
        heading: "1. Acoustic Awareness in Busy City Streets",
        body: "Riding through metropolitan avenues requires situational awareness. Modern ambient passthrough algorithms selectively amplify directional horn and voice frequencies while filtering harsh construction noise.",
      },
      {
        heading: "2. Materials That Age Gracefully",
        body: "Cheap glossy plastics creak and scuff within weeks. By contrast, bead-blasted aluminum hinges and stain-resistant vegan micro-leather keep white and champagne headphones looking showroom-fresh year after year.",
      },
    ],
    relatedProductSlugs: ["studio-anc-wireless-over-ear-headphones", "smartwatch-sport-edition-pro-gps"],
  },
  {
    id: "blog-3",
    slug: "smartwatches-manage-your-life-from-your-wrist",
    title: "Titanium Smartwatches: Managing Health, Trail GPS & Work From Your Wrist",
    excerpt:
      "From continuous ECG & HRV recovery metrics to offline topographic maps, explore how modern wearables replace three separate devices.",
    category: "Wearables",
    author: "Dr. Aris Thorne",
    authorRole: "Sports Biomechanics Specialist",
    authorAvatar: "/assets/testimonial-3.jpg",
    date: "August 02, 2026",
    readTime: "7 min read",
    image: "/assets/blog-3.jpg",
    gallery: ["/assets/watch-2.jpg", "/assets/watch-7.jpg"],
    tags: ["#Smartwatch", "#FitnessTech", "#Titanium", "#HealthTracking"],
    keyTakeaways: [
      "Dual-frequency L1+L5 satellite tracking eliminates GPS drift between tall downtown skyscrapers and deep canyons.",
      "Overnight Heart Rate Variability (HRV) accurately predicts training readiness before you hit the gym.",
      "Sapphire crystal displays rated at 3,000 nits remain legible under direct midday desert sunlight.",
    ],
    sections: [
      {
        heading: "1. Why Dual-Frequency GPS Changes Everything",
        body: "Single-band GPS watches often bounce off glass buildings or dense forest canopies. By locking onto both L1 and L5 satellite frequencies simultaneously, the Smartwatch Sport Edition Pro pins your pace and elevation within 0.8 meters.",
      },
      {
        heading: "2. Actionable Health Telemetry Without Subscription Fees",
        body: "Your wrist is the ideal vantage point for continuous optical pulse oximetry, skin temperature baselines, and 30-second single-lead ECG waveforms that can be exported directly as a PDF for your physician.",
      },
    ],
    relatedProductSlugs: ["smartwatch-sport-edition-pro-gps", "galaxy-s30-ultra-5g-titanium-256gb"],
  },
  {
    id: "blog-4",
    slug: "next-gen-vr-and-hall-effect-gaming-gear",
    title: "Zero Stick Drift: Why Hall-Effect & Optical Switches Rule 2026 Gaming",
    excerpt:
      "Say goodbye to worn-out potentiometers. Here is why competitive esports players are switching to magnetic Hall-Effect controllers and 240Hz QD-OLEDs.",
    category: "Gaming",
    author: "Marcus Vance",
    authorRole: "Senior Hardware Editor",
    authorAvatar: "/assets/testimonial-4.jpg",
    date: "August 14, 2026",
    readTime: "5 min read",
    image: "/assets/blog-4.jpg",
    gallery: ["/assets/game-1.jpg", "/assets/computer-6.jpg"],
    tags: ["#VRGaming", "#Esports", "#HallEffect", "#QDOLED"],
    keyTakeaways: [
      "Magnetic Hall-Effect sensors never physically touch, preventing potentiometer wear and stick drift.",
      "1000Hz wireless polling cuts input delay down to a sub-perceptible 1 millisecond.",
      "Pairing a 240Hz QD-OLED monitor with a low-latency controller gives a measurable reaction advantage.",
    ],
    sections: [
      {
        heading: "1. The Physics Behind Magnetic Hall-Effect Joysticks",
        body: "Conventional controllers rub carbon film against metal wipers thousands of times per match. Hall-Effect thumbsticks replace friction with permanent neodymium magnets and solid-state sensors that maintain factory deadzones for over 10 million cycles.",
      },
      {
        heading: "2. Building the Ultimate 240Hz Battlestation",
        body: "Combine an angular high-airflow tempered glass chassis with a 34-inch 0.03ms QD-OLED ultrawide monitor and a 75% gasket mechanical keyboard for a setup that excels at both tournament play and 4K content creation.",
      },
    ],
    relatedProductSlugs: ["wireless-hall-effect-pro-gaming-controller", "curved-34-inch-ultrawide-oled-gaming-monitor"],
  },
  {
    id: "blog-5",
    slug: "8k-mirrorless-cameras-and-portable-laser-projectors",
    title: "From 8K Full-Frame Capture to 150-Inch Laser Projection: The Creator Workflow",
    excerpt:
      "How solo filmmakers shoot 8K 60p RAW in the field, grade on OLED Ultrabooks, and screen dailies anywhere with portable 4K laser projectors.",
    category: "Cameras",
    author: "Elena Rostova",
    authorRole: "Cinematographer & Editor",
    authorAvatar: "/assets/testimonial-5.jpg",
    date: "August 28, 2026",
    readTime: "8 min read",
    image: "/assets/blog-5.jpg",
    gallery: ["/assets/camera-7.jpg", "/assets/camera-3.jpg"],
    tags: ["#8KCamera", "#Filmmaking", "#LaserProjector", "#CreatorGear"],
    keyTakeaways: [
      "Stacked full-frame sensors eliminate rolling shutter distortion during fast whip-pans.",
      "8.5-stop in-body stabilization allows handheld cinematic tracking shots without a heavy gimbal.",
      "Portable 4K laser projectors with auto-keystone let you review color-accurate dailies on any wall.",
    ],
    sections: [
      {
        heading: "1. Handheld 8K Cinema Without the Rig",
        body: "Thanks to coordinated optical and sensor-shift stabilization, today's 45MP full-frame mirrorless bodies let you shoot smooth walking sequences with a compact 24-70mm lens.",
      },
      {
        heading: "2. Instant Client Previews on Location",
        body: "Instead of crowding around a 5-inch monitor, connect a 4K portable laser projector over HDMI 2.1 or Wi-Fi 6 to project a calibrated 120-inch preview in seconds.",
      },
    ],
    relatedProductSlugs: ["mirrorless-8k-cinema-camera-full-frame", "4k-ultra-hd-portable-laser-cinema-projector"],
  },
  {
    id: "blog-6",
    slug: "custom-mechanical-keyboards-and-oled-ultrabooks",
    title: "The Ultimate Remote Engineer Desk: CNC Mechanical Keyboards & OLED Ultrabooks",
    excerpt:
      "Upgrade your daily coding and design ergonomics with gasket-mounted aluminum keyboards, single-cable Thunderbolt docks, and 120Hz OLED laptops.",
    category: "Laptops",
    author: "Devon Brooks",
    authorRole: "Principal Systems Architect",
    authorAvatar: "/assets/testimonial-6.jpg",
    date: "September 09, 2026",
    readTime: "6 min read",
    image: "/assets/blog-6.jpg",
    gallery: ["/assets/laptop-9.jpg", "/assets/computer-9.jpg"],
    tags: ["#Mechanical", "#MacBookM3", "#DeskSetup", "#Productivity"],
    keyTakeaways: [
      "Gasket-mounted 75% keyboards absorb harsh bottom-out vibrations, reducing finger strain during 8-hour coding sprints.",
      "3.2K 120Hz OLED laptop panels eliminate text ghosting and eye fatigue.",
      "A single 90W USB-C monitor cable powers your laptop while driving 3440x1440 at 240Hz.",
    ],
    sections: [
      {
        heading: "1. Why Gasket Mount & PBT Keycaps Matter",
        body: "By suspending the switch plate between poron silicone gaskets rather than screwing it rigidly into metal posts, every keystroke feels cushioned and produces a deep, satisfying acoustic signature.",
      },
      {
        heading: "2. One-Cable Workstation Simplicity",
        body: "Pair the 15-inch Slim Metal Ultrabook Pro with our 34-inch Curved QD-OLED monitor via Thunderbolt 4 to charge at 90W, transfer files at 40Gbps, and switch peripherals automatically.",
      },
    ],
    relatedProductSlugs: ["15-inch-slim-metal-ultrabook-pro", "custom-wireless-gasket-mechanical-keyboard"],
  },
];

export const SAMPLE_ORDERS: Record<string, OrderTrackingRecord> = {
  "NX-98421": {
    orderId: "NX-98421",
    email: "alex.morgan@nexova.io",
    status: "In Transit",
    currentStep: 3,
    estimatedDelivery: "Tomorrow by 6:00 PM (Express Air)",
    carrier: "Nexova Priority Air / DHL Express",
    trackingNumber: "1Z999AA10123456784",
    origin: "Los Angeles Flagship Fulfillment Hub, CA",
    destination: "New York, NY 10001, USA",
    totalAmount: 650.0,
    items: [
      {
        title: "Smartwatch Sport Edition Pro Titanium GPS",
        qty: 1,
        price: 385.0,
        image: "/assets/watch-2.jpg",
        slug: "smartwatch-sport-edition-pro-gps",
      },
      {
        title: "Studio Pro ANC Wireless Over-Ear Headphones",
        qty: 1,
        price: 265.0,
        image: "/assets/audio-8.jpg",
        slug: "studio-anc-wireless-over-ear-headphones",
      },
    ],
    timeline: [
      {
        step: "Order Confirmed & Verified",
        location: "Nexova Cloud Checkout",
        timestamp: "Nov 03, 2026 • 09:14 AM",
        detail: "Payment verified via 256-bit SSL and inventory allocated.",
        completed: true,
      },
      {
        step: "24-Point Lab Quality Inspection",
        location: "Los Angeles Fulfillment Lab",
        timestamp: "Nov 03, 2026 • 01:40 PM",
        detail: "Serial numbers registered for 2-Year Nexova Care+ warranty.",
        completed: true,
      },
      {
        step: "Dispatched from Regional Hub",
        location: "LAX Air Cargo Terminal 4",
        timestamp: "Nov 04, 2026 • 06:20 AM",
        detail: "Loaded onto priority air freight flight NX-402.",
        completed: true,
      },
      {
        step: "In Transit to Destination City",
        location: "JFK Regional Sorting Facility, NY",
        timestamp: "Nov 05, 2026 • 11:05 AM",
        detail: "Arrived at destination hub; customs & security scan cleared.",
        completed: true,
      },
      {
        step: "Out for Final Doorstep Delivery",
        location: "Manhattan Express Courier Van",
        timestamp: "Scheduled Tomorrow • 09:00 AM",
        detail: "Signature or OTP verification upon delivery.",
        completed: false,
      },
    ],
  },
  "NX-77210": {
    orderId: "NX-77210",
    email: "sophia@domain.com",
    status: "Out for Delivery",
    currentStep: 4,
    estimatedDelivery: "Today between 2:00 PM – 5:00 PM",
    carrier: "Nexova Same-Day Electric Fleet",
    trackingNumber: "NX-SD-8841209",
    origin: "California Logistics Center, USA",
    destination: "San Francisco, CA 94107, USA",
    totalAmount: 1199.0,
    items: [
      {
        title: "15-inch Slim Metal Ultrabook Pro M-Series",
        qty: 1,
        price: 1199.0,
        image: "/assets/laptop-9.jpg",
        slug: "15-inch-slim-metal-ultrabook-pro",
      },
    ],
    timeline: [
      {
        step: "Order Confirmed & Verified",
        location: "Nexova Store",
        timestamp: "Nov 04, 2026 • 04:10 PM",
        detail: "Order placed with Free Express Shipping ($500+ tier).",
        completed: true,
      },
      {
        step: "24-Point Lab Quality Inspection",
        location: "California Logistics Center",
        timestamp: "Nov 04, 2026 • 06:45 PM",
        detail: "Shock-absorbent air-cell packaging sealed.",
        completed: true,
      },
      {
        step: "Dispatched from Regional Hub",
        location: "Bay Area Distribution Hub",
        timestamp: "Nov 05, 2026 • 05:30 AM",
        detail: "Transferred to local electric courier vehicle.",
        completed: true,
      },
      {
        step: "In Transit to Destination City",
        location: "San Francisco South Hub",
        timestamp: "Nov 05, 2026 • 08:15 AM",
        detail: "Sorted for morning delivery wave.",
        completed: true,
      },
      {
        step: "Out for Final Doorstep Delivery",
        location: "Courier 1.8 miles away",
        timestamp: "Nov 05, 2026 • 01:10 PM",
        detail: "Driver Jordan M. is en route with your package.",
        completed: true,
      },
    ],
  },
};

export const FAQ_ITEMS = [
  {
    category: "Orders & Billing",
    q: "How does the 'Buy 3 Save 30%' Bundle Deal work?",
    a: "Simply add any 3 or more eligible products to your bundle on the homepage Bundle Builder or apply coupon code NEXOVA30 in your Shopping Cart. An instant 30% discount is automatically deducted from your subtotal at checkout.",
  },
  {
    category: "Orders & Billing",
    q: "What payment methods does Nexova accept?",
    a: "We accept Visa, Mastercard, American Express, Discover, Diners Club, PayPal, Apple Pay, Google Pay, UPI, and 0% APR monthly installment plans via Affirm and Klarna.",
  },
  {
    category: "Orders & Billing",
    q: "Can I modify or cancel my order after placing it?",
    a: "Yes! You can modify your shipping address or cancel an order free of charge within 2 hours of placement directly from the My Account -> Orders dashboard or Order Tracking page before it enters dispatch.",
  },
  {
    category: "Shipping & Delivery",
    q: "How do I qualify for Free Express Shipping?",
    a: "All orders totaling $500 or more automatically qualify for complimentary Insured Express Air Shipping (1–2 business days in the US & Europe, 3–5 business days globally).",
  },
  {
    category: "Shipping & Delivery",
    q: "Are high-value electronics insured during transit?",
    a: "100% yes. Every Nexova shipment is packed in tamper-evident anti-static air-cell boxes and includes full replacement transit insurance up to $10,000 at zero extra cost to you.",
  },
  {
    category: "Shipping & Delivery",
    q: "Do you ship internationally and handle customs duties?",
    a: "We ship to over 65 countries from our 6 regional hubs (Los Angeles, New York, California, London, Paris, and Bangkok). Duties & taxes are calculated transparently at checkout with DDP (Delivered Duty Paid) options.",
  },
  {
    category: "Returns & Warranty",
    q: "What is your 30-Day Money-Back Guarantee?",
    a: "If you are not 100% thrilled with your purchase, you can return any item in its original condition within 30 days of delivery for a full refund or instant store exchange—no restocking fees.",
  },
  {
    category: "Returns & Warranty",
    q: "What does the 2-Year Nexova Care+ Hardware Warranty cover?",
    a: "Every flagship laptop, camera, smartwatch, and headphone includes a 2-year manufacturer & Nexova Care+ warranty covering battery defects, display pixel anomalies, sensor calibration, and free two-way express repair shipping.",
  },
  {
    category: "Product & Tech Support",
    q: "Are all products 100% authentic and factory-sealed?",
    a: "Yes. Nexova is an authorized direct retail partner for Sony, Apple, Samsung, Canon, Dell, and Corsair. Every unit ships factory-sealed with verifiable manufacturer serial numbers.",
  },
  {
    category: "Account & Security",
    q: "Is my payment and personal data encrypted?",
    a: "Our checkout uses PCI-DSS Level 1 compliant 256-bit TLS/SSL encryption and tokenized payment processing. We never store raw credit card numbers on our servers.",
  },
];

export const STORE_SHOWROOMS = [
  {
    city: "Los Angeles - USA",
    badge: "GLOBAL HQ & LAB",
    address: "8500 Beverly Blvd, Suite 410, Los Angeles, CA 90048",
    phone: "+1 (888) 456-7890",
    email: "la.flagship@nexova.io",
    hours: "Mon – Sun: 09:00 AM – 09:00 PM PST",
    services: ["Acoustic Listening Room", "Same-Day Pickup", "1-Hour Express Repair"],
  },
  {
    city: "New York - USA",
    badge: "SOHO FLAGSHIP",
    address: "452 Broadway, SoHo Tech District, New York, NY 10013",
    phone: "+1 (888) 333-6660",
    email: "ny.soho@nexova.io",
    hours: "Mon – Sun: 10:00 AM – 09:30 PM EST",
    services: ["8K Cinema Camera Studio", "Custom PC Builder Bar", "VIP Concierge"],
  },
  {
    city: "California - USA",
    badge: "SILICON VALLEY HUB",
    address: "5611 Wellington Road, Suite 115, Cupertino, CA 95014",
    phone: "+1 (888) 234-5678",
    email: "sv.hub@nexova.io",
    hours: "Mon – Sat: 09:00 AM – 08:00 PM PST",
    services: ["Drone & Robotics Demo Zone", "B2B Enterprise Lounge", "Trade-In Desk"],
  },
  {
    city: "London - England",
    badge: "UK & EUROPE HUB",
    address: "214 Regent Street, Mayfair, London W1B 5TR, UK",
    phone: "+44 20 7946 0921",
    email: "london@nexova.io",
    hours: "Mon – Sun: 10:00 AM – 08:30 PM GMT",
    services: ["Audiophile DAC Lounge", "Tax-Free Global Shopping", "Warranty Center"],
  },
  {
    city: "Paris - France",
    badge: "DESIGN ATELIER",
    address: "78 Avenue des Champs-Élysées, 75008 Paris, France",
    phone: "+33 1 42 68 55 00",
    email: "paris@nexova.io",
    hours: "Mon – Sat: 10:00 AM – 08:00 PM CET",
    services: ["Wearables Styling Bar", "Click & Collect in 30m", "Creator Workshops"],
  },
  {
    city: "Bangkok - Thailand",
    badge: "ASIA-PACIFIC HUB",
    address: "991 Rama I Rd, Pathum Wan, Bangkok 10330, Thailand",
    phone: "+66 2 610 8000",
    email: "bangkok@nexova.io",
    hours: "Mon – Sun: 10:00 AM – 10:00 PM ICT",
    services: ["Esports Arena & VR Pod", "Custom Mechanical Keyboards", "Express Repair"],
  },
];

export function getProductBySlug(slug: string): Product {
  return PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
}

export function getCategoryBySlug(slug: string): CategoryInfo {
  const aliasMap: Record<string, string> = {
    smartphone: "mobile",
    "mobile-tablet": "mobile",
    watch: "smartwatch",
    accesories: "accessories",
    electronics: "accessories",
  };
  const normalized = aliasMap[slug] || slug;
  return CATEGORIES.find((c) => c.slug === normalized || c.id === normalized) || CATEGORIES[0];
}

export function getBlogBySlug(slug: string): BlogPost {
  return BLOG_POSTS.find((b) => b.slug === slug) || BLOG_POSTS[0];
}

