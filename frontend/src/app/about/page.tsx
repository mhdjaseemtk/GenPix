export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[#a3e635]">About GenPix</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
          AI image generation built for fast-moving creative teams.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
          GenPix helps marketers, founders, and designers turn rough concepts
          into polished visuals in minutes. We focus on speed, clarity, and
          flexible style control without adding production overhead.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["Fast output", "Generate campaign-ready visuals without waiting on long production cycles."],
            ["Clear controls", "Shape the final image with prompt guidance, style direction, and clean exports."],
            ["Team-ready", "Move from concept to presentation assets with less friction across the workflow."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
              <h2 className="text-xl font-medium">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
