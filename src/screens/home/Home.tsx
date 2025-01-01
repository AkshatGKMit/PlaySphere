import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import GameListScreen from '@components/gameListScreen';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Elevation, FontWeight, Routes, TestIds, Typography } from '@constants';
import { useAppSelector } from '@store';
import { getShadowStyle } from '@utility/style';

import Header from './Header';
import ThemedStyles from './styles';

const { home: homeRoute } = Routes.Stack;
const { root: rootTestId } = TestIds.integration.home;

const Home = () => {
  const insets = useSafeAreaInsets();
  const { getState } = useNavigation<StackNavigation>();
  const { params } = useRoute<RouteProp<RootStackParamList>>();

  const { colors: theme } = useAppSelector((state) => state.theme);

  const [yOffset, setYOffset] = useState(0);

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const onBackPress = useCallback(() => {
    const { index, routeNames } = getState();

    if (routeNames.at(index) === homeRoute) {
      Alert.alert('Confirm Exit', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }

    return false;
  }, [getState]);

  useEffect(() => {
    const hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      hardwareBackPress.remove();
    };
  }, [onBackPress]);

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const backgroundColor = useMemo(
    () => (yOffset > 0 ? theme.all.surfaceContainer : theme.all.surface),
    [theme.all.surface, theme.all.surfaceContainer, yOffset],
  );

  const headerStyles = useMemo(
    () => [
      styles.header,
      { backgroundColor },
      getShadowStyle(yOffset > 0 ? Elevation.level5 : Elevation.level0),
    ],
    [backgroundColor, styles.header, yOffset],
  );

  const { url, title, params: queryParams } = params! as HomeRouteProps;

  return (
    <GameListScreen
      url={url}
      params={queryParams}
      onScroll={onScroll}
      listHeaderBackgroundColor={backgroundColor}
      testID={rootTestId}
      header={
        <Header
          headerStyles={headerStyles}
          styles={styles}
          theme={theme}
        >
          <TextBlock
            typography={Typography.headlineLarge}
            fontWeight={FontWeight.heavy}
          >
            {title}
          </TextBlock>
        </Header>
      }
    />
  );
};

export default memo(Home);
