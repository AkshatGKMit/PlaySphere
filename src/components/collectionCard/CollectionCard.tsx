import React, { useCallback } from 'react';
import { Alert, Pressable, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import Icon from '@components/icon';
import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import { IMAGES, Typography, FontWeight, Icons, Routes } from '@constants';
import useCollectionMutation from '@network/hooks/useCollectionMutation';
import { globalStyles } from '@themes';

import styles from './styles';

const { collectionGames: collectionGamesRoute } = Routes.Stack;

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const { id, gameBackground, name, gamesCount } = collection;

  const { navigate } = useNavigation<StackNavigation>();

  const { removeCollectionLoading, mutateRemoveCollection } = useCollectionMutation();

  const onPressDelete = useCallback(() => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            mutateRemoveCollection(id);
          },
        },
      ],
      { cancelable: true },
    );
  }, [id, mutateRemoveCollection]);

  const onPressCard = useCallback(() => {
    if (gamesCount) {
      navigate(collectionGamesRoute, { collectionId: id, collectionName: name });
    }
  }, [gamesCount, id, name, navigate]);

  return (
    <FastImage
      key={id}
      source={{ uri: gameBackground?.url }}
      defaultSource={IMAGES.COLLECTION_COVER}
      resizeMode="stretch"
      style={styles.image}
    >
      <Pressable
        onPress={onPressCard}
        style={globalStyles.flex1}
      >
        <View style={styles.container}>
          <TextBlock
            numberOfLines={2}
            typography={Typography.titleLarge}
            fontWeight={FontWeight.bold}
            style={styles.title}
          >
            {name}
          </TextBlock>
          <TextBlock
            numberOfLines={2}
            typography={Typography.bodySmall}
            fontWeight={FontWeight.bold}
            style={styles.title}
          >
            {gamesCount} Games
          </TextBlock>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressDelete}
            disabled={removeCollectionLoading}
            style={styles.deleteContainer}
          >
            {removeCollectionLoading ? (
              <Loader size={'small'} />
            ) : (
              <Icon
                icon={Icons.materialCommunityIcons.trashCan}
                size={16}
              />
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </FastImage>
  );
};

export default CollectionCard;
