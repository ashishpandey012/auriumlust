import React from "react";
import { CATEGORIES, CategoryItem } from "@/data/mockData";

interface BrowseCategoriesProps {
  categories?: CategoryItem[];
  onCardClick?: () => void;
}

export default function BrowseCategories({
  categories = CATEGORIES,
  onCardClick,
}: BrowseCategoriesProps) {
  return (
    <section className="w-full pt-8 md:pt-12 pb-6" id="categories">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Centered Cyan Accent Underline */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-white tracking-normal">
            Browse Categories
          </h2>
          {/* Matching short cyan accent underline */}
          <div className="mx-auto mt-2 h-[3px] w-14 sm:w-16 rounded-full bg-[#00c0f0]" />
        </div>

        {/* Categories Grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={onCardClick}
              className="group flex flex-col overflow-hidden rounded-xl bg-[#1c1c1e] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Category Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#242426]">
                <img
                  src={cat.thumbnail}
                  alt={cat.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Category Name bolded at bottom */}
              <div className="p-3 sm:p-4 bg-[#1c1c1e]">
                <h3 className="text-xs sm:text-sm md:text-[15px] font-bold text-white group-hover:text-[#00c0f0] transition-colors">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
