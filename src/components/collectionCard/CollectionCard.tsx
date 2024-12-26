import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import TextBlock from '@components/textBlock';
import { IMAGES, Typography, FontWeight, Routes } from '@constants';
import { Colors, globalStyles } from '@themes';

import styles from './styles';

const { collectionGames: collectionGamesRoute } = Routes.Stack;

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const { id, name, gamesCount, backgrounds } = collection;

  const { navigate } = useNavigation<StackNavigation>();

  const onPressCard = useCallback(() => {
    navigate(collectionGamesRoute, {
      collectionId: id,
      collectionName: name,
      numGames: gamesCount,
    });
  }, [gamesCount, id, name, navigate]);

  return (
    <FastImage
      key={id}
      source={{ uri: backgrounds?.length ? backgrounds[0].url : undefined }}
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
            color={Colors.white}
            style={styles.title}
          >
            {name}
          </TextBlock>
          <TextBlock
            numberOfLines={2}
            typography={Typography.bodySmall}
            fontWeight={FontWeight.bold}
            color={Colors.white}
            style={styles.title}
          >
            {gamesCount} {gamesCount === 1 ? 'Game' : 'Games'}
          </TextBlock>
        </View>
      </Pressable>
    </FastImage>
  );
};

export default CollectionCard;
