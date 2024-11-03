import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import PlayerLoader from "./PlayerLoader";

export default function PodcastPlayer({ url, img }) {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [error, setError] = useState(null);
  const podcastUrl = url ? encodeURI(url.trim()) : "";
  const podcastImage = img;

  useEffect(() => {
    if (!podcastUrl) {
      setError(null);
      return;
    }

    setEpisodes([]);
    setCurrentEpisodeIndex(0);
    setError(null);

    fetch(podcastUrl)
      .then((response) => response.text())
      .then((str) => new XMLParser().parseFromString(str))
      .then((data) => {
        const items = data.getElementsByTagName("item");
        const parsedEpisodes = items
          .map((item) => {
            const title =
              item.getElementsByTagName("title")[0]?.value ||
              "Untitled Episode";
            const enclosure = item.getElementsByTagName("enclosure")[0];
            const url =
              enclosure?.attributes?.url ||
              item.getElementsByTagName("link")[0]?.value;

            if (!url) {
              console.warn("Episode without audio URL:", title);
              return null;
            }
            return { title, url };
          })
          .filter((episode) => episode !== null);

        if (parsedEpisodes.length === 0) {
          throw new Error("No valid episodes found in the RSS feed");
        }
        setEpisodes(parsedEpisodes);
      })
      .catch((err) => {
        console.error("Error fetching or parsing RSS feed:", err);
        setError("Failed to load podcast episodes. Please try again later.");
      });
  }, [podcastUrl]);

  const playNext = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-100 p-4 z-50">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center h-24 z-50">
      <img
        src={podcastImage}
        alt="Podcast cover"
        className="h-full w-auto mr-4 rounded-md"
      />
      <div className="flex-grow flex flex-col justify-between h-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold truncate max-w-[60%] sm:max-w-[70%] mr-2 mt-0">
            {episodes[currentEpisodeIndex]?.title || <PlayerLoader />}
          </h3>
        </div>

        <div className="flex items-center space-x-4 w-full">
          <button
            onClick={playPrevious}
            disabled={currentEpisodeIndex === 0}
            aria-label="Previous episode"
            className="p-1 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          {episodes.length > 0 ? (
            <audio
              src={episodes[currentEpisodeIndex].url}
              controls
              className="w-full h-9 mt-2"
            />
          ) : (
            <p className="text-gray-400">...</p>
          )}

          <button
            onClick={playNext}
            disabled={currentEpisodeIndex === episodes.length - 1}
            aria-label="Next episode"
            className="p-1 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
