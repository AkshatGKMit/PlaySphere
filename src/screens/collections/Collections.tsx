import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import AddNewCollectionDialog from '@components/addNewCollectionDialog';
import CollectionCard from '@components/collectionCard';
import Dialog from '@components/dialog';
import { IconButton } from '@components/iconButton';
import { ListEmptyComponent, ListFooterComponent } from '@components/pageListComponent';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Elevation, FontWeight, Icons, Typography } from '@constants';
import useCollectionQuery from '@network/hooks/useCollectionQuery';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes';
import { getShadowStyle } from '@utility/style';

import ThemedStyles from './styles';

const Collections = () => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<StackNavigation>();

  const { colors: theme } = useAppSelector((state) => state.theme);

  const [yOffset, setYOffset] = useState(0);

  const {
    collections,
    loading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    online,
    isRefetching,
    refetch,
  } = useCollectionQuery();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const onEndReached = useCallback(() => {
    if (online.isConnected && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, online.isConnected]);

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const showAddNewCollectionDialog = useCallback(() => {
    Dialog.show({ child: <AddNewCollectionDialog />, onClose: refetch });
  }, [refetch]);

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
          style={styles.headingTitle}
        >
          My Collections
        </TextBlock>
        <IconButton
          icon={Icons.octicons.diffAdded}
          onPress={showAddNewCollectionDialog}
        />
      </View>
      <FlatList
        numColumns={2}
        style={globalStyles.flex1}
        contentContainerStyle={styles.listContentStyle}
        columnWrapperStyle={styles.columnStyles}
        data={isRefetching || loading ? [] : collections}
        renderItem={({ item: collection }) => {
          const { id } = collection;

          return (
            <CollectionCard
              key={id}
              collection={collection}
            />
          );
        }}
        initialNumToRender={16}
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
            hasData={collections.length !== 0}
            hasNextPage={!isRefetching && hasNextPage}
            showNoConnectionScreenMessage={online.showNoConnectionScreenMessage}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default Collections;
