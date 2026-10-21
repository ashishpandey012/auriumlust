import React from "react";
import { FEATURED_VIDEOS, VideoItem } from "@/data/mockData";

interface FeaturedVideosProps {
  videos?: VideoItem[];
  onCardClick?: () => void;
}

export default function FeaturedVideos({
  videos = FEATURED_VIDEOS,
  onCardClick,
}: FeaturedVideosProps) {
  return (
    <section className="w-full pt-3 sm:pt-4 md:pt-8 pb-4" id="videos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Hidden on mobile to match screenshot layout, visible on desktop */}
        <div className="hidden md:block text-center">
          <h2 className="text-2xl sm:text-[26px] font-semibold text-white tracking-normal">
            Featured Videos
          </h2>
          {/* Short cyan accent underline */}
          <div className="mx-auto mt-2.5 h-[3px] w-16 rounded-full bg-[#00c0f0]" />
        </div>

        {/* Video Cards Grid */}
        <div className="mt-1 md:mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              onClick={onCardClick}
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
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-[2px] border border-white/30 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00c0f0] group-hover:border-[#00c0f0] group-hover:text-black">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 translate-x-0.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Info: Title and Metadata */}
              <div className="flex flex-col px-4 py-3 sm:p-4">
                <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug group-hover:text-[#00c0f0] transition-colors">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#9ca3af]">
                  {video.duration} | {video.views} | {video.timestamp}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
