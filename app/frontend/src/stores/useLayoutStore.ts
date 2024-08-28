import create from 'zustand';

interface LayoutState {
  isMinimized: boolean;
  toggleMinimized: () => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  isMinimized: false,
  toggleMinimized: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));

export default useLayoutStore;
