import { StyleSheet } from 'react-native';

import { globalStyles } from '@themes';

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

export default ThemedStyles;
