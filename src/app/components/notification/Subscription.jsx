import { Crown, X, Star, Zap, Heart } from "lucide-react";

export default function SubscriptionNotification({ closeModal }) {
  const handleSubscribe = () => {
    window.location.href = "/subscription";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 overflow-hidden">
        {/* Header with brand colors */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1">
          <div className="bg-gray-900 m-1 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Crown className="w-12 h-12 text-yellow-400" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              OtakuAdda Premium
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Unlock Premium Experience
          </h3>

          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
            You haven't subscribed yet! Get access to exclusive anime content.
          </p>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 mb-6 border-l-4 border-purple-500">
            <p className="text-purple-300 text-sm font-medium">
              🚀 Limited Time Offer
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Join thousands of anime fans enjoying premium content
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSubscribe}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Get Premium Now
            </button>

            <button
              onClick={closeModal}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
