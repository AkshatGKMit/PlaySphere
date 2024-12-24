import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import FeedGameCard from '@components/feedGameCard';
import Icon from '@components/icon';
import { IconButton } from '@components/iconButton';
import Loader from '@components/loader';
import { ListEmptyComponent, ListFooterComponent } from '@components/pageListComponent';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Elevation, FontWeight, Icons, Typography } from '@constants';
import useCollectionQuery from '@network/hooks/useCollectionQuery';
import useCollectionFeedsQuery from '@network/hooks/useCollectionFeedsQuery';
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

  const { collectionId, collectionName } = params! as CollectionGamesRouteProps;

  const {
    collectionFeeds = [],
    online,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useCollectionFeedsQuery(collectionId);

  const { removeCollectionLoading, mutateRemoveCollection, removeCollectionSuccess } =
    useCollectionMutation();

  const { refetch } = useCollectionQuery();

  const closeScreen = useCallback(() => {
    refetch();
    goBack();
  }, [goBack, refetch]);

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

  useEffect(() => {
    if (removeCollectionSuccess) {
      closeScreen();
    }
  }, [closeScreen, removeCollectionSuccess]);

  const onEndReached = () => {
    if (online.isConnected && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
          onPress={closeScreen}
        />
        <TextBlock
          typography={Typography.headlineLarge}
          fontWeight={FontWeight.heavy}
          style={globalStyles.flex1}
        >
          {collectionName}
        </TextBlock>
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
      <FlatList
        numColumns={2}
        style={globalStyles.flex1}
        contentContainerStyle={styles.listContentStyle}
        columnWrapperStyle={styles.columnStyles}
        data={collectionFeeds}
        renderItem={({ item }) => {
          const { id } = item;

          return (
            <FeedGameCard
              key={id}
              feed={item}
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
            hasData={collectionFeeds.length !== 0}
            hasNextPage={hasNextPage}
            showNoConnectionScreenMessage={online.showNoConnectionScreenMessage}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onPressDelete}
      >
        <Icon
          icon={Icons.materialCommunityIcons.trashCan}
          size={22}
        />
        <TextBlock
          typography={Typography.bodyLarge}
          fontWeight={FontWeight.bold}
        >
          Delete Collection
        </TextBlock>
      </TouchableOpacity>
    </View>
  );
};

export default CollectionGames;
