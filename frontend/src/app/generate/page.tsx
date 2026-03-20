"use client";

import { useState, useRef } from "react";

const SIZE_PRESETS = [
  { label: "Square (1:1)", w: 1024, h: 1024 },
  { label: "Landscape (16:9)", w: 1344, h: 768 },
  { label: "Portrait (9:16)", w: 768, h: 1344 },
  { label: "Wide (21:9)", w: 1536, h: 640 },
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const selectedSize = SIZE_PRESETS[sizeIdx];

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const encodedPrompt = encodeURIComponent(prompt.trim());
      const seed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${selectedSize.w}&height=${selectedSize.h}&seed=${seed}&nologo=true`;

      // Pre-load the image to know when it's ready
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setImageUrl(url);
        setLoading(false);
      };
      img.onerror = () => {
        setError("Image generation failed. Please try a different prompt.");
        setLoading(false);
      };
      img.src = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `genpix-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed. Please right-click the image and save manually.");
    }
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Page header */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h1 className="animate-fade-up text-[clamp(1.6rem,3.8vw,2.6rem)] font-bold tracking-tight">
          Generate{" "}
          <span className="bg-gradient-to-r from-[#a3e635] to-[#4ade80] bg-clip-text text-transparent">
            AI Images
          </span>
        </h1>
        <p className="animate-fade-up-2 mt-2 text-sm text-gray-400">
          Describe what you want to see and let AI create it instantly.
        </p>
      </div>

      {/* Generator card */}
      <div className="animate-fade-up-3 mx-auto max-w-3xl rounded-2xl border border-white/8 bg-[#0c0c0c] p-6 md:p-8 shadow-[0_0_80px_-20px_rgba(163,230,53,0.08)]">
        {/* Prompt input */}
        <label htmlFor="prompt-input" className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
          Prompt
        </label>
        <textarea
          id="prompt-input"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="A futuristic city skyline at sunset with flying cars and neon lights..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#a3e635]/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
        />

        {/* Size + Generate row */}
        <div className="mt-4 flex flex-wrap items-end gap-4">
          {/* Size presets */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZE_PRESETS.map((preset, i) => (
                <button
                  key={preset.label}
                  onClick={() => setSizeIdx(i)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    i === sizeIdx
                      ? "border-[#a3e635]/50 bg-[#a3e635]/10 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.1)]"
                      : "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white/70"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            id="generate-btn"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#a3e635] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <span className="text-base">✦</span>
                Generate
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading shimmer */}
        {loading && (
          <div className="mt-6 overflow-hidden rounded-xl border border-white/8">
            <div
              className="animate-shimmer bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] bg-[length:200%_100%]"
              style={{
                aspectRatio: `${selectedSize.w} / ${selectedSize.h}`,
                maxHeight: "500px",
              }}
            />
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-white/40">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse-dot" />
              Generating your image… this may take 10–30 seconds
            </div>
          </div>
        )}

        {/* Generated image */}
        {imageUrl && !loading && (
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] animate-fade-up">
            <img
              ref={imgRef}
              src={imageUrl}
              alt={prompt}
              className="w-full object-contain"
              style={{ maxHeight: "600px" }}
            />
            <div className="flex items-center justify-between border-t border-white/8 px-4 py-3">
              <p className="max-w-[70%] truncate text-xs text-white/40" title={prompt}>
                &ldquo;{prompt}&rdquo;
              </p>
              <button
                id="download-btn"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:border-[#a3e635]/40 hover:bg-[#a3e635]/10 hover:text-[#a3e635]"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Prompt suggestions */}
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
          Try these prompts
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "A cyberpunk samurai in a neon-lit Tokyo alley",
            "Underwater crystal palace with bioluminescent creatures",
            "Steampunk airship flying through aurora borealis",
            "Minimalist Japanese garden at golden hour",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setPrompt(suggestion)}
              className="rounded-full border border-white/8 bg-[#0c0c0c] px-4 py-1.5 text-xs text-white/40 transition-all duration-200 hover:border-white/15 hover:bg-[#111] hover:text-white/60"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
