import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import RatingStars from '@components/ratingStars';
import TextBlock from '@components/textBlock';
import { FontWeight, IMAGES, Typography } from '@constants';
import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

const GameImage = ({ uri, styles, ageRating, ageRatingStyles, rating }: GamCardImageViewProps) => {
  return (
    <FastImage
      defaultSource={IMAGES.GAME_COVER}
      source={{ uri }}
      style={styles.image}
      resizeMode="stretch"
    >
      <LinearGradient
        colors={[colorWithOpacity(Colors.black, 0.15), Colors.black]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={globalStyles.flex1}
      >
        <View style={styles.gradientContainer}>
          {ageRating ? (
            <TextBlock
              typography={Typography.labelSmall}
              fontWeight={FontWeight.black}
              style={ageRatingStyles}
            >
              {ageRating?.age}+
            </TextBlock>
          ) : null}
          <View style={styles.ratingContainer}>{rating ? RatingStars(rating) : null}</View>
        </View>
      </LinearGradient>
    </FastImage>
  );
};

export default memo(GameImage);
