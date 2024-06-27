import create from 'zustand'
import shallow from 'zustand/shallow';

export const useStore = create((set) => ({
    tempWalls : [],
    addTempWall: (pos) => {
      set((state) => ({
          ...state,
          tempWalls: [...state.tempWalls, pos]
      }));
    }
}))
  