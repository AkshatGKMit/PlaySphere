import { StyleSheet } from 'react-native';

import { Elevation, Opacity } from '@constants';
import { Colors } from '@themes';
import { colorWithOpacity, getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, focus: boolean) => {
  return StyleSheet.create({
    button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.all.surfaceContainerHigh,
      padding: 8,
      gap: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: focus ? theme.primaryText : Colors.transparent,
    },
    buttonText: {
      marginRight: 'auto',
    },
    list: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: theme.all.surfaceContainerHigh,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 0.8,
      borderColor: theme.primaryText,
    },
    listView: {
      ...getShadowStyle(Elevation.level2),
    },
    listSeparator: {
      width: 'auto',
      height: 0.75,
      backgroundColor: colorWithOpacity(theme.all.outline, Opacity.level3),
      marginHorizontal: 12,
      marginVertical: 1,
    },
    item: {
      flexDirection: 'row',
      gap: 10,
      paddingLeft: 12,
      paddingVertical: 10,
      paddingRight: 30,
    },
    itemLabel: {},
  });
};

export default ThemedStyles;
