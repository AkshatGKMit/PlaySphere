import { StyleSheet } from 'react-native';

import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    dialogContainer: {
      position: 'relative',
      backgroundColor: theme.all.surfaceContainerHigh,
      padding: 12,
      borderRadius: 12,
      minWidth: '100%',
      gap: 10,
    },
    closeIcon: {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      right: 0,
      margin: 14,
      backgroundColor: colorWithOpacity(Colors.black, 0.5),
      padding: 5,
      borderRadius: 4,
    },
    dialogHeading: {
      paddingLeft: 5,
      paddingVertical: 5,
    },
    scrollView: {
      maxHeight: 100,
    },
    content: {
      paddingHorizontal: 5,
      maxHeight: 200,
      minHeight: 100,
    },
    noContentContainer: {
      ...globalStyles.flex1,
      ...globalStyles.columnCenter,
      gap: 5,
    },
    addToCollection: {
      ...globalStyles.rowCenter,
      marginTop: 5,
      gap: 3,
      padding: 10,
      backgroundColor: theme.primaryText,
    },
    addNewCollectionContainer: {
      marginTop: 10,
      flexDirection: 'column',
      gap: 8,
    },
    collectionContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 5,
    },
    collection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      gap: 10,
      backgroundColor: theme.all.surfaceContainerHighest,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Colors.transparent,
      overflow: 'hidden',
    },
    selectedCollection: {
      borderColor: theme.all.outlineVariant,
    },
    collectionName: {
      textTransform: 'capitalize',
    },
    separatorContainer: {
      position: 'relative',
      ...globalStyles.rowCenter,
      maxWidth: '100%',
      gap: 10,
    },
    separator: {
      flex: 1,
      height: 0.8,
      backgroundColor: theme.all.outline,
    },
    buttonView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    buttonContainer: {
      ...globalStyles.flex1,
      ...globalStyles.rowCenter,
      marginTop: 5,
      gap: 3,
      padding: 10,
      borderRadius: 15,
      backgroundColor: theme.all.surfaceContainerLowest,
    },
    createButton: {
      backgroundColor: theme.primaryText,
      color: theme.inverted.primaryText,
    },
    loaderOverlay: {
      ...globalStyles.fullPositionAbsolute,
      ...globalStyles.rowCenter,
      borderRadius: 30,
      backgroundColor: colorWithOpacity(Colors.black, 0.75),
    },
  });
};

export default ThemedStyles;
