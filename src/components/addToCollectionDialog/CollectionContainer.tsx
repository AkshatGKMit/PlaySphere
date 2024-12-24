import React, { useMemo } from 'react';
import { View } from 'react-native';

import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import { FontWeight, Typography } from '@constants';
import { Colors } from '@themes';

import ListCollections from './ListCollections';

const CollectionContainer = ({
  gameInCollections,
  gameInCollectionsRefetching,
  gameInCollectionsLoading,
  mutatingId,
  onPressCollection,
  updateGameLoading,
  styles,
}: CollectionContainerProps) => {
  const isLoading = useMemo(
    () => gameInCollectionsLoading || gameInCollectionsRefetching,
    [gameInCollectionsLoading, gameInCollectionsRefetching],
  );

  const isNoCollection = useMemo(() => !gameInCollections.length, [gameInCollections.length]);

  return (
    <View style={styles.content}>
      {isLoading ? (
        <View style={styles.noContentContainer}>
          <Loader size={'large'} />
        </View>
      ) : isNoCollection ? (
        <View style={styles.noContentContainer}>
          <TextBlock
            color={Colors.red}
            typography={Typography.bodyLarge}
            fontWeight={FontWeight.bold}
          >
            No Collection Found
          </TextBlock>
          <TextBlock
            color={Colors.red}
            typography={Typography.bodyLarge}
            fontWeight={FontWeight.bold}
          >
            Create One
          </TextBlock>
        </View>
      ) : (
        <ListCollections
          gameInCollections={gameInCollections}
          mutatingId={mutatingId}
          onPressCollection={onPressCollection}
          styles={styles}
          updateGameLoading={updateGameLoading}
        />
      )}
    </View>
  );
};

export default CollectionContainer;
