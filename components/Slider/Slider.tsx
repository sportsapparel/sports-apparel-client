"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  text: string;
  imageHeight?: number;
  imageWidht?: number;
}

const Slider = ({ slides }: { slides: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full text-center">
            <div className="flex justify-center">
              <Image
                src={slide.image}
                alt={`Slide ${i}`}
                className="object-cover"
                width={slide.imageWidht || 100}
                height={slide.imageHeight || 100}
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <p className="mt-2 text-lg text-gray-700">{`"${slide.text}"`}</p>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 z-10 bg-white/50 hover:bg-white/75 rounded-full"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 z-10 bg-white/50 hover:bg-white/75 rounded-full"
        onClick={goToNextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="text-center mt-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`inline-block w-2 h-2 mx-1 rounded-full cursor-pointer ${
              i === currentIndex ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
