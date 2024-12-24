import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Elevation } from '@constants';
import { Colors, globalStyles } from '@themes';
import { colorWithOpacity, getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
  return StyleSheet.create({
    screen: {
      ...globalStyles.flex1,
      backgroundColor: theme.all.surfaceContainerLowest,
    },
    header: {
      paddingTop: insets.top + 10,
      flexDirection: 'row',
      gap: 10,
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
    listContentStyle: {
      paddingTop: 10,
      gap: 10,
      position: 'relative',
      paddingHorizontal: 10,
      paddingBottom: insets.bottom + 10,
    },
    columnStyles: {
      gap: 8,
    },
    listHeaderContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 8,
      marginTop: 5,
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
    deleteButton: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: insets.bottom + 10,
      maxWidth: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colorWithOpacity(Colors.red, 0.5),
      padding: 8,
      borderRadius: 20,
    },
  });
};

export default ThemedStyles;
