import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GameCard from '@components/gameCard';
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from '@components/pageListComponent';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import {
  FontWeight,
  orderByDropdownItems,
  QueryKeys,
  systemPlatformDropdownItems,
  Typography,
} from '@constants';
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
  testID,
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

  const { games, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGamesQuery(gameQueryKey);

  const onEndReached = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const showNoResultsFound = useMemo(() => isSuccess && !games.length, [games.length, isSuccess]);

  return (
    <View
      style={styles.screen}
      testID={testID}
    >
      {header}
      <ListHeaderComponent
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        selectedSystemPlatform={selectedSystemPlatform}
        setSelectedSystemPlatform={setSelectedSystemPlatform}
        styles={styles}
        listHeaderBackgroundColor={listHeaderBackgroundColor}
      />
      {showNoResultsFound ? (
        <View style={[globalStyles.flex1, globalStyles.columnCenter]}>
          <TextBlock
            typography={Typography.titleLarge}
            fontWeight={FontWeight.bold}
          >
            No games found!
          </TextBlock>
        </View>
      ) : (
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
          scrollEventThrottle={16}
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
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
};

export default GameListScreen;
