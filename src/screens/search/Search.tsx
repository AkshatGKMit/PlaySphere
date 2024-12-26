import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import GameCard from '@components/gameCard';
import Icon from '@components/icon';
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from '@components/pageListComponent';
import TextBlock from '@components/textBlock';
import {
  Elevation,
  FontWeight,
  Icons,
  orderByDropdownItems,
  QueryKeys,
  systemPlatformDropdownItems,
  Typography,
} from '@constants';
import useStyles from '@config/useStyles';
import ApiConstants from '@network/apiConstants';
import useGamesQuery from '@network/hooks/useGamesQuery';
import { useAppSelector } from '@store';
import { globalStyles } from '@themes';
import { debounce } from '@utility/helpers';
import { getShadowStyle } from '@utility/style';

import ThemedStyles from './styles';

const { mainGameList: mainGameListKey } = QueryKeys;
const { list: listEndpoint } = ApiConstants.endpoints.games;

const Search = () => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<StackNavigation>();

  const { colors: theme } = useAppSelector((state) => state.theme);

  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [yOffset, setYOffset] = useState(0);
  const [orderBy, setOrderBy] = useState<DropDownItem>(orderByDropdownItems[0]);
  const [selectedSystemPlatform, setSelectedSystemPlatform] = useState<DropDownItem>(
    systemPlatformDropdownItems[0],
  );

  const isDebouncedSearchEmpty = useMemo(() => debouncedSearchText === '', [debouncedSearchText]);

  const debouncedSetSearchText = useMemo(() => debounce(setDebouncedSearchText, 600), []);

  const gameQueryParams: ListQueryParams = useMemo(
    () => ({
      search: debouncedSearchText ? debouncedSearchText : undefined,
      ordering: orderBy.value as string,
      platforms:
        selectedSystemPlatform.id !== 0 ? (selectedSystemPlatform.value as string) : undefined,
    }),
    [debouncedSearchText, orderBy.value, selectedSystemPlatform.id, selectedSystemPlatform.value],
  );

  const gameQueryKey: GameQueryKey = [mainGameListKey, listEndpoint, gameQueryParams];

  const { games, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } =
    useGamesQuery(gameQueryKey, { enabled: !isDebouncedSearchEmpty });

  const onEndReached = () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      debouncedSetSearchText(text);
    },
    [debouncedSetSearchText],
  );

  const headerStyles = useMemo(
    () => [
      styles.searchContainer,
      getShadowStyle(yOffset > 0 ? Elevation.level5 : Elevation.level4),
    ],
    [styles.searchContainer, yOffset],
  );

  const showGames = useMemo(
    () => searchText && debouncedSearchText && !isPending,
    [debouncedSearchText, isPending, searchText],
  );
  const showShimmers = useMemo(() => !!searchText && isPending, [isPending, searchText]);
  const showNoResultFound = useMemo(
    () => searchText && isSuccess && !games.length,
    [games.length, isSuccess, searchText],
  );
  const showHeader = useMemo(() => !!showGames && !!games.length, [games.length, showGames]);
  const showFooter = useMemo(() => !!searchText && hasNextPage, [hasNextPage, searchText]);

  return (
    <View style={styles.screen}>
      <View style={headerStyles}>
        <Pressable onPress={goBack}>
          <Icon
            icon={Icons.materialCommunityIcons.arrowLeft}
            size={22}
          />
        </Pressable>
        <TextInput
          autoFocus
          value={searchText}
          onChangeText={handleSearchTextChange}
          autoCapitalize="none"
          placeholder="Search games"
          placeholderTextColor={styles.placeholder.color}
          autoCorrect={false}
          style={styles.textInput}
        />
        {searchText ? (
          <Pressable onPress={() => setSearchText('')}>
            <Icon
              icon={Icons.materialIcons.close}
              size={22}
            />
          </Pressable>
        ) : null}
      </View>
      <FlatList<Game>
        numColumns={2}
        style={globalStyles.flex1}
        contentContainerStyle={styles.listContentStyle}
        columnWrapperStyle={styles.columnStyles}
        data={showGames ? games : null}
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
        ListHeaderComponent={
          <ListHeaderComponent
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            selectedSystemPlatform={selectedSystemPlatform}
            setSelectedSystemPlatform={setSelectedSystemPlatform}
            styles={styles}
            show={showHeader}
          />
        }
        ListEmptyComponent={
          showNoResultFound ? (
            <TextBlock
              typography={Typography.titleLarge}
              fontWeight={FontWeight.bold}
              style={styles.noResultFound}
            >
              No Results Found
            </TextBlock>
          ) : (
            <ListEmptyComponent
              styles={styles}
              theme={theme}
              show={showShimmers}
            />
          )
        }
        ListFooterComponent={
          <ListFooterComponent
            hasData={showFooter}
            hasNextPage={!isDebouncedSearchEmpty && hasNextPage}
          />
        }
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default Search;
