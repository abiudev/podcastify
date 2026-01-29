import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchShows } from '../services/spotifyService';
import useStore from '../store/useStore';

export const useSpotifySearch = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    setIsSearching,
    isSearching,
    setSuggestions,
  } = useStore();

  // TankStack Query for suggestions - replaces the manual useEffect with debounce logic
  const { data: suggestionsData } = useQuery({
    queryKey: ['spotifySuggestions', searchTerm],
    queryFn: () => searchShows(searchTerm, 5),
    enabled: !!searchTerm.trim(),
    staleTime: 1000 * 60, // Suggestions stay fresh for 1 minute
  });

  const performSearch = useCallback(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchShows(query);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }, [setSearchResults, setIsSearching]);

  return {
    searchTerm,
    setSearchTerm,
    suggestions: suggestionsData || [],
    shows: searchResults,
    isLoading: isSearching,
    performSearch,
  };
};
