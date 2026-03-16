"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoDot}>✦</span>
          <span className={styles.logoText}>PixelAI</span>
        </div>

        {/* Nav Links */}
        <ul className={styles.navLinks}>
          <li><a href="#features">Features</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>

        {/* CTA */}
        <div className={styles.actions}>
          <a href="#" className={styles.signIn}>Sign in</a>
          <a href="#" className={styles.ctaButton}>
            Get Started
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
