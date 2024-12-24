import { SetStateAction } from 'react';
import { Animated, StyleProp, ViewProps, ViewStyle } from 'react-native';

import AuthThemedStyles from '@screens/auth/styles';
import DetailsThemedStyles from '@screens/details/styles';
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

  interface DetailsStyleProps {
    styles: ReturnType<typeof DetailsThemedStyles>;
  }

  interface DetailsThemeStyleProps extends DetailsStyleProps {
    theme: ThemeColors;
  }

  interface DetailsAboutProps extends DetailsThemeStyleProps {
    isPending: boolean;
    showFullAbout: boolean;
    setShowFullAbout: (value: boolean) => void;
    description?: string;
  }

  interface DetailsMediaHeaderProps extends DetailsThemeStyleProps {
    isVideo: boolean;
    setIsVideo: (value: boolean) => void;
    game?: Game;
    movies?: Movies;
  }

  interface DetailsVideoHeaderProps extends DetailsThemeStyleProps {
    setIsVideo: (value: boolean) => void;
    movie: Movie;
  }

  interface DetailsMetricsProps extends DetailsThemeStyleProps {
    isPending: boolean;
    released?: string;
    metaCritic?: number;
    ratedFor?: AgeRatingType;
    playtime: number;
  }

  interface DetailsRatingCategoryContainerProps extends DetailsStyleProps {
    rating: Rating;
  }

  interface DetailsRatingsProps extends DetailsStyleProps {
    ratings: Ratings;
  }

  interface DetailsScreenshotsProps extends DetailsThemeStyleProps {
    isPending: boolean;
    screenshots: Screenshots;
  }

  interface DetailsStickyTitleProps extends DetailsThemeStyleProps {
    isPending: boolean;
    stickyContainerStyles: StyleProp<ViewStyle>;
    onLayout: (event: LayoutChangeEvent) => void;
    showStickyButton: boolean;
    goBack: () => void;
    name: string;
    showAddToCollectionDialog: () => void;
    systemPlatformNames?: string[];
    rating: number;
  }

  interface DetailsTagsProps extends DetailsStyleProps {
    genres?: EntityFilters | null;
    tags?: EntityFilters | null;
  }
}
