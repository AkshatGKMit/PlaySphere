import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { useQueryClient } from '@tanstack/react-query';

import Icon from '@components/icon';
import { DefaultObjectLayout, Icons, isIos, QueryKeys, Routes } from '@constants';
import useStyles from '@config/useStyles';
import ApiConstants from '@network/apiConstants';
import { useAppDispatch } from '@store';
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

const { currentUser: currentUserKey } = QueryKeys;

const { home: homeRoute, collections: collectionsRoute } = Routes.Stack;

const FloatingDrawer = () => {
  const { navigate, dispatch } = useNavigation<StackNavigation>();
  const { top: topInsets } = useSafeAreaInsets();

  const queryClient = useQueryClient();
  const appDispatch = useAppDispatch();

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
    queryClient.invalidateQueries({ queryKey: [currentUserKey] });
    appDispatch(removeUser());
    appDispatch(logout());
  }, [appDispatch, queryClient]);

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
      <Pressable onPress={() => setVisible(true)}>
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
      >
        <Pressable
          style={globalStyles.flex1}
          onPress={() => setVisible(false)}
        >
          <BlurView
            style={globalStyles.fullPositionAbsolute}
            blurAmount={0}
          />
          <View style={styles.modalContainer}>
            <View style={[styles.closeIcon, { top: buttonTop, left: buttonLeft }]}>
              <Icon
                icon={Icons.materialIcons.close}
                size={20}
              />
            </View>
            <View style={[styles.buttonList, { top: listTop, left: listLeft }]}>
              <AnimatedFloatingButton
                icon={Icons.antDesign.star}
                index={0}
                name="Popular"
                onPress={() => onPressButton(0)}
                styles={styles}
              />
              <AnimatedFloatingButton
                icon={Icons.materialIcons.localFireDepartment}
                index={1}
                name="This Week"
                onPress={() => onPressButton(1)}
                styles={styles}
              />
              <AnimatedFloatingButton
                icon={Icons.fontAwesome.trophy}
                index={2}
                name="Best Of the Year"
                onPress={() => onPressButton(2)}
                styles={styles}
              />
              <AnimatedFloatingButton
                icon={Icons.materialCommunityIcons.chartBox}
                index={3}
                name="Popular in 2023"
                onPress={() => onPressButton(3)}
                styles={styles}
              />
              <AnimatedFloatingButton
                icon={Icons.materialCommunityIcons.crown}
                index={4}
                name="Top 250"
                onPress={() => onPressButton(4)}
                styles={styles}
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
