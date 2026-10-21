"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/mockData";

interface HeaderProps {
  showSearch?: boolean;
  onHomeClick?: () => void;
}

export default function Header({
  showSearch = true,
  onHomeClick,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleBrandOrHomeClick = (e: React.MouseEvent, href: string) => {
    if (onHomeClick && href === "/") {
      onHomeClick();
    }
  };

  return (
    <header className="w-full bg-[#222]">
      <div
        className={`mx-auto flex ${showSearch ? "flex-col md:flex-row" : "flex-row"
          } items-center justify-between max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 gap-3.5 sm:gap-4 md:gap-0`}
      >
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={(e) => handleBrandOrHomeClick(e, "/")}
            className="inline-block"
            id="brand-logo"
          >
            <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#00b8e6] sm:text-[#00c0f0]">
              aureumlust
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 md:gap-10">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleBrandOrHomeClick(e, link.href)}
                className={`text-sm sm:text-[15px] font-medium transition-colors ${isActive ? "text-white font-semibold" : "text-[#d1d5db] hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search Input Box (only shown when showSearch is true) */}
        {showSearch && (
          <div className="flex items-center justify-center w-full md:w-auto">
            <div className="relative w-64 sm:w-72 md:w-56">
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md bg-[#1a1a1a] pl-3.5 pr-9 py-1.5 text-xs sm:text-sm text-white placeholder-[#71717a] border border-[#27272a] focus:border-[#00c0f0] focus:outline-none transition-colors"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#9ca3af]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
