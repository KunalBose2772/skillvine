import { create } from 'zustand';
import { darkColors, lightColors } from '../theme/colors';

type ThemeColors = typeof darkColors | typeof lightColors;

interface ThemeState {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  colors: darkColors,
  toggleTheme: () =>
    set((state) => {
      const nextIsDark = !state.isDark;
      return {
        isDark: nextIsDark,
        colors: nextIsDark ? darkColors : lightColors,
      };
    }),
}));
