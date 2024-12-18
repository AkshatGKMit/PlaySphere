import { ColorType, Opacity } from './style';

export const ICON_BUTTON_CONSTANTS = {
  THEME: {
    DISABLED_CONTAINER: ColorType.onSurface,
    DISABLED_ICON_COLOR: ColorType.onSurface,
    DISABLED_CONTAINER_OPACITY: Opacity.level2,
    DISABLED_ICON_OPACITY: Opacity.level4,
  },
  MEASUREMENTS: {
    CONTAINER_SIZE: 40,
    SHAPE: 20,
    TARGET_SIZE: 48,
    ICON_SIZE: 24,
  },
  FILLED: {
    THEME: {
      CONTAINER_COLOR: ColorType.primary,
      ICON_COLOR: ColorType.onPrimary,
    },
  },
  TONAL: {
    THEME: {
      CONTAINER_COLOR: ColorType.secondaryContainer,
      ICON_COLOR: ColorType.onSecondaryContainer,
    },
  },
  OUTLINED: {
    THEME: {
      CONTAINER_COLOR: ColorType.inverseOnSurface,
      OUTLINE_COLOR: ColorType.inverseSurface,
      DISABLED_OUTLINE_COLOR: ColorType.onSurface,
      ICON_COLOR: ColorType.onSurface,
      DISABLED_OUTLINE_OPACITY: Opacity.level2,
    },
    MEASUREMENTS: {
      OUTLINE_WIDTH: 1,
    },
  },
  STANDARD: {
    THEME: {
      CONTAINER_COLOR: ColorType.transparent,
      ICON_COLOR: ColorType.primary,
    },
  },
};

export const RIPPLE_BUTTON_CONSTANTS = {
  MAX_OPACITY: 0.05,
  MIN_SCALE: 0.01,
  MAX_SCALE: 10,
  RIPPLE_DURATION: 775,
};
