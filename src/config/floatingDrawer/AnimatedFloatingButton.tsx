import React, { useEffect } from 'react';
import { useAnimatedValue, Animated, Pressable } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import { Typography, FontWeight } from '@constants';

const AnimatedFloatingButton = ({
  icon,
  name,
  onPress,
  index,
  styles,
  color,
}: FloatingDrawerButtonProps) => {
  const translateXValue = useAnimatedValue(0);

  const delay = index * 50;

  useEffect(() => {
    translateXValue.setValue(0);
    Animated.timing(translateXValue, {
      toValue: 1,
      duration: delay + 300,
      delay,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateX = translateXValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });

  return (
    <Pressable
      style={styles.pressable}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, { transform: [{ translateX }] }]}>
        <Icon
          icon={icon}
          size={20}
          color={color}
        />
        <TextBlock
          typography={Typography.titleMedium}
          fontWeight={FontWeight.bold}
          color={color}
        >
          {name}
        </TextBlock>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedFloatingButton;
