import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">

        {/* Header Text */}
        <div className="text-center space-y-6 max-w-3xl z-10 relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight">
            Create Stunning <span className="font-mono tracking-widest text-gray-300">Images</span>
            <br />
            with Just a Prompt
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
            Turn your ideas into high-quality visuals in seconds,
            <br className="hidden md:block" /> no design skills needed.
          </p>

          <button className="mt-8 group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-white/20 rounded-full text-sm font-medium transition-all hover:border-green-400/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] focus:outline-none focus:ring-2 focus:ring-green-400/50">
            Generate image
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gray-300" />
          </button>
        </div>

        {/* Ambient Green Glow Behind Gallery */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />

        {/* 3D Image Carousel / Gallery */}
        <div className="w-full mt-24 relative perspective-[1200px] flex justify-center items-center h-[300px] md:h-[450px]">

          {/* Far Left Image */}
          <div className="absolute hidden md:block w-48 md:w-64 h-72 md:h-96 rounded-2xl overflow-hidden opacity-40 transition-transform duration-500 transform -translate-x-[120%] rotate-y-[35deg] scale-75 blur-[2px]">
            <Image src="/carousel-corridor.png" alt="Abstract AI" fill className="object-cover grayscale" />
          </div>

          {/* Mid Left Image */}
          <div className="absolute w-48 md:w-64 h-72 md:h-96 rounded-2xl overflow-hidden opacity-70 transition-transform duration-500 transform -translate-x-[70%] rotate-y-[25deg] scale-85 z-10 blur-[1px]">
            <Image src="/carousel-corridor.png" alt="Futuristic Portrait" fill className="object-cover" />
          </div>

          {/* Center Image (Active) */}
          <div className="absolute w-56 md:w-72 h-80 md:h-[420px] rounded-2xl overflow-hidden transition-transform duration-500 transform scale-100 z-20 shadow-[0_0_40px_rgba(74,222,128,0.2)] border border-white/10">
            {/* Center neon laser effect line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] z-30" />
            <Image src="/carousel-corridor.png" alt="Cyberpunk Subject" fill className="object-cover" />
          </div>

          {/* Mid Right Image */}
          <div className="absolute w-48 md:w-64 h-72 md:h-96 rounded-2xl overflow-hidden opacity-70 transition-transform duration-500 transform translate-x-[70%] -rotate-y-[25deg] scale-85 z-10 blur-[1px]">
            <Image src="/carousel-corridor.png" alt="Sci-fi vehicle" fill className="object-cover" />
          </div>

          {/* Far Right Image */}
          <div className="absolute hidden md:block w-48 md:w-64 h-72 md:h-96 rounded-2xl overflow-hidden opacity-40 transition-transform duration-500 transform translate-x-[120%] -rotate-y-[35deg] scale-75 blur-[2px]">
            <Image src="/carousel-corridor.png" alt="Neon Subject" fill className="object-cover" />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* Feature 1 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Lightning-Fast<br />Image Generation
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Type what you imagine, hit enter, and watch AI bring it to life in moments.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Multiple Styles &<br />Customization
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pick a style and fine-tune details like color, lighting, and mood.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-semibold text-white">
              High-Resolution<br />Downloads
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Export your creations in high-quality resolution for print, web, or social media.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
