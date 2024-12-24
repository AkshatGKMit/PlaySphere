import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from '@components/icon';
import SystemPlatformView from '@components/systemPlatforms';
import TextBlock from '@components/textBlock';
import { FontWeight, Icons, Typography } from '@constants';

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
      >
        {name}
      </TextBlock>
      {releaseDate ? (
        <TextBlock
          typography={Typography.labelSmall}
          fontWeight={FontWeight.light}
          color={styles.genre.color}
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={showAddToCollectionDialog}
          style={styles.addToCollection}
        >
          <Icon icon={Icons.materialIcons.add} />
          <TextBlock typography={Typography.labelSmall}>Add to Collection</TextBlock>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Content;
