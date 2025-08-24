"use client";
import { useEffect, useState } from "react";
import Container from "./Container";

import {
  Sword,
  Compass,
  Clapperboard,
  Drama,
  Ghost,
  Heart,
  Gamepad2,
  Music,
  Brain,
  Film,
  Book,
  Users,
  Microscope,
  History,
  Trophy,
  Atom,
  Star,
  Shield,
  Sparkles,
  Skull,
  Castle,
} from "lucide-react";

// Category -> Icon mapping
const iconsMap = {
  action: Sword,
  adventure: Compass,
  animation: Clapperboard,
  comedy: Drama,
  crime: Skull,
  drama: Book,
  family: Users,
  fantasy: Castle,
  history: History,
  horror: Ghost,
  mecha: Shield,
  music: Music,
  mystery: Brain,
  psychological: Microscope,
  romance: Heart,
  "sci-fi": Atom,
  short: Film,
  sport: Trophy,
  supernatural: Sparkles,
  thriller: Skull,
  war: Shield,
  western: Star,
};

export default function GenericCategory({ categoryName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = `OtakuAdda | ${categoryName}`;
    loadData(page);
  }, [page]);

  const loadData = async (pageNo) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/API/anime?category=${categoryName}&page=${pageNo}`
      );
      const d = await res.json();

      if (d.data.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => {
          const merged = [...prev, ...d.data];
          const unique = Array.from(
            new Map(merged.map((item) => [item._id, item])).values()
          );
          return unique;
        });
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // pick correct icon
  const Icon = iconsMap[categoryName.toLowerCase()];

  return (
    <div className="px-4">
      {/* Heading */}
      <div className="flex items-center justify-center gap-3 py-6">
        {Icon && <Icon className="w-9 h-9 text-pink-500 animate-bounce" />}
        <h1 className="text-3xl font-bold text-white tracking-wide capitalize animate-bounce delay-1000">
          {categoryName} Anime
        </h1>
      </div>

      {/* Anime Container */}
      <Container data={data} />

      {/* Loading + End Message */}
      {loading && (
        <div className="flex flex-wrap justify-center gap-6 p-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-48 h-72 bg-gradient-to-tr from-[#2c1a2e] to-[#3a2d4a] rounded-2xl shadow-lg relative overflow-hidden"
            >
              {/* Fake image */}
              <div className="h-3/4 bg-gray-700/50"></div>

              {/* Fake title */}
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-600/50 rounded"></div>
                <div className="h-3 bg-gray-600/40 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400 py-6">
          🚀 All {categoryName} anime loaded!
        </p>
      )}
    </div>
  );
}
