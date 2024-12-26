import React from 'react';
import { Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextBlock from '@components/textBlock';
import { IMAGES, Typography, FontWeight, APP_NAME } from '@constants';
import { Colors } from '@themes';
import { colorWithOpacity } from '@utility/style';

import styles from './styles';

const AppIntro = (opacity?: Animated.Value) => {
  const introStyles = [styles.gradientContainer, { opacity: opacity ?? 1 }];

  return (
    <LinearGradient
      colors={[colorWithOpacity(Colors.black, 0.5), colorWithOpacity(Colors.black, 0.85)]}
      style={styles.gradientContainer}
    >
      <Animated.View style={introStyles}>
        <Image
          source={IMAGES.APP_LOGO}
          style={styles.appLogo}
        />
        <TextBlock
          typography={Typography.headlineLarge}
          fontWeight={FontWeight.black}
          color={Colors.white}
        >
          {APP_NAME}
        </TextBlock>
        <TextBlock
          typography={Typography.titleMedium}
          fontWeight={FontWeight.semibold}
          color={Colors.white}
        >
          Level Up Your Game Collection!
        </TextBlock>
      </Animated.View>
    </LinearGradient>
  );
};

export default AppIntro;
