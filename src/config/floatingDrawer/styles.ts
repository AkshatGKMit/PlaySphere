import { StyleSheet } from 'react-native';

import { Elevation } from '@constants';
import { globalStyles, Colors } from '@themes';
import { colorWithOpacity, getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    drawerContainer: {
      position: 'absolute',
      top: '100%',
      zIndex: 10,
    },
    modalContainer: {
      ...globalStyles.fullPositionAbsolute,
      backgroundColor: colorWithOpacity(Colors.black, 0.5),
    },
    closeIcon: {
      maxWidth: 36,
      backgroundColor: theme.all.surfaceContainerHighest,
      padding: 8,
      borderRadius: 20,
    },
    buttonList: {
      flexDirection: 'column',
      gap: 25,
      maxWidth: '100%',
    },
    pressable: {
      maxWidth: '50%',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
      borderRadius: 4,
      padding: 12,
      backgroundColor: theme.all.surfaceContainerHigh,
      ...getShadowStyle(Elevation.level5),
    },
  });
};

export default ThemedStyles;
