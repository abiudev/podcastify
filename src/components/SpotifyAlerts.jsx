import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function SpAlerts({ show, duration = 3000, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;
  // console.log(show.images[2]);

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-200 text-gray-900 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in fade-in slide-in-from-top duration-300 border border-green-500">
        <div className="flex items-center space-x-3">
          <img
            className="h-12 w-12 rounded-md"
            src={show.images[2].url}
            alt=""
          />
          <span className="text-xl font-mukta font-medium">
            Added{" "}
            <span className="text-green-700 text-xl font-mukta">
              {show.name}
            </span>{" "}
            to your Favorites
          </span>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className="ml-2 text-green-600 hover:text-green-800 focus:outline-none transition-colors duration-200"
          aria-label="Dismiss"
        >
          <X className="text-red-500 mb-9 mr-0" size={20} />
        </button>
      </div>
    </div>
  );
}
