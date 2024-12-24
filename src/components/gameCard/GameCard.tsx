import { TouchableOpacity } from 'react-native';
import React, { memo, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AddToCollectionDialog } from '@components/addToCollectionDialog';
import Dialog from '@components/dialog';
import useStyles from '@config/useStyles';
import { Emoji, RatingCategory, Routes } from '@constants';
import { formatAgeRatingToAge, parseDateString } from '@utility/helpers';

import Content from './Content';
import GameImage from './GameImage';
import ThemedStyles from './styles';

const { details: detailsRoute } = Routes.Stack;

const GameCard = ({ game, hideAddButton, children }: GameCardProps) => {
  const {
    id,
    backgroundImage,
    name,
    systemPlatforms,
    rating,
    ratings,
    genres,
    released,
    ageRating,
  } = game;

  const { navigate } = useNavigation<StackNavigation>();

  const styles = useStyles(ThemedStyles);

  const onCardPress = () => {
    navigate(detailsRoute, { id });
  };

  const systemPlatformNames = useMemo(
    () => systemPlatforms?.map((platform) => platform.systemPlatform.name),
    [systemPlatforms],
  );

  const getTopRatingTitle = useMemo(() => {
    if (!ratings.length) {
      return null;
    }

    const topRating = ratings.reduce((prev, current) => {
      return prev.count > current.count ? prev : current;
    });

    return topRating.title;
  }, [ratings]);

  const topRatingCategoryEmoji = useMemo(() => {
    switch (getTopRatingTitle) {
      case RatingCategory.exceptional:
        return Emoji.diamond;
      case RatingCategory.recommended:
        return Emoji.hot;
      case RatingCategory.meh:
        return Emoji.neutralFace;
      case RatingCategory.skip:
        return Emoji.forbidden;
      default:
        return null;
    }
  }, [getTopRatingTitle]);

  const genreList = useMemo(
    () =>
      genres
        ?.map(({ name: genreName }) => genreName)
        .slice(0, 3)
        .join(', '),
    [genres],
  );

  const releaseDate = useMemo(
    () => (released ? parseDateString(released, true) : null),
    [released],
  );

  const getAgeRating = useMemo(() => formatAgeRatingToAge(ageRating), [ageRating]);

  function showAddToCollectionDialog(): void {
    Dialog.show({ child: <AddToCollectionDialog game={game} /> });
  }

  const ageRatingStyles = useMemo(
    () => [styles.ageRating, { backgroundColor: getAgeRating?.color }],
    [getAgeRating?.color, styles.ageRating],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onCardPress}
      style={styles.container}
    >
      <GameImage
        ageRating={getAgeRating}
        ageRatingStyles={ageRatingStyles}
        rating={rating}
        styles={styles}
        uri={backgroundImage}
      />
      <Content
        emoji={topRatingCategoryEmoji}
        genreList={genreList}
        genres={genres}
        name={name}
        releaseDate={releaseDate}
        styles={styles}
        systemPlatformNames={systemPlatformNames}
        showAddToCollectionDialog={showAddToCollectionDialog}
        hideAddButton={hideAddButton}
      />
      {children}
    </TouchableOpacity>
  );
};

export default memo(GameCard);
