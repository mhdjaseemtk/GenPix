"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type TextMessage = {
  id: number;
  role: "assistant" | "user";
  type: "text";
  content: string;
};

type ImageMessage = {
  id: number;
  role: "assistant";
  type: "image";
  imageUrl: string;
  prompt: string;
};

type Message = TextMessage | ImageMessage;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STARTER_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    type: "text",
    content:
      "Hi! I'm GenPix Chat. Describe any image you want and I'll generate it for you instantly. ✦",
  },
  {
    id: 2,
    role: "assistant",
    type: "text",
    content:
      "Try something like: \"A cyberpunk city at night with neon lights\" or \"A peaceful Japanese garden at golden hour\".",
  },
];

const QUICK_PROMPTS = [
  "A cyberpunk samurai in neon-lit Tokyo",
  "Underwater crystal palace with bioluminescent creatures",
  "Steampunk airship through aurora borealis",
  "Minimalist Japanese garden at golden hour",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const nextIdRef = useRef(3);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isGenerating) return;

    // Add user message
    const userMsg: TextMessage = {
      id: nextIdRef.current++,
      role: "user",
      type: "text",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, width: 1024, height: 1024 }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Generation failed");
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);

      const imageMsg: ImageMessage = {
        id: nextIdRef.current++,
        role: "assistant",
        type: "image",
        imageUrl,
        prompt: trimmed,
      };
      setMessages((prev) => [...prev, imageMsg]);
    } catch (err) {
      const errorMsg: TextMessage = {
        id: nextIdRef.current++,
        role: "assistant",
        type: "text",
        content:
          err instanceof Error
            ? `⚠️ ${err.message}`
            : "⚠️ Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleDownload(imageUrl: string, prompt: string) {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `genpix-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] px-4 pb-16 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.15),transparent_24%),linear-gradient(180deg,#0b0b0b_0%,#050505_100%)] px-6 py-8 shadow-[0_0_80px_rgba(163,230,53,0.08)] md:px-10 md:py-10">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d9f99d] to-transparent opacity-80" />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left panel */}
            <div className="max-w-xl">
              <p className="font-pixel text-sm uppercase tracking-[0.28em] text-[#bef264]">
                Image Chat
              </p>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-tight">
                GenPix Chat
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 md:text-base">
                Describe any image in plain words and GenPix will generate it
                live. Every message creates a real AI image — no mocks, no
                placeholders.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#a3e635]/20 bg-[#a3e635]/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d9f99d]/70">
                    Mode
                  </p>
                  <p className="mt-2 text-lg font-medium text-[#f7fee7]">
                    Live AI generation
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Powered by
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">
                    Pollinations.ai
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={isGenerating}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/65 transition duration-200 hover:border-[#a3e635]/40 hover:bg-[#a3e635]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel — chat */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#a3e635]/15 via-transparent to-white/5 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/10 bg-[#0d0d0d]/95 p-4 backdrop-blur-xl md:p-5">
                {/* Header */}
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      GenPix Image Bot
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      Type a prompt — get a real AI image
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/10 px-3 py-1 text-xs text-[#d9f99d]">
                    <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-dot" />
                    Live
                  </div>
                </div>

                {/* Messages */}
                <div className="mt-4 h-[460px] space-y-3 overflow-y-auto rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 md:h-[520px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${message.role === "user" ? "flex justify-end" : "flex justify-start"
                        }`}
                    >
                      {message.type === "text" ? (
                        <div
                          className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${message.role === "assistant"
                              ? "rounded-tl-md border border-white/10 bg-white/6 text-white/80"
                              : "rounded-br-md bg-[#a3e635] text-black"
                            }`}
                        >
                          {message.content}
                        </div>
                      ) : (
                        <div className="max-w-[88%] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
                          <img
                            src={message.imageUrl}
                            alt={message.prompt}
                            className="w-full object-cover"
                            style={{ maxHeight: "300px" }}
                          />
                          <div className="flex items-center justify-between border-t border-white/8 px-3 py-2">
                            <p className="max-w-[70%] truncate text-xs text-white/40" title={message.prompt}>
                              &ldquo;{message.prompt}&rdquo;
                            </p>
                            <button
                              onClick={() => handleDownload(message.imageUrl, message.prompt)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white transition-all duration-200 hover:border-[#a3e635]/40 hover:text-[#a3e635]"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                              </svg>
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Generating indicator */}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="max-w-[88%] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
                        <div
                          className="animate-shimmer bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] bg-[length:200%_100%]"
                          style={{ width: "260px", height: "180px" }}
                        />
                        <div className="flex items-center gap-2 px-3 py-2 text-xs text-white/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse-dot" />
                          Generating your image…
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="rounded-[26px] border border-white/10 bg-black/30 p-3">
                    <textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey && !isGenerating) {
                          event.preventDefault();
                          sendMessage(input);
                        }
                      }}
                      rows={2}
                      placeholder="Describe an image… e.g. a dragon flying over a medieval city at dusk"
                      className="w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/25"
                    />

                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/8 pt-3">
                      <p className="text-xs text-white/35">
                        {isGenerating ? "Generating… this may take 10–30s" : "Enter to send · Shift+Enter for new line"}
                      </p>
                      <button
                        type="submit"
                        disabled={!input.trim() || isGenerating}
                        className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-black transition duration-200 hover:bg-[#bef264] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isGenerating ? (
                          <>
                            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating
                          </>
                        ) : (
                          <>Generate ✦</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
