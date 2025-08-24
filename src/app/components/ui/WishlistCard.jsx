"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Star, Clock, Calendar, Users, ExternalLink, Play } from "lucide-react";

export default function WishlistCard({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/API/productDetail?_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.item);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`Error fetching product: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto bg-gray-900 rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-500/10 p-4">
        <div className="animate-pulse">
          <div className="bg-gray-800 h-72 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-sm mx-auto bg-gray-900 rounded-2xl border border-red-500/20 shadow-xl p-6 text-center">
        <p className="text-red-400">Anime not found!</p>
      </div>
    );
  }

  const genres = data.Genres ? data.Genres.split(", ").slice(0, 3) : [];

  const handleCardClick = () => {
    window.location.href = `/video?id=${data._id}`;
  };

  const handleMoreDetailsClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (data.URL) {
      window.open(data.URL, "_blank");
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="max-w-sm mx-auto h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden hover:shadow-pink-500/30 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-95 group cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <div className="h-72 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50 flex items-center justify-center relative">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.img}`}
              alt={data.Title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full flex items-center font-bold shadow-lg">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="text-sm">{data.Rating}</span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-pink-500 hover:bg-pink-400 text-white p-4 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 fill-current" />
            </div>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {data.Type}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title and Meta Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-2 line-clamp-1">
              {data.Title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                {data.Year}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-400" />
                {data.RuntimeMins}m
              </span>
              <div className="flex items-center text-yellow-400">
                <Users className="w-4 h-4 mr-1" />
                <span>{(data.Votes / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {data.Description}
          </p>

          {/* Genres */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {genres.map((genre, index) => {
                const colors = [
                  "from-pink-500 to-rose-500",
                  "from-purple-500 to-indigo-500",
                  "from-blue-500 to-cyan-500",
                ];
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gradient-to-r ${
                      colors[index % colors.length]
                    } text-white rounded-full text-xs font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                  >
                    {genre}
                  </span>
                );
              })}
              {data.Genres?.split(", ").length > 3 && (
                <span className="px-3 py-1 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 rounded-full text-xs border border-gray-600">
                  +{data.Genres.split(", ").length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Released: {data.ReleaseDate}
            </div>

            {data.URL && (
              <button
                onClick={handleMoreDetailsClick}
                className="flex items-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                More Details
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </>
  );
}
