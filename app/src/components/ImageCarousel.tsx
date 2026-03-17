"use client";

import Image from "next/image";

const cards = [
  {
    id: 1,
    src: "/carousel-helmet.png",
    alt: "AI Art: Futuristic helmet portrait",
    style: {
      width: 140, height: 280,
      transform: "translateX(80px) rotateY(35deg) translateZ(-120px) translateY(30px)",
      opacity: 0.55, filter: "grayscale(0.6)", zIndex: 1,
    },
  },
  {
    id: 2,
    src: "/carousel-corridor.png",
    alt: "AI Art: Futuristic corridor figure",
    style: {
      width: 175, height: 340,
      transform: "translateX(40px) rotateY(20deg) translateZ(-60px) translateY(10px)",
      opacity: 0.7, filter: "grayscale(0.3)", zIndex: 2,
    },
  },
  {
    id: 3,
    src: "/carousel-neon.png",
    alt: "AI Art: Neon figure",
    style: {
      width: 195, height: 380,
      transform: "translateX(10px) rotateY(8deg) translateZ(-20px) translateY(4px)",
      opacity: 0.85, zIndex: 3,
    },
  },
  {
    id: 4,
    src: "/carousel-motorcycle.png",
    alt: "AI Art: Futuristic motorcycle",
    isCenter: true,
    style: {
      width: 215, height: 415,
      transform: "translateY(0px)",
      opacity: 1, zIndex: 10,
      boxShadow: "0 0 60px rgba(130,220,40,0.5), 0 0 120px rgba(130,220,40,0.2)",
    },
  },
  {
    id: 5,
    src: "/carousel-visor.png",
    alt: "AI Art: Visor woman portrait",
    style: {
      width: 195, height: 380,
      transform: "translateX(-10px) rotateY(-8deg) translateZ(-20px) translateY(4px)",
      opacity: 0.85, zIndex: 3,
    },
  },
  {
    id: 6,
    src: "/carousel-vr.png",
    alt: "AI Art: VR headset portrait",
    style: {
      width: 175, height: 340,
      transform: "translateX(-40px) rotateY(-20deg) translateZ(-60px) translateY(10px)",
      opacity: 0.7, zIndex: 2,
    },
  },
];

export default function ImageCarousel() {
  return (
    <section id="gallery" className="relative w-full py-8 pb-16 overflow-hidden flex justify-center items-center min-h-[500px]">
      {/* Green radial glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[320px] h-[420px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(130,220,40,0.45) 0%, rgba(80,200,20,0.15) 40%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />

      {/* Track */}
      <div
        className="relative flex items-end justify-center w-full max-w-[1300px] px-8 z-10"
        style={{ perspective: "1200px", height: "440px" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative shrink-0 rounded-[18px] overflow-hidden transition-all duration-400 hover:-translate-y-2"
            style={card.style}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="220px"
              className="object-cover rounded-[18px]"
              priority={card.isCenter}
            />
            {/* Center beam */}
            {card.isCenter && (
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full z-10 animate-beam"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,200,80,0), rgba(255,180,40,0.9) 30%, rgba(200,255,50,1) 50%, rgba(255,180,40,0.9) 70%, rgba(255,200,80,0))",
                  filter: "blur(3px)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
