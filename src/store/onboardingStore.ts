import { create } from 'zustand';

interface OnboardingStore {
  hasSeenOnboarding: boolean;
  currentSlide: number;
  setHasSeenOnboarding: (val: boolean) => void;
  setCurrentSlide: (idx: number) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  hasSeenOnboarding: false,
  currentSlide: 0,
  setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
  setCurrentSlide: (idx) => set({ currentSlide: idx }),
}));
