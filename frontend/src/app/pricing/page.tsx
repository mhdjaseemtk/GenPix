const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For solo creators exploring AI image generation.",
    features: ["250 image generations", "Standard exports", "Basic prompt history"],
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing teams shipping visuals every week.",
    features: ["2,000 image generations", "High-resolution downloads", "Style presets and brand kits"],
  },
  {
    name: "Studio",
    price: "$99",
    description: "For agencies and in-house creative operations.",
    features: ["Unlimited concepts", "Priority generation queue", "Shared workspaces and review flow"],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[#a3e635]">Pricing</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Simple plans for every stage of your image workflow.
        </h1>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <section
              key={plan.name}
              className="rounded-[30px] border border-white/8 bg-white/[0.03] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-white/45">{plan.name}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-semibold">{plan.price}</span>
                <span className="pb-1 text-white/45">/month</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/55">{plan.description}</p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
