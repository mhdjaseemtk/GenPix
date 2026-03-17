"use client";

import { useEffect, useRef } from "react";

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

    const timer = setTimeout(() => { rafId = requestAnimationFrame(scramble); }, 300);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section className="relative pt-40 pb-16 text-center overflow-hidden flex flex-col items-center min-h-[50vh]">
      {/* Green radial background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163,230,53,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 border border-white/8 rounded-full text-xs text-gray-400 bg-white/4 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_rgba(163,230,53,0.5)] animate-pulse-dot" />
          AI-Powered Image Generation
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="animate-fade-up-1 text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.15] tracking-tight whitespace-pre-line min-h-[200px]"
        >
          {FULL_TITLE}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-2 text-base text-gray-400 leading-relaxed">
          Turn your ideas into high-quality visuals in seconds,
          <br />
          no design skills needed.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-3">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-7 py-3 bg-white/6 text-white font-medium rounded-full border border-white/15 backdrop-blur-sm transition-all duration-250 hover:bg-[rgba(163,230,53,0.12)] hover:border-[rgba(163,230,53,0.4)] hover:shadow-[0_0_24px_rgba(163,230,53,0.2)] hover:-translate-y-0.5 group text-[0.95rem]"
          >
            <span>Generate image</span>
            <span className="transition-transform duration-250 group-hover:translate-x-1 text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
