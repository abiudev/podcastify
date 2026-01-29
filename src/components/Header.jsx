import { useState } from "react";
import SearchBar from "./SearchBar";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp.jsx";

export default function Header({
  searchTerm,
  setSearchTerm,
  suggestions,
  onSuggestionClick,
  handleSearchClick,
}) {
  const navigate = useNavigate();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);


  const handleAboutPopup = (e) => {
    e.preventDefault();
    setIsAboutOpen(true);
  };

  const closeAboutPopup = () => {
    setIsAboutOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
              className="h-10 w-10 md:h-18 md:w-16 cursor-pointer" // Adjusted size for better mobile fit
            />

            <div className="hidden md:flex space-x-4 ml-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
              >
                Home
              </button>
              <button
                onClick={handleAboutPopup}
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
              >
                About
              </button>
              <button
                onClick={() => navigate("/")} // Or wherever Top goes
                className="text-gray-950 font-roboto-condensed font-bold hover:text-gray-600"
              >
                Top
              </button>
            </div>
          </div>

          <div className="flex-grow flex justify-center mt-4 md:mt-0">
            <div className="hidden md:block w-full max-w-xs">
              <SearchBar
                handleSearchChange={handleSearchChange}
                handleSearchClick={handleSearchClick}
                searchTerm={searchTerm}
                suggestions={suggestions}
                onSuggestionClick={onSuggestionClick}
              />
            </div>

            <div className="md:hidden relative w-full mr-3 mb-3 max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="Search..."
                className="border rounded-full py-1 px-3 focus:outline-none focus:ring focus:ring-green-300 transition duration-150 ease-in-out w-full"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white bg-green-500 rounded-full p-2 text-xs"
              >
                Search
              </button>

              {searchTerm && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white shadow-lg rounded-b-md mt-2 z-20">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.id || index}
                      className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
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
          <div className="bg-green-300 flex flex-col p-4 md:hidden shadow-inner">
            <button
              onClick={() => { navigate("/"); setIsHeaderOpen(false); }}
              className="text-gray-950 font-roboto-condensed font-bold py-2 text-left"
            >
              Home
            </button>
            <button
              onClick={(e) => { handleAboutPopup(e); setIsHeaderOpen(false); }}
              className="text-gray-950 font-roboto-condensed font-bold py-2 text-left"
            >
              About
            </button>
            <button
               onClick={() => { navigate("/"); setIsHeaderOpen(false); }}
              className="text-gray-950 font-roboto-condensed font-bold py-2 text-left"
            >
              Top
            </button>
          </div>
        )}
      </nav>
      <PopUp isOpen={isAboutOpen} closePopup={closeAboutPopup} />
    </>
  );
}

