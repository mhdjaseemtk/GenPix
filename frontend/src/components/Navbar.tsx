"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${
        scrolled
          ? "bg-[#090909]/85 backdrop-blur-lg border-b border-white/8"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#a3e635] text-lg animate-spin-slow inline-block">✦</span>
          <span className="text-lg font-bold tracking-tight">PixelAI</span>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["Features", "Gallery", "Pricing", "Blog"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <a href="#" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors duration-200">
            Sign in
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2 bg-white text-[#090909] text-sm font-semibold rounded-full transition-all duration-200 hover:bg-[#a3e635] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(163,230,53,0.3)] group"
          >
            Get Started
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
