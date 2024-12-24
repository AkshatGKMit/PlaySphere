import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Elevation } from '@constants';
import { globalStyles } from '@themes';
import { getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
  return StyleSheet.create({
    screen: {
      ...globalStyles.flex1,
      backgroundColor: theme.all.surfaceContainerLowest,
    },
    header: {
      paddingTop: insets.top,
      flexDirection: 'column',
      gap: 10,
      padding: 10,
      ...getShadowStyle(Elevation.level4),
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
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
    listContentStyle: {
      gap: 10,
      position: 'relative',
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: insets.bottom + 10,
    },
    columnStyles: {
      gap: 8,
    },
    listHeaderContainer: {
      height: 45,
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 10,
      paddingBottom: 5,
      ...getShadowStyle(Elevation.level2),
    },
    listEmptyContainer: {
      gap: 8,
      flexDirection: 'column',
    },
    listEmptyRow: {
      gap: 8,
      flexDirection: 'row',
    },
  });
};

export default ThemedStyles;
