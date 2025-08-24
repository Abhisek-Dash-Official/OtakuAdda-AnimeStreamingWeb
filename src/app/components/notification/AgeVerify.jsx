import { Shield, TriangleAlert, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AgeVerification({ closeModal }) {
  const handleYes = () => {
    localStorage.setItem("age18Plus", "true");
    closeModal();
  };

  const handleNo = () => {
    closeModal();
    toast.warn("You must be 18+ to access this content.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent bg-opacity-80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 overflow-hidden">
        {/* Header with brand colors */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1">
          <div className="bg-gray-900 m-1 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-purple-400" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              OtakuAdda
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
            Age Verification Required
          </h3>

          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
            This website contains content intended for users 18 years and older.
            By continuing, you confirm that you are at least 18 years of age.
          </p>

          <div className="bg-gray-800 rounded-lg p-4 mb-6 border-l-4 border-yellow-500">
            <p className="text-yellow-400 text-sm font-medium flex items-center gap-2">
              <TriangleAlert className="w-4 h-4" />
              Age Verification Required
            </p>
            <p className="text-gray-300 text-xs mt-1">
              You must be 18+ to access this content
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleYes}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Yes, I am 18+
            </button>

            <button
              onClick={handleNo}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              No, I am under 18
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
