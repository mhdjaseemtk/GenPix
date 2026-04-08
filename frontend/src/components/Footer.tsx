"use client";

import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ],
  Resources: [
    { href: "/instructions", label: "Instructions" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#050505]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="inline-block text-lg text-[#a3e635]">✦</span>
            <span className="text-lg font-bold tracking-tight text-white">GenPix</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Build polished AI visuals from a simple prompt. Fast generation,
            flexible styles, and export-ready images for every campaign.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              {title}
            </h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-sm text-white/35 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 GenPix. All rights reserved.</p>
          <p>Designed for high-speed creative teams.</p>
        </div>
      </div>
    </footer>
  );
}
