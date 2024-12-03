import { useRef, useState, useEffect } from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";

export default function SearchBar({
  handleSearchChange,
  handleSearchClick,
  searchTerm,
  suggestions,
  onSuggestionClick,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChangeWithVisibility = (e) => {
    handleSearchChange(e);
    if (e.target.value) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div
      ref={searchRef}
      className=" absolute z-20 relative w-[380px] bg-gray-100 rounded-2xl shadow-md p-0.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg border border-green-300"
    >
      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
        <svg
          className="h-4 w-6 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-8 pr-24 py-3 text-base text-gray-600 bg-transparent rounded-lg focus:outline-none"
        placeholder="Search for podcasts"
        value={searchTerm}
        onChange={handleSearchChangeWithVisibility}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <button
        onClick={handleSearchClick}
        className="absolute right-1 top-1 bottom-1 px-4 bg-green-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5044e4]"
      >
        <SearchCircleIcon className="w-6 h-7 text-gray-700" />
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-21 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center space-x-3"
            >
              {suggestion.images[2] && (
                <img
                  src={suggestion.images[2].url}
                  alt={suggestion.name}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <span className="flex-grow">{suggestion.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
