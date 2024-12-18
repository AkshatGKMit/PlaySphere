import { Dark, Light } from './colors';

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export const Theme: Theme = {
  light: {
    background: Light.background,
  },
  dark: {
    background: Dark.background,
  },
} as const;

export * from './colors';
