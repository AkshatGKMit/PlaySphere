import { StyleSheet } from 'react-native';

import { globalStyles } from '@themes';

const styles = StyleSheet.create({
  bannerImageContainer: {
    ...globalStyles.fullPositionAbsolute,
    zIndex: -1,
    transform: [
      { rotateZ: '-20deg' },
      { rotateX: '50deg' },
      { rotateY: '10deg' },
      { translateX: '-60%' },
      { translateY: '-65%' },
      { scale: 0.55 },
    ],
  },
  bannerImage: { width: '100%', aspectRatio: 16 / 9 },
});

export default styles;
