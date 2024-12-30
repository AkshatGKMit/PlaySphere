import React, { useState } from 'react';

import Splash from '@screens/splash/Splash';
import Auth from '@screens/auth/Auth';

import StackNavigator from './StackNavigator';
import { useAppSelector } from '@store';

const Navigator = () => {
  const { isLogin: login } = useAppSelector((state) => state.auth);
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

  if (isAuthorized === null) {
    return <Splash onReady={(isAuthorize) => setAuthorized(isAuthorize)} />;
  }

  return login ? <StackNavigator /> : <Auth />;
};

export default Navigator;
