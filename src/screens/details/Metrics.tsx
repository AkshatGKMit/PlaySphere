import React from 'react';
import { Animated, View } from 'react-native';

import TextBlock from '@components/textBlock';
import useShimmerColor from '@config/useShimmerColor';
import { FontWeight, Typography } from '@constants';
import { parseDateString } from '@utility/helpers';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return (
    <View style={styles.contentSection}>
      <Animated.View style={[styles.contentHeadingShimmer, { backgroundColor }]} />
      {Array.from({ length: 4 }).map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.metricsValueShimmer, { backgroundColor }]}
        />
      ))}
    </View>
  );
};

const Metrics = ({
  isPending,
  released,
  metaCritic,
  ratedFor,
  styles,
  playtime,
  theme,
}: DetailsMetricsProps) => {
  if (isPending) {
    return (
      <Shimmer
        styles={styles}
        theme={theme}
      />
    );
  }

  return (
    <View style={styles.contentSection}>
      <TextBlock
        typography={Typography.titleLarge}
        fontWeight={FontWeight.bold}
      >
        Metrics
      </TextBlock>
      {released ? (
        <TextBlock>
          Release Date:{' '}
          <TextBlock fontWeight={FontWeight.semibold}>{parseDateString(released)}</TextBlock>
        </TextBlock>
      ) : null}
      {metaCritic ? (
        <TextBlock>
          Critics Score: <TextBlock fontWeight={FontWeight.semibold}>{metaCritic}%</TextBlock>
        </TextBlock>
      ) : null}
      {ratedFor ? (
        <TextBlock>
          Rated For: <TextBlock fontWeight={FontWeight.semibold}>{ratedFor.age}+</TextBlock>
        </TextBlock>
      ) : null}
      {playtime ? (
        <TextBlock>
          Average Playtime: <TextBlock fontWeight={FontWeight.semibold}>{playtime} Hours</TextBlock>
        </TextBlock>
      ) : null}
    </View>
  );
};

export default Metrics;
