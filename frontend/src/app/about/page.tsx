import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — GenPix",
  description:
    "Learn how GenPix helps creative teams generate polished AI visuals in seconds. Built for speed, clarity, and flexible style control.",
};

const stats = [
  { value: "10M+", label: "Images Generated" },
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "<5s", label: "Average Gen Time" },
];

const values = [
  {
    icon: "⚡",
    title: "Speed First",
    text: "Generate campaign-ready visuals without waiting on long production cycles. From prompt to pixel in seconds.",
  },
  {
    icon: "🎯",
    title: "Clear Controls",
    text: "Shape the final image with prompt guidance, style direction, and clean exports. No guesswork.",
  },
  {
    icon: "🤝",
    title: "Team-Ready",
    text: "Move from concept to presentation assets with less friction across the entire workflow.",
  },
  {
    icon: "🔒",
    title: "Privacy Focused",
    text: "Your prompts and outputs are yours. We never use your creations to train models without consent.",
  },
  {
    icon: "🌐",
    title: "Always Improving",
    text: "New model support, style presets, and quality improvements shipped every week.",
  },
  {
    icon: "🎨",
    title: "Any Style",
    text: "Photorealistic renders, painterly illustrations, pixel art, 3D concepts — one tool, infinite aesthetics.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 pb-24 pt-36 lg:px-8">
        {/* Glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 w-[700px] h-[400px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,230,53,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.22em] text-[#a3e635]">
            About GenPix
          </p>
          <h1 className="animate-fade-up-1 mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.04em]">
            AI image generation built for{" "}
            <span className="bg-gradient-to-r from-[#a3e635] to-[#4ade80] bg-clip-text text-transparent">
              fast-moving
            </span>{" "}
            creative teams.
          </h1>
          <p className="animate-fade-up-2 mt-6 max-w-2xl text-lg leading-8 text-white/55">
            GenPix helps marketers, founders, and designers turn rough concepts
            into polished visuals in minutes. We focus on speed, clarity, and
            flexible style control — without adding production overhead.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/8 bg-white/[0.02] px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[#a3e635]">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-white/45">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values / features */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            Our Values
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            What drives every pixel we ship.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group relative rounded-[28px] border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#a3e635]/25 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(163,230,53,0.06)]"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition-all duration-300 group-hover:border-[#a3e635]/30 group-hover:bg-[#a3e635]/10">
                  {v.icon}
                </div>
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] px-8 py-14 text-center shadow-[0_0_80px_rgba(163,230,53,0.05)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(163,230,53,0.12) 0%, transparent 60%)",
              }}
            />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to create something stunning?
            </h2>
            <p className="relative mt-4 text-white/50">
              Join thousands of creators already using GenPix.
            </p>
            <a
              href="/generate"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.35)]"
            >
              ✦ Start Generating Free
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
