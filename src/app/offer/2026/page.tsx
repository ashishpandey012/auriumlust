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
