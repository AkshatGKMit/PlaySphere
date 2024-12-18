import { Animated, Easing, StyleProp, useAnimatedValue, ViewStyle } from 'react-native';

import { RIPPLE_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes';

const rippleStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '100%',
  aspectRatio: 1,
  borderRadius: 1000,
};

const rippleContainerStyle: StyleProp<ViewStyle> = {
  ...globalStyles.positionRelative,
  overflow: 'scroll',
};

const { MAX_OPACITY, MIN_SCALE, MAX_SCALE, RIPPLE_DURATION } = RIPPLE_BUTTON_CONSTANTS;

const useRippleEffect = () => {
  const { colors: theme } = useAppSelector((state) => state.theme);

  const opacity = useAnimatedValue(MAX_OPACITY);
  const scale = useAnimatedValue(MIN_SCALE);

  const animatePressOut = () => {
    Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }).start(
      ({ finished }) => {
        if (finished) {
          scale.setValue(MIN_SCALE);
          opacity.setValue(MAX_OPACITY);
        }
      },
    );
  };

  const pressOut = () => {
    scale.stopAnimation();
    animatePressOut();
  };

  const animatePressIn = () => {
    Animated.timing(scale, {
      toValue: MAX_SCALE,
      duration: RIPPLE_DURATION,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const rippleStyles = [
    rippleStyle,
    {
      backgroundColor: theme.inverted.main,
      transform: [{ scale }],
      opacity,
    },
  ];

  return { animatePressIn, pressOut, rippleStyles, rippleContainerStyle };
};

export default useRippleEffect;
