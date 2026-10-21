"use client";

import React, { useState } from "react";
import Link from "next/link";

interface UnlockAccessViewProps {
  onClose?: () => void;
}

export default function UnlockAccessView({ onClose }: UnlockAccessViewProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      // Clear form inputs
      setUsername("");
      setEmail("");
      setPassword("");

      // If already on /unlock, reload the page to refresh it in-place
      // If on another route, navigate to /unlock so the home page never flashes
      if (window.location.pathname === "/unlock") {
        window.location.reload();
      } else {
        window.location.href = "/unlock";
      }
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-14">
      <div className="relative w-full max-w-[460px] rounded-2xl bg-[#1c1c1e] p-6 sm:p-8 shadow-2xl border border-[#27272a]/60">
        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Title */}
        <h2 className="text-center text-2xl sm:text-[28px] font-semibold text-[#00c0f0] tracking-normal">
          Unlock Full Access
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-xs sm:text-sm text-[#e5e7eb] leading-relaxed">
          Get unlimited access to all our premium videos and exclusive content.
        </p>

        {/* Price Banner */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center rounded-lg bg-[#13b5ea] py-3.5 px-4 shadow-md">
          <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">
            $14.99 / Month
          </span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignUp} className="mt-5 sm:mt-6 space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs sm:text-[13px] font-medium text-white mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md bg-[#141416] border border-[#27272a] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00c0f0] focus:outline-none transition-colors"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-[13px] font-medium text-white mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-[#141416] border border-[#27272a] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00c0f0] focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-[13px] font-medium text-white mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-[#141416] border border-[#27272a] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#00c0f0] focus:outline-none transition-colors"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[#13b5ea] hover:bg-[#00c0f0] text-white font-bold py-3 text-sm sm:text-base transition-colors shadow-md mt-2 cursor-pointer"
          >
            Sign Up Now
          </button>
        </form>

        {/* Disclaimer / Compliance Links */}
        <p className="mt-4 sm:mt-5 text-center text-[11px] sm:text-xs text-[#9ca3af] leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="#terms" className="text-[#00c0f0] hover:underline font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#privacy" className="text-[#00c0f0] hover:underline font-medium">
            Privacy Policy
          </Link>
          . This is a recurring subscription. You can cancel at any time.
        </p>
      </div>
    </div>
  );
}
