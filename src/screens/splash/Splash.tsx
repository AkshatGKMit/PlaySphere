import React from 'react';
import { View } from 'react-native';

import AppIntro from '@components/appIntro';
import BannerImageView from '@components/bannerImageView';
import useStyles from '@config/useStyles';

import ThemedStyles from './styles';

const Splash = () => {
  const styles = useStyles(ThemedStyles);

  return (
    <View style={styles.backgroundContainer}>
      <BannerImageView />
      {AppIntro()}
    </View>
  );
};

export default Splash;
