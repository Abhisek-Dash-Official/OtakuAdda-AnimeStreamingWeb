"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "mecha",
  "music",
  "mystery",
  "psychological",
  "romance",
  "sci-fi",
  "short",
  "sport",
  "supernatural",
  "thriller",
  "war",
  "western",
];

const categoryDescriptions = {
  action: "High-octane thrills and explosive adventures",
  adventure: "Epic journeys and daring quests",
  animation: "Colorful worlds brought to life",
  comedy: "Laughter and lighthearted entertainment",
  crime: "Dark mysteries and criminal underworlds",
  drama: "Emotional stories that touch the heart",
  family: "Entertainment for all ages",
  fantasy: "Magical realms and mythical creatures",
  history: "Stories from the past",
  horror: "Spine-chilling scares and thrills",
  mecha: "Giant robots and futuristic battles",
  music: "Rhythm, melody, and musical journeys",
  mystery: "Puzzles, secrets, and hidden truths",
  psychological: "Mind-bending psychological narratives",
  romance: "Love stories and romantic adventures",
  "sci-fi": "Future worlds and scientific wonders",
  short: "Compact stories with powerful impact",
  sport: "Athletic competitions and sporting drama",
  supernatural: "Beyond the natural world",
  thriller: "Edge-of-your-seat suspense",
  war: "Stories of conflict and heroism",
  western: "Tales from the American frontier",
};

// Small card component (1 unit)
const SmallCard = ({ category }) => (
  <Link
    href={`/categories/${category}`}
    className=" block w-[200px] h-[300px] group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
  >
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={`/assets/category-imgs/${category}.png`}
        alt={`${category} category`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white capitalize">
            {category}
          </h3>
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
        <span className="text-white text-sm font-medium capitalize">
          {category}
        </span>
      </div>
    </div>
  </Link>
);
// Big card component (2 units width, 2 units height)
const BigCard = ({ category }) => (
  <Link
    href={`/categories/${category}`}
    className="block w-[412px] h-[612px] group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
  >
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={`/assets/category-imgs/${category}.png`}
        alt={`${category} category`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-4xl font-bold text-white mb-4 capitalize">
            {category}
          </h3>
          <p className="text-gray-200 text-lg leading-relaxed">
            {categoryDescriptions[category]}
          </p>
        </div>
      </div>
      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
        <span className="text-white text-lg font-medium capitalize">
          {category}
        </span>
      </div>
    </div>
  </Link>
);

export default function CategoryGallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6">
            Movie Categories
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect movie experience. Explore our curated
            collection of genres and find your next favorite film.
          </p>
        </div>

        {/* Mobile Layout - Simple Grid */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <Image
                    src={`/assets/category-imgs/${category}.png`}
                    alt={`${category} category`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white capitalize">
                        {category}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium capitalize">
                      {category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet Layout - 3 columns */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <Image
                    src={`/assets/category-imgs/${category}.png`}
                    alt={`${category} category`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 capitalize">
                        {category}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {categoryDescriptions[category]}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium capitalize">
                      {category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Album Style Grid */}
        <div className=" hidden lg:block min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
          <div className="mx-auto px-6 flex justify-center items-center">
            <div className="grid grid-cols-4 gap-10 w-fit">
              {/* Row 1: [1. 1] [2] [3] */}
              <div className="col-span-2 row-span-2">
                <BigCard category={categories[0]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[1]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[2]} />
              </div>

              {/* Row 2: [1. 1] [4] [5] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[3]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[4]} />
              </div>

              {/* Row 3: [6] [7] [10. 10] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[5]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[6]} />
              </div>
              <div className="col-span-2 row-span-2">
                <BigCard category={categories[9]} />
              </div>

              {/* Row 4: [8] [9] [10. 10] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[7]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[8]} />
              </div>

              {/* Row 5: [11. 11] [12] [13] */}
              <div className="col-span-2 row-span-2">
                <BigCard category={categories[10]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[11]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[12]} />
              </div>

              {/* Row 6: [11. 11] [14] [15] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[13]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[14]} />
              </div>

              {/* Row 7: [16] [17] [20. 20] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[15]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[16]} />
              </div>
              <div className="col-span-2 row-span-2">
                <BigCard category={categories[19]} />
              </div>

              {/* Row 8: [18] [19] [20. 20] */}
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[17]} />
              </div>
              <div className="col-span-1 row-span-1">
                <SmallCard category={categories[18]} />
              </div>

              {/* Row 9: [21] [22] centered */}
              <div className="col-span-4 flex justify-center gap-6">
                <BigCard category={categories[20]} />
                <BigCard category={categories[21]} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-gray-400 text-lg">
            Can't find what you're looking for?
            <Link
              href="/search"
              className="text-purple-400 hover:text-purple-300 ml-2 underline decoration-purple-400/50 hover:decoration-purple-300"
            >
              Try our search
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
