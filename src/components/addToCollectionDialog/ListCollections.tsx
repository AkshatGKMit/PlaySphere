import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import Icon from '@components/icon';
import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import { FontWeight, Icons } from '@constants';
import { Colors } from '@themes';

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

        return (
          <TouchableOpacity
            key={id}
            activeOpacity={0.8}
            style={styles.collection}
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
              <Loader />
            ) : gameInCollection ? (
              <Icon
                icon={Icons.fontAwesome.check}
                color={Colors.green}
              />
            ) : (
              <Icon
                icon={Icons.materialIcons.add}
                size={18}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ListCollections;
