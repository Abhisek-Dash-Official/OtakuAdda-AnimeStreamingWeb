"use client";
import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import WishlistCard from "../components/ui/WishlistCard";
import Loading from "../components/ui/Loading";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get wishlist from localStorage
    const getWishlist = () => {
      try {
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
          const parsedWishlist = JSON.parse(wishlist);
          setWishlistIds(parsedWishlist);
        }
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        setWishlistIds([]);
      }
      setLoading(false);
    };

    getWishlist();
  }, []);

  const removeFromWishlist = (idToRemove) => {
    const updatedWishlist = wishlistIds.filter((id) => id !== idToRemove);
    setWishlistIds(updatedWishlist);

    // Update localStorage
    try {
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  console.log(wishlistIds);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-400 text-lg">
            Your favorite anime collection ✨
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistIds.length === 0 || !wishlistIds ? (
          // Empty Wishlist State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-8 mb-6 border border-purple-500/20">
              <Heart className="w-16 h-16 text-gray-600" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mb-8 max-w-md">
              Start adding your favorite anime to your wishlist and they'll
              appear here!
            </p>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Discover Anime
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Stats */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 text-pink-400" />
                {wishlistIds.length} anime{wishlistIds.length !== 1 ? "s" : ""}{" "}
                in your wishlist
              </span>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {wishlistIds.map((id) => (
                <div key={id} className="relative group">
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(id);
                    }}
                    className="absolute top-3 left-3 z-10 bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <WishlistCard id={id} />
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            {wishlistIds.length > 3 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setWishlistIds([]);
                    localStorage.setItem("wishlist", JSON.stringify([]));
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Clear All Wishlist
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
