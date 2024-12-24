import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Icon from '@components/icon';
import { AddToCollectionDialog } from '@components/addToCollectionDialog';
import Dialog from '@components/dialog';
import useStyles from '@config/useStyles';
import { Elevation, Icons } from '@constants';
import useGameDetailsQuery from '@network/hooks/useGameDetailsQuery';
import { useAppSelector } from '@store';
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

  const { game, gameLoading, movies, screenshots, screenshotLoading } = useGameDetailsQuery(gameId);

  useEffect(() => {
    const actualStickyBackButtonTop =
      stickyBackButtonTop.y + stickyBackButtonTop.height - insets.top;

    setShowStickyButton(yOffset <= stickyContainerTop.y - actualStickyBackButtonTop - insets.top);
  }, [insets.top, stickyBackButtonTop, stickyContainerTop, yOffset]);

  const isContainerOnTop = useMemo(
    () => yOffset >= stickyContainerTop.y - insets.top,
    [insets.top, stickyContainerTop, yOffset],
  );

  const topPadding = useMemo(
    () =>
      isContainerOnTop && yOffset - stickyContainerTop.y < 0
        ? yOffset - stickyContainerTop.y + insets.top + 10
        : insets.top + 10,
    [insets.top, isContainerOnTop, stickyContainerTop, yOffset],
  );

  const stickyContainerStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.stickyContainer,
      {
        backgroundColor: isContainerOnTop ? theme.all.surfaceContainerLowest : theme.background,
        paddingTop: isContainerOnTop ? topPadding : 10,
        ...getShadowStyle(Elevation.level2),
      },
    ],
    [
      isContainerOnTop,
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
          onLayout={(e) => {
            setStickyBackButtonTop({
              y: e.nativeEvent.layout.y,
              height: e.nativeEvent.layout.height,
            });
          }}
        >
          <Icon
            icon={Icons.materialCommunityIcons.arrowLeft}
            size={24}
          />
        </TouchableOpacity>
      ) : null}
      <ScrollView
        onScroll={(e) => setYOffset(e.nativeEvent.contentOffset.y)}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        scrollEnabled={yOffset >= 0 && !gameLoading}
        directionalLockEnabled
      >
        <View style={styles.statusBar} />
        <MediaHeader
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
          isPending={!game && screenshotLoading}
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
