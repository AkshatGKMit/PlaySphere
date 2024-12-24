import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import Icon from '@components/icon';
import RatingStars from '@components/ratingStars';
import SystemPlatformView from '@components/systemPlatforms';
import TextBlock from '@components/textBlock';
import useShimmerColor from '@config/useShimmerColor';
import { FontWeight, Icons, Typography } from '@constants';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return (
    <View style={styles.stickyShimmerContainer}>
      <View style={styles.stickyShimmerContainerRow}>
        <Animated.View style={[styles.stickyHeadingTitleShimmer, { backgroundColor }]} />
        <Animated.View style={[styles.stickyHeadingEndIconShimmer, { backgroundColor }]} />
      </View>
      <View style={styles.stickyShimmerContainerRow}>
        <View style={styles.stickyPlatformShimmerContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.stickyPlatformShimmer, { backgroundColor }]}
            />
          ))}
        </View>
        <View style={styles.stickyPlatformShimmerContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.stickyStarShimmer, { backgroundColor }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const StickyTitle = ({
  isPending,
  stickyContainerStyles,
  onLayout,
  showStickyButton,
  goBack,
  name,
  showAddToCollectionDialog,
  systemPlatformNames,
  rating,
  theme,
  styles,
}: DetailsStickyTitleProps) => {
  if (isPending) {
    return (
      <Shimmer
        styles={styles}
        theme={theme}
      />
    );
  }

  return (
    <View
      style={stickyContainerStyles}
      onLayout={onLayout}
    >
      <View style={styles.headerContainer}>
        {!showStickyButton ? (
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.8}
            style={styles.stickyBackButton}
          >
            <Icon
              icon={Icons.materialCommunityIcons.arrowLeft}
              size={24}
            />
          </TouchableOpacity>
        ) : null}
        <View style={styles.titleHeader}>
          <View style={styles.titleContainer}>
            <TextBlock
              typography={Typography.headlineMedium}
              fontWeight={FontWeight.heavy}
              style={styles.title}
              numberOfLines={2}
            >
              {name}
            </TextBlock>
            <TouchableOpacity
              onPress={showAddToCollectionDialog}
              activeOpacity={0.8}
            >
              <Icon
                icon={Icons.materialIcons.libraryAdd}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.secondaryTitleContainer}>
            {systemPlatformNames ? (
              <SystemPlatformView
                systemPlatforms={systemPlatformNames}
                starSize={18}
              />
            ) : null}
            <View style={styles.starContainer}>{RatingStars(rating, 18)}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StickyTitle;
