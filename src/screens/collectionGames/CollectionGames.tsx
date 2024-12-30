import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import AddOrUpdateCollectionDialog from '@components/addOrUpdateCollectionDialog';
import Dialog from '@components/dialog';
import GameCard from '@components/gameCard';
import { IconButton } from '@components/iconButton';
import Loader from '@components/loader';
import { ListEmptyComponent, ListFooterComponent } from '@components/pageListComponent';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Elevation, FontWeight, Icons, Typography } from '@constants';
import useCollectionGamesQuery from '@network/hooks/useCollectionGamesQuery';
import useCollectionMutation from '@network/hooks/useCollectionMutation';
import { useAppSelector } from '@store';
import { Colors, globalStyles } from '@themes';
import { getShadowStyle } from '@utility/style';

import ThemedStyles from './styles';

const CollectionGames = () => {
  const { goBack } = useNavigation<StackNavigation>();
  const { params } = useRoute<RouteProp<RootStackParamList>>();

  const insets = useSafeAreaInsets();
  const { colors: theme } = useAppSelector((state) => state.theme);

  const [yOffset, setYOffset] = useState(0);

  const { collectionId, collectionName, numGames } = params! as CollectionGamesRouteProps;

  const [collectionDisplayName, setCollectionDisplayName] = useState('');

  const {
    collectionGames = [],
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useCollectionGamesQuery(collectionId, !!numGames);

  const { removeCollectionLoading, mutateRemoveCollection, removeCollectionSuccess } =
    useCollectionMutation();

  useEffect(() => {
    setCollectionDisplayName(collectionName);
  }, [collectionName]);

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
            mutateRemoveCollection(collectionId);
          },
        },
      ],
      { cancelable: true },
    );
  }, [collectionId, mutateRemoveCollection]);

  const onPressEdit = useCallback(() => {
    Dialog.show({
      child: (
        <AddOrUpdateCollectionDialog
          collectionName={collectionDisplayName}
          collectionId={collectionId}
          onSuccess={setCollectionDisplayName}
        />
      ),
    });
  }, [collectionDisplayName, collectionId]);

  useEffect(() => {
    if (removeCollectionSuccess && !removeCollectionLoading) {
      goBack();
    }
  }, [goBack, removeCollectionLoading, removeCollectionSuccess]);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const headerStyles = useMemo(
    () => [
      styles.header,
      { backgroundColor: yOffset > 0 ? theme.all.surfaceContainer : theme.all.surface },
      getShadowStyle(yOffset > 0 ? Elevation.level5 : Elevation.level0),
    ],
    [styles.header, theme.all.surface, theme.all.surfaceContainer, yOffset],
  );

  return (
    <View style={styles.screen}>
      <View style={headerStyles}>
        <IconButton
          icon={Icons.materialCommunityIcons.arrowLeft}
          onPress={goBack}
        />
        <TextBlock
          typography={Typography.headlineLarge}
          fontWeight={FontWeight.heavy}
          style={globalStyles.flex1}
          numberOfLines={2}
        >
          {collectionDisplayName}
        </TextBlock>
        <IconButton
          icon={Icons.materialIcons.edit}
          onPress={onPressEdit}
        />
        {removeCollectionLoading ? (
          <Loader size={'small'} />
        ) : (
          <IconButton
            icon={Icons.materialCommunityIcons.trashCan}
            onPress={onPressDelete}
            color={Colors.red}
          />
        )}
      </View>
      {!numGames ? (
        <View style={[globalStyles.flex1, globalStyles.columnCenter]}>
          <TextBlock
            typography={Typography.titleLarge}
            fontWeight={FontWeight.bold}
          >
            No games here yet!
          </TextBlock>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          style={globalStyles.flex1}
          contentContainerStyle={styles.listContentStyle}
          columnWrapperStyle={styles.columnStyles}
          data={collectionGames}
          renderItem={({ item: game }) => {
            const { id } = game;

            return (
              <GameCard
                key={id}
                game={game}
                collectionId={collectionId}
              />
            );
          }}
          keyExtractor={({ id }) => id.toString()}
          onScroll={onScroll}
          ListEmptyComponent={
            <ListEmptyComponent
              styles={styles}
              theme={theme}
            />
          }
          ListFooterComponent={
            <ListFooterComponent
              hasData={collectionGames.length !== 0}
              hasNextPage={hasNextPage}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
};

export default CollectionGames;
