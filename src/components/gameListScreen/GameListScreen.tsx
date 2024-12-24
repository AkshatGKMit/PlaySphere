import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GameCard from '@components/gameCard';
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from '@components/pageListComponent';
import useStyles from '@config/useStyles';
import { orderByDropdownItems, QueryKeys, systemPlatformDropdownItems } from '@constants';
import useGamesQuery from '@network/hooks/useGamesQuery';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes';

import ThemedStyles from './styles';

const { mainGameList: mainGameListKey } = QueryKeys;

const GameListScreen = ({
  onScroll,
  url,
  params,
  header,
  listHeaderBackgroundColor,
}: GameListScreenProps) => {
  const insets = useSafeAreaInsets();
  const { colors: theme } = useAppSelector((state) => state.theme);

  const [orderBy, setOrderBy] = useState<DropDownItem>(orderByDropdownItems[0]);
  const [selectedSystemPlatform, setSelectedSystemPlatform] = useState<DropDownItem>(
    systemPlatformDropdownItems[0],
  );

  const gameQueryParams: ListQueryParams = {
    ...params,
    ordering: orderBy.value as string,
    platforms:
      selectedSystemPlatform.id !== 0 ? (selectedSystemPlatform.value as string) : undefined,
  };

  const gameQueryKey: GameQueryKey = [mainGameListKey, url, gameQueryParams];

  const { games, hasNextPage, fetchNextPage, isFetchingNextPage, online } =
    useGamesQuery(gameQueryKey);

  const onEndReached = () => {
    if (online.isConnected && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  return (
    <View style={styles.screen}>
      {header}
      <ListHeaderComponent
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        selectedSystemPlatform={selectedSystemPlatform}
        setSelectedSystemPlatform={setSelectedSystemPlatform}
        styles={styles}
        listHeaderBackgroundColor={listHeaderBackgroundColor}
      />
      <FlatList<Game>
        numColumns={2}
        style={globalStyles.flex1}
        contentContainerStyle={styles.listContentStyle}
        columnWrapperStyle={styles.columnStyles}
        data={games}
        renderItem={({ item }) => {
          const { id } = item;

          return (
            <GameCard
              key={id}
              game={item}
            />
          );
        }}
        initialNumToRender={12}
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
            hasData={games.length !== 0}
            hasNextPage={hasNextPage}
            showNoConnectionScreenMessage={online.showNoConnectionScreenMessage}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default GameListScreen;
