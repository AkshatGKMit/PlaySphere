import { Dark, Light, Palettes } from './colors';

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export const Theme: Theme = {
  light: {
    background: Light.background,
    primaryText: Palettes.primary.shade0,
  },
  dark: {
    background: Dark.background,
    primaryText: Palettes.primary.shade100,
  },
} as const;

export * from './colors';
