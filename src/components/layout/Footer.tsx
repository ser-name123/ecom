"use client";

import React, { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STORE_LOCATIONS = [
  "Los Angeles - USA",
  "New York - USA",
  "California - USA",
  "Bangkok - Thailand",
  "Paris - France",
  "London - England",
];

const ABOUT_US_LINKS = [
  "Visit Our Store",
  "Contact Us",
  "Our Story",
  "Delivery Information",
  "Account",
  "About Us",
];

const GET_HELP_LINKS = [
  "Privacy Policy",
  "Returns & Exchanges",
  "Shipping Info",
  "FAQ’s",
  "Help Center",
  "Terms & Conditions",
];

export default function Footer() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollPercent(pct);
      setShowBackTop(scrollTop > 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full bg-[#03030a] text-white relative">
      {/* BAND 1: Help Center & Online Support 24/7 */}
      <ScrollReveal animation="fade-up">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-[50px] pb-[40px]">
          {/* Top Heading */}
          <div className="text-center mb-[30px]">
            <div className="text-[14px] font-semibold uppercase text-[#f43777] leading-[20px] mb-[5px]">
              HELP CENTER
            </div>
            <h2 className="text-[28px] md:text-[30px] font-semibold text-white leading-[40px]">
              Online Suport 24/7
            </h2>
          </div>

          {/* 3 Pill Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] mb-[40px]">
            {/* Card 1: Location */}
            <div className="rounded-[40px] border border-[#ffffff1a] p-[8px] flex items-center gap-[20px] hover:border-white/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-[54px] h-[54px] rounded-full bg-[#ffffff0d] group-hover:bg-[#f43777] flex items-center justify-center text-white shrink-0 transition-colors duration-300">
                <svg className="icon-flip-hover" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 21C16.4183 19 20 15.4183 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 15.4183 7.58172 19 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-semibold text-white leading-[22px] mb-[3px]">
                  Location
                </div>
                <div className="text-[15px] font-normal text-[#ffffff8c] leading-[22px]">
                  5611 Wellington Road
                </div>
              </div>
            </div>

            {/* Card 2: Hotline */}
            <div className="rounded-[40px] border border-[#ffffff1a] p-[8px] flex items-center gap-[20px] hover:border-white/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-[54px] h-[54px] rounded-full bg-[#ffffff0d] group-hover:bg-[#f43777] flex items-center justify-center text-white shrink-0 transition-colors duration-300">
                <svg className="icon-flip-hover" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-semibold text-white leading-[22px] mb-[3px]">
                  Hotline
                </div>
                <div className="text-[15px] font-normal text-[#ffffff8c] leading-[22px]">
                  Call us Fre: +888-2345-6789
                </div>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="rounded-[40px] border border-[#ffffff1a] p-[8px] flex items-center gap-[20px] hover:border-white/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-[54px] h-[54px] rounded-full bg-[#ffffff0d] group-hover:bg-[#f43777] flex items-center justify-center text-white shrink-0 transition-colors duration-300">
                <svg className="icon-flip-hover" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5857C11.3668 13.3668 12.6332 13.3668 13.4142 12.5857L20.7071 5.29289"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[16px] font-semibold text-white leading-[22px] mb-[3px]">
                  Email
                </div>
                <div className="text-[15px] font-normal text-[#ffffff8c] leading-[22px]">
                  techoze@domain.com
                </div>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-center text-[14px] font-normal text-[#ffffff80] leading-[20px]">
            Trusted by over 1 million people worldwide. We always strive to provide the best shopping experience for our customers at Vinova.
          </p>
        </div>
      </ScrollReveal>

      {/* Full-Width Divider Line */}
      <div className="w-full border-t border-[#ffffff1a]" />

      {/* BAND 2: Main Footer Columns (Contact Info + 3 Link Columns) */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-[44px] pb-[49px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start">
          {/* Left Column (6 cols): 24/7 Support Icon + Phone + Address + Email + Socials */}
          <div className="lg:col-span-6">
            <div className="flex items-center mt-[10px] lg:mt-[30px] mb-[33px]">
              <div className="pr-[25px] mr-[19px] border-r border-[#ffffff1a] shrink-0">
                <img
                  src="/assets/support.svg"
                  alt="24/7 Support"
                  className="w-[54px] h-[54px] object-contain"
                />
              </div>
              <div>
                <div className="text-[14px] font-normal text-white leading-[20px] mb-[14px]">
                  Got questions? Call us 24/7!
                </div>
                <div className="text-[22px] sm:text-[24px] font-semibold text-[#f43777] leading-[32px]">
                  1 888.456.789 - 1 888.333.666
                </div>
              </div>
            </div>

            <div className="text-[16px] font-normal leading-[21px] text-[#aaaaaa] mb-[30px]">
              Address:{" "}
              <a href="#address" className="text-white hover:text-[#f43777] transition-colors">
                5611 Wellington Road, Suite 115, Gainesville, VA 20155
              </a>
            </div>

            <div className="text-[16px] font-normal leading-[21px] text-[#aaaaaa] mb-[25px]">
              Email:{" "}
              <a href="mailto:techoze@domain.com" className="text-white hover:text-[#f43777] transition-colors">
                techoze@domain.com
              </a>
            </div>

            {/* 5 Circular Social Buttons */}
            <div className="flex items-center gap-[10px]">
              {[
                {
                  name: "Facebook",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 13.8H16.8571L18 9H14V6.6C14 5.364 14 4.2 16.2857 4.2H18V0.168C17.6274 0.1164 16.2206 0 14.7349 0C11.632 0 9.42857 1.9884 9.42857 5.64V9H6V13.8H9.42857V24H14V13.8Z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 511 511.9" fill="currentColor">
                      <path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0" />
                      <path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0" />
                      <path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0" />
                    </svg>
                  ),
                },
                {
                  name: "X",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 1226.37 1226.37" fill="currentColor">
                      <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z" />
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 310 310" fill="currentColor">
                      <path d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861C204.394,157.263,202.325,160.684,199.021,162.41z" />
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                      <path d="m480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83-1.56-7.82-2.4-15.89-2.48-24.16h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68-8.75 2.89-18.2 4.26-28.04 3.72-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-62.34-22.41c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56c14.35 11.07 30.04 20.23 46.88 27.34 26.19 11.05 53.96 16.65 82.54 16.64v-60.61-22.49c.02.02-.22.02-.24.02z" />
                    </svg>
                  ),
                },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={`#${soc.name.toLowerCase()}`}
                  aria-label={soc.name}
                  className="w-[46px] h-[46px] rounded-full border border-white/15 hover:border-[#f43777] hover:bg-[#f43777] flex items-center justify-center text-white transition-all duration-200"
                >
                  {soc.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Right 3 Menu Columns (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-[22px] sm:gap-[30px]">
            {/* Store Location */}
            <div>
              <h3 className="text-[18px] font-semibold text-white leading-[24px] mb-[22px]">
                Store Location
              </h3>
              <ul className="space-y-[14px] text-[14px] font-normal text-[#aaaaaa] leading-[20px]">
                {STORE_LOCATIONS.map((loc) => (
                  <li key={loc}>
                    <a href="#location" className="hover:text-[#f43777] transition-colors">
                      {loc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-[18px] font-semibold text-white leading-[24px] mb-[22px]">
                About Us
              </h3>
              <ul className="space-y-[14px] text-[14px] font-normal text-[#aaaaaa] leading-[20px]">
                {ABOUT_US_LINKS.map((item) => (
                  <li key={item}>
                    <a href="#about" className="hover:text-[#f43777] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Help */}
            <div>
              <h3 className="text-[18px] font-semibold text-white leading-[24px] mb-[22px]">
                Get Help
              </h3>
              <ul className="space-y-[14px] text-[14px] font-normal text-[#aaaaaa] leading-[20px]">
                {GET_HELP_LINKS.map((item) => (
                  <li key={item}>
                    <a href="#help" className="hover:text-[#f43777] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BAND 3: Newsletter Subscription Strip (#ffffff08) */}
      <div className="w-full bg-[#ffffff08] py-[40px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center">
          <h3 className="text-[20px] md:text-[24px] font-semibold text-white leading-[32px] mb-[22px]">
            Sign up newsletter &amp; Get 30% OFF coupon today subscibers.
          </h3>

          <form
            onSubmit={handleSubscribe}
            className="max-w-[470px] mx-auto relative flex items-center h-[50px] bg-white rounded-[25px] p-[5px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 h-full bg-transparent pl-[20px] pr-3 text-[14px] font-normal text-black placeholder-[#888888] focus:outline-none rounded-l-[25px]"
            />
            <button
              type="submit"
              className="btn-shine w-[120px] h-[40px] rounded-[25px] bg-[#f43777] hover:bg-black active:scale-95 text-white text-[13px] font-semibold uppercase tracking-wide shrink-0 transition-all duration-200 cursor-pointer"
            >
              {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            </button>
          </form>
        </div>
      </div>

      {/* BAND 4: Official Full-Color Payment Icons & Copyright */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-[40px] pb-[35px] flex flex-col items-center justify-center">
        {/* 6 Official Full-Color Vector Payment Badges (Visa, Mastercard, American Express, PayPal, Diners Club, Discover) */}
        <div className="flex items-center flex-wrap justify-center gap-[10px] mb-[26px]">
          {/* Visa */}
          <svg
            className="w-[38px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            fill="none"
            aria-labelledby="pi-visa"
          >
            <title id="pi-visa">Visa</title>
            <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none" />
            <path
              d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
              fill="#142FBD"
            />
            <path
              d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z"
              fill="#1532CB"
            />
            <path
              d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z"
              fill="white"
            />
          </svg>

          {/* Mastercard */}
          <svg
            className="w-[38px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            fill="none"
            aria-labelledby="pi-master"
          >
            <title id="pi-master">Mastercard</title>
            <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none" />
            <path
              d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
              fill="#1C1C1C"
            />
            <path
              d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z"
              fill="#232323"
            />
            <path
              d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z"
              fill="#EB001B"
            />
            <path
              d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z"
              fill="#F79E1B"
            />
            <path
              d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z"
              fill="#FF5F00"
            />
          </svg>

          {/* American Express */}
          <svg
            className="w-[38px] h-[24px]"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            fill="none"
            aria-labelledby="pi-american_express"
          >
            <title id="pi-american_express">American Express</title>
            <rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none" />
            <path
              d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
              fill="#0071CE"
            />
            <path
              d="M3 0.5H35C36.3348 0.5 37.5 1.58692 37.5 3V21C37.5 22.4239 36.4239 23.5 35 23.5H3C1.66524 23.5 0.5 22.4131 0.5 21V3C0.5 1.57614 1.57614 0.5 3 0.5Z"
              stroke="black"
              strokeOpacity="0.07"
            />
            <path
              d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z"
              fill="white"
            />
          </svg>

          {/* PayPal */}
          <svg
            className="w-[38px] h-[24px]"
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="24"
            role="img"
            aria-labelledby="pi-paypal"
          >
            <title id="pi-paypal">PayPal</title>
            <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" />
            <path
              fill="#003087"
              d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
            />
            <path
              fill="#3086C8"
              d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
            />
            <path
              fill="#012169"
              d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
            />
          </svg>

          {/* Diners Club */}
          <svg
            className="w-[38px] h-[24px]"
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-diners_club"
          >
            <title id="pi-diners_club">Diners Club</title>
            <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" />
            <path
              d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
              fill="#3086C8"
            />
          </svg>

          {/* Discover */}
          <svg
            className="w-[38px] h-[24px]"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            role="img"
            aria-labelledby="pi-discover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="pi-discover">Discover</title>
            <path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" />
            <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#fff" />
            <path
              d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
              fill="#231F20"
            />
            <path d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint0_linear)" />
            <path opacity=".65" d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint1_linear)" />
            <path
              d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
              fill="#231F20"
            />
            <path
              d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
              fill="#231F20"
            />
            <path
              d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
              fill="#F48120"
            />
            <defs>
              <linearGradient id="pi-paint0_linear" x1="21.657" y1="12.275" x2="19.632" y2="9.104" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F89F20" />
                <stop offset=".25" stopColor="#F79A20" />
                <stop offset=".533" stopColor="#F68D20" />
                <stop offset=".62" stopColor="#F58720" />
                <stop offset=".723" stopColor="#F48120" />
                <stop offset="1" stopColor="#F37521" />
              </linearGradient>
              <linearGradient id="pi-paint1_linear" x1="21.338" y1="12.232" x2="18.378" y2="6.446" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F58720" />
                <stop offset=".359" stopColor="#E16F27" />
                <stop offset=".703" stopColor="#D4602C" />
                <stop offset=".982" stopColor="#D05B2E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="text-[13px] sm:text-[14px] font-normal text-[#aaaaaa] leading-[20px] text-center pb-[64px] lg:pb-0">
          Copyright © 2026 Designed by Vinova. All Rights Reserved
        </p>
      </div>

      {/* Floating Scroll-To-Top Button with Pink Liquid Scroll Progress Fill & Double Upward Chevron */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-[74px] lg:bottom-6 right-4 lg:right-6 z-40 w-[42px] h-[42px] lg:w-[44px] lg:h-[44px] rounded-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.18)] flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${
          showBackTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Rising Pink Progress Fill */}
        <span
          className="absolute bottom-0 left-0 right-0 bg-[#f43777] transition-all duration-150"
          style={{ height: `${scrollPercent}%` }}
        />
        {/* Double Upward Chevron Icon (Matches Screenshot 10 bottom-right button) */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={scrollPercent > 50 ? "#ffffff" : "#222222"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 transition-colors duration-150"
        >
          <polyline points="17 11 12 6 7 11" />
          <polyline points="17 18 12 13 7 18" />
        </svg>
      </button>
    </footer>
  );
}
