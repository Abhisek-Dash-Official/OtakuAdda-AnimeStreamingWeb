"use client";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import { Search, Sparkles, Grid, List } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
      document.title = `OtakuAdda | Search Results for "${search}"`;
      setData([]); // Reset data for new search
      setPage(1);
      setHasMore(true);
      loadData(1, search);
    } else {
      document.title = `OtakuAdda | Search`;
    }
  }, [searchParams]);

  const loadData = async (pageNo, searchQuery = null) => {
    try {
      setLoading(true);
      const search = searchQuery || searchParams.get("search");
      if (!search) return;

      const res = await fetch(`/API/search?page=${pageNo}&search=${search}`);
      const d = await res.json();

      if (!d || d.data.length === 0) {
        setHasMore(false);
      } else {
        if (pageNo === 1) {
          setData(d.data);
        } else {
          setData((prev) => {
            const merged = [...prev, ...d.data];
            const unique = Array.from(
              new Map(merged.map((item) => [item._id, item])).values()
            );
            return unique;
          });
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore &&
        data.length > 0
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadData(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, data.length, page]);

  const currentSearch = searchParams.get("search");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
      {/* Animated Background Elements - Responsive */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      <div className="relative z-10 px-3 sm:px-4 py-4 sm:py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Main Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="relative">
                <Search className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500 animate-bounce" />
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent text-center">
                OtakuAdda Search
              </h1>
            </div>
            <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Discover your next favorite anime from our vast collection
            </p>
          </div>

          {/* Search Bar - Fully Responsive */}
          <div className="relative group mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl sm:rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search anime, manga, characters..."
                  className="relative w-full px-4 sm:px-6 py-3 sm:py-4 pl-11 sm:pl-14 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 text-sm sm:text-base"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full sm:w-auto sm:ml-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>

          {/* Current Search Display */}
          {currentSearch && (
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Showing results for:
                  </span>
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent break-all">
                    "{currentSearch}"
                  </span>
                  <span className="bg-pink-500/20 text-pink-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {data.length} results
                  </span>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-800/50 rounded-lg sm:rounded-xl p-1 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-pink-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-pink-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {currentSearch ? (
            <>
              {data.length !== 0 && <Container data={data} />}

              {/* Loading Animation */}
              {loading && (
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 sm:p-6 animate-pulse">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-36 sm:w-48 h-52 sm:h-72 bg-gradient-to-tr from-[#2c1a2e] to-[#3a2d4a] rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
                    >
                      {/* Fake image */}
                      <div className="h-3/4 bg-gray-700/50"></div>

                      {/* Fake title */}
                      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
                        <div className="h-3 sm:h-4 bg-gray-600/50 rounded"></div>
                        <div className="h-2 sm:h-3 bg-gray-600/40 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* End Message */}
              {!hasMore && data.length > 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700/50">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      No more Results left!
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Welcome State
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-2xl mx-auto px-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 sm:mb-8 mx-auto">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to explore the anime universe?
                </h2>
                <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 px-2">
                  Enter your search term above and discover amazing anime,
                  manga, and characters from our extensive database.
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {[
                    "Naruto",
                    "One Piece",
                    "Attack on Titan",
                    "Dragon Ball",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        router.push(
                          `/search?search=${encodeURIComponent(suggestion)}`
                        );
                      }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 hover:bg-pink-600/50 text-gray-300 hover:text-white rounded-full transition-all duration-300 border border-gray-700/50 hover:border-pink-500/50 text-sm sm:text-base"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
