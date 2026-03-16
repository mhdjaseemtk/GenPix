"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

const FULL_TITLE = "Create Stunning Images\nwith Just a Prompt";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const originalText = FULL_TITLE;
    let frame = 0;
    let rafId: number;

    const scramble = () => {
      const progress = Math.min(frame / 40, 1);
      const revealed = Math.floor(progress * originalText.length);

      let output = "";
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === "\n") {
          output += "\n";
        } else if (i < revealed) {
          output += originalText[i];
        } else {
          output += Math.random() > 0.5
            ? CHARS[Math.floor(Math.random() * CHARS.length)]
            : " ";
        }
      }

      el.innerText = output;
      frame++;
      if (frame <= 60) {
        rafId = requestAnimationFrame(scramble);
      } else {
        el.innerText = originalText;
      }
    };

    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(scramble);
    }, 300);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background radial glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Image Generation
        </div>

        {/* Headline */}
        <h1 ref={titleRef} className={styles.title}>
          {FULL_TITLE}
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Turn your ideas into high-quality visuals in seconds,
          <br />
          no design skills needed.
        </p>

        {/* CTA Button */}
        <div className={styles.ctaWrapper}>
          <a href="#" className={styles.ctaButton}>
            <span>Generate image</span>
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
