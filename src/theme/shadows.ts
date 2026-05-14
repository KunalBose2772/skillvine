import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const Shadows = {
  none: {},

  sm: isIOS
    ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 }
    : { elevation: 2 },

  md: isIOS
    ? { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 }
    : { elevation: 5 },

  lg: isIOS
    ? { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16 }
    : { elevation: 10 },

  glowBlue: isIOS
    ? { shadowColor: '#0066FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 20 }
    : { elevation: 12 },

  glowAccent: isIOS
    ? { shadowColor: '#00B8FF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 24 }
    : { elevation: 15 },
} as const;

export type ShadowKey = keyof typeof Shadows;
