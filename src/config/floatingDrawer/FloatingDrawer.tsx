import React, { memo, useCallback, useState } from 'react';
import { Alert, LayoutChangeEvent, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { BlurView } from '@react-native-community/blur';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import {
  DefaultObjectLayout,
  FontWeight,
  Icons,
  IMAGES,
  isIos,
  Routes,
  TestIds,
  Typography,
} from '@constants';
import useStyles from '@config/useStyles';
import ApiConstants from '@network/apiConstants';
import { useAppDispatch, useAppSelector } from '@store';
import { logout } from '@store/reducers/auth';
import { removeUser } from '@store/reducers/user';
import { Colors, globalStyles } from '@themes';

import AnimatedFloatingButton from './AnimatedFloatingButton';
import ThemedStyles from './styles';

const {
  list: listGamesEndpoints,
  thisWeekGames: thisWeekGamesEndpoint,
  bestOfTheYear: bestGamesOfYearEndpoint,
  popularIn2023: popularIn2023Endpoint,
  mostPopular: top250GamesEndpoint,
} = ApiConstants.endpoints.games;

const { home: homeRoute, collections: collectionsRoute } = Routes.Stack;

const {
  root: rootTestId,
  rootButton: rootButtonTestId,
  popular: popularTestId,
  thisWeek: thisWeekTestId,
  bestOfTheYear: bestOfTheYearTestId,
  popular2023: popular2023TestId,
  top250: top250TestId,
} = TestIds.unit.floatingDrawer;

const FloatingDrawer = () => {
  const { navigate, dispatch } = useNavigation<StackNavigation>();
  const { top: topInsets } = useSafeAreaInsets();

  const appDispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(DefaultObjectLayout);
  const [listLayout, setListLayout] = useState(DefaultObjectLayout);

  const styles = useStyles(ThemedStyles);

  const replaceNavigation = useCallback(
    (index: number, url: string, title: string, params?: ListQueryParams) => {
      const routeParam: HomeRouteProps = { url, title, params };

      const pushAction = StackActions.replace(homeRoute, routeParam);

      dispatch(pushAction);
      navigate(homeRoute, routeParam);
      setVisible(false);
    },
    [dispatch, navigate],
  );

  const _measureButton = useCallback(
    (e: LayoutChangeEvent) => {
      e.target.measureInWindow((x, y, width, height) => {
        const buttonTop = y + height;
        const buttonLeft = x;

        setButtonLayout({
          width,
          height,
          top: y + (!isIos ? topInsets : 0),
          left: x,
          bottom: y + height,
          right: x + width,
        });

        setListLayout({
          width: Math.floor(width),
          height: Math.floor(height),
          top: Math.floor(buttonTop + 10) + (!isIos ? topInsets : 0),
          bottom: Math.floor(buttonTop + height),
          left: Math.floor(buttonLeft),
          right: Math.floor(buttonLeft + width),
          minWidth: Math.floor(width),
        });
      });
    },
    [topInsets],
  );

  const onPressLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            appDispatch(removeUser());
            appDispatch(logout());
          },
        },
      ],
      { cancelable: false },
    );
  }, [appDispatch]);

  const onPressButton = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          replaceNavigation(0, listGamesEndpoints, 'Popular Games');
          break;
        case 1:
          replaceNavigation(1, thisWeekGamesEndpoint, 'This Week Games');
          break;
        case 2:
          replaceNavigation(2, bestGamesOfYearEndpoint, 'Best Games of Year');
          break;
        case 3:
          replaceNavigation(3, popularIn2023Endpoint, 'Popular Games of 2023', { year: 2023 });
          break;
        case 4:
          replaceNavigation(4, top250GamesEndpoint, 'Top 250 Games');
          break;
        case 5:
          navigate(collectionsRoute);
          break;
        case 6:
          onPressLogout();
          break;
        default:
          break;
      }

      setVisible(false);
    },
    [navigate, onPressLogout, replaceNavigation],
  );

  const { top: buttonTop, left: buttonLeft } = buttonLayout;
  const { top: listTop, left: listLeft } = listLayout;
  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        testID={rootButtonTestId}
      >
        <View
          style={globalStyles.positionRelative}
          onLayout={_measureButton}
        >
          <Icon
            icon={Icons.materialIcons.lineWeight}
            size={24}
          />
        </View>
      </Pressable>
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => setVisible(false)}
        style={globalStyles.flexGrow1}
        animationType="fade"
        testID={rootTestId}
      >
        <Pressable
          style={globalStyles.flex1}
          onPress={() => setVisible(false)}
        >
          <BlurView
            style={globalStyles.fullPositionAbsolute}
            blurAmount={1}
          />
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.headerContainer,
                { top: buttonTop - (user ? 15 : 0), left: buttonLeft },
              ]}
            >
              <View style={styles.closeIcon}>
                <Icon
                  icon={Icons.materialIcons.close}
                  size={20}
                />
              </View>
              {user ? (
                <View style={styles.profileContainer}>
                  <FastImage
                    defaultSource={IMAGES.PROFILE_COVER}
                    source={user.avatar ? { uri: user.avatar } : IMAGES.PROFILE_COVER}
                    style={styles.profileImage}
                  />
                  <TextBlock
                    typography={Typography.bodyLarge}
                    fontWeight={FontWeight.bold}
                    style={styles.username}
                  >
                    @{user.username}
                  </TextBlock>
                </View>
              ) : null}
            </View>
            <View style={[styles.buttonList, { top: listTop, left: listLeft }]}>
              <AnimatedFloatingButton
                icon={Icons.antDesign.star}
                index={0}
                name="Popular"
                onPress={() => onPressButton(0)}
                styles={styles}
                testID={popularTestId}
              />
              <AnimatedFloatingButton
                icon={Icons.materialIcons.localFireDepartment}
                index={1}
                name="This Week"
                onPress={() => onPressButton(1)}
                styles={styles}
                testID={thisWeekTestId}
              />
              <AnimatedFloatingButton
                icon={Icons.fontAwesome.trophy}
                index={2}
                name="Best Of the Year"
                onPress={() => onPressButton(2)}
                styles={styles}
                testID={bestOfTheYearTestId}
              />
              <AnimatedFloatingButton
                icon={Icons.materialCommunityIcons.chartBox}
                index={3}
                name="Popular in 2023"
                onPress={() => onPressButton(3)}
                styles={styles}
                testID={popular2023TestId}
              />
              <AnimatedFloatingButton
                icon={Icons.materialCommunityIcons.crown}
                index={4}
                name="Top 250"
                onPress={() => onPressButton(4)}
                styles={styles}
                testID={top250TestId}
              />
              <AnimatedFloatingButton
                icon={Icons.materialIcons.games}
                index={5}
                name="My Collections"
                onPress={() => onPressButton(5)}
                styles={styles}
              />
              <AnimatedFloatingButton
                icon={Icons.materialIcons.logout}
                index={6}
                name="Logout"
                onPress={() => onPressButton(6)}
                styles={styles}
                color={Colors.red}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default memo(FloatingDrawer);
