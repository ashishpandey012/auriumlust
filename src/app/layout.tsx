import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "auriumlust - Premium Video Portal",
  description:
    "Explore featured videos, trending clips, and top categories on auriumlust.",
  keywords: ["auriumlust", "videos", "featured", "categories"],
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#111111] text-zinc-100 flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
