import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Icon from '@components/icon';
import { AddToCollectionDialog } from '@components/addToCollectionDialog';
import Dialog from '@components/dialog';
import useStyles from '@config/useStyles';
import { Elevation, Icons } from '@constants';
import useGameDetailsQuery from '@network/hooks/useGameDetailsQuery';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { formatAgeRatingToAge } from '@utility/helpers';
import { getShadowStyle } from '@utility/style';

import About from './About';
import MediaHeader from './MediaHeader';
import Metrics from './Metrics';
import Ratings from './Ratings';
import Screenshots from './Screenshots';
import StickyTitle from './StickyTitle';
import Tags from './Tags';
import ThemedStyles from './styles';

const Details = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<RootStackParamList>>();
  const { goBack } = useNavigation<StackNavigation>();

  const { colors: theme } = useAppSelector((state) => state.theme);

  const scrollViewRef = useRef<ScrollView>(null);

  const [isVideo, setIsVideo] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollToTopCompleted, setScrollToTopCompleted] = useState(false);

  const [yOffset, setYOffset] = useState(0);
  const [showStickyButton, setShowStickyButton] = useState(true);
  const [stickyBackButtonTop, setStickyBackButtonTop] = useState<{ y: number; height: number }>({
    y: 0,
    height: 0,
  });
  const [stickyContainerTop, setStickyContainerTop] = useState<{ y: number; height: number }>({
    y: 0,
    height: 0,
  });
  const [showFullAbout, setShowFullAbout] = useState(false);

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const { id: gameId } = params! as { id: number };

  const { game, gameLoading, movies, screenshots } = useGameDetailsQuery(gameId);

  useEffect(() => {
    if (isVideo) {
      setIsSticky(true);
      if (!scrollToTopCompleted) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setScrollToTopCompleted(true);
      }
    } else if (yOffset === 0) {
      setIsSticky(false);
      setScrollToTopCompleted(false);
    }
  }, [isVideo, scrollToTopCompleted, yOffset]);

  useEffect(() => {
    const actualStickyBackButtonTop =
      stickyBackButtonTop.y + stickyBackButtonTop.height - insets.top;

    setShowStickyButton(
      isVideo || yOffset <= stickyContainerTop.y - actualStickyBackButtonTop - insets.top,
    );
  }, [insets.top, isVideo, stickyBackButtonTop, stickyContainerTop, yOffset]);

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { y, height } = nativeEvent.layout;

    setStickyBackButtonTop({ height, y });
  }, []);

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const isContainerOnTop = useMemo(
    () => (isSticky && yOffset > 0) || yOffset >= stickyContainerTop.y - insets.top,
    [insets.top, isSticky, stickyContainerTop.y, yOffset],
  );

  const topPadding = useMemo(
    () =>
      isSticky
        ? 0
        : isContainerOnTop && yOffset - stickyContainerTop.y < 0
        ? yOffset - stickyContainerTop.y + insets.top + 10
        : insets.top + 10,
    [insets.top, isContainerOnTop, isSticky, stickyContainerTop.y, yOffset],
  );

  const stickyContainerStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.stickyContainer,
      {
        backgroundColor: isContainerOnTop ? theme.all.surfaceContainerLowest : theme.background,
        paddingTop: isContainerOnTop && !isSticky ? topPadding : 10,
        ...getShadowStyle(Elevation.level2),
      },
    ],
    [
      isContainerOnTop,
      isSticky,
      styles.stickyContainer,
      theme.all.surfaceContainerLowest,
      theme.background,
      topPadding,
    ],
  );

  function showAddToCollectionDialog(): void {
    Dialog.show({ child: <AddToCollectionDialog game={game!} /> });
  }

  const systemPlatformNames = useMemo(
    () => game?.systemPlatforms?.map((platform) => platform.systemPlatform.name),
    [game?.systemPlatforms],
  );

  const ratedFor = useMemo(() => formatAgeRatingToAge(game?.ageRating), [game?.ageRating]);

  return (
    <View style={styles.screen}>
      {showStickyButton ? (
        <TouchableOpacity
          style={styles.absoluteBackButton}
          onPress={goBack}
          activeOpacity={0.8}
          onLayout={onLayout}
        >
          <Icon
            icon={Icons.materialCommunityIcons.arrowLeft}
            color={Colors.white}
            size={24}
          />
        </TouchableOpacity>
      ) : null}
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[isSticky ? 0 : 2]}
        scrollEnabled={yOffset >= 0 && !gameLoading}
        overScrollMode="never"
      >
        {isSticky ? (
          <View>
            <View style={styles.statusBar} />
            <MediaHeader
              isVideo={isVideo}
              setIsVideo={setIsVideo}
              game={game}
              movies={movies}
              styles={styles}
              theme={theme}
            />
            <StickyTitle
              isPending={!game}
              goBack={goBack}
              name={game?.name ?? ''}
              onLayout={(e) => {
                setStickyContainerTop({
                  y: e.nativeEvent.layout.y,
                  height: e.nativeEvent.layout.height,
                });
              }}
              rating={game?.rating ?? 0}
              showAddToCollectionDialog={showAddToCollectionDialog}
              showStickyButton={showStickyButton}
              stickyContainerStyles={stickyContainerStyles}
              styles={styles}
              theme={theme}
              systemPlatformNames={systemPlatformNames}
            />
          </View>
        ) : null}
        {!isSticky ? <View style={styles.statusBar} /> : null}
        {!isSticky ? (
          <MediaHeader
            isVideo={isVideo}
            setIsVideo={setIsVideo}
            game={game}
            movies={movies}
            styles={styles}
            theme={theme}
          />
        ) : null}
        {!isSticky ? (
          <StickyTitle
            isPending={!game}
            goBack={goBack}
            name={game?.name ?? ''}
            onLayout={(e) => {
              setStickyContainerTop({
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height,
              });
            }}
            rating={game?.rating ?? 0}
            showAddToCollectionDialog={showAddToCollectionDialog}
            showStickyButton={showStickyButton}
            stickyContainerStyles={stickyContainerStyles}
            styles={styles}
            theme={theme}
            systemPlatformNames={systemPlatformNames}
          />
        ) : null}
        {game?.released && game?.metaCritic && ratedFor && game?.playtime ? (
          <Metrics
            isPending={!game}
            playtime={game?.playtime}
            styles={styles}
            theme={theme}
            ratedFor={ratedFor}
            metaCritic={game?.metaCritic}
            released={game?.released}
          />
        ) : null}
        <About
          description={game?.description}
          isPending={!game}
          setShowFullAbout={setShowFullAbout}
          showFullAbout={showFullAbout}
          theme={theme}
          styles={styles}
        />
        <Screenshots
          isPending={!game && !screenshots}
          screenshots={screenshots ?? []}
          styles={styles}
          theme={theme}
        />
        {game?.ratings ? (
          <Ratings
            ratings={game?.ratings}
            styles={styles}
          />
        ) : null}
        {game?.tags || game?.genres ? (
          <Tags
            styles={styles}
            genres={game?.genres}
            tags={game?.tags}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Details;
