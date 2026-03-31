import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — GenPix",
  description:
    "Explore a curated showcase of stunning AI-generated images created with GenPix. Browse by style, from photorealistic to painterly, pixel art, and more.",
};

const categories = [
  "All",
  "Photorealistic",
  "Painterly",
  "Pixel Art",
  "3D / Concept",
  "Abstract",
  "Sci-Fi",
];

const galleryItems = [
  {
    id: 1,
    title: "Neon City at Dusk",
    category: "Sci-Fi",
    prompt: "A bustling futuristic city at dusk with neon lights and flying vehicles",
    aspect: "landscape",
    color: "#1a1040",
    accent: "#a78bfa",
    emoji: "🌆",
  },
  {
    id: 2,
    title: "Forest Spirit",
    category: "Painterly",
    prompt: "Mystical forest spirit glowing with bioluminescent light, oil painting style",
    aspect: "portrait",
    color: "#0a1f0e",
    accent: "#4ade80",
    emoji: "🌿",
  },
  {
    id: 3,
    title: "Retro Robot Hero",
    category: "Pixel Art",
    prompt: "16-bit pixel art robot hero standing in a sunset desert, retro game style",
    aspect: "square",
    color: "#1a0f00",
    accent: "#fb923c",
    emoji: "🤖",
  },
  {
    id: 4,
    title: "Crystal Mountain",
    category: "3D / Concept",
    prompt: "Giant crystal mountain peak floating above clouds, cinematic 3D render",
    aspect: "landscape",
    color: "#0c1929",
    accent: "#38bdf8",
    emoji: "💎",
  },
  {
    id: 5,
    title: "Aurora Goddess",
    category: "Photorealistic",
    prompt: "Photorealistic portrait of a woman with aurora borealis hair in icy tundra",
    aspect: "portrait",
    color: "#050f1a",
    accent: "#818cf8",
    emoji: "🌌",
  },
  {
    id: 6,
    title: "Liquid Geometry",
    category: "Abstract",
    prompt: "Abstract swirling metallic liquid geometry with vibrant gradient colors",
    aspect: "square",
    color: "#120920",
    accent: "#e879f9",
    emoji: "🌀",
  },
  {
    id: 7,
    title: "Desert Mech",
    category: "Sci-Fi",
    prompt: "Massive war mech walker trudging through a sandstorm desert at sunset",
    aspect: "square",
    color: "#1a1000",
    accent: "#facc15",
    emoji: "⚙️",
  },
  {
    id: 8,
    title: "Cherry Blossom Dojo",
    category: "Painterly",
    prompt: "Ancient mountain dojo surrounded by cherry blossoms, ukiyo-e painting style",
    aspect: "landscape",
    color: "#1a0010",
    accent: "#fb7185",
    emoji: "🌸",
  },
  {
    id: 9,
    title: "Deep Sea Creature",
    category: "Photorealistic",
    prompt: "Photorealistic bioluminescent deep sea creature in dark ocean, macro lens",
    aspect: "portrait",
    color: "#000d1a",
    accent: "#22d3ee",
    emoji: "🦑",
  },
  {
    id: 10,
    title: "Space Station Hub",
    category: "3D / Concept",
    prompt: "Interior of a massive rotating space station with Earth visible through windows",
    aspect: "landscape",
    color: "#05050f",
    accent: "#a3e635",
    emoji: "🚀",
  },
  {
    id: 11,
    title: "Void Labyrinth",
    category: "Abstract",
    prompt: "Infinite fractal labyrinth stretching into a neon void, abstract digital art",
    aspect: "square",
    color: "#050510",
    accent: "#a78bfa",
    emoji: "🔮",
  },
  {
    id: 12,
    title: "Pixel Dragon",
    category: "Pixel Art",
    prompt: "32-bit pixel art dragon breathing fire on a medieval castle at night",
    aspect: "square",
    color: "#1a0504",
    accent: "#f87171",
    emoji: "🐉",
  },
];

const aspectClasses: Record<string, string> = {
  landscape: "col-span-2 row-span-1",
  portrait: "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

const aspectHeights: Record<string, string> = {
  landscape: "h-52",
  portrait: "h-full min-h-[26rem]",
  square: "h-52",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <section className="relative px-6 pb-16 pt-36 lg:px-8">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[300px] opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,230,53,0.45) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.22em] text-[#a3e635]">
            Gallery
          </p>
          <h1 className="animate-fade-up-1 mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em]">
            Stunning visuals crafted by{" "}
            <span className="bg-gradient-to-r from-[#a3e635] to-[#4ade80] bg-clip-text text-transparent">
              AI imagination
            </span>
            .
          </h1>
          <p className="animate-fade-up-2 mt-4 max-w-xl text-lg leading-8 text-white/50">
            A curated collection of AI-generated images from the GenPix community.
            Each image was created from a single text prompt — no design skills required.
          </p>

          {/* Stats bar */}
          <div className="animate-fade-up-2 mt-10 flex flex-wrap items-center gap-8">
            {[
              { value: "12", label: "Featured Works" },
              { value: "6", label: "Style Categories" },
              { value: "∞", label: "Possible Prompts" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#a3e635]">{s.value}</span>
                <span className="text-sm text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="sticky top-16 z-30 border-b border-white/8 bg-black/80 px-6 backdrop-blur-md lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase().replace(/[\s/]+/g, "-")}`}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? "bg-[#a3e635] text-black"
                    : "text-white/50 hover:bg-white/8 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-style gallery grid */}
      <section className="px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                className={`group relative overflow-hidden rounded-[22px] border border-white/8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(163,230,53,0.08)] hover:-translate-y-1 ${
                  i === 0 || i === 3 || i === 7 || i === 9
                    ? "md:col-span-2"
                    : ""
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Placeholder image block */}
                <div
                  className={`relative flex items-center justify-center ${
                    i === 1 || i === 4 || i === 8 ? "h-[26rem]" : "h-52"
                  }`}
                  style={{
                    background: `radial-gradient(ellipse at 60% 30%, ${item.accent}22 0%, ${item.color} 70%)`,
                  }}
                >
                  {/* Grid lines overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Center glow */}
                  <div
                    aria-hidden="true"
                    className="absolute h-32 w-32 rounded-full opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${item.accent}66 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Emoji icon */}
                  <div
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border text-4xl transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${item.accent}33`,
                      background: `${item.accent}18`,
                    }}
                  >
                    {item.emoji}
                  </div>

                  {/* Category badge */}
                  <div
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${item.accent}22`,
                      color: item.accent,
                      border: `1px solid ${item.accent}33`,
                    }}
                  >
                    {item.category}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
                    <p className="text-center text-xs leading-5 text-white/70 line-clamp-2">
                      &ldquo;{item.prompt}&rdquo;
                    </p>
                    <a
                      href="/generate"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#a3e635] px-4 py-1.5 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#bef264]"
                    >
                      ✦ Try this style
                    </a>
                  </div>
                </div>

                {/* Card footer */}
                <div className="border-t border-white/6 bg-[#0a0a0a] px-4 py-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-28 pt-4 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] px-8 py-14 text-center shadow-[0_0_80px_rgba(163,230,53,0.05)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(163,230,53,0.12) 0%, transparent 60%)",
              }}
            />
            <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-[#a3e635]">
              Create Your Own
            </p>
            <h2 className="relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your next masterpiece starts with a single prompt.
            </h2>
            <p className="relative mt-4 text-white/50">
              No design experience needed. Just describe what you imagine.
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                id="gallery-cta-generate"
                href="/generate"
                className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.35)]"
              >
                ✦ Start Generating Free
              </a>
              <a
                id="gallery-cta-about"
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                Learn how it works →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
