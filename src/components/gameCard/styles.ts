import { StyleSheet } from 'react-native';

import { Elevation } from '@constants';
import { globalStyles } from '@themes';
import { getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      maxWidth: '50%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.all.surfaceContainer,
    },
    image: {
      width: '100%',
      aspectRatio: 16 / 10,
    },
    gradientContainer: {
      ...globalStyles.flex1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 4,
    },
    ageRating: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: theme.all.surfaceContainerHighest,
      padding: 2,
      borderBottomRightRadius: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
    },
    content: {
      padding: 10,
      gap: 2,
      ...getShadowStyle(Elevation.level1),
    },
    cardHeadRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      flex: 1,
      flexDirection: 'row',
    },
    topRatingCategory: {
      textTransform: 'capitalize',
      backgroundColor: theme.all.surfaceDim,
      borderRadius: 15,
      paddingHorizontal: 4,
      paddingVertical: 2,
    },
    genre: {
      color: theme.all.inverseSurface,
    },
    addToCollection: {
      ...globalStyles.rowCenter,
      marginTop: 5,
      gap: 3,
      padding: 5,
      borderRadius: 15,
      backgroundColor: theme.all.inverseOnSurface,
    },
  });
};

export const shimmerStyle = StyleSheet.create({
  shimmer: {
    flex: 1,
    maxWidth: '50%',
    aspectRatio: 16 / 11,
    borderRadius: 4,
  },
});

export default ThemedStyles;
