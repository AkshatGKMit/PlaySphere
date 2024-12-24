import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Elevation, Opacity } from '@constants';
import { Colors, globalStyles } from '@themes';
import { colorWithOpacity, getShadowStyle } from '@utility/style';

const ThemedStyles = (theme: ThemeColors, insets: EdgeInsets) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    statusBar: {
      paddingTop: insets.top,
    },
    absoluteBackButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      marginTop: insets.top + 10,
      marginLeft: 7,
      borderRadius: 20,
      padding: 4,
      backgroundColor: colorWithOpacity(Colors.black, 0.75),
    },
    image: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    mediaContainer: {
      ...globalStyles.flex1,
      ...globalStyles.columnCenter,
      backgroundColor: colorWithOpacity(Colors.black, 0.25),
    },
    playButton: {
      padding: 6,
      backgroundColor: colorWithOpacity(Colors.black, 0.5),
      borderRadius: 30,
    },
    scrollView: {
      paddingBottom: insets.bottom,
    },
    stickyContainer: {
      flexDirection: 'row',
      padding: 10,
      marginBottom: 5,
    },
    stickyBackButton: {
      paddingTop: 5,
    },
    headerContainer: {
      flex: 1,
      gap: 10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleHeader: {
      flex: 1,
      gap: 5,
    },
    title: {
      flex: 1,
    },
    secondaryTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    starContainer: {
      flexDirection: 'row',
    },
    separator: {
      maxWidth: '100%',
      height: 1,
      backgroundColor: colorWithOpacity(theme.all.outline, Opacity.level4),
      marginVertical: 5,
      marginHorizontal: 10,
    },
    contentSection: {
      paddingHorizontal: 10,
      marginVertical: 5,
      gap: 5,
    },
    aboutContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    screenshotContainer: {
      gap: 10,
    },
    screenshot: {
      height: 150,
      aspectRatio: 16 / 9,
      borderRadius: 4,
    },
    readMoreText: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
    },
    metricContainer: {
      flexDirection: 'row',
      gap: 0,
    },
    ratingWrapper: {
      position: 'relative',
      flexDirection: 'row',
      gap: 5,
    },
    ratingTitle: {
      minWidth: '30%',
      textTransform: 'capitalize',
    },
    ratingContainer: {
      flex: 1,
      maxWidth: '70%',
      height: 10,
      backgroundColor: theme.all.surfaceContainerHigh,
      borderRadius: 5,
      overflow: 'hidden',
    },
    ratingAnimatedContainer: {
      flex: 1,
      backgroundColor: theme.primaryText,
    },
    wrapContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 5,
    },
    chip: {
      alignSelf: 'baseline',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 12,
      backgroundColor: theme.all.surfaceContainerHigh,
      textTransform: 'capitalize',
    },
    mediaShimmer: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    stickyShimmerContainer: {
      width: '100%',
      flexDirection: 'column',
      gap: 5,
      padding: 10,
      backgroundColor: theme.background,
      ...getShadowStyle(Elevation.level3),
    },
    stickyShimmerContainerRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stickyHeadingTitleShimmer: {
      width: '75%',
      height: 30,
      borderRadius: 3,
    },
    stickyHeadingEndIconShimmer: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    stickyPlatformShimmerContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    stickyPlatformShimmer: {
      height: 18,
      width: 18,
      borderRadius: 10,
    },
    stickyStarShimmer: {
      height: 16,
      width: 16,
      borderRadius: 12,
    },
    contentShimmerContainer: {
      paddingHorizontal: 10,
      marginVertical: 5,
      gap: 5,
    },
    contentHeadingShimmer: {
      height: 32,
      width: '35%',
      borderRadius: 4,
    },
    metricsValueShimmer: {
      height: 15,
      width: '50%',
      borderRadius: 12,
    },
    aboutShimmerContainer: {
      flexDirection: 'column',
      gap: 3,
    },
    aboutLineShimmer: {
      height: 14,
      width: '100%',
      borderRadius: 12,
    },
    aboutReadMoreShimmer: {
      height: 15,
      width: '20%',
      borderRadius: 12,
    },
    screenshotShimmerContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    screenshotShimmer: {
      height: 150,
      aspectRatio: 16 / 9,
      borderRadius: 4,
    },
  });
};

export default ThemedStyles;
