export const darkColors = {
  // Backgrounds
  background: '#07111F',
  surface: '#101826',
  surfaceElevated: '#172033',
  surfaceBorder: '#1E2D42',

  // Brand
  primaryBlue: '#0066FF',
  accentBlue: '#00B8FF',

  // Gradient
  gradientStart: '#0066FF',
  gradientEnd: '#00B8FF',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#4A5568',
  textInverse: '#07111F',

  // State colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  // Transparent overlays
  overlay10: 'rgba(0, 102, 255, 0.10)',
  overlay20: 'rgba(0, 102, 255, 0.20)',
  overlay40: 'rgba(0, 102, 255, 0.40)',
  glowBlue: 'rgba(0, 184, 255, 0.15)',

  // White / Black
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const lightColors = {
  // Backgrounds
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#F1F5F9',
  surfaceBorder: '#E2E8F0',

  // Brand
  primaryBlue: '#0066FF',
  accentBlue: '#00B8FF',

  // Gradient
  gradientStart: '#0066FF',
  gradientEnd: '#00B8FF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#F8FAFC',

  // State colors
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',

  // Transparent overlays
  overlay10: 'rgba(0, 102, 255, 0.08)',
  overlay20: 'rgba(0, 102, 255, 0.15)',
  overlay40: 'rgba(0, 102, 255, 0.30)',
  glowBlue: 'rgba(0, 184, 255, 0.15)',

  // White / Black
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const Colors = darkColors;
export type ColorKey = keyof typeof darkColors;
