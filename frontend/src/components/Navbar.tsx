"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0  right-0 top-0  z-50 py-5 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#090909]/88 backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="inline-block text-lg text-[#a3e635] animate-spin-slow">✦</span>
          <span className="text-lg font-bold tracking-tight text-white">GenPix</span>
        </Link>

        <ul className="hidden list-none items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/generate"
            className="hidden text-sm text-gray-400 transition-colors duration-200 hover:text-white md:block"
          >
            Learn more
          </Link>
          <Link
            href="/generate"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#090909] transition-all duration-200 hover:-translate-y-px hover:bg-[#a3e635] hover:shadow-[0_4px_20px_rgba(163,230,53,0.3)]"
          >
            Get Started
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
