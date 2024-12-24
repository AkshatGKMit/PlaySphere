import React from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import useStyles from '@config/useStyles';
import { Typography } from '@constants';
import { globalStyles } from '@themes';

const ActionButton = ({
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  loading,
  style,
  fontWeight,
  typography,
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
                color={styles.label.color}
              />
            )}
            <TextBlock
              color={styles.label.color}
              typography={typography ?? Typography.bodyLarge}
              fontWeight={fontWeight}
            >
              {label}
            </TextBlock>
            {trailingIcon && (
              <Icon
                icon={trailingIcon}
                color={styles.label.color}
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

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    buttonContainer: {
      ...globalStyles.rowCenter,
      gap: 10,
      minWidth: '100%',
      paddingVertical: 12,
      paddingHorizontal: 40,
      backgroundColor: theme.primaryText,
      borderRadius: 6,
    },
    label: {
      color: theme.main,
    },
  });
};
