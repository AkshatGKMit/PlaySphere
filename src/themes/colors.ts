import { Opacity } from '@constants/style';
import { colorWithOpacity } from '@utility/themeHelpers';

export const Colors = {
  white: '#ffffff',
  black: '#000000',
  transparent: '#00000000',
};

export const Palettes = {
  seed: '#000000',
  primary: {
    shade0: '#000000',
    shade5: '#111111',
    shade10: '#1B1B1B',
    shade15: '#262626',
    shade20: '#303030',
    shade25: '#3B3B3B',
    shade30: '#474747',
    shade35: '#525252',
    shade40: '#5E5E5E',
    shade50: '#777777',
    shade60: '#919191',
    shade70: '#ABABAB',
    shade80: '#C6C6C6',
    shade90: '#E2E2E2',
    shade95: '#F1F1F1',
    shade98: '#F9F9F9',
    shade99: '#FCFCFC',
    shade100: '#FFFFFF',
  },
  secondary: {
    shade0: '#000000',
    shade5: '#111111',
    shade10: '#1B1B1B',
    shade15: '#262626',
    shade20: '#303030',
    shade25: '#3B3B3B',
    shade30: '#474747',
    shade35: '#525252',
    shade40: '#5E5E5E',
    shade50: '#777777',
    shade60: '#919191',
    shade70: '#ABABAB',
    shade80: '#C6C6C6',
    shade90: '#E2E2E2',
    shade95: '#F1F1F1',
    shade98: '#F9F9F9',
    shade99: '#FCFCFC',
    shade100: '#FFFFFF',
  },
  tertiary: {
    shade0: '#000000',
    shade5: '#111111',
    shade10: '#1B1B1B',
    shade15: '#262626',
    shade20: '#303030',
    shade25: '#3B3B3B',
    shade30: '#474747',
    shade35: '#525252',
    shade40: '#5E5E5E',
    shade50: '#777777',
    shade60: '#919191',
    shade70: '#ABABAB',
    shade80: '#C6C6C6',
    shade90: '#E2E2E2',
    shade95: '#F1F1F1',
    shade98: '#F9F9F9',
    shade99: '#FCFCFC',
    shade100: '#FFFFFF',
  },
  neutral: {
    shade0: '#000000',
    shade4: '#0e0e0e',
    shade5: '#111111',
    shade6: '#131313',
    shade10: '#1B1B1B',
    shade12: '#1f1f1f',
    shade15: '#262626',
    shade17: '#2a2a2a',
    shade20: '#303030',
    shade24: '#393939',
    shade25: '#3B3B3B',
    shade30: '#474747',
    shade35: '#525252',
    shade40: '#5E5E5E',
    shade50: '#777777',
    shade60: '#919191',
    shade70: '#ABABAB',
    shade80: '#C6C6C6',
    shade87: '#dadada',
    shade90: '#E2E2E2',
    shade92: '#e8e8e8',
    shade94: '#eeeeee',
    shade95: '#F1F1F1',
    shade96: '#f3f3f3',
    shade98: '#f9f9f9',
    shade99: '#FCFCFC',
    shade100: '#FFFFFF',
  },
  neutralVariant: {
    shade0: '#000000',
    shade5: '#111111',
    shade10: '#1B1B1B',
    shade15: '#262626',
    shade20: '#303030',
    shade25: '#3B3B3B',
    shade30: '#474747',
    shade35: '#525252',
    shade40: '#5E5E5E',
    shade50: '#777777',
    shade60: '#919191',
    shade70: '#ABABAB',
    shade80: '#C6C6C6',
    shade90: '#E2E2E2',
    shade95: '#F1F1F1',
    shade98: '#F9F9F9',
    shade99: '#FCFCFC',
    shade100: '#FFFFFF',
  },
  error: {
    shade0: '#000000',
    shade5: '#2D0001',
    shade10: '#410002',
    shade15: '#540003',
    shade20: '#690005',
    shade25: '#7E0008',
    shade30: '#930109',
    shade35: '#A80810',
    shade40: '#BA1A1A',
    shade50: '#DE3730',
    shade60: '#FF5549',
    shade70: '#FF897D',
    shade80: '#FFB4AB',
    shade90: '#FFD9D6',
    shade95: '#FFEDEA',
    shade98: '#FFF8F7',
    shade99: '#FFFBFF',
    shade100: '#FFFFFF',
  },
};

const { error, neutral, neutralVariant, primary, secondary, tertiary } = Palettes;

export const Light: ColorTheme = {
  primary: primary.shade40,
  primaryContainer: primary.shade90,
  secondary: secondary.shade40,
  secondaryContainer: secondary.shade90,
  tertiary: tertiary.shade40,
  tertiaryContainer: tertiary.shade90,
  error: error.shade40,
  errorContainer: error.shade90,
  background: neutral.shade98,

  onPrimary: primary.shade100,
  onPrimaryContainer: primary.shade10,
  onSecondary: secondary.shade100,
  onSecondaryContainer: secondary.shade10,
  onTertiary: tertiary.shade100,
  onTertiaryContainer: tertiary.shade10,
  onError: error.shade100,
  onErrorContainer: error.shade10,
  onBackground: neutral.shade10,
  onSurface: neutral.shade10,
  onSurfaceVariant: neutralVariant.shade30,
  onSurfaceDisabled: colorWithOpacity(neutral.shade10, Opacity.level4),

  surfaceDim: neutral.shade87,
  surface: neutral.shade98,
  surfaceBright: neutral.shade98,
  surfaceContainerLowest: neutral.shade100,
  surfaceContainerLow: neutral.shade96,
  surfaceContainer: neutral.shade94,
  surfaceContainerHigh: neutral.shade92,
  surfaceContainerHighest: neutral.shade90,

  outline: neutralVariant.shade50,
  outlineVariant: neutralVariant.shade80,

  shadow: neutral.shade0,
  scrim: neutral.shade0,

  inverseSurface: neutral.shade20,
  inverseOnSurface: neutral.shade95,
  inversePrimary: primary.shade80,

  backdrop: colorWithOpacity(neutralVariant.shade20, 0.4),
  transparent: Colors.transparent,
} as const;

export const Dark: ColorTheme = {
  primary: primary.shade80,
  primaryContainer: primary.shade30,
  secondary: secondary.shade80,
  secondaryContainer: secondary.shade30,
  tertiary: tertiary.shade80,
  tertiaryContainer: tertiary.shade30,
  error: error.shade80,
  errorContainer: error.shade30,
  background: neutral.shade10,

  onPrimary: primary.shade20,
  onPrimaryContainer: primary.shade90,
  onSecondary: secondary.shade20,
  onSecondaryContainer: secondary.shade90,
  onTertiary: tertiary.shade20,
  onTertiaryContainer: tertiary.shade90,
  onError: error.shade20,
  onErrorContainer: error.shade90,
  onBackground: neutral.shade90,
  onSurface: neutral.shade90,
  onSurfaceVariant: neutralVariant.shade90,
  onSurfaceDisabled: colorWithOpacity(neutral.shade90, Opacity.level4),

  surfaceDim: neutral.shade6,
  surface: neutral.shade6,
  surfaceBright: neutral.shade24,
  surfaceContainerLowest: neutral.shade4,
  surfaceContainerLow: neutral.shade10,
  surfaceContainer: neutral.shade12,
  surfaceContainerHigh: neutral.shade17,
  surfaceContainerHighest: neutral.shade24,

  outline: neutralVariant.shade50,
  outlineVariant: neutralVariant.shade80,

  shadow: neutral.shade0,
  scrim: neutral.shade0,

  inverseSurface: neutral.shade90,
  inverseOnSurface: neutral.shade20,
  inversePrimary: primary.shade40,

  backdrop: colorWithOpacity(neutralVariant.shade20, 0.4),
  transparent: Colors.transparent,
} as const;
