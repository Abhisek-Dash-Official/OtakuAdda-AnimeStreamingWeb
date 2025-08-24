import Link from "next/link";
import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function SmallCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-auto w-62 h-60 p-4">
      {/* ... Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="absolute top-5 right-5 z-10 p-1 rounded-full 
             bg-white/90 dark:bg-gray-700/90 
             shadow-md hover:shadow-lg 
             text-gray-700 dark:text-gray-200 
             hover:bg-gray-100 dark:hover:bg-gray-600 
             transition-all"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      <a
        onClick={() => (window.location.href = `/video?id=${item._id}`)}
        className="block cursor-pointer"
      >
        {/* Image */}
        {!showDetails && (
          <img
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.img}`}
            alt={item.Title}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        )}

        {/* Title (always visible) */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {item.Title}
        </h2>
      </a>

      {/* Details only if showDetails === true */}
      {showDetails && (
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>{item.Description}</p>
          <p>
            <strong>Type:</strong> {item.Type}
          </p>
          <p>
            <strong>Rating:</strong> {item.Rating}
          </p>
          <p>
            <strong>Runtime:</strong> {item.RuntimeMins} mins
          </p>
          <p>
            <strong>Year:</strong> {item.Year}
          </p>
          <p>
            <strong>Genres:</strong> {item.Genres}
          </p>
          <Link
            href={item.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            More Info
          </Link>
        </div>
      )}
    </div>
  );
}
