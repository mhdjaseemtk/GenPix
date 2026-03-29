"use client";

import { useState } from "react";

const inquiryTypes = [
  "General Inquiry",
  "Pricing & Plans",
  "Enterprise / Team Setup",
  "Bug Report",
  "Partnership",
  "Other",
];

const contactDetails = [
  {
    icon: "✉️",
    label: "General",
    value: "hello@genpix.ai",
    sub: "We reply within 24 hours",
  },
  {
    icon: "💼",
    label: "Sales",
    value: "sales@genpix.ai",
    sub: "For teams and enterprise pricing",
  },
  {
    icon: "🕐",
    label: "Support Hours",
    value: "Mon – Fri, 9 AM – 6 PM",
    sub: "UTC+5:30 (India Standard Time)",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: inquiryTypes[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative px-6 pb-16 pt-36 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 w-[500px] h-[300px] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,230,53,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.22em] text-[#a3e635]">
            Contact
          </p>
          <h1 className="animate-fade-up-1 mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em]">
            Let&apos;s build your next visual system faster.
          </h1>
          <p className="animate-fade-up-2 mt-4 max-w-xl text-lg leading-8 text-white/50">
            Reach out for demos, custom workflows, or help picking the right
            GenPix setup for your team.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="px-6 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          <div className="rounded-[30px] border border-white/8 bg-[#0c0c0c] p-8 md:p-10">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#a3e635]/30 bg-[#a3e635]/10 text-3xl">
                  ✓
                </div>
                <h2 className="text-2xl font-bold">Message sent!</h2>
                <p className="max-w-xs text-sm text-white/50">
                  Thanks for reaching out. We&apos;ll be in touch within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      type: inquiryTypes[0],
                      message: "",
                    });
                  }}
                  className="mt-2 text-sm text-[#a3e635] underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-semibold">Send us a message</h2>

                {/* Name + Email row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Johnson"
                      className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#a3e635]/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#a3e635]/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
                    />
                  </div>
                </div>

                {/* Inquiry type */}
                <div>
                  <label
                    htmlFor="contact-type"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="contact-type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-[#a3e635]/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#111]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're working on or what you need help with..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#a3e635]/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a3e635] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#bef264] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-4">
            {contactDetails.map((d) => (
              <div
                key={d.label}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/12"
              >
                <span className="text-2xl">{d.icon}</span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                  {d.label}
                </p>
                <p className="mt-1.5 font-medium">{d.value}</p>
                <p className="mt-1 text-xs text-white/35">{d.sub}</p>
              </div>
            ))}

            {/* Quick CTA */}
            <div className="mt-2 rounded-[24px] border border-[#a3e635]/20 bg-[#a3e635]/5 p-6">
              <p className="text-sm font-semibold">Prefer to jump right in?</p>
              <p className="mt-1 text-xs text-white/45">
                No contact needed — start generating images for free.
              </p>
              <a
                href="/generate"
                className="mt-4 inline-block rounded-xl bg-[#a3e635] px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#bef264]"
              >
                Try GenPix Free →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
