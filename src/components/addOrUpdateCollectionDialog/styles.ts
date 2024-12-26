import { StyleSheet } from 'react-native';

import { globalStyles } from '@themes';

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    dialogContainer: {
      position: 'relative',
      backgroundColor: theme.all.surfaceContainerHigh,
      padding: 15,
      borderRadius: 20,
      minWidth: '100%',
      gap: 15,
    },
    buttonView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    buttonButton: {
      ...globalStyles.flex1,
      ...globalStyles.rowCenter,
      marginTop: 5,
      gap: 3,
      padding: 10,
      borderRadius: 15,
      backgroundColor: theme.all.surfaceContainerLow,
    },
    createButton: {
      backgroundColor: theme.primaryText,
      color: theme.inverted.primaryText,
    },
  });
};

export default ThemedStyles;
