"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { SAMPLE_ORDERS, PRODUCTS, OrderTrackingRecord } from "@/lib/storeData";
import { useStore } from "@/lib/StoreContext";

type PanelTab =
  | "overview"
  | "orders"
  | "warranties"
  | "wishlist"
  | "addresses"
  | "returns"
  | "tickets"
  | "coupons"
  | "security";

interface RegisteredDevice {
  id: string;
  productTitle: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  status: "Active Care+" | "Expiring Soon";
  image: string;
  slug: string;
}

interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  line1: string;
  cityStateZip: string;
  country: string;
  phone: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  department: string;
  status: "Resolved" | "Engineer Replied" | "Open";
  updatedAt: string;
  messages: { sender: "Customer" | "Nexova Engineer"; text: string; time: string }[];
}

interface RmaRequest {
  id: string;
  orderId: string;
  itemTitle: string;
  type: "Full Refund" | "Express Replacement";
  amount: number;
  status: "Approved • Label Sent" | "Completed • Refunded";
  date: string;
}

export default function CustomerPanelPage() {
  const {
    customer,
    isAuthenticated,
    logoutCustomer,
    updateCustomerProfile,
    wishlist,
    wishlistCount,
    cartCount,
    addToCart,
    toggleWishlist,
    applyCoupon,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<PanelTab>("overview");

  // 1. Orders State & Invoice Modal
  const ordersList = Object.values(SAMPLE_ORDERS);
  const [orderFilter, setOrderFilter] = useState<string>("All");
  const [orderSearch, setOrderSearch] = useState<string>("");
  const [invoiceOrder, setInvoiceOrder] = useState<OrderTrackingRecord | null>(null);

  // 2. Registered Warranty Devices State
  const [devices, setDevices] = useState<RegisteredDevice[]>([
    {
      id: "dev-1",
      productTitle: PRODUCTS[0].title,
      serialNumber: "SN-NX9940-8821X",
      purchaseDate: "14 Oct 2026",
      expiryDate: "14 Oct 2028",
      status: "Active Care+",
      image: PRODUCTS[0].image,
      slug: PRODUCTS[0].slug,
    },
    {
      id: "dev-2",
      productTitle: PRODUCTS[2].title,
      serialNumber: "SN-NX7712-4092M",
      purchaseDate: "02 Nov 2026",
      expiryDate: "02 Nov 2028",
      status: "Active Care+",
      image: PRODUCTS[2].image,
      slug: PRODUCTS[2].slug,
    },
    {
      id: "dev-3",
      productTitle: PRODUCTS[3].title,
      serialNumber: "SN-NX5501-1940S",
      purchaseDate: "28 Aug 2026",
      expiryDate: "28 Aug 2028",
      status: "Active Care+",
      image: PRODUCTS[3].image,
      slug: PRODUCTS[3].slug,
    },
  ]);
  const [newDeviceModel, setNewDeviceModel] = useState(PRODUCTS[1].title);
  const [newDeviceSerial, setNewDeviceSerial] = useState("");

  // 3. Address Book State
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: "addr-1",
      label: "Home Studio",
      recipient: customer.name,
      line1: "452 Broadway, Suite 4B, SoHo Tech District",
      cityStateZip: "New York, NY 10013",
      country: "United States",
      phone: customer.phone,
      isDefaultShipping: true,
      isDefaultBilling: true,
    },
    {
      id: "addr-2",
      label: "Corporate Office",
      recipient: customer.name,
      line1: "8500 Beverly Blvd, Floor 8, Suite 810",
      cityStateZip: "Los Angeles, CA 90048",
      country: "United States",
      phone: "+1 (888) 333-6660",
      isDefaultShipping: false,
      isDefaultBilling: false,
    },
  ]);
  const [addrLabel, setAddrLabel] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrCity, setAddrCity] = useState("");

  // 5. Returns / RMA State
  const [rmaList, setRmaList] = useState<RmaRequest[]>([
    {
      id: "RMA-90412",
      orderId: "NX-773104",
      itemTitle: "Studio Monitor Headphones",
      type: "Full Refund",
      amount: 184.0,
      status: "Completed • Refunded",
      date: "Oct 29, 2026",
    },
  ]);
  const [rmaOrderId, setRmaOrderId] = useState("NX-884920");
  const [rmaReason, setRmaReason] = useState("Exchange for different color/storage");
  const [rmaType, setRmaType] = useState<"Full Refund" | "Express Replacement">("Express Replacement");

  // 6. Priority Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TCK-5021",
      subject: "Spatial Audio EQ Calibration Profile for MacBook Pro M3",
      department: "Acoustic Engineering Lab",
      status: "Engineer Replied",
      updatedAt: "2 hours ago",
      messages: [
        {
          sender: "Customer",
          text: "Hi team, can you share the recommended 10-band studio EQ profile for my Wireless ANC Studio Headphones?",
          time: "Yesterday, 4:15 PM",
        },
        {
          sender: "Nexova Engineer",
          text: "Hello Alex! We have attached the reference Harman-Studio curve preset to your account. You can also enable LDAC 990kbps in the companion app.",
          time: "Today, 11:20 AM",
        },
      ],
    },
  ]);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketDept, setNewTicketDept] = useState("Technical & Firmware Support");
  const [newTicketMsg, setNewTicketMsg] = useState("");
  const [replyText, setReplyText] = useState("");

  // 7. Profile Edit State
  const [editName, setEditName] = useState(customer.name);
  const [editEmail, setEditEmail] = useState(customer.email);
  const [editPhone, setEditPhone] = useState(customer.phone);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));
  const recommendedProducts = PRODUCTS.slice(0, 4);

  const filteredOrders = ordersList.filter((o) => {
    if (orderFilter !== "All" && o.status !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.orderId.toLowerCase().includes(q);
      const matchItem = o.items.some((i) => i.title.toLowerCase().includes(q));
      if (!matchId && !matchItem) return false;
    }
    return true;
  });

  // Handlers
  const handleRegisterDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceSerial.trim()) return;
    const matchedProd = PRODUCTS.find((p) => p.title === newDeviceModel) || PRODUCTS[1];
    const newDev: RegisteredDevice = {
      id: "dev-" + Date.now(),
      productTitle: matchedProd.title,
      serialNumber: newDeviceSerial.trim().toUpperCase(),
      purchaseDate: "06 Nov 2026",
      expiryDate: "06 Nov 2028",
      status: "Active Care+",
      image: matchedProd.image,
      slug: matchedProd.slug,
    };
    setDevices([newDev, ...devices]);
    setNewDeviceSerial("");
    showToast(`Device ${newDev.serialNumber} registered for 2-Year Care+ Warranty!`);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrLabel.trim() || !addrLine1.trim()) return;
    setAddresses([
      ...addresses,
      {
        id: "addr-" + Date.now(),
        label: addrLabel,
        recipient: customer.name,
        line1: addrLine1,
        cityStateZip: addrCity || "San Francisco, CA 94107",
        country: "United States",
        phone: customer.phone,
        isDefaultShipping: false,
        isDefaultBilling: false,
      },
    ]);
    setAddrLabel("");
    setAddrLine1("");
    setAddrCity("");
    showToast("New shipping address saved!");
  };

  const handleCreateRma = (e: React.FormEvent) => {
    e.preventDefault();
    const newRma: RmaRequest = {
      id: "RMA-" + Math.floor(10000 + Math.random() * 89999),
      orderId: rmaOrderId,
      itemTitle: `${rmaReason}`,
      type: rmaType,
      amount: 215.0,
      status: "Approved • Label Sent",
      date: "Just Now",
    };
    setRmaList([newRma, ...rmaList]);
    showToast(`Return/Exchange #${newRma.id} approved! Prepaid label sent to your email.`);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMsg.trim()) return;
    const newTck: SupportTicket = {
      id: "TCK-" + Math.floor(1000 + Math.random() * 8999),
      subject: newTicketSubject,
      department: newTicketDept,
      status: "Open",
      updatedAt: "Just Now",
      messages: [{ sender: "Customer", text: newTicketMsg, time: "Just Now" }],
    };
    setTickets([newTck, ...tickets]);
    setNewTicketSubject("");
    setNewTicketMsg("");
    showToast(`Priority Support Ticket #${newTck.id} created!`);
  };

  const NAV_ITEMS: { id: PanelTab; icon: string; label: string; badge?: string }[] = [
    { id: "overview", icon: "📊", label: "Dashboard Overview" },
    { id: "orders", icon: "📦", label: "My Orders & Invoices", badge: `${ordersList.length}` },
    { id: "warranties", icon: "🛡️", label: "Warranty & Devices", badge: `${devices.length}` },
    { id: "wishlist", icon: "♥", label: "Saved Wishlist", badge: `${wishlistCount}` },
    { id: "addresses", icon: "📍", label: "Address Book", badge: `${addresses.length}` },
    { id: "returns", icon: "↩️", label: "Returns & RMA", badge: `${rmaList.length}` },
    { id: "tickets", icon: "🎧", label: "Support Concierge", badge: `${tickets.length}` },
    { id: "coupons", icon: "🎟️", label: "My Coupons", badge: "4" },
    { id: "security", icon: "🔒", label: "Profile & Security" },
  ];

  return (
    <div className="bg-[#f8f9fc] text-[#1c1c1c] min-h-screen">
      <PageHero
        badge={`MEMBER ID: ${customer.memberId} • ${customer.tier.toUpperCase()}`}
        title={`Hello, ${customer.name}`}
        highlight="• Customer Panel"
        subtitle="Manage your orders, downloadable tax invoices, 2-Year Nexova Care+ device warranties, saved addresses, and priority tech support in one unified command center."
        breadcrumbs={[{ label: "Customer Panel" }]}
        rightStats={[
          { value: `${ordersList.length}`, label: "Active Orders" },
          { value: `${devices.length}`, label: "Care+ Devices" },
          { value: `${wishlistCount}`, label: "Saved Wishlist" },
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        {/* Top Quick Auth & Portal Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-[20px] border border-[#e6e8f0] p-4 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#4f46e5]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-extrabold text-[#141233]">
                  {customer.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4f46e5] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {customer.tier}
                </span>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold">
                    ● Verified
                  </span>
                )}
              </div>
              <div className="text-[12.5px] text-[#666666]">
                {customer.email} • {customer.phone} • Member since {customer.joinedDate}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-[#f4f5f9] hover:bg-[#eef2ff] text-[#333333] hover:text-[#4f46e5] text-[12px] font-bold transition-colors"
            >
              🔐 Customer Login Page
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-full bg-[#f4f5f9] hover:bg-[#eef2ff] text-[#333333] hover:text-[#4f46e5] text-[12px] font-bold transition-colors"
            >
              ✨ Customer Signup Page
            </Link>
            <button
              type="button"
              onClick={logoutCustomer}
              className="px-4 py-2 rounded-full border border-[#dcdce5] hover:border-[#141233] text-[#141233] text-[12px] font-bold transition-colors cursor-pointer"
            >
              Sign Out →
            </button>
          </div>
        </div>

        {/* Main 12-Col Customer Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 3 Cols: Sticky 10-Module Customer Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-[24px] border border-[#e6e8f0] p-4 space-y-1.5 shadow-xs lg:sticky lg:top-6">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#888888]">
              Customer Control Center
            </div>
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[14px] text-[13.5px] font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#141233] text-white shadow-sm"
                      : "text-[#444444] hover:bg-[#eef2ff] hover:text-[#4f46e5]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className="text-[16px]">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10.5px] font-extrabold ${
                        active
                          ? "bg-[#4f46e5] text-white"
                          : "bg-[#f4f5f9] text-[#555555]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Bottom Direct Utility Links */}
            <div className="pt-3 mt-3 border-t border-[#f0f0f0] space-y-1">
              <Link
                href="/shop"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[13px] font-bold text-[#141233] hover:bg-[#f4f5f9] transition-colors"
              >
                <span>🛍️ Continue Shopping</span>
                <span>→</span>
              </Link>
            </div>
          </aside>

          {/* Right 9 Cols: Dynamic Module Workspace */}
          <div className="lg:col-span-9 space-y-6">
            {/* =========================================================
                TAB 1: DASHBOARD OVERVIEW
               ========================================================= */}
            {activeTab === "overview" && (
              <>
                {/* 4 Executive KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveTab("orders")}
                    className="p-5 rounded-[20px] bg-[#141233] text-white cursor-pointer hover:-translate-y-1 transition-transform"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#38bdf8]">
                      ACTIVE ORDERS
                    </div>
                    <div className="text-[28px] font-extrabold mt-1">
                      {ordersList.length} Orders
                    </div>
                    <div className="text-[12px] text-[#10b981] font-semibold mt-1">
                      ● 1 Out for Delivery Today
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("warranties")}
                    className="p-5 rounded-[20px] bg-white border border-[#e6e8f0] cursor-pointer hover:border-[#4f46e5] hover:-translate-y-1 transition-all"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                      CARE+ WARRANTIES
                    </div>
                    <div className="text-[28px] font-extrabold text-[#141233] mt-1">
                      {devices.length} Devices
                    </div>
                    <div className="text-[12px] text-[#666666] mt-1">
                      Protected through 2028
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("wishlist")}
                    className="p-5 rounded-[20px] bg-white border border-[#e6e8f0] cursor-pointer hover:border-[#4f46e5] hover:-translate-y-1 transition-all"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                      SAVED WISHLIST & CART
                    </div>
                    <div className="text-[28px] font-extrabold text-[#141233] mt-1">
                      {wishlistCount} / {cartCount}
                    </div>
                    <div className="text-[12px] text-[#666666] mt-1">
                      Price-drop alerts active
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("tickets")}
                    className="p-5 rounded-[20px] bg-white border border-[#e6e8f0] cursor-pointer hover:border-[#4f46e5] hover:-translate-y-1 transition-all"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                      SUPPORT CONCIERGE
                    </div>
                    <div className="text-[28px] font-extrabold text-[#141233] mt-1">
                      {tickets.length} Ticket
                    </div>
                    <div className="text-[12px] text-[#10b981] font-semibold mt-1">
                      ● Engineer Replied
                    </div>
                  </div>
                </div>

                {/* Live Active Shipment Spotlight */}
                <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#f0f0f0]">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                        LIVE SHIPMENT TELEMETRY
                      </span>
                      <h3 className="text-[19px] font-extrabold text-[#141233]">
                        Order #{ordersList[0].orderId} — {ordersList[0].status}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setInvoiceOrder(ordersList[0])}
                        className="px-4 py-2 rounded-full border border-[#dcdce5] hover:border-[#4f46e5] text-[12px] font-bold text-[#141233] cursor-pointer"
                      >
                        📄 Tax Invoice
                      </button>
                      <Link
                        href={`/track-order?order=${ordersList[0].orderId}`}
                        className="px-4 py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider"
                      >
                        Live GPS Map →
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "Order Confirmed", done: true },
                      { label: "QA & Packed", done: true },
                      { label: "In Transit (Air Hub)", done: true },
                      { label: "Out for Delivery", done: false },
                    ].map((st, idx) => (
                      <div
                        key={st.label}
                        className={`p-3 rounded-[14px] border text-[12.5px] font-bold flex items-center gap-2 ${
                          st.done
                            ? "border-[#10b981]/40 bg-[#ecfdf5]/60 text-[#065f46]"
                            : "border-[#e6e8f0] bg-[#fafbfe] text-[#777777]"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full text-[11px] font-extrabold flex items-center justify-center shrink-0 ${
                            st.done ? "bg-[#10b981] text-white" : "bg-[#e2e4ec] text-[#666666]"
                          }`}
                        >
                          {st.done ? "✓" : idx + 1}
                        </span>
                        <span>{st.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f4f5f9] text-[13px] text-[#555555]">
                    <span>
                      Carrier: <strong className="text-[#141233]">{ordersList[0].carrier}</strong> ({ordersList[0].trackingNumber})
                    </span>
                    <span className="text-[#10b981] font-bold">
                      Estimated Arrival: {ordersList[0].estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Personalized Recommendations for Customer */}
                <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                        CURATED FOR YOUR INTERESTS ({customer.interests.slice(0, 3).join(" • ")})
                      </span>
                      <h3 className="text-[19px] font-extrabold text-[#141233]">
                        Recommended Flagship Upgrades
                      </h3>
                    </div>
                    <Link
                      href="/shop"
                      className="text-[13px] font-bold text-[#4f46e5] hover:underline"
                    >
                      Explore All →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="rounded-[16px] border border-[#eaeaea] hover:border-[#4f46e5] p-3.5 flex flex-col justify-between transition-all bg-[#fafbfe] hover:bg-white"
                      >
                        <div>
                          <Link
                            href={`/product/${prod.slug}`}
                            className="w-full h-[135px] rounded-[12px] bg-white p-2.5 flex items-center justify-center mb-2.5"
                          >
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-full h-full object-contain"
                            />
                          </Link>
                          <Link
                            href={`/product/${prod.slug}`}
                            className="text-[13.5px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-2"
                          >
                            {prod.title}
                          </Link>
                        </div>
                        <div className="pt-2.5 mt-2.5 border-t border-[#eceef5] flex items-center justify-between">
                          <span className="text-[15px] font-extrabold text-[#4f46e5]">
                            ${prod.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(prod, 1)}
                            className="px-3 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11px] font-bold cursor-pointer"
                          >
                            + Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* =========================================================
                TAB 2: MY ORDERS & INVOICES
               ========================================================= */}
            {activeTab === "orders" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#eaeaea]">
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#141233]">
                      My Orders, Shipments & Tax Invoices
                    </h3>
                    <p className="text-[13px] text-[#666666]">
                      Download GST/Tax invoices, track live GPS telemetry, or reorder items in 1 click.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search Order ID or product..."
                    className="h-[40px] px-4 rounded-[12px] border border-[#dcdce5] text-[13px] min-w-[230px]"
                  />
                </div>

                {/* Status Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {["All", "In Transit", "Out for Delivery", "Delivered"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setOrderFilter(st)}
                      className={`px-4 py-2 rounded-full text-[12px] font-extrabold uppercase tracking-wider cursor-pointer ${
                        orderFilter === st
                          ? "bg-[#141233] text-white"
                          : "bg-[#f4f5f9] text-[#555555] hover:bg-[#e5e7f0]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="space-y-5">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="rounded-[20px] border border-[#e6e8f0] bg-[#fafbfe] p-5 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#e6e8f0]">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[16px] font-extrabold text-[#141233]">
                            Order #{ord.orderId}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#eef2ff] text-[#4f46e5] text-[11px] font-extrabold uppercase">
                            {ord.status}
                          </span>
                          <span className="text-[12.5px] text-[#666666]">
                            Ordered: {ord.timeline[0]?.timestamp || "Nov 2026"}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-3.5 py-1.5 rounded-full bg-white border border-[#dcdce5] hover:border-[#4f46e5] text-[11.5px] font-bold text-[#141233] cursor-pointer"
                          >
                            📄 Tax Invoice
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              ord.items.forEach((it) => {
                                const found = PRODUCTS.find((p) => p.slug === it.slug) || PRODUCTS[0];
                                addToCart(found, it.qty);
                              });
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#eef2ff] hover:bg-[#4f46e5] text-[#4f46e5] hover:text-white text-[11.5px] font-bold transition-colors cursor-pointer"
                          >
                            ↻ Buy Again
                          </button>
                          <Link
                            href={`/track-order?order=${ord.orderId}`}
                            className="px-4 py-1.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-bold uppercase"
                          >
                            Track GPS →
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {ord.items.map((it) => (
                          <div
                            key={it.slug}
                            className="flex items-center justify-between gap-4 bg-white p-3 rounded-[14px] border border-[#eceef5]"
                          >
                            <div className="flex items-center gap-3.5">
                              <img
                                src={it.image}
                                alt={it.title}
                                className="w-14 h-14 rounded-[10px] object-contain bg-[#fafafa] p-1.5 border"
                              />
                              <div>
                                <Link
                                  href={`/product/${it.slug}`}
                                  className="text-[14.5px] font-extrabold text-[#141233] hover:text-[#4f46e5]"
                                >
                                  {it.title}
                                </Link>
                                <div className="text-[12px] text-[#666666]">
                                  Qty: {it.qty} • 2-Year Care+ Warranty Included
                                </div>
                              </div>
                            </div>
                            <span className="text-[15px] font-extrabold text-[#141233]">
                              ${(it.price * it.qty).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[13px]">
                        <span className="text-[#666666]">
                          Destination: <strong className="text-[#141233]">{ord.destination}</strong>
                        </span>
                        <span className="text-[16px] font-extrabold text-[#4f46e5]">
                          Total Paid: ${ord.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 3: WARRANTY & REGISTERED DEVICES (CARE+)
               ========================================================= */}
            {activeTab === "warranties" && (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6">
                  <h3 className="text-[22px] font-extrabold text-[#141233] mb-1">
                    2-Year Nexova Care+ Hardware Warranty Vault
                  </h3>
                  <p className="text-[13.5px] text-[#666666] mb-6">
                    All serial numbers below are covered for battery health, display pixel anomalies, and free 2-way express replacement.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {devices.map((dev) => (
                      <div
                        key={dev.id}
                        className="rounded-[18px] border border-[#e6e8f0] bg-[#fafbfe] p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[10.5px] font-extrabold uppercase">
                              ● {dev.status}
                            </span>
                            <span className="text-[11px] font-bold text-[#4f46e5]">
                              {dev.serialNumber}
                            </span>
                          </div>
                          <Link
                            href={`/product/${dev.slug}`}
                            className="w-full h-[120px] rounded-[12px] bg-white p-2.5 flex items-center justify-center mb-3 border border-[#f0f0f0]"
                          >
                            <img src={dev.image} alt={dev.productTitle} className="w-full h-full object-contain" />
                          </Link>
                          <Link
                            href={`/product/${dev.slug}`}
                            className="text-[14px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-2"
                          >
                            {dev.productTitle}
                          </Link>
                          <div className="text-[12px] text-[#666666] mt-2 space-y-0.5">
                            <div>Purchased: {dev.purchaseDate}</div>
                            <div>Covered Until: <strong className="text-[#141233]">{dev.expiryDate}</strong></div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("tickets");
                            setNewTicketSubject(`Care+ Warranty Claim — ${dev.serialNumber}`);
                            showToast(`Pre-filled warranty claim for ${dev.serialNumber}`);
                          }}
                          className="mt-4 w-full py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          File Care+ Claim →
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Register New Device Serial Form */}
                  <form
                    onSubmit={handleRegisterDevice}
                    className="p-5 rounded-[18px] bg-[#eef2ff]/50 border border-[#4f46e5]/25 space-y-4"
                  >
                    <h4 className="text-[16px] font-extrabold text-[#141233]">
                      + Register a New Device Serial Number
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <select
                        value={newDeviceModel}
                        onChange={(e) => setNewDeviceModel(e.target.value)}
                        aria-label="Select Product Model"
                        className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px] font-semibold"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        required
                        value={newDeviceSerial}
                        onChange={(e) => setNewDeviceSerial(e.target.value)}
                        placeholder="Enter Serial Number (e.g. SN-NX2026-991)"
                        className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                      />
                      <button
                        type="submit"
                        className="btn-shine h-[44px] rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
                      >
                        Activate 2-Year Warranty
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 5: SAVED WISHLIST
               ========================================================= */}
            {activeTab === "wishlist" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#141233]">
                      My Saved Wishlist ({wishlistedProducts.length})
                    </h3>
                    <p className="text-[13px] text-[#666666]">
                      Automatic price-drop notifications are enabled for all items in your wishlist.
                    </p>
                  </div>
                  {wishlistedProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => wishlistedProducts.forEach((p) => addToCart(p, 1))}
                      className="btn-shine px-5 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      + Move All to Cart
                    </button>
                  )}
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="p-10 text-center rounded-[18px] bg-[#fafbfe] border border-[#eaeaea]">
                    <p className="text-[15px] font-bold text-[#141233] mb-3">
                      Your wishlist is currently empty.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#4f46e5] text-white text-[12px] font-bold uppercase"
                    >
                      Explore Catalog →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlistedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="rounded-[18px] border border-[#e6e8f0] p-4 flex flex-col justify-between bg-[#fafbfe]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold">
                              {prod.discount || "SAVED"}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleWishlist(prod.slug)}
                              className="text-[12px] font-bold text-[#888888] hover:text-[#141233] cursor-pointer"
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <Link
                            href={`/product/${prod.slug}`}
                            className="w-full h-[150px] rounded-[12px] bg-white p-3 flex items-center justify-center mb-3"
                          >
                            <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
                          </Link>
                          <Link
                            href={`/product/${prod.slug}`}
                            className="text-[14.5px] font-extrabold text-[#141233] hover:text-[#4f46e5] line-clamp-2"
                          >
                            {prod.title}
                          </Link>
                        </div>
                        <div className="pt-3 mt-3 border-t border-[#e6e8f0] flex items-center justify-between">
                          <span className="text-[17px] font-extrabold text-[#4f46e5]">
                            ${prod.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(prod, 1)}
                            className="px-4 py-2 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[11.5px] font-bold uppercase cursor-pointer"
                          >
                            + Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================
                TAB 6: ADDRESS BOOK
               ========================================================= */}
            {activeTab === "addresses" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <h3 className="text-[22px] font-extrabold text-[#141233]">
                  Saved Shipping & Billing Addresses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-[20px] border-2 ${
                        addr.isDefaultShipping
                          ? "border-[#4f46e5] bg-[#eef2ff]/30"
                          : "border-[#e6e8f0] bg-[#fafbfe]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-0.5 rounded-full bg-[#141233] text-white text-[10.5px] font-extrabold uppercase">
                          {addr.label}
                        </span>
                        {addr.isDefaultShipping ? (
                          <span className="text-[11px] font-extrabold text-[#4f46e5]">
                            ✓ Default Shipping
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setAddresses(
                                addresses.map((a) => ({
                                  ...a,
                                  isDefaultShipping: a.id === addr.id,
                                }))
                              );
                              showToast(`${addr.label} set as Default Shipping`);
                            }}
                            className="text-[11.5px] font-bold text-[#4f46e5] hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                      <div className="text-[15px] font-extrabold text-[#141233] mt-2">
                        {addr.recipient}
                      </div>
                      <p className="text-[13px] text-[#555555] mt-1 leading-relaxed">
                        {addr.line1}
                        <br />
                        {addr.cityStateZip}, {addr.country}
                        <br />
                        Phone: {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add New Address Form */}
                <form
                  onSubmit={handleAddAddress}
                  className="p-5 rounded-[18px] bg-[#fafbfe] border border-[#e6e8f0] space-y-4"
                >
                  <h4 className="text-[16px] font-extrabold text-[#141233]">
                    + Add New Delivery Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={addrLabel}
                      onChange={(e) => setAddrLabel(e.target.value)}
                      placeholder="Label (e.g. Warehouse / Studio)"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                    />
                    <input
                      type="text"
                      required
                      value={addrLine1}
                      onChange={(e) => setAddrLine1(e.target.value)}
                      placeholder="Street Address & Suite"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                    />
                    <input
                      type="text"
                      required
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="City, State & Postal Code"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {/* =========================================================
                TAB 7: RETURNS, REFUNDS & RMA
               ========================================================= */}
            {activeTab === "returns" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <div>
                  <h3 className="text-[22px] font-extrabold text-[#141233]">
                    30-Day Returns, Exchanges & Instant RMA Center
                  </h3>
                  <p className="text-[13px] text-[#666666]">
                    Generate a free prepaid express return label in seconds—zero restocking fees.
                  </p>
                </div>

                <div className="space-y-3">
                  {rmaList.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-[16px] border border-[#e6e8f0] bg-[#fafbfe] flex flex-wrap items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-extrabold text-[#141233]">#{r.id}</span>
                          <span className="text-[12px] text-[#666666]">Order #{r.orderId}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[11px] font-bold">
                            {r.status}
                          </span>
                        </div>
                        <div className="text-[13.5px] font-semibold text-[#333333] mt-1">
                          {r.itemTitle} • {r.type}
                        </div>
                      </div>
                      <span className="text-[15px] font-extrabold text-[#4f46e5]">
                        ${r.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleCreateRma}
                  className="p-5 rounded-[18px] bg-[#fafbfe] border border-[#e6e8f0] space-y-4"
                >
                  <h4 className="text-[16px] font-extrabold text-[#141233]">
                    Start a New Return or Express Exchange
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={rmaOrderId}
                      onChange={(e) => setRmaOrderId(e.target.value)}
                      aria-label="Select Order"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px] font-semibold"
                    >
                      {ordersList.map((o) => (
                        <option key={o.orderId} value={o.orderId}>
                          Order #{o.orderId} (${o.totalAmount})
                        </option>
                      ))}
                    </select>
                    <select
                      value={rmaType}
                      onChange={(e) => setRmaType(e.target.value as typeof rmaType)}
                      aria-label="Resolution Type"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px] font-semibold"
                    >
                      <option value="Express Replacement">Express Replacement</option>
                      <option value="Full Refund">Full Refund to Wallet/Card</option>
                    </select>
                    <input
                      type="text"
                      value={rmaReason}
                      onChange={(e) => setRmaReason(e.target.value)}
                      placeholder="Reason for return/exchange"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shine px-6 py-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    Generate Free Prepaid Return Label →
                  </button>
                </form>
              </div>
            )}

            {/* =========================================================
                TAB 8: PRIORITY SUPPORT TICKETS
               ========================================================= */}
            {activeTab === "tickets" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <div>
                  <h3 className="text-[22px] font-extrabold text-[#141233]">
                    24/7 Priority Engineer Concierge Tickets
                  </h3>
                  <p className="text-[13px] text-[#666666]">
                    Direct line to Nexova certified acoustic, camera, and PC hardware specialists.
                  </p>
                </div>

                {tickets.map((tck) => (
                  <div
                    key={tck.id}
                    className="rounded-[18px] border border-[#e6e8f0] bg-[#fafbfe] p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e6e8f0]">
                      <div>
                        <span className="text-[12px] font-extrabold text-[#4f46e5]">
                          #{tck.id} • {tck.department}
                        </span>
                        <h4 className="text-[16px] font-extrabold text-[#141233]">
                          {tck.subject}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-[11px] font-extrabold">
                        {tck.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tck.messages.map((m, i) => (
                        <div
                          key={i}
                          className={`p-3.5 rounded-[14px] text-[13px] ${
                            m.sender === "Nexova Engineer"
                              ? "bg-[#eef2ff] border border-[#4f46e5]/25 text-[#141233]"
                              : "bg-white border border-[#eaeaea] text-[#444444]"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                            <span className="text-[#4f46e5]">{m.sender}</span>
                            <span className="text-[#888888]">{m.time}</span>
                          </div>
                          <p>{m.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply to the engineer..."
                        className="flex-1 h-[40px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!replyText.trim()) return;
                          setTickets(
                            tickets.map((x) =>
                              x.id === tck.id
                                ? {
                                    ...x,
                                    messages: [
                                      ...x.messages,
                                      { sender: "Customer", text: replyText, time: "Just Now" },
                                    ],
                                  }
                                : x
                            )
                          );
                          setReplyText("");
                          showToast("Reply sent to engineer!");
                        }}
                        className="px-5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ))}

                {/* Create New Ticket Form */}
                <form
                  onSubmit={handleCreateTicket}
                  className="p-5 rounded-[18px] bg-[#fafbfe] border border-[#e6e8f0] space-y-3.5"
                >
                  <h4 className="text-[16px] font-extrabold text-[#141233]">
                    + Open a New Priority Support Ticket
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      placeholder="Subject / Device Model"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                    />
                    <select
                      value={newTicketDept}
                      onChange={(e) => setNewTicketDept(e.target.value)}
                      aria-label="Department"
                      className="h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px] font-semibold"
                    >
                      <option>Technical & Firmware Support</option>
                      <option>2-Year Care+ Warranty Claim</option>
                      <option>Order & Express Dispatch</option>
                      <option>B2B / Bulk Quote</option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={newTicketMsg}
                    onChange={(e) => setNewTicketMsg(e.target.value)}
                    placeholder="Describe how our engineers can help you..."
                    className="w-full p-3.5 rounded-[10px] border border-[#dcdce5] bg-white text-[13px]"
                  />
                  <button
                    type="submit"
                    className="btn-shine px-6 py-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
                  >
                    Submit Priority Ticket →
                  </button>
                </form>
              </div>
            )}

            {/* =========================================================
                TAB 9: MY COUPONS
               ========================================================= */}
            {activeTab === "coupons" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <div>
                  <h3 className="text-[22px] font-extrabold text-[#141233]">
                    My Coupons & Vouchers
                  </h3>
                  <p className="text-[13px] text-[#666666]">
                    Click any voucher below to automatically apply the discount to your shopping cart.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      code: "NEXOVA30",
                      discount: "30% OFF",
                      title: "3-Item Bundle Builder Discount",
                      desc: "Mix any 3 headphones, watches, or accessories for 30% off.",
                    },
                    {
                      code: "VIP15",
                      discount: "15% OFF",
                      title: "Platinum VIP Storewide Voucher",
                      desc: "Exclusive 15% discount on laptops, smartphones, and cameras.",
                    },
                    {
                      code: "WELCOME10",
                      discount: "10% OFF",
                      title: "New Customer Welcome Coupon",
                      desc: "Instant 10% discount on any order with no minimum spend.",
                    },
                    {
                      code: "FREESHIP",
                      discount: "10% + AIR",
                      title: "Insured Express Air Delivery Pass",
                      desc: "Complimentary priority air shipping + 10% member savings.",
                    },
                  ].map((cp) => (
                    <div
                      key={cp.code}
                      className="p-5 rounded-[20px] border-2 border-dashed border-[#4f46e5]/40 bg-[#eef2ff]/30 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-1 rounded-full bg-[#4f46e5] text-white text-[11px] font-extrabold uppercase">
                            {cp.discount}
                          </span>
                          <span className="font-mono text-[15px] font-extrabold text-[#141233] bg-white px-3 py-1 rounded-[8px] border">
                            {cp.code}
                          </span>
                        </div>
                        <h4 className="text-[16px] font-extrabold text-[#141233] mt-2">
                          {cp.title}
                        </h4>
                        <p className="text-[12.5px] text-[#666666] mt-1">{cp.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => applyCoupon(cp.code)}
                        className="mt-4 w-full py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
                      >
                        Apply {cp.code} to Cart →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 10: PROFILE & SECURITY SETTINGS
               ========================================================= */}
            {activeTab === "security" && (
              <div className="rounded-[24px] border border-[#e6e8f0] bg-white p-6 space-y-6">
                <h3 className="text-[22px] font-extrabold text-[#141233]">
                  Customer Profile, Passkeys & Security Settings
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateCustomerProfile({
                      name: editName,
                      email: editEmail,
                      phone: editPhone,
                    });
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#141233] mb-1">
                      Mobile Phone
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#dcdce5] text-[13.5px]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="btn-shine px-7 py-3 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12.5px] font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>

                {/* Security Toggles */}
                <div className="pt-6 border-t border-[#f0f0f0] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[16px] border border-[#e6e8f0] bg-[#fafbfe] flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-extrabold text-[#141233]">
                        Two-Factor Authentication (2FA)
                      </div>
                      <div className="text-[12px] text-[#666666]">
                        Require 6-digit code on new browser logins
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateCustomerProfile({
                          twoFactorEnabled: !customer.twoFactorEnabled,
                        })
                      }
                      className={`px-4 py-1.5 rounded-full text-[11.5px] font-extrabold cursor-pointer ${
                        customer.twoFactorEnabled
                          ? "bg-[#10b981] text-white"
                          : "bg-[#e2e4ec] text-[#555555]"
                      }`}
                    >
                      {customer.twoFactorEnabled ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>

                  <div className="p-4 rounded-[16px] border border-[#e6e8f0] bg-[#fafbfe] flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-extrabold text-[#141233]">
                        Biometric Passkey (FaceID / TouchID)
                      </div>
                      <div className="text-[12px] text-[#666666]">
                        Instant hardware-backed sign in
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateCustomerProfile({
                          biometricEnabled: !customer.biometricEnabled,
                        })
                      }
                      className={`px-4 py-1.5 rounded-full text-[11.5px] font-extrabold cursor-pointer ${
                        customer.biometricEnabled
                          ? "bg-[#4f46e5] text-white"
                          : "bg-[#e2e4ec] text-[#555555]"
                      }`}
                    >
                      {customer.biometricEnabled ? "ACTIVE" : "INACTIVE"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Printable Tax Invoice Modal */}
      {invoiceOrder && (
        <div
          onClick={() => setInvoiceOrder(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[640px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-up"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#eaeaea]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4f46e5]">
                  OFFICIAL TAX INVOICE
                </span>
                <h3 className="text-[22px] font-extrabold text-[#141233]">
                  Nexova Electronics Inc. — #{invoiceOrder.orderId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="w-8 h-8 rounded-full bg-[#f4f5f9] font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <div className="font-bold text-[#888888] uppercase text-[11px]">Billed To</div>
                <div className="font-extrabold text-[#141233] mt-0.5">{customer.name}</div>
                <div className="text-[#555555]">{invoiceOrder.destination}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#888888] uppercase text-[11px]">Invoice Details</div>
                <div className="font-extrabold text-[#141233] mt-0.5">
                  Date: {invoiceOrder.timeline[0]?.timestamp || "Nov 2026"}
                </div>
                <div className="text-[#10b981] font-bold">Status: Paid in Full</div>
              </div>
            </div>

            <div className="border-y border-[#eaeaea] py-3 space-y-2">
              {invoiceOrder.items.map((it) => (
                <div key={it.slug} className="flex items-center justify-between text-[13.5px]">
                  <span>
                    <strong>{it.qty}x</strong> {it.title}
                  </span>
                  <span className="font-extrabold text-[#141233]">
                    ${(it.price * it.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[17px] font-extrabold text-[#141233]">
              <span>Total Amount (Incl. Warranty & Tax)</span>
              <span className="text-[#4f46e5]">${invoiceOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-6 py-2.5 rounded-full bg-[#141233] hover:bg-[#4f46e5] text-white text-[12px] font-bold uppercase tracking-wider cursor-pointer"
              >
                🖨️ Print / Save PDF Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
