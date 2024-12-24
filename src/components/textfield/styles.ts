import { StyleSheet } from 'react-native';

import { colorWithOpacity } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, isValue: boolean, focus: boolean, error: boolean) => {
  const placeholderOpacity = 0.75;

  const borderColor = error ? theme.all.error : focus ? theme.primaryText : theme.all.outline;
  const placeholderColor = error
    ? colorWithOpacity(theme.all.error, placeholderOpacity)
    : focus
    ? colorWithOpacity(theme.primaryText, placeholderOpacity)
    : colorWithOpacity(theme.all.onSurfaceVariant, placeholderOpacity);
  const contentColor = error
    ? theme.all.error
    : focus || isValue
    ? theme.primaryText
    : theme.all.onSurfaceVariant;

  return StyleSheet.create({
    textfieldContainer: {
      minWidth: '100%',
      minHeight: 45,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: focus ? 1 : 0.5,
      borderRadius: 5,
      borderColor,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      paddingHorizontal: 5,
      backgroundColor: theme.background,
      transform: [{ translateY: '-50%' }, { translateX: '25%' }],
    },
    placeholder: {
      color: placeholderColor,
    },
    content: {
      color: contentColor,
    },
    input: {
      flex: 1,
      color: contentColor,
    },
    error: {
      marginTop: 3,
      marginHorizontal: 5,
    },
    errorText: {
      color: theme.all.error,
    },
  });
};

export default ThemedStyles;
