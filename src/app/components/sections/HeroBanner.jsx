"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const OtakuHeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      desktop: "/assets/hero-banner-slider/moonlit-girl-cityscape.jpg",
      mobile: "/assets/hero-banner-slider/moonlit-girl-cityscape-mobile.jpg",
      title: "Moonlit Solitude",
      description:
        "Experience the serene beauty of anime cityscapes under the golden moon. Journey through stories of solitude and self-discovery.",
      category: "Slice of Life",
      trailerUrl: "https://youtu.be/lTYvjOAooRY",
    },
    {
      id: 2,
      desktop: "/assets/hero-banner-slider/demon-slayer-red-flames.jpg",
      mobile: "/assets/hero-banner-slider/demon-slayer-red-flames-mobile.jpg",
      title: "Flames of Determination",
      description:
        "Witness the fierce battle against ancient demons in a world painted crimson. Feel the intensity of supernatural warfare.",
      category: "Action",
      trailerUrl: "https://youtu.be/FRWgdaRWeRk",
    },
    {
      id: 3,
      desktop: "/assets/hero-banner-slider/samurai-red-demon-battle.jpg",
      mobile: "/assets/hero-banner-slider/samurai-red-demon-battle-mobile.jpg",
      title: "Crimson Blade",
      description:
        "A legendary warrior faces mythical beasts in an epic confrontation. Experience the raw power of traditional combat.",
      category: "Combact",
      trailerUrl: "https://youtu.be/CPBKhO0ON2s",
    },
    {
      id: 4,
      desktop: "/assets/hero-banner-slider/silhouette-blood-moon.jpg",
      mobile: "/assets/hero-banner-slider/silhouette-blood-moon-mobile.jpg",
      title: "Blood Moon Rising",
      description:
        "Under the ominous red moon, a lone figure stands ready for destiny. Embrace the dark fantasy that awaits.",
      category: "Dark Fantasy",
      trailerUrl: "https://youtu.be/mQwsCwPTNXc",
    },
    {
      id: 5,
      desktop: "/assets/hero-banner-slider/kakashi-rain-city.jpg",
      mobile: "/assets/hero-banner-slider/kakashi-rain-city-mobile.jpg",
      title: "Storm's Edge",
      description:
        "In the neon-lit rain, memories of the past collide with present duties. Explore the burden of those who protect from shadows.",
      category: "Ninja",
      trailerUrl: "https://youtu.be/btBSQDehvY8",
    },
    {
      id: 6,
      desktop: "/assets/hero-banner-slider/gojo-throne-golden-light.jpg",
      mobile: "/assets/hero-banner-slider/gojo-throne-golden-light-mobile.jpg",
      title: "Sovereign Power",
      description:
        "Seated in divine authority, witness the overwhelming presence of ultimate strength. Enter the realm of supernatural abilities.",
      category: "Supernatural",
      trailerUrl: "https://youtu.be/5wq-_aFVIwQ",
    },
    {
      id: 7,
      desktop: "/assets/hero-banner-slider/dragon-warrior-purple-moon.jpg",
      mobile:
        "/assets/hero-banner-slider/dragon-warrior-purple-moon-mobile.jpg",
      title: "Dragon's Covenant",
      description:
        "Face legendary beasts in an ethereal realm where myth becomes reality. Witness the bond between warrior and dragon.",
      category: "Fantasy",
      trailerUrl: "https://youtu.be/MASNtyXYZI8",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Images */}
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobile} />
              <img
                src={slide.desktop}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </picture>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="max-w-2xl text-white">
                  {/* Brand */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-4">
                      {slide.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      OtakuAdda
                    </h1>
                  </div>

                  {/* Slide Content */}
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* CTA Link */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/all-animes"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Explore Now
                    </Link>
                    <Link
                      href={`${slide.trailerUrl}`}
                      target="_blank"
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Watch Trailer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-red-600 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
        <div
          className="h-full bg-red-600 transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
        <span className="text-sm font-medium">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default OtakuHeroBanner;
