import React from 'react';
import { View, Animated, Pressable } from 'react-native';

import RenderHtml from '@components/renderHtml';
import TextBlock from '@components/textBlock';
import useShimmerColor from '@config/useShimmerColor';
import { FontWeight, Typography } from '@constants';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return (
    <View style={styles.contentSection}>
      <Animated.View style={[styles.contentHeadingShimmer, { backgroundColor }]} />
      <View style={styles.aboutShimmerContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.aboutLineShimmer, { backgroundColor }]}
          />
        ))}
        <Animated.View style={[styles.aboutReadMoreShimmer, { backgroundColor }]} />
      </View>
    </View>
  );
};

const About = ({
  isPending,
  showFullAbout,
  setShowFullAbout,
  description,
  styles,
  theme,
}: DetailsAboutProps) => {
  if (isPending || !description) {
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
        <View style={styles.aboutContainer}>
          <TextBlock
            typography={Typography.titleLarge}
            fontWeight={FontWeight.bold}
          >
            About
          </TextBlock>
          {showFullAbout ? (
            <Pressable onPress={() => setShowFullAbout(!showFullAbout)}>
              <TextBlock
                style={styles.readMoreText}
                color={theme.all.secondary}
              >
                Show Less
              </TextBlock>
            </Pressable>
          ) : null}
        </View>
        <RenderHtml
          html={description}
          maxLines={showFullAbout ? undefined : 5}
          children={
            <Pressable onPress={() => setShowFullAbout(!showFullAbout)}>
              <TextBlock
                style={styles.readMoreText}
                color={theme.all.secondary}
              >
                {showFullAbout ? 'Show Less' : 'Read More'}
              </TextBlock>
            </Pressable>
          }
        />
      </View>
    </>
  );
};

export default About;
