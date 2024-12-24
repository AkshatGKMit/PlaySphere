import React, { useEffect, useMemo, useState } from 'react';
import { View, Animated, Easing, useAnimatedValue } from 'react-native';

import TextBlock from '@components/textBlock';
import { FontWeight, Typography } from '@constants';

const RatingCategoryContainer = ({ rating, styles }: DetailsRatingCategoryContainerProps) => {
  const { percent, title } = rating;

  const [barWidth, setBarWidth] = useState(0);
  const widthAnimatedValue = useAnimatedValue(0);

  useEffect(() => {
    widthAnimatedValue.setValue(0);
    Animated.timing(widthAnimatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [widthAnimatedValue]);

  const width = widthAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (percent * barWidth) / 100],
  });

  const ratingAnimatedStyles = useMemo(
    () => [styles.ratingAnimatedContainer, { width }],
    [styles.ratingAnimatedContainer, width],
  );

  return (
    <View style={styles.ratingWrapper}>
      <TextBlock
        style={styles.ratingTitle}
        fontWeight={FontWeight.semibold}
      >
        {title}:
      </TextBlock>
      <View
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        style={styles.ratingContainer}
      >
        <Animated.View style={ratingAnimatedStyles} />
      </View>
      <TextBlock typography={Typography.bodySmall}>
        {percent.toFixed(1)}
        <TextBlock typography={Typography.labelSmall}>%</TextBlock>
      </TextBlock>
    </View>
  );
};

const Ratings = ({ ratings, styles }: DetailsRatingsProps) => {
  return (
    <>
      <View style={styles.separator} />
      <View style={styles.contentSection}>
        <TextBlock
          typography={Typography.titleLarge}
          fontWeight={FontWeight.bold}
        >
          Ratings
        </TextBlock>
        {ratings?.map((ratingCategory) => {
          const { id } = ratingCategory;
          return (
            <RatingCategoryContainer
              key={id}
              rating={ratingCategory}
              styles={styles}
            />
          );
        })}
      </View>
    </>
  );
};

export default Ratings;
