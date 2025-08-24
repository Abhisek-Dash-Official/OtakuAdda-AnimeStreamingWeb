import Link from "next/link";
import Image from "next/image";
import { Bookmark, CircleUser, Search } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f1419 0%, #1e2a3a 50%, #0a0f16 100%)",
      }}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center  justify-center sm:justify-between">
          {/* Logo Section */}
          <Link href="/home" className="flex items-center space-x-3 group">
            <Image
              src="/favicon.png"
              alt="OtakuAdda"
              width={48}
              height={48}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                OtakuAdda
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Anime Streaming
              </p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Search Button */}
            <Link
              href="/search"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-green-400/50 hover:text-purple-400 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium block">Search</span>
            </Link>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-blue-400/50 hover:text-purple-400 transition-all duration-300 group"
            >
              <Bookmark className="w-5 h-5 group-hover:fill-current transition-all duration-300" />
              <span className="font-medium block">Wishlist</span>
            </Link>

            {/* User Button */}
            <Link
              href="/user-Profile"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-purple-400/50 hover:text-purple-400 transition-all duration-300 group"
            >
              <CircleUser className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium block">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </header>
  );
}
