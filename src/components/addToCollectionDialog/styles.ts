import { StyleSheet } from 'react-native';

import { Opacity } from '@constants';
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
    content: {
      paddingHorizontal: 5,
      minHeight: 200,
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
      borderRadius: 20,
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
    },
    selectedCollection: {
      borderColor: theme.primaryText,
    },
    collectionName: {
      textTransform: 'capitalize',
    },
    separator: {
      width: '100%',
      height: 0.8,
      backgroundColor: theme.all.outline,
      opacity: Opacity.level4,
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
  });
};

export default ThemedStyles;
