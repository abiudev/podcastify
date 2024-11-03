import styled from "styled-components";
import React from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";

export default function SearchBar({
  handleSearchChange,
  handleSearchClick,
  searchTerm,
}) {
  return (
    <>
      <div className="relative w-[380px] bg-gray-100 rounded-2xl shadow-md p-0.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg border border-green-300">
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
          onChange={handleSearchChange}
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
      </div>
    </>
  );
}
