import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ShowCard from "./ShowCard.jsx";
import Loader from "./Loader.jsx";
import PodcastPlayer from "./player.jsx";

const TopShows = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  useEffect(() => {
    const fetchTrendingPodcasts = async () => {
      const apiKey = import.meta.env.VITE_PDCI_API_KEY
      const apiSecret = import.meta.env.VITE_PDCI_SECRET_KEY

      if (!apiKey || !apiSecret) {
        setError("API key or secret is missing");
        setLoading(false);
        return;
      }

      const authDate = Math.floor(Date.now() / 1000);
      const sinceDate = authDate - 86400;
      const authString = `${apiKey}${apiSecret}${authDate}`;
      const authHeader = CryptoJS.SHA1(authString).toString(CryptoJS.enc.Hex);

      const myHeaders = new Headers();
      myHeaders.append("User-Agent", "Podcastify");
      myHeaders.append("X-Auth-Date", authDate.toString());
      myHeaders.append("X-Auth-Key", apiKey);
      myHeaders.append("Authorization", authHeader);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.podcastindex.org/api/1.0/podcasts/trending?max=50&lang=en&since=${sinceDate}&pretty=true`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const cleanedPodcasts = result.feeds.map((podcast) => ({
          ...podcast,
          description: podcast.description.replace(/<\/?[^>]+(>|$)/g, ""),
          isSpotify: false,
        }));

        setPodcasts(cleanedPodcasts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching THESE podcasts:", error);
        setLoading(false);
      }
    };

    fetchTrendingPodcasts();
  }, []);

  const handlePlay = (podcast) => {
    setCurrentPodcast(podcast);
  };

  return (
    <>
      <div className="text-center font-roboto-condensed">
        <h1 className="text-4xl font-bold">
          Here is Our <span className="text-green-400">Trending</span> Podcast
          Selection
        </h1>
        <p className="font-light">
          Or You can <span className="font-bold text-green-400">Search</span>{" "}
          Your Favorite Podcasts Using Our Search function
        </p>
      </div>
      <div className="pb-24">
        {loading ? (
          <Loader className="flex items-center justify-center h-screen" />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ShowCard shows={podcasts} onPlay={handlePlay} isSearch={false} />
        )}
      </div>

      {currentPodcast && (
        <PodcastPlayer url={currentPodcast.url} img={currentPodcast.image} />
      )}
    </>
  );
};

export default TopShows;
