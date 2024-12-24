import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Pressable,
  Modal,
  Animated,
  LayoutChangeEvent,
  useAnimatedValue,
} from 'react-native';

import TextBlock from '@components/textBlock';
import Icon from '@components/icon';
import useScalingMetrics from '@config/useScalingMetrics';
import useStyles from '@config/useStyles';
import { DefaultObjectLayout, FontWeight, Icons } from '@constants';
import { globalStyles } from '@themes/globalStyles';

import RenderList from './RenderList';
import ThemedStyles from './styles';

const Dropdown = ({ value, items, onSelect, hint, buttonInitials }: DropdownProps) => {
  const { windowHeight, windowWidth } = useScalingMetrics();

  const [isFocus, setFocus] = useState(false);
  const [buttonLayout, setButtonLayout] = useState<ObjectLayout>(DefaultObjectLayout);
  const [listLayout, setListLayout] = useState<ObjectLayout>(DefaultObjectLayout);

  const opacityAnim = useAnimatedValue(0);

  const styles = useStyles((theme) => ThemedStyles(theme, isFocus));

  const animate = useCallback(() => {
    opacityAnim.setValue(0);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [opacityAnim]);

  useEffect(() => {
    if (isFocus) {
      animate();
    }
  }, [animate, isFocus]);

  const { top, left, minWidth, maxHeight } = listLayout;

  const listViewStyles = useMemo(
    () => [styles.listView, { opacity: opacityAnim }],
    [opacityAnim, styles.listView],
  );

  const listStyles = useMemo(
    () => [styles.list, { top, left, minWidth, maxHeight }],
    [left, maxHeight, minWidth, styles.list, top],
  );

  const maxDropdownHeight = useMemo(() => windowHeight / 3, [windowHeight]);

  const _measureButton = useCallback(
    (e: LayoutChangeEvent) => {
      e.target.measureInWindow((x, y, width, height) => {
        const buttonTop = y + height;
        const buttonLeft = x;

        setButtonLayout({
          width,
          height,
          top: buttonTop,
          left: buttonLeft,
          bottom: y + height,
          right: x + width,
        });

        setListLayout({
          width: Math.floor(width),
          height: Math.floor(height),
          top: Math.floor(buttonTop + 4),
          bottom: Math.floor(buttonTop + height),
          left: Math.floor(buttonLeft),
          right: Math.floor(buttonLeft + width),
          minWidth: Math.floor(width),
          maxHeight: maxDropdownHeight,
        });
      });
    },
    [maxDropdownHeight],
  );

  const _measureList = useCallback(
    (e: LayoutChangeEvent) => {
      const { height, width, x, y } = e.nativeEvent.layout;

      const rightPos = x + width;
      const bottomPos = y + height;

      const shouldMoveToLeft = rightPos > windowWidth;
      const shouldMoveToTop = bottomPos > windowHeight;

      if (shouldMoveToLeft) {
        //* Calculation -> Current X Position - (Right Position - Button Right Position)
        const newLeftPos = x - (rightPos - buttonLayout.right);
        setListLayout((prevLayout) => ({ ...prevLayout, left: newLeftPos }));
      }

      if (shouldMoveToTop) {
        //* Calculation -> Current Y Position - (2 * Custom Gap Between Button and List) - list height - button height
        let newTopPos = y - height - buttonLayout.height;
        setListLayout((prevLayout) => ({ ...prevLayout, top: newTopPos }));
      }
    },
    [buttonLayout.height, buttonLayout.right, windowHeight, windowWidth],
  );

  const onClose = useCallback(() => {
    setFocus(!isFocus);
    setListLayout(DefaultObjectLayout);
    setButtonLayout(DefaultObjectLayout);
  }, [isFocus]);

  return (
    <View style={globalStyles.flex1}>
      <Pressable
        onPress={() => setFocus((prevFocus) => !prevFocus)}
        onLayout={_measureButton}
        style={globalStyles.flex1}
      >
        <View style={styles.button}>
          <TextBlock style={styles.buttonText}>
            {buttonInitials}
            {value ? ' : ' : ''}
            <TextBlock fontWeight={FontWeight.bold}>{value ? value.label : hint}</TextBlock>
          </TextBlock>
          <Icon icon={Icons.materialIcons.arrowDropDown} />
        </View>
      </Pressable>
      <Modal
        transparent
        visible={isFocus}
        supportedOrientations={['portrait']}
        onRequestClose={onClose}
      >
        <Pressable
          style={globalStyles.flex1}
          onPress={() => setFocus(false)}
          children={
            <RenderList
              items={items}
              onLayout={_measureList}
              onSelect={onSelect}
              setFocus={setFocus}
              styles={styles}
              listStyles={listStyles}
              listViewStyles={listViewStyles}
            />
          }
        />
      </Modal>
    </View>
  );
};

export default memo(Dropdown);
