import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import TopShows from "./components/TopShows.jsx";
import SpotifyShowCard from "./components/SpotifyShowCard.jsx";
import { useSpotifySearch } from "./hooks/useSpotifySearch";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from "./store/useStore";
import SpotifyPlayer from "./components/SpotifyPlayer.jsx";
import PodcastPlayer from "./components/player.jsx";

export default function App() {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    performSearch,
  } = useSpotifySearch();
  
  const { currentTrack, searchResults } = useStore();

  const handleSearchClick = async () => {
    if (!searchTerm?.trim()) return;
    await performSearch(searchTerm);
    navigate("/results");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    performSearch(suggestion.name).then(() => {
        navigate("/results");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
        handleSearchClick={handleSearchClick}
      />
      <main className="container mx-auto py-8 flex-grow">
        <Routes>
          <Route path="/" element={<TopShows />} />
          <Route
            path="/results"
            element={<SpotifyShowCard shows={searchResults} />}
          />
        </Routes>
      </main>

      {/* Global Player UI */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up shadow-2xl">
          {currentTrack.type === 'spotify' ? (
            <SpotifyPlayer showId={currentTrack.id} />
          ) : (
            <PodcastPlayer url={currentTrack.url} img={currentTrack.image} />
          )}
        </div>
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}
