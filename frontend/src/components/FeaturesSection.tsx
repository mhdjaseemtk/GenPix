"use client";

import { CircularGallery } from "./CircularGallery";

export default function FeaturesSection() {
  return (
     <section id="gallery" className="relative -mt-[8vh] bg-black text-white h-[66vh] min-h-[360px]">
      <div className="h-full w-full">
        <CircularGallery items={[
          { image: '/1.jpg', text: 'Nature', id: '1' },
          { image: '/2.jpg', text: 'City', id: '2' },
          { image: '/3.jpg', text: 'People', id: '3' },
          { image: '/4.jpg', text: 'Animals', id: '4' },
          { image: '/5.jpg', text: 'Nature', id: '5' },
          { image: '/6.jpg', text: 'City', id: '6' },
          { image: '/7.jpg', text: 'People', id: '7' }
        ]}
          gap={0.12}
          visibleCount={7}
          showText={false}
          borderRadius={0.05}
        />
      </div>

    </section>
  );
}
