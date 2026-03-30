"use client";

import { useEffect, useRef, useState } from "react";

type VoiceTurn = {
  id: number;
  kind: "heard" | "reply";
  text: string;
};

const VOICE_COMMANDS = [
  {
    heard: "Create a neon product tagline for GenPix.",
    reply:
      "Dummy voice assistant reply: GenPix turns rough prompts into bold visuals in seconds.",
  },
  {
    heard: "Give me three Instagram captions for AI art.",
    reply:
      "Dummy voice assistant reply: 1. Prompt in, wow out. 2. Designed by imagination. 3. Built for the scroll stop.",
  },
  {
    heard: "Suggest startup names for a creative AI app.",
    reply:
      "Dummy voice assistant reply: PromptNest, FrameMint, PixelDrift, GlowForge, and VisionDock.",
  },
  {
    heard: "Plan a short landing page headline.",
    reply:
      "Dummy voice assistant reply: Create striking images without the slow design workflow.",
  },
];

const STATUS_COPY = {
  idle: "Waiting for a voice command",
  listening: "Listening to your voice",
  thinking: "Generating a dummy response",
} as const;

export default function VoicePage() {
  const [status, setStatus] = useState<keyof typeof STATUS_COPY>("idle");
  const [activeTranscript, setActiveTranscript] = useState(
    "Tap the microphone to simulate a voice prompt."
  );
  const [activeReply, setActiveReply] = useState(
    "Your fake assistant response will appear here."
  );
  const [turns, setTurns] = useState<VoiceTurn[]>([
    {
      id: 1,
      kind: "reply",
      text: "Voice demo ready. This page is fully dummy and frontend-only.",
    },
  ]);

  const nextIdRef = useRef(2);
  const commandIndexRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const queuedTimeouts = timeoutsRef.current;

    return () => {
      queuedTimeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  function queueTimeout(callback: () => void, delay: number) {
    const timeout = window.setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
  }

  function runVoiceDemo(command?: (typeof VOICE_COMMANDS)[number]) {
    if (status !== "idle") {
      return;
    }

    const selectedCommand =
      command ?? VOICE_COMMANDS[commandIndexRef.current % VOICE_COMMANDS.length];

    commandIndexRef.current += 1;
    setStatus("listening");
    setActiveTranscript("...");
    setActiveReply("Listening for a fake voice command...");

    queueTimeout(() => {
      setActiveTranscript(selectedCommand.heard);
      setTurns((current) => [
        ...current,
        {
          id: nextIdRef.current++,
          kind: "heard",
          text: selectedCommand.heard,
        },
      ]);
      setStatus("thinking");
      setActiveReply("Working on a dummy assistant answer...");
    }, 1100);

    queueTimeout(() => {
      setActiveReply(selectedCommand.reply);
      setTurns((current) => [
        ...current,
        {
          id: nextIdRef.current++,
          kind: "reply",
          text: selectedCommand.reply,
        },
      ]);
      setStatus("idle");
    }, 2300);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] px-4 pb-16 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(163,230,53,0.15),transparent_24%),linear-gradient(180deg,#080808_0%,#040404_100%)] px-6 py-8 shadow-[0_0_80px_rgba(56,189,248,0.08)] md:px-10 md:py-10">
          <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#7dd3fc] to-transparent opacity-80" />

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-xl">
              <p className="font-pixel text-sm uppercase tracking-[0.28em] text-[#7dd3fc]">
                Voice Demo
              </p>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-tight">
                A dummy voice assistant page for your frontend.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 md:text-base">
                This is a visual voice UI mockup. It pretends to listen, shows a
                transcript, and returns a fake assistant answer without using
                speech APIs or backend services.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Input
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">
                    Simulated voice capture
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-100/75">
                    Output
                  </p>
                  <p className="mt-2 text-lg font-medium text-sky-50">
                    Local dummy answers
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {VOICE_COMMANDS.map((command) => (
                  <button
                    key={command.heard}
                    type="button"
                    onClick={() => runVoiceDemo(command)}
                    disabled={status !== "idle"}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/65 transition duration-200 hover:border-sky-300/40 hover:bg-sky-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {command.heard}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sky-300/15 via-transparent to-[#a3e635]/10 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/10 bg-[#0d0d0d]/95 p-4 backdrop-blur-xl md:p-5">
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      GenPix Voice Assistant
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      Dummy microphone experience
                    </p>
                  </div>
                  <div className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-100">
                    {STATUS_COPY[status]}
                  </div>
                </div>

                <div className="mt-4 rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => runVoiceDemo()}
                      disabled={status !== "idle"}
                      className={`flex h-28 w-28 items-center justify-center rounded-full border text-sm font-semibold transition duration-300 ${
                        status === "idle"
                          ? "border-sky-300/30 bg-sky-300/15 text-sky-50 hover:scale-[1.03] hover:bg-sky-300/20"
                          : "border-[#a3e635]/30 bg-[#a3e635]/15 text-[#f7fee7]"
                      }`}
                    >
                      {status === "idle" ? "Tap to Speak" : "Listening"}
                    </button>

                    <div className="mt-6 flex h-12 items-end gap-2">
                      {[20, 34, 24, 44, 28, 38, 22].map((height, index) => (
                        <span
                          key={height + index}
                          className={`w-2 rounded-full transition-all duration-300 ${
                            status === "idle" ? "bg-white/15" : "bg-sky-300"
                          }`}
                          style={{
                            height: `${status === "idle" ? 12 : height}px`,
                            opacity: status === "idle" ? 0.5 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-black/25 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                        Heard Transcript
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/80">
                        {activeTranscript}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/25 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                        Assistant Reply
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/80">
                        {activeReply}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-white/8 bg-black/25 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Session Log</p>
                    <p className="text-xs text-white/35">
                      Frontend-only placeholder flow
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {turns.map((turn) => (
                      <div
                        key={turn.id}
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          turn.kind === "heard"
                            ? "border border-sky-300/15 bg-sky-300/10 text-sky-50"
                            : "border border-white/8 bg-white/5 text-white/75"
                        }`}
                      >
                        <p className="text-[11px] uppercase tracking-[0.2em] opacity-55">
                          {turn.kind === "heard" ? "You said" : "Assistant"}
                        </p>
                        <p className="mt-2">{turn.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
