"use client";

import { useRef, useState } from "react";

const SIZE_PRESETS = [
  { label: "Square (1:1)", w: 1024, h: 1024 },
  { label: "Landscape (16:9)", w: 1344, h: 768 },
  { label: "Portrait (9:16)", w: 768, h: 1344 },
  { label: "Wide (21:9)", w: 1536, h: 640 },
];

const SUGGESTIONS = [
  "A cyberpunk samurai in a neon-lit Tokyo alley",
  "Underwater crystal palace with bioluminescent creatures",
  "Steampunk airship flying through aurora borealis",
  "Minimalist Japanese garden at golden hour",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type GeneratedImage = {
  url: string;
  prompt: string;
  size: string;
};

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevBlobRef = useRef<string | null>(null);

  const selectedSize = SIZE_PRESETS[sizeIdx];

  function startProgress() {
    setProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      // Slowly fill to 90%, final 10% completes when image arrives
      p += Math.random() * 3;
      if (p > 90) p = 90;
      setProgress(Math.round(p));
    }, 600);
  }

  function stopProgress(success: boolean) {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(success ? 100 : 0);
  }

  async function handleGenerate() {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;

    // Revoke previous blob URL to free memory
    if (prevBlobRef.current) {
      URL.revokeObjectURL(prevBlobRef.current);
      prevBlobRef.current = null;
    }

    setLoading(true);
    setError(null);
    setImage(null);
    startProgress();

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmed,
          width: selectedSize.w,
          height: selectedSize.h,
        }),
      });

      if (!res.ok) {
        // Try to parse JSON error, fall back to status text
        let errMsg = `Error ${res.status}: Generation failed`;
        try {
          const data = await res.json();
          if (data?.error) errMsg = data.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errMsg);
      }

      const contentType = res.headers.get("content-type") || "";
      // Guard: backend should return an image, not JSON
      if (contentType.includes("application/json")) {
        const data = await res.json();
        throw new Error(data?.error || "Unexpected response from server");
      }

      const blob = await res.blob();
      if (blob.size === 0) throw new Error("Received empty image. Please try again.");

      const blobUrl = URL.createObjectURL(blob);
      prevBlobRef.current = blobUrl;

      stopProgress(true);
      setImage({
        url: blobUrl,
        prompt: trimmed,
        size: selectedSize.label,
      });
    } catch (err) {
      stopProgress(false);
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request cancelled.");
      } else {
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!image) return;
    const a = document.createElement("a");
    a.href = image.url;
    a.download = `genpix-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleRetry() {
    setError(null);
    handleGenerate();
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4 text-white">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h1 className="animate-fade-up text-[clamp(1.6rem,3.8vw,2.6rem)] font-bold tracking-tight">
          Generate{" "}
          <span className="bg-gradient-to-r from-[#a3e635] to-[#4ade80] bg-clip-text text-transparent">
            AI Images
          </span>
        </h1>
        <p className="animate-fade-up-2 mt-2 text-sm text-white/50">
          Describe what you want to see and let AI create it instantly.
        </p>
      </div>

      {/* Card */}
      <div className="animate-fade-up-3 mx-auto max-w-3xl rounded-2xl border border-white/8 bg-[#0c0c0c] p-6 md:p-8 shadow-[0_0_80px_-20px_rgba(163,230,53,0.08)]">

        {/* Prompt */}
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

        {/* Size + Generate */}
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZE_PRESETS.map((preset, i) => (
                <button
                  key={preset.label}
                  onClick={() => setSizeIdx(i)}
                  disabled={loading}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 disabled:opacity-40 ${i === sizeIdx
                      ? "border-[#a3e635]/50 bg-[#a3e635]/10 text-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.1)]"
                      : "border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#a3e635] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
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
              <><span className="text-base">✦</span> Generate</>
            )}
          </button>
        </div>

        {/* Progress bar */}
        {loading && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-white/40 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse-dot" />
                Generating… this may take 10–30 seconds
              </span>
              <span className="text-xs text-[#a3e635] font-medium tabular-nums">{progress}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#a3e635] to-[#4ade80] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Shimmer placeholder */}
        {loading && (
          <div className="mt-4 overflow-hidden rounded-xl border border-white/8">
            <div
              className="animate-shimmer bg-gradient-to-r from-[#111] via-[#1c1c1c] to-[#111] bg-[length:200%_100%]"
              style={{
                aspectRatio: `${selectedSize.w} / ${selectedSize.h}`,
                maxHeight: "480px",
              }}
            />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-0.5">Generation failed</p>
              <p className="text-sm text-red-300/80">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
            >
              Retry
            </button>
          </div>
        )}

        {/* Result */}
        {image && !loading && (
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] animate-fade-up">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full object-contain"
              style={{ maxHeight: "600px" }}
              onError={() => setError("Image failed to display. Please try generating again.")}
            />
            <div className="flex items-center justify-between border-t border-white/8 px-4 py-3 gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs text-white/40" title={image.prompt}>
                  &ldquo;{image.prompt}&rdquo;
                </p>
                <p className="mt-0.5 text-[10px] text-white/25">{image.size}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => {
                    setImage(null);
                    setPrompt("");
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition hover:border-white/20 hover:text-white/70"
                >
                  New
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:border-[#a3e635]/40 hover:bg-[#a3e635]/10 hover:text-[#a3e635]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                  </svg>
                  Download
                </button>
              </div>
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
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              disabled={loading}
              className="rounded-full border border-white/8 bg-[#0c0c0c] px-4 py-1.5 text-xs text-white/40 transition-all duration-200 hover:border-white/15 hover:bg-[#111] hover:text-white/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
