import React, { memo } from 'react';
import { Animated } from 'react-native';

import useShimmerColor from '@config/useShimmerColor';

import { shimmerStyle } from './styles';

export const GameCardShimmer = memo(({ theme }: { theme: ThemeColors }) => {
  const { backgroundColor } = useShimmerColor(theme);

  return <Animated.View style={[shimmerStyle.shimmer, { backgroundColor }]} />;
});
