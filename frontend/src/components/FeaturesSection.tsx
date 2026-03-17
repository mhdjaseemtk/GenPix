"use client";

const features = [
  {
    id: 1,
    title: "Lightning-Fast\nImage Generation",
    description: "Type what you imagine, hit enter, and watch AI bring it to life in moments.",
  },
  {
    id: 2,
    title: "Multiple Styles &\nCustomization",
    description: "Pick a style and fine-tune details like color, lighting, and mood.",
  },
  {
    id: 3,
    title: "High-Resolution\nDownloads",
    description: "Export your creations in high-quality resolution for print, web, or social media.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-8 pb-24 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map((feat) => (
          <div
            key={feat.id}
            className="flex flex-col items-center gap-4 px-4"
          >
            <h3 className="text-[1.35rem] font-semibold text-white leading-snug whitespace-pre-line tracking-tight">
              {feat.title}
            </h3>
            <p className="text-[0.95rem] text-gray-400 leading-relaxed max-w-[260px]">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
