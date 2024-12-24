import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Elevation, Typography } from '@constants';
import { globalStyles } from '@themes';
import { colorWithOpacity, getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
  return StyleSheet.create({
    screen: {
      ...globalStyles.flex1,
      backgroundColor: theme.all.surfaceContainerLowest,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    searchContainer: {
      marginTop: insets.top + 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 50,
      padding: 10,
      backgroundColor: theme.all.surfaceContainer,
      borderRadius: 10,
      gap: 8,
      ...getShadowStyle(Elevation.level4),
    },
    textInput: {
      flex: 1,
      color: theme.primaryText,
      fontFamily: Typography.bodyLarge.fontFamily,
      fontSize: Typography.bodyLarge.fontSize,
    },
    placeholder: {
      color: colorWithOpacity(theme.primaryText, 0.75),
    },
    listContentStyle: {
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
    noResultFound: {
      flex: 1,
      margin: 20,
      textAlign: 'center',
    },
  });
};

export default ThemedStyles;
