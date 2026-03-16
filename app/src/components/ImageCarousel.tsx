"use client";

import Image from "next/image";
import styles from "./ImageCarousel.module.css";

const cards = [
  {
    id: 1,
    src: "/carousel-helmet.png",
    alt: "AI Art: Futuristic helmet portrait",
    className: styles.cardFarLeft,
  },
  {
    id: 2,
    src: "/carousel-corridor.png",
    alt: "AI Art: Futuristic corridor figure",
    className: styles.cardLeft,
  },
  {
    id: 3,
    src: "/carousel-neon.png",
    alt: "AI Art: Neon figure",
    className: styles.cardCenterLeft,
  },
  {
    id: 4,
    src: "/carousel-motorcycle.png",
    alt: "AI Art: Futuristic motorcycle",
    className: styles.cardCenter,
    isCenter: true,
  },
  {
    id: 5,
    src: "/carousel-visor.png",
    alt: "AI Art: Visor woman portrait",
    className: styles.cardCenterRight,
  },
  {
    id: 6,
    src: "/carousel-vr.png",
    alt: "AI Art: VR headset portrait",
    className: styles.cardRight,
  },
];

export default function ImageCarousel() {
  return (
    <section className={styles.section} id="gallery">
      {/* Green glow behind center */}
      <div className={styles.centerGlow} aria-hidden="true" />

      <div className={styles.track}>
        {cards.map((card) => (
          <div key={card.id} className={`${styles.card} ${card.className}`}>
            <div className={styles.cardInner}>
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 150px, 220px"
                className={styles.cardImage}
                priority={card.isCenter}
              />
              {card.isCenter && (
                <div className={styles.centerBeam} aria-hidden="true" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
