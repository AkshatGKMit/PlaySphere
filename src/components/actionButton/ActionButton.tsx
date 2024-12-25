import React from 'react';
import { View, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import useStyles from '@config/useStyles';
import { Typography } from '@constants';

import ThemedStyles from './styles';

const ActionButton = ({
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  loading,
  style,
  fontWeight,
  typography,
  iconSize,
  color,
}: ActionButtonProps) => {
  const { animatePressIn, pressOut, rippleContainerStyle, rippleStyles } = useRippleEffect();
  const styles = useStyles(ThemedStyles);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animatePressIn}
      onPressOut={pressOut}
      style={rippleContainerStyle}
    >
      <View style={[styles.buttonContainer, style]}>
        {loading ? (
          <Loader color={styles.label.color} />
        ) : (
          <>
            {leadingIcon && (
              <Icon
                icon={leadingIcon}
                color={color ?? styles.label.color}
                size={iconSize}
              />
            )}
            <TextBlock
              color={color ?? styles.label.color}
              typography={typography ?? Typography.bodyLarge}
              fontWeight={fontWeight}
            >
              {label}
            </TextBlock>
            {trailingIcon && (
              <Icon
                icon={trailingIcon}
                color={color ?? styles.label.color}
                size={iconSize}
              />
            )}
          </>
        )}
      </View>
      <Animated.View style={rippleStyles} />
    </Pressable>
  );
};

export default ActionButton;
