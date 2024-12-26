import React, { useState } from 'react';

import Splash from '@screens/splash/Splash';
import Auth from '@screens/auth/Auth';

import StackNavigator from './StackNavigator';

const Navigator = () => {
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

  if (isAuthorized === null) {
    return <Splash onReady={(isAuthorize) => setAuthorized(isAuthorize)} />;
  }

  return isAuthorized ? <StackNavigator /> : <Auth />;
};

export default Navigator;
