"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Play,
  Star,
  Clock,
  Calendar,
  ExternalLink,
  Heart,
  Share,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import SmallCard from "../components/ui/SmallCard";
import Loading from "../components/ui/Loading";
import Swal from "sweetalert2";

export default function Video() {
  const [data, setData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [productId, setProductId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setProductId(id);

    if (!id) {
      toast.error("No product ID found in URL");
      return;
    }

    fetch(`/API/productDetail?_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw toast.error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setData(data.item))
      .catch((error) =>
        toast.error(`Error fetching product: ${error.message}`)
      );

    fetch(`/API/getRecommendedData?_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw toast.error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setRecommendedData(data.data))
      .catch((error) =>
        toast.error(`Error fetching products: ${error.message}`)
      );
  }, []);

  const handleBookmark = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isBookmarked) {
      wishlist = wishlist.filter((id) => id !== productId);
      toast.success("Removed from wishlist!");
    } else {
      wishlist.push(productId);
      toast.success("Added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = async () => {
    const shareData = {
      title: data.Title,
      text: data.Description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      await navigator.clipboard.writeText(shareData.url);
    }
  };

  const handleWatch = () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser || !activeUser.email) {
      Swal.fire({
        title: "NO ACCOUNT FOUND!",
        text: "Login to continue",
        icon: "warning",
      }).then(() => (window.location.href = "/account/login"));
      return;
    }
    fetch(`/API/user-subscription?check=true&email=${activeUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.subscription_status == "active") {
          setShowVideo(true);
        } else {
          toast.error("You need an active subscription to watch this video.");
        }
      })
      .catch((error) => {
        console.error("Error checking subscription status:", error);
      });
  };

  if (!data) {
    return <Loading />;
  }

  const genres = data.Genres ? data.Genres.split(", ") : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {showVideo && (
        <>
          {/* Close button */}
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-lg"
          >
            ✕ Close
          </button>

          {/* Video player */}
          <div className="absolute inset-0 w-full h-full z-40">
            <video
              autoPlay
              src={`assets/videos/demo/v${
                Math.floor(Math.random() * 10) + 1
              }.mp4`}
              controls
              controlsList="nodownload"
              disablePictureInPicture={false}
            ></video>
          </div>
        </>
      )}
      {/* Hero Section */}
      <div className="relative h-[80vh] sm:h-[75vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.img}`}
            alt={data.Title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl md:max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center text-gray-300 text-xs md:text-sm mb-3">
                <span>Home</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2" />
                <span>Anime</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1 md:mx-2" />
                <span className="text-purple-300 truncate">{data.Title}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
                {data.Title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-5 md:mb-6 text-sm md:text-base">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <span className="font-semibold">{data.Rating}</span>
                  <span className="text-gray-300 hidden sm:inline">
                    ({data.Votes.toLocaleString()} votes)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-blue-300">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{data.RuntimeMins} min</span>
                </div>

                <div className="flex items-center gap-2 text-green-300">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{data.Year}</span>
                </div>

                <div className="bg-purple-600 px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium">
                  {data.Type}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-800/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-gray-200 text-xs md:text-sm border border-gray-600"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-2xl md:max-w-3xl">
                {data.Description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button
                  onClick={handleWatch}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 md:px-8 py-2 md:py-3 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  Watch Now
                </button>
                <button
                  onClick={handleBookmark}
                  className={` cursor-pointer px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base transition-all duration-200 transform hover:scale-105 ${
                    isBookmarked
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isBookmarked ? "fill-current" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {isBookmarked ? "Bookmarked" : "Watchlist"}
                  </span>
                </button>

                <button
                  onClick={handleLike}
                  className={`cursor-pointer px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base transition-all duration-200 transform hover:scale-105 ${
                    isLiked
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base transition-all duration-200 transform hover:scale-105  cursor-pointer"
                >
                  <Share className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 md:p-8 border border-gray-700">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-5 md:mb-6">
                About This Anime
              </h2>

              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                <div className="flex justify-between py-2 md:py-3 border-b border-gray-700">
                  <span className="text-gray-300">Title</span>
                  <span className="text-white font-medium">{data.Title}</span>
                </div>

                <div className="flex justify-between py-2 md:py-3 border-b border-gray-700">
                  <span className="text-gray-300">Type</span>
                  <span className="text-white font-medium">{data.Type}</span>
                </div>

                <div className="flex justify-between py-2 md:py-3 border-b border-gray-700">
                  <span className="text-gray-300">Release Date</span>
                  <span className="text-white font-medium">
                    {data.ReleaseDate}
                  </span>
                </div>

                <div className="flex justify-between py-2 md:py-3 border-b border-gray-700">
                  <span className="text-gray-300">Runtime</span>
                  <span className="text-white font-medium">
                    {data.RuntimeMins} minutes
                  </span>
                </div>

                <div className="flex justify-between py-2 md:py-3 border-b border-gray-700">
                  <span className="text-gray-300">Rating</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium">
                      {data.Rating}/10
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-2 md:py-3">
                  <span className="text-gray-300">Votes</span>
                  <span className="text-white font-medium">
                    {data.Votes.toLocaleString()}
                  </span>
                </div>
              </div>

              {data.URL && (
                <div className="mt-6 md:mt-8">
                  <a
                    href={data.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on IMDb
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 md:space-y-6">
            {/* Poster */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700">
              <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.img}`}
                alt={data.Title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                Quick Stats
              </h3>

              <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Year</span>
                  <span className="text-white font-medium">{data.Year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Episodes</span>
                  <span className="text-white font-medium">24</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status</span>
                  <span className="text-green-400 font-medium">Completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Studio</span>
                  <span className="text-white font-medium">
                    Otaku Production
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div>
        <div className="mb-8 container mx-auto px-4 md:px-8 py-12 bg-gray-500/20 backdrop-blur-sm rounded-2xl border border-gray-700">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-extrabold text-center 
                 text-transparent bg-clip-text bg-gradient-to-r 
                 from-pink-500 via-purple-500 to-indigo-500 
                 drop-shadow-lg mb-10"
          >
            Recommended Anime
          </h2>

          {/* Cards Grid */}
          <div
            className="flex flex-wrap justify-center items-center 
                  gap-6 md:gap-8 place-items-center"
          >
            {recommendedData.map((item) => (
              <SmallCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
