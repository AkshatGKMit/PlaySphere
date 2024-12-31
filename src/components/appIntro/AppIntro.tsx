import React from 'react';
import { Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextBlock from '@components/textBlock';
import { IMAGES, Typography, FontWeight, APP_NAME, TestIds } from '@constants';
import { Colors } from '@themes';
import { colorWithOpacity } from '@utility/style';

import styles from './styles';

const {
  root: rootTestId,
  appLogo: appLogoTestId,
  appName: appNameTestId,
  appTagLine: appTagLineTestId,
} = TestIds.unit.appIntro;

const AppIntro = (opacity?: Animated.Value) => {
  const introStyles = [styles.gradientContainer, { opacity: opacity ?? 1 }];

  return (
    <LinearGradient
      colors={[colorWithOpacity(Colors.black, 0.5), colorWithOpacity(Colors.black, 0.85)]}
      style={styles.gradientContainer}
      testID={rootTestId}
    >
      <Animated.View style={introStyles}>
        <Image
          source={IMAGES.APP_LOGO}
          style={styles.appLogo}
          testID={appLogoTestId}
        />
        <TextBlock
          typography={Typography.headlineLarge}
          fontWeight={FontWeight.black}
          color={Colors.white}
          testID={appNameTestId}
        >
          {APP_NAME}
        </TextBlock>
        <TextBlock
          typography={Typography.titleMedium}
          fontWeight={FontWeight.semibold}
          color={Colors.white}
          testID={appTagLineTestId}
        >
          Level Up Your Game Collection!
        </TextBlock>
      </Animated.View>
    </LinearGradient>
  );
};

export default AppIntro;
