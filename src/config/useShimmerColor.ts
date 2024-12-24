import { useEffect } from 'react';
import { useAnimatedValue, Animated, Easing } from 'react-native';

const useShimmerColor = (theme: ThemeColors) => {
  const color = useAnimatedValue(0);

  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(color, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(color, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]),
  );

  useEffect(() => {
    animation.start();

    return () => {
      animation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.all.surfaceContainer, theme.all.surfaceContainerHighest],
  });

  return { backgroundColor };
};

export default useShimmerColor;
