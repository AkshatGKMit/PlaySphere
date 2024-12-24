import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { IMAGES } from '@constants';
import { globalStyles } from '@themes';

const BannerImageView = () => {
  return (
    <View style={styles.bannerImageContainer}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Image
          key={index}
          source={IMAGES.PHOTO_COLLAGE}
          style={styles.bannerImage}
        />
      ))}
    </View>
  );
};

export default BannerImageView;

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
