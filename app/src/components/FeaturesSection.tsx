"use client";

import styles from "./FeaturesSection.module.css";

const features = [
  {
    id: 1,
    icon: "⚡",
    title: "Lightning-Fast\nImage Generation",
    description:
      "Type what you imagine, hit enter, and watch AI bring it to life in moments.",
  },
  {
    id: 2,
    icon: "🎨",
    title: "Multiple Styles &\nCustomization",
    description:
      "Pick a style and fine-tune details like color, lighting, and mood.",
  },
  {
    id: 3,
    icon: "⬇️",
    title: "High-Resolution\nDownloads",
    description:
      "Export your creations in high-quality resolution for print, web, or social media.",
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        {features.map((feat) => (
          <div key={feat.id} className={styles.featureCard}>
            <span className={styles.icon} aria-hidden="true">
              {feat.icon}
            </span>
            <h3 className={styles.featureTitle}>{feat.title}</h3>
            <p className={styles.featureDesc}>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
