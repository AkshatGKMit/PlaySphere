import React from 'react';
import { View, Image } from 'react-native';

import { IMAGES, TestIds } from '@constants';

import styles from './styles';

const { mainComponentWrapper: mainComponentWrapperTestId, image: imageTestId } =
  TestIds.unit.bannerImageView;

const BannerImageView = () => {
  return (
    <View
      style={styles.bannerImageContainer}
      testID={mainComponentWrapperTestId}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Image
          key={index}
          source={IMAGES.PHOTO_COLLAGE}
          style={styles.bannerImage}
          testID={imageTestId(index)}
        />
      ))}
    </View>
  );
};

export default BannerImageView;
