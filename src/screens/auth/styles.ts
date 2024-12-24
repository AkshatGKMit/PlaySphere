import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Colors, globalStyles } from '@themes';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
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
    mainContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      gap: 15,
      padding: 10,
      paddingHorizontal: 15,
      paddingBottom: insets.bottom + 5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: Colors.transparent,
      overflow: 'hidden',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 12,
    },
    heading: { marginVertical: 20 },
    button: { marginTop: 20 },
    authOptions: {
      flexDirection: 'row',
      gap: 4,
    },
    authOptionTextButton: {
      textDecorationLine: 'underline',
      textDecorationColor: theme.primaryText,
      textDecorationStyle: 'solid',
    },
    nonFieldErrorText: {
      width: '100%',
    },
    error: {
      color: theme.all.error,
    },
  });
};

export default ThemedStyles;
