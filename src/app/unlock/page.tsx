"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnlockAccessView from "@/components/UnlockAccessView";

export default function StandaloneUnlockPage() {
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#111111] text-white">
      {/* Navigation Header without search box matching screenshot */}
      <Header showSearch={false} />

      {/* Main Unlock Full Access View */}
      <main className="flex-1 flex flex-col">
        <UnlockAccessView onClose={handleClose} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
