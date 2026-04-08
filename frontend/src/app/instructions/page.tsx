import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Generation Instructions - GenPix",
  description:
    "Learn how to write stronger prompts in GenPix with structure, examples, and a quick checklist for better AI image results.",
};

const promptFormula = [
  {
    title: "Subject",
    detail: "What is in the image? Be specific about who or what is present.",
    example: "A futuristic female biker",
  },
  {
    title: "Style",
    detail: "Choose a visual direction or medium.",
    example: "cinematic photorealism, high detail",
  },
  {
    title: "Scene",
    detail: "Add place, mood, and lighting.",
    example: "rainy neon street at night, reflective pavement",
  },
  {
    title: "Camera and framing",
    detail: "Tell the model how to compose the shot.",
    example: "low-angle shot, 35mm lens, shallow depth of field",
  },
  {
    title: "Quality hints",
    detail: "Add final rendering constraints.",
    example: "sharp focus, clean textures, no text, no watermark",
  },
];

const readyPrompts = [
  "A golden retriever astronaut floating inside a colorful space station, playful illustration, soft lighting, centered composition, vibrant colors, no text",
  "Luxury perfume bottle on black marble, dramatic side lighting, high-end product photography, studio backdrop, ultra-detailed glass reflections, no watermark",
  "Ancient temple hidden in misty mountains at dawn, cinematic matte painting, volumetric fog, warm sunlight, epic wide shot, high detail",
  "Minimal Scandinavian living room interior, natural daylight, neutral palette, interior design photography, clean composition, 8k detail",
];

const avoidList = [
  "Using only one or two vague words like `beautiful art`.",
  "Adding conflicting directions like `minimalist` and `overly detailed` together.",
  "Cramming too many subjects into one image.",
  "Skipping style and lighting cues.",
  "Forgetting exclusions like `no text` or `no logo` when needed.",
];

const checklist = [
  "Main subject is clear and specific.",
  "Style and mood are explicitly stated.",
  "Lighting and scene are defined.",
  "Composition guidance is included.",
  "Negative constraints are added if needed.",
];

export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-8">
      <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.16),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#080808_100%)] px-7 py-10 md:px-10 md:py-12">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d9f99d] to-transparent opacity-80" />

        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-[#bef264]">
          Prompt Guide
        </p>
        <h1 className="animate-fade-up-1 mt-4 max-w-3xl text-[clamp(2rem,4.8vw,3.8rem)] font-bold leading-[1.02] tracking-tight">
          Image Generation Instructions
        </h1>
        <p className="animate-fade-up-2 mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
          Use this page as a practical template for better prompts. The clearer
          your direction, the better your image quality and consistency.
        </p>

        <div className="animate-fade-up-3 mt-8 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#bef264]"
          >
            Start Generating
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/80 transition hover:border-[#a3e635]/40 hover:text-white"
          >
            Try in Chat
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        {promptFormula.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#a3e635]">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-white/60">{item.detail}</p>
            <p className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
              {item.example}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Ready-to-use Prompt Examples</h2>
        <div className="mt-4 grid gap-3">
          {readyPrompts.map((prompt) => (
            <p
              key={prompt}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/80"
            >
              {prompt}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-6">
          <h2 className="text-lg font-semibold">Common Mistakes to Avoid</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {avoidList.map((item) => (
              <li key={item} className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-6">
          <h2 className="text-lg font-semibold">Quick Quality Checklist</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            {checklist.map((item) => (
              <li key={item} className="rounded-lg border border-[#a3e635]/20 bg-[#a3e635]/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
