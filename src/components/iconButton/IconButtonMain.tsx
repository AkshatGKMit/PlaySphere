import React, { memo } from 'react';
import { Animated, Pressable, View } from 'react-native';

import Icon from '@components/icon';
import useRippleEffect from '@config/useRippleEffect';
import { ICON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

const { THEME, MEASUREMENTS, STANDARD } = ICON_BUTTON_CONSTANTS;

const { CONTAINER_SIZE, SHAPE, ICON_SIZE } = MEASUREMENTS;

const {
  DISABLED_CONTAINER,
  DISABLED_CONTAINER_OPACITY,
  DISABLED_ICON_COLOR,
  DISABLED_ICON_OPACITY,
} = THEME;
const { CONTAINER_COLOR } = STANDARD.THEME;

const IconButtonMain = (props: IconButtonMainProps) => {
  const theme = useAppSelector((state) => state.theme.colors);
  const { animatePressIn, pressOut, rippleContainerStyle, rippleStyles } = useRippleEffect();

  const { icon, disabled, backgroundColor, color, onPress, borderColor, borderWidth, size } = props;

  const containerColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_CONTAINER], DISABLED_CONTAINER_OPACITY)
    : backgroundColor ?? theme.all[CONTAINER_COLOR];

  const iconColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_ICON_COLOR], DISABLED_ICON_OPACITY)
    : color ?? theme.primaryText;

  return (
    <Pressable
      onPressIn={animatePressIn}
      onPressOut={pressOut}
      onPress={onPress}
    >
      <View
        style={[
          {
            height: CONTAINER_SIZE,
            width: CONTAINER_SIZE,
            backgroundColor: containerColor,
            borderRadius: SHAPE,
            borderColor,
            borderWidth,
          },
          globalStyles.columnCenter,
          rippleContainerStyle,
        ]}
      >
        <Icon
          icon={icon}
          color={iconColor}
          size={size ?? ICON_SIZE}
        />
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default memo(IconButtonMain);
