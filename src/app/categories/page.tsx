"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_CATEGORIES } from "@/data/mockData";

export default function CategoriesPage() {
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
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <section className="w-full pt-8 sm:pt-10 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Section Heading: Centered Browse Categories with Cyan Accent Underline */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-normal">
                Browse Categories
              </h1>
              {/* Short cyan accent underline */}
              <div className="mx-auto mt-2.5 h-[3px] w-16 rounded-full bg-[#00c0f0]" />
            </div>

            {/* 4-Column Responsive Grid with 12 Categories */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {ALL_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={handleOpenUnlock}
                  className="group flex flex-col overflow-hidden rounded-xl bg-[#1c1c1e] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                >
                  {/* Category Thumbnail Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#242426]">
                    <img
                      src={cat.thumbnail}
                      alt={cat.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Category Name bolded at bottom */}
                  <div className="p-3.5 sm:p-4 bg-[#1c1c1e]">
                    <h2 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-[#00c0f0] transition-colors">
                      {cat.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
