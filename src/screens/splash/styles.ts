import { StyleSheet } from 'react-native';

import { globalStyles } from '@themes';

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    screen: {
      ...globalStyles.flex1,
      backgroundColor: theme.background,
    },
    backgroundContainer: {
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
    },
  });
};

export default ThemedStyles;
