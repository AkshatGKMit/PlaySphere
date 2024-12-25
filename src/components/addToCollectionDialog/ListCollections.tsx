import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import { FontWeight } from '@constants';

const ListCollections = ({
  gameInCollections,
  mutatingId,
  updateGameLoading,
  onPressCollection,
  styles,
}: ListCollectionsProps) => {
  const isLoading = useCallback(
    (id: number) => updateGameLoading && mutatingId === id,
    [mutatingId, updateGameLoading],
  );

  return (
    <ScrollView contentContainerStyle={styles.collectionContainer}>
      {gameInCollections.map((collection) => {
        const { gameInCollection, id, name } = collection;

        const collectionStyles = [
          styles.collection,
          gameInCollection ? styles.selectedCollection : null,
        ];

        return (
          <TouchableOpacity
            key={id}
            activeOpacity={0.8}
            style={collectionStyles}
            onPress={() => onPressCollection(collection)}
          >
            <TextBlock
              style={styles.collectionName}
              fontWeight={FontWeight.semibold}
              numberOfLines={1}
            >
              {name}
            </TextBlock>
            {isLoading(id) ? (
              <View style={styles.loaderOverlay}>
                <Loader />
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ListCollections;
