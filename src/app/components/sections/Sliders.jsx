import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Info,
  Star,
  Clock,
  Calendar,
} from "lucide-react";
import AddToWishListBtn from "../buttons/AddToWishListBtn";

const CoolSlider = ({ data, title = "Featured Content" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const sliderRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= data.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? Math.max(0, data.length - itemsPerView) : prev - 1
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No content available</div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {data.map((item, index) => (
            <div
              key={item._id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - 1rem)` }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative group cursor-pointer h-[450px] rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link
                  href={`/video?id=${item._id}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">View {item.Title}</span>
                </Link>

                {/* Background Image */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.img}`}
                  alt={item.Title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Default Overlay - Always Visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1 truncate">
                      {item.Title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {item.Type} | Dub
                    </span>
                  </div>
                </div>

                {/* Hover Overlay - Shows on Hover */}
                <div
                  className={`absolute inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center items-center p-6 z-20 ${
                    hoveredItem === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {/* Rating */}
                  {item.Rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <Star
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-yellow-400 font-bold text-xl">
                        {item.Rating}
                      </span>
                      <span className="text-gray-400">
                        ({item.Votes?.toLocaleString()} votes)
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-2 text-center line-clamp-2">
                    {item.Title}
                  </h3>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                    {item.Year && (
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{item.Year}</span>
                      </div>
                    )}
                    {item.RuntimeMins && (
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{item.RuntimeMins}min</span>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {item.Genres && (
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {item.Genres.split(", ")
                        .slice(0, 3)
                        .map((genre, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-300 text-sm text-center mb-6 line-clamp-3">
                    {item.Description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center items-center">
                    {/* Play Button */}
                    <Link
                      href={`/video?id=${item._id}`}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={20} className="fill-current" />
                    </Link>

                    {/* Wishlist Button */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <AddToWishListBtn productId={item._id} />
                    </div>

                    {/* More Info Button */}
                    <Link
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(data.length / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex)
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CoolSlider;
