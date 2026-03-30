"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const STARTER_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi, I am GenPix Chat Dummy. I do not connect to ChatGPT yet, but I can fake a smooth demo conversation for your page.",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Try asking for image ideas, startup names, captions, or a product pitch. I will answer with placeholder AI-style responses.",
  },
];

const QUICK_PROMPTS = [
  "Give me a futuristic product tagline",
  "Write a short caption for an AI art post",
  "Suggest startup names for an image app",
  "Plan a landing page headline",
];

const DUMMY_REPLIES = [
  "Here is a polished dummy answer: your idea feels modern, premium, and ready for a bold launch.",
  "Mock AI response loaded. I would position this with sharper wording, stronger contrast, and a cleaner call to action.",
  "Pretend I am thinking deeply... Done. The best next step is to keep the message short, visual, and easy to scan.",
  "Demo mode says yes: this concept works best when it feels fast, playful, and a little cinematic.",
  "Sample assistant reply: I would turn that into three versions, one minimal, one dramatic, and one conversion-focused.",
];

function buildDummyReply(input: string, turn: number) {
  const normalized = input.toLowerCase();

  if (normalized.includes("name")) {
    return "Dummy AI suggestion: PixelMint, PromptBloom, NeonNest, FrameForge, and GenGlow all fit a creative product vibe.";
  }

  if (normalized.includes("caption")) {
    return 'Dummy caption: "Built from a prompt, shaped for attention, ready to post."';
  }

  if (normalized.includes("tagline") || normalized.includes("headline")) {
    return 'Dummy line: "Turn rough ideas into scroll-stopping visuals in seconds."';
  }

  if (normalized.includes("image") || normalized.includes("art")) {
    return "Placeholder creative brief: use neon lighting, cinematic framing, layered depth, and one standout color accent to make the image pop.";
  }

  return DUMMY_REPLIES[turn % DUMMY_REPLIES.length];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const nextMessageIdRef = useRef(3);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: nextMessageIdRef.current++,
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      const assistantMessage: Message = {
        id: nextMessageIdRef.current++,
        role: "assistant",
        content: buildDummyReply(trimmed, messages.length),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 900);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] px-4 pb-16 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.15),transparent_24%),linear-gradient(180deg,#0b0b0b_0%,#050505_100%)] px-6 py-8 shadow-[0_0_80px_rgba(163,230,53,0.08)] md:px-10 md:py-10">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d9f99d] to-transparent opacity-80" />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="font-pixel text-sm uppercase tracking-[0.28em] text-[#bef264]">
                Demo Chat
              </p>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-tight">
               GenPix Chat Botp
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 md:text-base">
                This page is a visual mock chat experience. It looks alive,
                responds locally, and is perfect for demos until you connect a
                real AI API.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Mode
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">
                    Local dummy replies
                  </p>
                </div>
                <div className="rounded-2xl border border-[#a3e635]/20 bg-[#a3e635]/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d9f99d]/70">
                    Best use
                  </p>
                  <p className="mt-2 text-lg font-medium text-[#f7fee7]">
                    Demo and UI testing
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/65 transition duration-200 hover:border-[#a3e635]/40 hover:bg-[#a3e635]/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#a3e635]/15 via-transparent to-white/5 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/10 bg-[#0d0d0d]/95 p-4 backdrop-blur-xl md:p-5">
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      GenPix Assistant
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      Fake AI conversation for previews
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/10 px-3 py-1 text-xs text-[#d9f99d]">
                    <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-dot" />
                    Online
                  </div>
                </div>

                <div className="mt-4 h-[460px] space-y-3 overflow-y-auto rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 md:h-[520px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${
                        message.role === "assistant"
                          ? "rounded-tl-md border border-white/10 bg-white/6 text-white/80"
                          : "ml-auto rounded-br-md bg-[#a3e635] text-black"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="max-w-[120px] rounded-3xl rounded-tl-md border border-white/10 bg-white/6 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-dot" />
                        <span
                          className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-dot"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse-dot"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="rounded-[26px] border border-white/10 bg-black/30 p-3">
                    <textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey &&
                          !isTyping
                        ) {
                          event.preventDefault();
                          sendMessage(input);
                        }
                      }}
                      rows={3}
                      placeholder="Type anything... this is a dummy chat, so even fake prompts work."
                      className="w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/25"
                    />

                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/8 pt-3">
                      <p className="text-xs text-white/35">
                        Frontend-only demo chat. No API calls.
                      </p>
                      <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-black transition duration-200 hover:bg-[#bef264] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Send
                        <span aria-hidden="true">→</span>
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
