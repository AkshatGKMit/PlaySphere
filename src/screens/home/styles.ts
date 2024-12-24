import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Elevation } from '@constants';
import { getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
  return StyleSheet.create({
    header: {
      paddingTop: insets.top + 10,
      flexDirection: 'column',
      gap: 15,
      padding: 10,
      ...getShadowStyle(Elevation.level4),
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.all.surfaceContainerHighest,
      padding: 10,
      borderRadius: 10,
      gap: 8,
    },
  });
};

export default ThemedStyles;
