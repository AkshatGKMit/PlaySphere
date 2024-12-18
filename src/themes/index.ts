import { Colors, Dark, Light, Palettes } from './colors';

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

const lightTheme: Omit<ThemeColors, 'inverted'> = {
  main: Colors.white,
  background: Light.background,
  primaryText: Palettes.primary.shade0,
  all: Light,
};

const darkTheme: Omit<ThemeColors, 'inverted'> = {
  main: Colors.black,
  background: Dark.background,
  primaryText: Palettes.primary.shade100,
  all: Dark,
};

export const Theme: Theme = {
  light: {
    ...lightTheme,
    inverted: darkTheme,
  },
  dark: {
    ...darkTheme,
    inverted: lightTheme,
  },
} as const;

export * from './colors';
export * from './globalStyles';
