"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Subscription() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");

  const subscribeUser = async (duration) => {
    try {
      const user = JSON.parse(localStorage.getItem("activeUser"));
      if (!user || !user.email) {
        toast.error("No active user found in localStorage!");
        window.location.href = "/account/login"; // Redirect to login page
        return;
      }

      const email = user.email;

      const subscription_duration = duration; // "monthly" or "yearly"

      // POST request to API
      const res = await fetch("/API/user-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subscription_duration }),
      });

      if (res.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleMonthlyPurchase = async () => {
    setCurrentPlan("Monthly Plan - $9.99/month");
    setShowQRModal(true);
  };

  const handleYearlyPurchase = async () => {
    setCurrentPlan("Yearly Plan - $71.88/year i.e $5.99/month");
    setShowQRModal(true);
  };

  const handlePurchaseConfirm = async () => {
    const subsDone = await subscribeUser(selectedPlan);
    if (!subsDone) {
      toast.error("❌ Subscription failed:");
      return;
    }
    Swal.fire({
      title: "Payment Successful! 🎉",
      text: `Welcome to ${currentPlan}! Your premium access is now active.`,
      icon: "success",
      background: "#1f2937",
      color: "#ffffff",
      confirmButtonColor: "#8b5cf6",
      confirmButtonText: "Start Watching!",
      customClass: {
        popup: "border border-purple-500/50 shadow-2xl shadow-purple-500/25",
      },
    });
    setShowQRModal(false);
  };

  const closeModal = () => {
    setShowQRModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          >
            <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-40"></div>
          </div>
        ))}
      </div>

      {/* Floating decorative shapes - hidden on very small screens */}
      <div className="absolute inset-0 pointer-events-none hidden xs:block">
        <div className="absolute top-20 left-4 w-8 h-8 border-2 border-pink-500/30 rotate-45 animate-spin"></div>
        <div className="absolute top-32 right-4 w-6 h-6 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-4 w-4 h-4 bg-purple-400/30 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 right-4 w-10 h-10 border-2 border-yellow-400/20 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-2 xs:px-4 py-6 xs:py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 xs:mb-16">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2 xs:mb-4 animate-pulse">
            OtakuAdda
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4 xs:mb-8">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-cyan-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 xs:mb-4">
            Premium Anime Experience
          </h2>
          <p className="text-gray-300 text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2">
            Unlock unlimited access to thousands of anime series, movies, and
            exclusive content
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-6 xs:mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-1 xs:p-2 rounded-full border border-gray-700">
            <div className="flex">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-3 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-medium text-xs xs:text-sm sm:text-base transition-all duration-300 ${
                  selectedPlan === "monthly"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-3 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-medium text-xs xs:text-sm sm:text-base transition-all duration-300 relative ${
                  selectedPlan === "yearly"
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-1 xs:-top-2 -right-1 xs:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-1 xs:px-2 py-0.5 xs:py-1 rounded-full font-bold">
                  SAVE 40%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
            {/* Monthly Plan */}
            <div
              className={`relative group transition-all duration-500 transform hover:scale-105 ${
                selectedPlan === "monthly" ? "scale-105" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl xs:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl xs:rounded-2xl p-4 xs:p-6 sm:p-8 h-full">
                <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                  <div className="inline-block p-2 xs:p-3 sm:p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-2 xs:mb-4">
                    <div className="text-2xl xs:text-3xl sm:text-4xl">🌸</div>
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 xs:mb-2">
                    Monthly Plan
                  </h3>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                    Perfect for casual viewers
                  </p>
                </div>

                <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                  <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-1 xs:mb-2">
                    $9.99
                    <span className="text-sm xs:text-base sm:text-lg text-gray-400">
                      /month
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs xs:text-sm">
                    Billed monthly
                  </p>
                </div>

                <ul className="space-y-2 xs:space-y-3 sm:space-y-4 mb-4 xs:mb-6 sm:mb-8">
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    Unlimited anime streaming
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    HD & 4K quality
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    No ads interruption
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    Multiple devices support
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    Download for offline viewing
                  </li>
                </ul>

                <button
                  onClick={() => {
                    handleMonthlyPurchase();
                    setSelectedPlan("monthly");
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 xs:py-4 px-4 xs:px-6 rounded-lg xs:rounded-xl text-sm xs:text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25"
                >
                  Get Monthly Plan
                </button>
              </div>
            </div>

            {/* Yearly Plan */}
            <div
              className={`relative group transition-all duration-500 transform hover:scale-105 ${
                selectedPlan === "yearly" ? "scale-105" : ""
              }`}
            >
              {/* Popular badge */}
              <div className="absolute -top-3 xs:-top-4 left-1/2 transform -translate-x-1/2 z-20 w-[150px] sm:w-[180px] flex justify-center">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm animate-pulse">
                  MOST POPULAR
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-xl xs:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl xs:rounded-2xl p-4 xs:p-6 sm:p-8 h-full">
                <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                  <div className="inline-block p-2 xs:p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full mb-2 xs:mb-4">
                    <div className="text-2xl xs:text-3xl sm:text-4xl">👑</div>
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1 xs:mb-2">
                    Yearly Plan
                  </h3>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                    Best value for otaku enthusiasts
                  </p>
                </div>

                <div className="text-center mb-4 xs:mb-6 sm:mb-8">
                  <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-1 xs:mb-2">
                    $71.88
                    <span className="text-sm xs:text-base sm:text-lg text-gray-400">
                      /year
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs xs:text-sm">
                    Billed monthly ($5.99/month)
                    <span className="block text-green-400 font-medium">
                      Save $47.88
                    </span>
                  </p>
                </div>

                <ul className="space-y-2 xs:space-y-3 sm:space-y-4 mb-4 xs:mb-6 sm:mb-8">
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    Everything in Monthly Plan
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-yellow-400 font-medium">
                      Exclusive early access
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-yellow-400 font-medium">
                      Premium anime collection
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-yellow-400 font-medium">
                      Priority customer support
                    </span>
                  </li>
                  <li className="flex items-center text-gray-300 text-xs xs:text-sm">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0">
                      <svg
                        className="w-2 h-2 xs:w-3 xs:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-yellow-400 font-medium">
                      Special member events
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => {
                    handleYearlyPurchase();
                    setSelectedPlan("yearly");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 xs:py-4 px-4 xs:px-6 rounded-lg xs:rounded-xl text-sm xs:text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 relative overflow-hidden"
                >
                  <span className="relative z-10">Get Yearly Plan</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-10 xs:mt-16 sm:mt-20 text-center">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-4 xs:mb-6 sm:mb-8">
            Why Choose OtakuAdda Premium?
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg xs:rounded-xl p-4 xs:p-6">
              <div className="text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-4">
                🎬
              </div>
              <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1 xs:mb-2">
                Massive Library
              </h4>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                10,000+ anime episodes and movies from classic to latest
                releases
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg xs:rounded-xl p-4 xs:p-6">
              <div className="text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-4">
                ⚡
              </div>
              <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1 xs:mb-2">
                Lightning Fast
              </h4>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                Ultra-fast streaming with global CDN and adaptive quality
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg xs:rounded-xl p-4 xs:p-6">
              <div className="text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-4">
                🔒
              </div>
              <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-white mb-1 xs:mb-2">
                Secure & Safe
              </h4>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-base">
                Enterprise-grade security with encrypted streaming
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="flex justify-center mt-8 xs:mt-12 sm:mt-16">
          <div className="flex space-x-1 xs:space-x-2">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 xs:w-1 h-3 xs:h-4 sm:h-6 bg-gradient-to-t from-transparent to-purple-500 opacity-50 animate-ping"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1.5s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 xs:p-8 max-w-sm w-full mx-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-xl xs:text-2xl font-bold text-white mb-2">
                Complete Payment
              </h3>
              <p className="text-gray-400 mb-4 text-sm xs:text-base">
                {currentPlan}
              </p>

              {/* QR Code placeholder */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <img
                  src="/assets/extras/demoQR.png"
                  alt="Payment QR Code"
                  className="w-full h-auto max-w-xs mx-auto"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='16' fill='%23666'%3EDemo QR Code%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              <p className="text-gray-400 text-xs xs:text-sm mb-6">
                Scan the QR code to complete your payment securely
              </p>

              {/* Purchase button */}
              <button
                onClick={handlePurchaseConfirm}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 xs:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
