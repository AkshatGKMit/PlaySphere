import { useState, useMemo, useCallback, useEffect } from 'react';
import { useWindowDimensions, useAnimatedValue, Animated, Keyboard } from 'react-native';

const Animation = () => {
  const { height: windowHeight } = useWindowDimensions();

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const backdropContainerHeight = useAnimatedValue(1);
  const containerTopPosition = useAnimatedValue(2);

  const keyboardHeightPercentage = useMemo(() => {
    return (keyboardHeight / windowHeight) * 100;
  }, [keyboardHeight, windowHeight]);

  const animateOnStart = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropContainerHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(containerTopPosition, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [backdropContainerHeight, containerTopPosition]);

  const animateOnKeyboard = useCallback(
    (toValue: number) => {
      Animated.timing(containerTopPosition, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    },
    [containerTopPosition],
  );

  useEffect(() => {
    animateOnStart();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardHeight(endCoordinates.height);
        animateOnKeyboard(0);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      animateOnKeyboard(1);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backdropHeight = backdropContainerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ['35%', '100%'],
  });

  const containerTop = containerTopPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [`${40 - keyboardHeightPercentage / 1.25}%`, '30%', '100%'],
  });

  const buttonContainerPaddingBottom = containerTopPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [keyboardHeight, 0],
  });

  const appIntroOpacity = containerTopPosition;

  return { backdropHeight, containerTop, buttonContainerPaddingBottom, appIntroOpacity };
};

export default Animation;
