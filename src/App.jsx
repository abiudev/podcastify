// import SearchBar from "./components/SearchBar.jsx";
import Axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Auth from "./components/Auth.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import ToggleProvider from "./Contexts/ToggleContext.jsx";
import TopShows from "./components/TopShows.jsx";

const CLIENT_ID = "1304c4c46d2d4695bd2fd9f0eacae3ea";
const CLIENT_SECRET = "4a3db0e54b2a4d8382da5b3f287aa776";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    Axios(options)
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.error("Error fetching access token:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    console.log(e.target.value);
  };

  async function handleSearchClick() {
    if (!searchTerm) return;

    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }

    try {
      const { data } = await Axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchTerm,
          type: "show",
          market: "US",
        },
      });

      setShows(data.shows.items);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }

    try {
      const { data } = await Axios.get("https://api.spotify.com/v1/shows/S", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          type: "show",
          market: "US",
        },
      });

      console.log(data.shows.items);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  }
  // const toggleView = () => {
  //   setIsSignedUp(!isSignedUp);
  // };
  return (
    <ToggleProvider>
      <Router>
        <div>
          <Header
            handleSearchChange={handleSearchChange}
            handleSearchClick={handleSearchClick}
            searchTerm={searchTerm}
            shows={shows}
          />
          <Routes>
            <Route
              path="/trending"
              element={
                <TopShows favorites={favorites} setFavorites={setFavorites} />
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/profile"
              element={<Profile favorites={favorites} />}
            />
          </Routes>
        </div>
      </Router>
    </ToggleProvider>
  );
}
