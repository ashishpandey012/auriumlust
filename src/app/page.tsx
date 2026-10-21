"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import FeaturedVideos from "@/components/FeaturedVideos";
import BrowseCategories from "@/components/BrowseCategories";
import Footer from "@/components/Footer";
import UnlockAccessView from "@/components/UnlockAccessView";

export default function HomePage() {
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("unlock") === "true") {
        setIsUnlockOpen(true);
      }
    }
  }, []);

  const handleOpenUnlock = () => {
    setIsUnlockOpen(true);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("unlock", "true");
      window.history.pushState(null, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseUnlock = () => {
    setIsUnlockOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("unlock");
      window.history.pushState(null, "", url.toString());
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Navigation Bar */}
      <Header
        showSearch={!isUnlockOpen}
        onHomeClick={handleCloseUnlock}
      />

      {/* Main Content Sections or Unlock Full Access View */}
      <main className="flex-1 flex flex-col">
        {isUnlockOpen ? (
          <UnlockAccessView onClose={handleCloseUnlock} />
        ) : (
          <>
            <FeaturedVideos onCardClick={handleOpenUnlock} />
            <BrowseCategories onCardClick={handleOpenUnlock} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
