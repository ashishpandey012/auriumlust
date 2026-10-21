"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnlockAccessView from "@/components/UnlockAccessView";

export default function StandaloneUnlockPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Navigation Header without search box matching screenshot */}
      <Header showSearch={false} />

      {/* Main Unlock Full Access View */}
      <main className="flex-1 flex flex-col">
        <UnlockAccessView />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
