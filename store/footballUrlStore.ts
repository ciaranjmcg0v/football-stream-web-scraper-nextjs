import { create } from "zustand";

interface MatchUrl {
  url: string;
  timestamp: number;
}

interface StoreState {
  matchUrls: MatchUrl[];
  currentEmbedLink: string | null;
  addMatchUrl: (url: string) => void;
  setCurrentEmbedLink: (url: string | null) => void;
  clearOldUrls: () => void;
}

const useStore = create<StoreState>((set, get) => ({
  matchUrls: [],
  currentEmbedLink: null,

  addMatchUrl: (url: string) =>
    set((state) => ({
      matchUrls: [...state.matchUrls, { url, timestamp: Date.now() }],
    })),

  setCurrentEmbedLink: (url: string | null) => set({ currentEmbedLink: url }),

  clearOldUrls: () => {
    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
    set((state) => ({
      matchUrls: state.matchUrls.filter(
        (matchUrl) => matchUrl.timestamp > fifteenMinutesAgo
      ),
    }));
  },
}));

export default useStore;
