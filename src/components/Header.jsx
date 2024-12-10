import { useState } from "react";
import SearchBar from "./SearchBar";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp.jsx";

export default function Header({
  handleSearchChange,
  handleSearchClick,
  searchTerm,
  shows,
  suggestions,
  onSuggestionClick,
}) {
  const navigate = useNavigate();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handlePopup = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-green-500 p-4 z-10 sticky top-0 w-full">
        <div className="container mx-auto flex items-center justify-between p-1">
          <div className="flex items-center ml-0">
            <img
              src="/logo.png"
              alt="logo"
              onClick={() => navigate("/")}
              className="h-18 w-16 cursor-pointer"
            />

            <div className="hidden md:flex space-x-4 ml-4">
              <a
                href="#"
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
                onClick={() => navigate("/")}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
                onClick={handlePopup}
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
              >
                Top
              </a>
            </div>
          </div>

          <div className="flex-grow flex justify-center mt-4 md:mt-0">
            <div className="hidden md:block w-full max-w-xs">
              <SearchBar
                handleSearchChange={handleSearchChange}
                handleSearchClick={handleSearchClick}
                searchTerm={searchTerm}
                shows={shows}
                suggestions={suggestions}
                onSuggestionClick={onSuggestionClick}
              />
            </div>

            <div className="md:hidden relative w-full mr-3 mb-3 max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="border rounded-full py-1 px-3 focus:outline-none focus:ring focus:ring-green-300 transition duration-150 ease-in-out w-full"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white bg-green-500 rounded-full p-1"
              >
                Search
              </button>

              {searchTerm && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white shadow-lg rounded-b-md mt-2 z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => onSuggestionClick(suggestion)}
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end md:hidden">
            <button
              className="text-white"
              onClick={() => setIsHeaderOpen(!isHeaderOpen)}
            >
              {isHeaderOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isHeaderOpen && (
          <div className="bg-green-300 flex flex-col p-4 md:hidden">
            <a
              href="#"
              onClick={() => navigate("/trending")}
              className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => navigate("/trending")}
              className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
            >
              About
            </a>
            <a className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600">
              Top
            </a>
          </div>
        )}
      </nav>
      <PopUp isOpen={isOpen} closePopup={closePopup} />{" "}
    </>
  );
}
