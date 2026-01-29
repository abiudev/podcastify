import { create } from 'zustand';

const useStore = create((set) => ({
  // Search State
  searchTerm: '',
  suggestions: [],
  searchResults: [],
  isSearching: false,
  
  // Player State
  currentTrack: null, // { id, type: 'spotify' | 'pdci', url, image, title }
  isPlaying: false,

  // Search Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (isSearching) => set({ isSearching }),

  // Player Actions
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stopPlayer: () => set({ currentTrack: null, isPlaying: false }),
}));

export default useStore;
