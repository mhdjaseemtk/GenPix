"use client";

import Image from "next/image";

const cards = [
  {
    id: 1,
    src: "/carousel-vr.png",
    alt: "AI Art: VR headset portrait",
    style: {
      width: 140, height: 280,
      transform: "translateX(120px) rotateY(38deg) translateZ(-150px) translateY(35px)",
      opacity: 0.5, zIndex: 1,
    },
  },
  {
    id: 2,
    src: "/carousel-helmet.png",
    alt: "AI Art: Futuristic helmet portrait",
    style: {
      width: 175, height: 330,
      transform: "translateX(80px) rotateY(26deg) translateZ(-100px) translateY(20px)",
      opacity: 0.65, filter: "grayscale(0.6)", zIndex: 2,
    },
  },
  {
    id: 3,
    src: "/carousel-corridor.png",
    alt: "AI Art: Futuristic corridor figure",
    style: {
      width: 200, height: 380,
      transform: "translateX(40px) rotateY(14deg) translateZ(-50px) translateY(8px)",
      opacity: 0.8, filter: "grayscale(0.3)", zIndex: 3,
    },
  },
  {
    id: 4,
    src: "/carousel-neon.png",
    alt: "AI Art: Neon figure split",
    isCenter: true,
    style: {
      width: 250, height: 450,
      transform: "translateY(0px)",
      opacity: 1, zIndex: 10,
      boxShadow: "0 0 60px rgba(163,230,53,0.25), 0 0 120px rgba(163,230,53,0.1)",
    },
  },
  {
    id: 5,
    src: "/carousel-motorcycle.png",
    alt: "AI Art: Futuristic motorcycle",
    style: {
      width: 200, height: 380,
      transform: "translateX(-40px) rotateY(-14deg) translateZ(-50px) translateY(8px)",
      opacity: 0.8, zIndex: 3,
    },
  },
  {
    id: 6,
    src: "/carousel-visor.png",
    alt: "AI Art: Visor woman portrait",
    style: {
      width: 175, height: 330,
      transform: "translateX(-80px) rotateY(-26deg) translateZ(-100px) translateY(20px)",
      opacity: 0.65, zIndex: 2,
    },
  },
  {
    id: 7,
    src: "/carousel-vr.png",
    alt: "AI Art: VR headset portrait",
    style: {
      width: 140, height: 280,
      transform: "translateX(-120px) rotateY(-38deg) translateZ(-150px) translateY(35px)",
      opacity: 0.5, zIndex: 1,
    },
  },
];

export default function ImageCarousel() {
  return (
    <section id="gallery" className="relative w-full py-8 pb-16 overflow-hidden flex justify-center items-center min-h-[500px]">
      {/* Green radial glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(163,230,53,0.2) 0%, rgba(163,230,53,0.05) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Track */}
      <div
        className="relative flex items-end justify-center w-full max-w-[1300px] px-8 z-10"
        style={{ perspective: "1200px", height: "460px" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative shrink-0 rounded-[14px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{
              ...card.style,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 border border-white/10 rounded-[14px] z-20 pointer-events-none" />
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="250px"
              className="object-cover rounded-[14px]"
              priority={card.isCenter}
            />
            
            {/* Center green laser beam */}
            {card.isCenter && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[2px] h-[120%] z-30 animate-beam"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(163,230,53,0.8) 20%, rgba(163,230,53,1) 50%, rgba(163,230,53,0.8) 80%, transparent)",
                    boxShadow: "0 0 10px #a3e635, 0 0 20px #a3e635",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[16px] h-full z-20 animate-beam opacity-50"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(163,230,53,0.3) 20%, rgba(163,230,53,0.5) 50%, rgba(163,230,53,0.3) 80%, transparent)",
                    filter: "blur(4px)",
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
