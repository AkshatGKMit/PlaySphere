import React from 'react';

import Splash from '@screens/splash/Splash';
import Auth from '@screens/auth/Auth';
import { useAppSelector } from '@store';

import StackNavigator from './StackNavigator';

const Navigator = () => {
  const { isAuthorized } = useAppSelector((state) => state.auth);

  if (isAuthorized === null) {
    return <Splash />;
  }

  return isAuthorized ? <StackNavigator /> : <Auth />;
};

export default Navigator;
