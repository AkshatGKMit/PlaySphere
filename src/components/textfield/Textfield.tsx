import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Typography } from '@constants';

import ThemedStyles from './styles';

const Textfield = forwardRef<Partial<TextInput>, TextFieldProps>((props, ref) => {
  const { placeholder, leadingIcon, trailingIcon, onPressTrailingIcon, style, error, value } =
    props;

  const inputRef = useRef<TextInput>(null);

  const [focus, setFocus] = useState(false);
  const styles = useStyles((theme) => ThemedStyles(theme, !!value, focus, !!error));

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    isFocused: () => inputRef.current?.isFocused() ?? false,
  }));

  return (
    <View>
      <View style={styles.textfieldContainer}>
        {leadingIcon ? (
          <Icon
            icon={leadingIcon}
            color={styles.content.color}
            size={18}
          />
        ) : null}
        <TextInput
          ref={inputRef}
          {...props}
          placeholder={!focus ? placeholder : ''}
          placeholderTextColor={styles.placeholder.color}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={[styles.input, style]}
          autoCorrect={false}
          selectionColor={styles.content.color}
        />
        {trailingIcon ? (
          <Pressable onPress={onPressTrailingIcon}>
            <Icon
              icon={trailingIcon}
              color={styles.content.color}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <TextBlock
          typography={Typography.labelSmall}
          color={styles.errorText.color}
          style={styles.error}
        >
          {error}
        </TextBlock>
      ) : null}
    </View>
  );
});

export default Textfield;
