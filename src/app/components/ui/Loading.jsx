"use client";
import { useState, useEffect } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isClient, setIsClient] = useState(false);
  const [starPositions, setStarPositions] = useState([]);

  const loadingMessages = [
    "Initializing...",
    "Loading anime database...",
    "Connecting to servers...",
    "Preparing your experience...",
    "Almost ready...",
  ];

  useEffect(() => {
    // Set client flag and generate random positions after hydration
    setIsClient(true);

    // Generate consistent random positions for stars
    const positions = Array.from({ length: 50 }, (_, i) => ({
      left: (i * 37) % 100, // Pseudo-random but consistent
      top: (i * 73) % 100,
      delay: i % 3,
      duration: 2 + (i % 3),
    }));
    setStarPositions(positions);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    const textInterval = setInterval(() => {
      setLoadingText(
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
      );
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements - only render on client */}
      <div className="absolute inset-0">
        {isClient &&
          starPositions.map((star, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            >
              <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-70"></div>
            </div>
          ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-pink-500 rotate-45 animate-spin opacity-30"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-16 w-8 h-8 bg-purple-400 transform rotate-12 animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-yellow-400 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Logo/Brand name */}
        <div className="mb-8 text-center">
          <h1 className=" text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4 animate-pulse">
            OtakuAdda
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Central loading animation */}
        <div className="relative mb-12">
          {/* Outer ring */}
          <div className="w-32 h-32 border-4 border-gray-700 rounded-full relative">
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 border-r-purple-500 border-b-cyan-500 border-l-blue-500 rounded-full animate-spin"></div>

            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-pulse opacity-30"></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-bounce">🎌</div>
            </div>
          </div>

          {/* Orbiting elements - Multiple rings */}
          {/* Inner orbit - fast */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "2s" }}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
          </div>

          {/* Middle orbit - medium speed */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute top-1/4 -right-6 transform -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
            <div className="absolute top-3/4 -right-6 transform -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full opacity-80"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full opacity-80"></div>
            <div className="absolute top-3/4 -left-6 transform -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full opacity-80"></div>
            <div className="absolute top-1/4 -left-6 transform -translate-y-1/2 w-3 h-3 bg-teal-400 rounded-full opacity-80"></div>
          </div>

          {/* Outer orbit - slow */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "6s" }}
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute top-0 -right-10 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 -right-12 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 -right-10 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 right-1/3 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 left-1/3 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 -left-10 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-teal-400 to-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 -left-12 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute top-0 -left-10 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>

          {/* Extra outer orbit with diamonds */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "8s", animationDirection: "reverse" }}
          >
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 rotate-45 w-3 h-3 bg-pink-400 opacity-60"></div>
            <div className="absolute -top-12 right-1/4 transform rotate-45 w-2 h-2 bg-purple-400 opacity-60"></div>
            <div className="absolute top-1/4 -right-14 transform rotate-45 w-3 h-3 bg-cyan-400 opacity-60"></div>
            <div className="absolute top-3/4 -right-12 transform rotate-45 w-2 h-2 bg-blue-400 opacity-60"></div>
            <div className="absolute -bottom-14 right-1/4 transform rotate-45 w-3 h-3 bg-green-400 opacity-60"></div>
            <div className="absolute -bottom-12 left-1/2 transform rotate-45 w-2 h-2 bg-yellow-400 opacity-60"></div>
            <div className="absolute -bottom-14 left-1/4 transform rotate-45 w-3 h-3 bg-red-400 opacity-60"></div>
            <div className="absolute top-3/4 -left-12 transform rotate-45 w-2 h-2 bg-indigo-400 opacity-60"></div>
            <div className="absolute top-1/4 -left-14 transform rotate-45 w-3 h-3 bg-orange-400 opacity-60"></div>
            <div className="absolute -top-12 left-1/4 transform rotate-45 w-2 h-2 bg-teal-400 opacity-60"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-40 sm:w-80 mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 h-full rounded-full relative overflow-hidden transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-xl text-gray-300 animate-pulse font-medium">
            {loadingText}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Premium anime streaming experience
          </p>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-10 bg-gradient-to-t from-transparent to-purple-500 opacity-50 animate-ping"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-pink-500 opacity-50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyan-500 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-purple-500 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-blue-500 opacity-50"></div>
    </div>
  );
}
