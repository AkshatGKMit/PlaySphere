import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { View, Modal, Pressable, Keyboard, StyleProp, ViewStyle, Dimensions } from 'react-native';

import { globalStyles } from '@themes';
import useScalingMetrics from '@config/useScalingMetrics';
import useStyles from '@config/useStyles';

import ThemedStyles from './styles';

const DialogContainer = forwardRef<DialogRef>((_, ref) => {
  const { hp } = useScalingMetrics();

  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<RefManagerParams | null>(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const windowHeight = Dimensions.get('window').height;

  function showModal(params: RefManagerParams) {
    setData(params);
    setVisible(true);
  }

  function hideModal(onClose?: () => void) {
    onClose?.();
    setVisible(false);
    setData(null);
  }

  useImperativeHandle(ref, () => ({
    show: (params: RefManagerParams) => showModal(params),
    hide: (onClose?: () => void) => hideModal(onClose),
  }));

  const styles = useStyles(ThemedStyles);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        const { height } = endCoordinates;
        if (!keyboardOffset && Keyboard.isVisible()) {
          setKeyboardOffset(height);
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remainingWindowPercentage = useMemo(
    () => (keyboardOffset / windowHeight) * 200,
    [keyboardOffset, windowHeight],
  );

  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.container,
      keyboardOffset
        ? {
            top: `${remainingWindowPercentage - 40}%`,
            maxHeight: hp(remainingWindowPercentage - 10),
          }
        : null,
    ],
    [hp, keyboardOffset, remainingWindowPercentage, styles.container],
  );

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={isVisible}
    >
      {data && (
        <View style={[globalStyles.flex1, globalStyles.positionRelative]}>
          <Pressable
            onPress={() => {
              hideModal();
            }}
            style={styles.dialog}
          />
          <View style={containerStyles}>{data.child}</View>
        </View>
      )}
    </Modal>
  );
});

export default DialogContainer;
