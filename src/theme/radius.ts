export const Radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  '2xl': 32,
  button: 18,
  card: 24,
  input: 14,
  badge: 100,
  icon: 16,
  full: 9999,
} as const;

export type RadiusKey = keyof typeof Radius;
