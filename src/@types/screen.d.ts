import { SetStateAction } from 'react';
import { Animated, StyleProp, ViewProps, ViewStyle } from 'react-native';

import AuthThemedStyles from '@screens/auth/styles';
import HomeThemedStyles from '@screens/home/styles';

declare global {
  interface AuthFormComponent {
    authTypeLogin: boolean;
    setAuthTypeLogin: (value: SetStateAction<boolean>) => void;
    formOptions: UseForm<RegisterBody>;
    styles: ReturnType<typeof AuthThemedStyles>;
    containerStyles: Animated.WithAnimatedArray | Animated.WithAnimatedObject;
    buttonContainerStyles: Animated.WithAnimatedArray | Animated.WithAnimatedObject;
    authenticate: () => void;
    loading: boolean;
  }

  interface HomeStylesProps {
    styles: ReturnType<typeof HomeThemedStyles>;
  }

  interface HomeHeaderProps extends HomeStylesProps, ViewProps {
    headerStyles: StyleProp<ViewStyle>;
  }
