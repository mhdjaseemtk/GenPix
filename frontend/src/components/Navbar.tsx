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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change (click)
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 py-5 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/8 bg-[#090909]/95 backdrop-blur-lg"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2" onClick={closeMenu}>
            <span className="inline-block text-lg text-[#a3e635] animate-spin-slow">✦</span>
            <span className="text-lg font-bold tracking-tight text-white">GenPix</span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Desktop CTA */}
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link
              href="/generate"
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Generate
            </Link>
            <Link
              href="/generate"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#090909] transition-all duration-200 hover:-translate-y-px hover:bg-[#a3e635] hover:shadow-[0_4px_20px_rgba(163,230,53,0.3)]"
            >
              Get Started
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 md:hidden"
          >
            <span
              className={`block h-px w-5 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-6 pb-5 pt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 border-t border-white/8 pt-3">
              <Link
                href="/generate"
                onClick={closeMenu}
                className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#090909] transition-all duration-200 hover:bg-[#a3e635]"
              >
                Get Started →
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
