import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TopShows from "./components/TopShows.jsx";
import SpotifyShowCard from "./components/SpotifyShowCard.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";

const CLIENT_ID = '5c8ae0dfc84c426e88d97a4737b41678';
const CLIENT_SECRET = '830015a259b742958c59d4edce965d06';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [shows, setShows] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          },
          body: new URLSearchParams({ grant_type: "client_credentials" }),
          mode: "cors", // Ensuring CORS mode
        });

        if (!response.ok) throw new Error("Failed to fetch access token");

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=show&market=US&limit=5`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        mode: "cors",
      });
      
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      
      const data = await response.json();
      setSuggestions(data.shows.items);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    handleSearchClick();
  };

  const handleSearchClick = async () => {
    if (!searchTerm || !accessToken) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=show&market=US`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        mode: "cors",
      });

      if (!response.ok) throw new Error("Failed to fetch shows");
      
      const data = await response.json();
      setShows(data.shows.items);
      navigate("/results", { state: { shows: data.shows.items } });
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  useEffect(() => {
    const ids = shows.map((show) => show.id);
    setId(ids);
  }, [shows]);

  return (
    <div>
      <Header
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        searchTerm={searchTerm}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      <Routes>
        <Route path="/" element={<TopShows />} />
        <Route
          path="/results"
          element={<SpotifyShowCard id={id} accessToken={accessToken} shows={shows} isSpotify={true} />}
        />
      </Routes>
    </div>
  );
}
