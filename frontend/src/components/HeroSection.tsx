"use client";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 text-center overflow-hidden flex flex-col items-center min-h-[50vh]">
      {/* Green radial background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163,230,53,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 px-4 pt-8">
        {/* Headline */}
        <h1 className="animate-fade-up-1 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.15] tracking-tight whitespace-nowrap">
          Create Stun<span className="font-pixel font-medium text-[1.05em] align-baseline">n</span>i<span className="font-pixel font-medium text-[1.05em] align-baseline">n</span><span className="font-pixel font-medium text-[1.05em] align-baseline">g</span> I<span className="font-pixel font-medium text-[1.05em] align-baseline">m</span>a<span className="font-pixel font-medium text-[1.05em] align-baseline">g</span><span className="font-pixel font-medium text-[1.05em] align-baseline">e</span><span className="font-pixel font-medium text-[1.05em] align-baseline">s</span>
          <br />
          wit<span className="font-pixel font-medium text-[1.05em] align-baseline">h</span> Jus<span className="font-pixel font-medium text-[1.05em] align-baseline">t</span> a <span className="font-pixel font-medium text-[1.05em] align-baseline">P</span>romp<span className="font-pixel font-medium text-[1.05em] align-baseline">t</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-2 text-[1.05rem] text-gray-400 leading-relaxed mt-2 mb-2">
          Turn your ideas into high-quality visuals in seconds,
          <br />
          no design skills needed.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-3">
          <a
            href="#gallery"
            className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 bg-[#0a0a0a] text-white font-medium rounded-full border border-white/10 transition-all duration-300 hover:bg-[#111] hover:border-white/20 hover:shadow-[0_0_24px_rgba(163,230,53,0.15)] hover:-translate-y-0.5 group text-sm tracking-wide"
          >
            {/* Top glowing border effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#a3e635] to-transparent shadow-[0_0_12px_rgba(163,230,53,0.9)] opacity-80" />
            
            <span>Generate image</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 text-lg font-light">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
