import { ColorType } from '@constants';
import { ThemeMode } from '@themes';

declare global {
  type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

  type ColorTheme = {
    [key in keyof typeof ColorType]: string;
  };

  interface ThemeColors {
    main: string;
    background: string;
    primaryText: string;
    all: ColorTheme;
    inverted: Omit<ThemeColors, 'inverted'>;
  }

  interface Theme {
    light: ThemeColors;
    dark: ThemeColors;
  }

  type ColorTheme = {
    [key in keyof typeof ColorType]: string;
  };
}
