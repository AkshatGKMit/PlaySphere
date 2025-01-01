import React from 'react';
import { View } from 'react-native';

import SystemPlatformView from '@components/systemPlatforms';
import TextBlock from '@components/textBlock';
import { FontWeight, Icons, TestIds, Typography } from '@constants';
import ActionButton from '@components/actionButton';

const { gameTitle: gameTitleTestId, gameReleaseDate: gameReleaseDateTestId } =
  TestIds.unit.gameCard;

const Content = ({
  styles,
  name,
  genreList,
  genres,
  releaseDate,
  systemPlatformNames,
  showAddToCollectionDialog,
  hideAddButton,
}: GameCardContentProps) => {
  return (
    <View style={styles.content}>
      {systemPlatformNames ? <SystemPlatformView systemPlatforms={systemPlatformNames} /> : null}
      <TextBlock
        typography={Typography.titleMedium}
        fontWeight={FontWeight.bold}
        numberOfLines={1}
        testID={gameTitleTestId}
      >
        {name}
      </TextBlock>
      {releaseDate ? (
        <TextBlock
          typography={Typography.labelSmall}
          fontWeight={FontWeight.light}
          color={styles.genre.color}
          testID={gameReleaseDateTestId}
        >
          Release Date - {releaseDate}
        </TextBlock>
      ) : null}
      {genres && genres.length ? (
        <TextBlock
          typography={Typography.labelSmall}
          fontWeight={FontWeight.light}
          color={styles.genre.color}
        >
          {genreList}
        </TextBlock>
      ) : null}
      {!hideAddButton ? (
        <ActionButton
          label="Add to Collection"
          onPress={showAddToCollectionDialog}
          style={styles.addToCollection}
          leadingIcon={Icons.materialIcons.add}
          typography={Typography.labelSmall}
          color={styles.addToCollectionText.color}
        />
      ) : null}
    </View>
  );
};

export default Content;
