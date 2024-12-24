import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextBlock from '@components/textBlock';
import { IMAGES, Typography, FontWeight, APP_NAME } from '@constants';
import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

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

const styles = StyleSheet.create({
  gradientContainer: {
    ...globalStyles.flex1,
    ...globalStyles.columnCenter,
    height: '100%',
    gap: 10,
  },
  appLogo: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 12,
  },
});
