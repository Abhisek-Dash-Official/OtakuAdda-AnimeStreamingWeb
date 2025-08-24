"use client";
import Link from "next/link";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Info,
  Mail,
  Film,
  Grid3X3,
  Search,
  Bookmark,
  User,
  Settings,
  LogOut,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("activeUser")) setIsLogged(true);
    else setIsLogged(false);
  }, []);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to leave us?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4757",
      cancelButtonColor: "#3742fa",
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("activeUser");
        router.push("/account/login");
      }
    });
  };

  const handleSignIn = () => {
    router.push("/account/login");
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Info, label: "About", href: "/about" },
    { icon: Mail, label: "Contact", href: "/contact" },
    { icon: Film, label: "All Animes", href: "/all-animes" },
    { icon: Grid3X3, label: "Categories", href: "/categories" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Bookmark, label: "Wishlist", href: "/wishlist" },
    { icon: User, label: "User Profile", href: "/user-Profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #0f1419 0%, #1e2a3a 50%, #0a0f16 100%)",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Navigation content */}
      <div className="relative h-full flex flex-col py-6">
        {/* Logo section */}
        <div className="px-4 mb-8">
          <div
            className="flex items-center space-x-3"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              OA
            </div>
            <span
              className={`text-white font-bold text-lg transition-all duration-300 ${
                isExpanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              OtakuAdda
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 px-2 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-purple-400 shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span
                  className={`ml-3 font-medium transition-all duration-300 whitespace-nowrap ${
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && isExpanded && (
                  <div className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sign out button */}
        <div className="px-2 mt-4">
          {isLogged ? (
            <button
              onClick={handleSignOut}
              className="group relative flex items-center w-full px-3 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="w-6 h-6 flex-shrink-0" />
              <span
                className={`ml-3 font-medium transition-all duration-300 whitespace-nowrap ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                Sign Out
              </span>
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="group relative flex items-center w-full px-3 py-3 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200"
            >
              {!isLogged ? (
                <LogIn className="w-6 h-6 flex-shrink-0" />
              ) : (
                <LogOut className="w-6 h-6 flex-shrink-0" />
              )}
              <span
                className={`ml-3 font-medium transition-all duration-300 whitespace-nowrap ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                Sign In
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Right border */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
}
