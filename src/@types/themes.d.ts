import { ColorType } from '@constants';
import { ThemeMode } from '@themes';

declare global {
  type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

  interface ThemeColors {
    background: string;
  }

  interface Theme {
    light: ThemeColors;
    dark: ThemeColors;
  }

  type ColorTheme = {
    [key in keyof typeof ColorType]: string;
  };
}
