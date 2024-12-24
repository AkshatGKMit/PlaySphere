import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from '@components/icon';
import useShimmerColor from '@config/useShimmerColor';
import { IMAGES, Icons } from '@constants';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return <Animated.View style={[styles.mediaShimmer, { backgroundColor }]} />;
};

const MediaHeader = ({ game, styles, theme }: DetailsMediaHeaderProps) => {
  if (!game) {
    return (
      <Shimmer
        styles={styles}
        theme={theme}
      />
    );
  }

  const { backgroundImage } = game;

  return (
    <FastImage
      defaultSource={IMAGES.GAME_COVER}
      source={{ uri: backgroundImage }}
      style={styles.image}
    >
      <View style={styles.mediaContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {}}
        >
          <Icon
            icon={Icons.materialIcons.playArrow}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </FastImage>
  );
};

export default MediaHeader;
