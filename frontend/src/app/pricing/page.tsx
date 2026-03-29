"use client";

import type { Metadata } from "next";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "$19",
    annualPrice: "$14",
    description: "For solo creators exploring AI image generation.",
    features: [
      "250 image generations / mo",
      "Standard resolution exports",
      "Basic prompt history",
      "Community support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$49",
    annualPrice: "$39",
    description: "For growing teams shipping visuals every week.",
    features: [
      "2,000 image generations / mo",
      "High-resolution downloads",
      "Style presets & brand kits",
      "Priority support",
      "API access",
    ],
    cta: "Get Pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Studio",
    monthlyPrice: "$99",
    annualPrice: "$79",
    description: "For agencies and in-house creative operations.",
    features: [
      "Unlimited generations",
      "Priority generation queue",
      "Shared workspaces",
      "Review & approval flow",
      "Dedicated account manager",
      "Custom model fine-tuning",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-36 text-center lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[300px] opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,230,53,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.22em] text-[#a3e635]">
          Pricing
        </p>
        <h1 className="animate-fade-up-1 mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em]">
          Simple plans for every stage of your image workflow.
        </h1>
        <p className="animate-fade-up-2 mt-4 text-white/50">
          No hidden fees. Cancel anytime. Start free.
        </p>

        {/* Toggle */}
        <div className="animate-fade-up-3 mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              !annual ? "bg-white text-black" : "text-white/50 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              annual ? "bg-white text-black" : "text-white/50 hover:text-white"
            }`}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-[#a3e635] px-1.5 py-0.5 text-[10px] font-bold text-black">
              SAVE 20%
            </span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[30px] border p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 ${
                plan.highlighted
                  ? "border-[#a3e635]/40 bg-[#0f1a00] shadow-[0_0_60px_rgba(163,230,53,0.12)]"
                  : "border-white/8 bg-white/[0.03] hover:border-white/15"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#a3e635] px-4 py-1 text-xs font-bold text-black">
                  {plan.badge}
                </span>
              )}

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight">
                    {annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="mb-1.5 text-white/45">/month</span>
                </div>
                {annual && (
                  <p className="mt-1 text-xs text-[#a3e635]">Billed annually</p>
                )}
                <p className="mt-4 text-sm leading-6 text-white/55">
                  {plan.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#a3e635]/15 text-[10px] text-[#a3e635]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/generate"
                className={`mt-8 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-[#a3e635] text-black hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]"
                    : "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-white/30">
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </section>
    </main>
  );
}
