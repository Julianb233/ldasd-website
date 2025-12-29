"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  {
    src: "/images/san-diego/skyline.jpg",
    alt: "San Diego skyline at sunset",
  },
  {
    src: "/images/san-diego/coronado-beach.jpg",
    alt: "Beautiful Coronado Beach, San Diego",
  },
  {
    src: "/images/hero/family-beach.jpg",
    alt: "Happy family enjoying San Diego beach",
  },
  {
    src: "/images/hero/family-sunset.jpg",
    alt: "Family watching sunset together",
  },
];

const stats = [
  { label: "Families Protected", value: "100K", suffix: "+" },
  { label: "States Covered", value: "50", suffix: "" },
  { label: "Customer Satisfaction", value: "4.9", suffix: "/5" },
  { label: "Starting Price", value: "$199", suffix: "" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
      {/* Carousel Images with Crossfade */}
      {carouselImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Light Warm Overlay - NOT dark */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-secondary/10 to-transparent" />

      {/* Glass-morphism Stats Cards */}
      <div className="absolute bottom-0 inset-x-0 p-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 rounded-xl bg-white/80 backdrop-blur-md shadow-glass border border-white/50"
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}<span className="text-lg text-secondary">{stat.suffix}</span>
              </p>
              <p className="text-xs text-foreground/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* San Diego Location Badge with Pin Icon */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md text-primary text-sm font-bold px-4 py-2 rounded-full shadow-glass border border-white/50">
        <svg
          className="w-4 h-4 text-secondary"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span>San Diego Based</span>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
