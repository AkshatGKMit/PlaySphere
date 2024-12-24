import React from 'react';
import { Animated, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import TextBlock from '@components/textBlock';
import useShimmerColor from '@config/useShimmerColor';
import { FontWeight, IMAGES, Typography } from '@constants';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return (
    <View style={styles.contentSection}>
      <Animated.View style={[styles.contentHeadingShimmer, { backgroundColor }]} />
      <View style={styles.screenshotShimmerContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.screenshotShimmer, { backgroundColor }]}
          />
        ))}
      </View>
    </View>
  );
};

const Screenshots = ({ isPending, screenshots, styles, theme }: DetailsScreenshotsProps) => {
  if (isPending) {
    return (
      <Shimmer
        styles={styles}
        theme={theme}
      />
    );
  }

  return (
    <>
      <View style={styles.separator} />
      <View style={styles.contentSection}>
        <TextBlock
          typography={Typography.titleLarge}
          fontWeight={FontWeight.bold}
        >
          Screenshots
        </TextBlock>
        <ScrollView
          contentContainerStyle={styles.screenshotContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {screenshots.map(({ id, image }) => (
            <FastImage
              key={id}
              defaultSource={IMAGES.GAME_COVER}
              source={{ uri: image }}
              style={styles.screenshot}
              resizeMode="stretch"
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Screenshots;
