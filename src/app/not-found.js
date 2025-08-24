"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white px-6 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-pink-500/30 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>

      {/* 404 */}
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400 drop-shadow-lg animate-bounce">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-amber-300">
        Oops! You wandered into another dimension 🌌
      </h2>

      <p className="mt-3 text-neutral-300 text-center max-w-md">
        The page you’re looking for doesn’t exist !
      </p>

      {/* Back to home button */}
      <Link
        href="/home"
        className="mt-6 px-6 py-3 rounded-xl bg-amber-400 text-black font-bold shadow-lg hover:scale-105 hover:bg-amber-300 transition-transform duration-300"
      >
        Take Me Home 🚀
      </Link>

      {/* anime footer text */}
      <p className="absolute bottom-6 text-sm text-neutral-500 italic">
        — Powered by OtakuAdda ⚡
      </p>
    </div>
  );
}
