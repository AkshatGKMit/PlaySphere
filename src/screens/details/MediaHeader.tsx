import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StatusBar, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { LANDSCAPE, OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import Video, { ControlsStyles, VideoRef } from 'react-native-video';

import Icon from '@components/icon';
import useShimmerColor from '@config/useShimmerColor';
import { IMAGES, Icons, isIos } from '@constants';
import { Colors, globalStyles } from '@themes';

const Shimmer = ({ styles, theme }: DetailsThemeStyleProps) => {
  const { backgroundColor } = useShimmerColor(theme);

  return <Animated.View style={[styles.mediaShimmer, { backgroundColor }]} />;
};

const controlStyles = (isFullScreen: boolean): ControlsStyles => ({
  hideFullscreen: !isFullScreen,
  hideNavigationBarOnFullScreenMode: true,
  hideNotificationBarOnFullScreenMode: true,
  hideSettingButton: true,
  hidePrevious: true,
  hideNext: true,
});

const VideoHeader = ({ movie, styles, setIsVideo }: DetailsVideoHeaderProps) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    StatusBar.setHidden(fullScreen);
    StatusBar.setTranslucent(fullScreen);
  }, [fullScreen]);

  const showLandscape = useMemo(() => fullScreen, [fullScreen]);

  const { data, preview } = movie;

  return (
    <View style={styles.media}>
      <OrientationLocker orientation={showLandscape ? LANDSCAPE : PORTRAIT} />
      <Video
        ref={videoRef}
        source={{ uri: data.max }}
        controls
        style={globalStyles.flex1}
        resizeMode="contain"
        controlsStyles={controlStyles(fullScreen)}
        fullscreenOrientation="landscape"
        onFullscreenPlayerDidPresent={() => setFullScreen(true)}
        onFullscreenPlayerWillPresent={() => setFullScreen(true)}
        onFullscreenPlayerDidDismiss={() => setFullScreen(false)}
        onFullscreenPlayerWillDismiss={() => setFullScreen(false)}
        onControlsVisibilityChange={({ isVisible }) => setControlsVisible(isVisible)}
        hideShutterView
        muted={false}
        poster={{ source: { uri: preview } }}
        onEnd={() => {
          videoRef.current?.setFullScreen(false);
          setIsVideo(false);
        }}
      />
      {controlsVisible || isIos ? (
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={() => videoRef.current?.setFullScreen(true)}
        >
          <Icon
            icon={Icons.materialIcons.fullscreen}
            color={Colors.white}
            size={30}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const MediaHeader = ({
  game,
  isVideo,
  setIsVideo,
  movies,
  styles,
  theme,
}: DetailsMediaHeaderProps) => {
  if (!game) {
    return (
      <Shimmer
        styles={styles}
        theme={theme}
      />
    );
  }

  if (isVideo && movies && movies[0]) {
    return (
      <VideoHeader
        setIsVideo={setIsVideo}
        movie={movies[0]}
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
      style={styles.media}
    >
      <OrientationLocker orientation={PORTRAIT} />
      {movies && movies[0] ? (
        <View style={styles.mediaContainer}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsVideo(true)}
          >
            <Icon
              icon={Icons.materialIcons.playArrow}
              color={Colors.white}
              size={40}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </FastImage>
  );
};

export default MediaHeader;
