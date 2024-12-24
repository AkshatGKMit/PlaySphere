import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

import GameListScreen from '@components/gameListScreen';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { Elevation, FontWeight, Typography } from '@constants';
import { useAppSelector } from '@store';
import { getShadowStyle } from '@utility/style';

import Header from './Header';
import ThemedStyles from './styles';

const Home = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<RootStackParamList>>();

  const { colors: theme } = useAppSelector((state) => state.theme);

  const [yOffset, setYOffset] = useState(0);

  const styles = useStyles((themeColors) => ThemedStyles(themeColors, insets));

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = nativeEvent.contentOffset;

    setYOffset(y);
  }, []);

  const headerStyles = useMemo(
    () => [
      styles.header,
      { backgroundColor: yOffset > 0 ? theme.all.surfaceContainer : theme.all.surface },
      getShadowStyle(yOffset > 0 ? Elevation.level5 : Elevation.level0),
    ],
    [styles.header, theme.all.surface, theme.all.surfaceContainer, yOffset],
  );

  const { url, title, params: queryParams } = params! as HomeRouteProps;

  return (
    <GameListScreen
      url={url}
      params={queryParams}
      onScroll={onScroll}
      header={
        <Header
          headerStyles={headerStyles}
          styles={styles}
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
