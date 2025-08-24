import Link from "next/link";
import AddToWishListBtn from "../buttons/AddToWishListBtn";
import { Play, Info } from "lucide-react";

export default function Card({ item }) {
  return (
    <div className="relative group w-50 h-85 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border border-purple-500/20">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400/60"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-400/60"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <Link href={`/video?id=${item._id}`} className="block h-full">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.img}`}
            alt={item.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ {item.Rating}
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 h-32 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {item.Title}
            </h3>
            <div className="text-purple-300/80 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-purple-600/30 px-2 py-0.5 rounded text-xs">
                  {item.Type}
                </span>
                <span className="text-purple-400">{item.Year}</span>
              </div>
              <p className="text-xs text-gray-400">
                {item.RuntimeMins}min • {item.Genres}
              </p>
            </div>
          </div>
        </div>

        {/* Hover overlay with description */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-purple-900/90 to-gray-900 text-white p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center">
          <h3 className="font-bold text-xl mb-3 text-purple-300">
            {item.Title}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-purple-300">
              <span className="bg-purple-600 px-2 py-1 rounded text-xs">
                {item.Type}
              </span>
              <span>{item.Year}</span>
              <span className="text-yellow-400">⭐ {item.Rating}</span>
            </div>
            <p className="text-purple-200">
              {item.RuntimeMins}min • {item.Genres}
            </p>
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-4 mt-3">
              {item.Description}
            </p>
          </div>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="flex flex-col gap-2">
          <Link
            href={item.URL}
            target="_blank"
            className="bg-gradient-to-r from-blue-600 to-blue-300 text-white p-2 rounded-full justify-center items-center flex hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg backdrop-blur-sm hover:scale-110"
          >
            <Info />
          </Link>
          <AddToWishListBtn productId={item._id} />
          <Link
            href={`/video?id=${item._id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full justify-center items-center flex hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg backdrop-blur-sm hover:scale-110"
          >
            <Play />
          </Link>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
