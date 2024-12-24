import React from 'react';
import { Animated, ScrollView, View } from 'react-native';

import TextBlock from '@components/textBlock';
import useShimmerColor from '@config/useShimmerColor';
import { FontWeight, Typography } from '@constants';
import { getColorForScore, parseDateString } from '@utility/helpers';

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

  const ratedStyles = [styles.ratedForValue, { backgroundColor: ratedFor?.color }];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContentSection}
      showsHorizontalScrollIndicator={false}
    >
      {released ? (
        <View style={styles.metricValueContainer}>
          <TextBlock fontWeight={FontWeight.semibold}>{parseDateString(released)}</TextBlock>
          <TextBlock typography={Typography.labelSmall}>Release Date</TextBlock>
        </View>
      ) : null}
      <View style={styles.metricValueSeparator} />
      {metaCritic ? (
        <View style={styles.metricValueContainer}>
          <TextBlock
            fontWeight={FontWeight.semibold}
            color={getColorForScore(metaCritic)}
          >
            {metaCritic}%
          </TextBlock>
          <TextBlock typography={Typography.labelSmall}>Critics</TextBlock>
        </View>
      ) : null}
      <View style={styles.metricValueSeparator} />
      {ratedFor ? (
        <View style={styles.metricValueContainer}>
          <TextBlock
            fontWeight={FontWeight.semibold}
            style={ratedStyles}
          >
            {ratedFor.age}+
          </TextBlock>
          <TextBlock typography={Typography.labelSmall}>Rated For</TextBlock>
        </View>
      ) : null}
      <View style={styles.metricValueSeparator} />
      {playtime ? (
        <View style={styles.metricValueContainer}>
          <TextBlock fontWeight={FontWeight.semibold}>{playtime} Hrs</TextBlock>
          <TextBlock typography={Typography.labelSmall}>Avg. Playtime</TextBlock>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Metrics;
