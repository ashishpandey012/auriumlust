"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnlockAccessView from "@/components/UnlockAccessView";
import { ALL_VIDEOS } from "@/data/mockData";

export default function VideosPage() {
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
      {/* Navigation Header */}
      <Header
        showSearch={!isUnlockOpen}
        onHomeClick={handleCloseUnlock}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {isUnlockOpen ? (
          <UnlockAccessView onClose={handleCloseUnlock} />
        ) : (
          <section className="w-full pt-8 sm:pt-10 pb-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Section Heading: Centered All Videos with Cyan Accent Underline */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-normal">
                  All Videos
                </h1>
                {/* Short cyan accent underline */}
                <div className="mx-auto mt-2.5 h-[3px] w-16 rounded-full bg-[#00c0f0]" />
              </div>

              {/* 4-Column Grid */}
              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                {ALL_VIDEOS.map((video) => (
                  <article
                    key={video.id}
                    onClick={handleOpenUnlock}
                    className="group flex flex-col overflow-hidden rounded-xl bg-[#1c1c1e] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                  >
                    {/* Video Thumbnail Container with Centered Play Button Overlay */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#242426]">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-[2px] border border-white/30 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00c0f0] group-hover:border-[#00c0f0] group-hover:text-black">
                          <svg
                            className="h-5 w-5 translate-x-0.5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Video Info: Title and Duration | Views */}
                    <div className="flex flex-col p-4">
                      <h2 className="text-[15px] font-semibold text-white leading-snug group-hover:text-[#00c0f0] transition-colors">
                        {video.title}
                      </h2>
                      <p className="mt-1.5 text-xs text-[#9ca3af]">
                        {video.duration} | {video.views}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
