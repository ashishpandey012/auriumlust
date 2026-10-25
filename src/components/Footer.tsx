import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#222]  pt-10 md:pt-16 pb-8 md:pb-12 text-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-1.5">
        {/* Line 1: Copyright */}
        <p className="text-xs sm:text-[13px] text-[#9ca3af]">
          {"\u00A9"} 2026 auriumlust. All Rights Reserved.
        </p>

        {/* Line 2: Compliance & Privacy */}
        <p className="text-xs sm:text-[13px] text-[#9ca3af] flex flex-wrap items-center justify-center gap-1.5">
          <Link
            href="#compliance"
            className="hover:text-white transition-colors"
          >
            18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
          </Link>
          <span className="text-[#6b7280]">|</span>
          <Link
            href="#privacy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
