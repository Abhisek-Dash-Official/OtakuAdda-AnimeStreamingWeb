"use client";

import { toast } from "react-toastify";
import { Bookmark } from "lucide-react";

export default function AddToWishListBtn({ productId }) {
  const handleAddToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist!");
      return;
    }
    toast.warn("Already in wishlist!");
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
    >
      <Bookmark className="" />
    </button>
  );
}
