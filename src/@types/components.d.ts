import { ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { AddToCollectionDialogThemedStyles } from '@components/addToCollectionDialog';
import { ThemedStyles as DropdownStyles } from '@components/dropdown';
import { ThemedStyles as GameCardStyles } from '@components/gameCard';
import { ThemedStyles as GameListThemedStyles } from '@components/gameListScreen';
import FloatingDrawerThemedStyles from '@config/floatingDrawer/styles';
import { IconFamily } from '@constants';

declare global {
  interface ActionButtonProps extends ViewProps {
    label: string;
    onPress?: () => void;
    leadingIcon?: IconType;
    trailingIcon?: IconType;
    loading?: boolean;
    typography?: Typography;
    fontWeight?: FontWeight;
    iconSize?: number;
    color?: string;
  }

  interface AddNewCollectionStyles {
    styles: ReturnType<typeof AddToCollectionDialogThemedStyles>;
  }

  interface CollectionContainerProps extends AddNewCollectionStyles {
    gameInCollections: GameInCollections;
    gameInCollectionsRefetching: boolean;
    gameInCollectionsLoading: boolean;
    mutatingId: number | null;
    onPressCollection: (collection: GameInCollection) => void;
    updateGameLoading: boolean;
  }

  interface ListCollectionsProps extends AddNewCollectionStyles {
    gameInCollections: GameInCollections;
    onPressCollection: (collection: GameInCollection) => void;
    updateGameLoading: boolean;
    mutatingId: number | null;
  }

  interface DialogRef {
    show: (params: RefManagerParams) => void;
    hide: (onClose?: () => void) => void;
  }

  interface DropDownItem {
    id: string | number;
    label: string;
    value: string | number | boolean;
  }

  type DropdownItems = DropDownItem[];

  interface DropdownProps {
    items: DropdownItems;
    value?: DropDownItem | null;
    onSelect: (item: DropDownItem) => void;
    hint?: string;
    buttonInitials?: string;
  }

  interface DropdownStylesProps {
    styles: ReturnType<typeof DropdownStyles>;
  }

  interface DropdownRenderItemProps extends DropdownStylesProps {
    item: DropDownItem;
    setFocus: (value: boolean) => void;
    onSelect: (item: DropDownItem) => void;
  }

  interface DropDownRenderListProps extends DropdownStylesProps {
    items: DropdownItems;
    setFocus: (value: boolean) => void;
    onSelect: (item: DropDownItem) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    listViewStyles: Animated.WithAnimatedArray | Animated.WithAnimatedObject;
    listStyles: StyleProp<ViewStyle>;
  }

  interface FloatingDrawerButtonProps {
    icon: IconType;
    name: string;
    onPress: () => void;
    index: number;
    styles: ReturnType<typeof FloatingDrawerThemedStyles>;
    color?: string;
  }

  interface FeedGameCardProps {
    feed: CollectionFeed;
    collectionId: number;
  }

  interface GameCardStyleProps {
    styles: ReturnType<typeof GameCardStyles>;
  }

  interface GamCardImageViewProps extends GameCardStyleProps {
    uri: string;
    ageRating?: AgeRatingType | null;
    ageRatingStyles: StyleProp<ViewStyle>;
    rating: number | null;
  }

  interface GameCardContentProps extends GameCardStyleProps {
    name: string;
    emoji: string | null;
    releaseDate: string | null;
    genres: EntityFilters | null;
    genreList?: string;
    systemPlatformNames?: string[];
    showAddToCollectionDialog: () => void;
    hideAddButton?: boolean;
  }

  interface GameCardProps {
    game: Game;
    hideAddButton?: boolean;
    children?: ReactNode;
  }

  interface GameListStylesProps {
    styles: ReturnType<typeof GameListThemedStyles>;
  }

  interface GameListFooterProps {
    hasNextPage: boolean;
    hasData: boolean;
  }

  interface GameListHeaderProps extends GameListStylesProps {
    orderBy: DropDownItem;
    setOrderBy: (item: DropDownItem) => void;
    selectedSystemPlatform: DropDownItem;
    setSelectedSystemPlatform: (item: DropDownItem) => void;
    listHeaderBackgroundColor?: string;
    show?: boolean;
  }

  interface GameListListEmptyComponentProps extends GameListStylesProps {
    theme: ThemeColors;
    show?: boolean;
  }

  interface GameListScreenProps {
    url: string;
    listHeaderBackgroundColor?: string;
    header?: ReactNode;
    params?: ListQueryParams;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  }

  type IconFamily = (typeof IconFamily)[keyof typeof IconFamily];

  interface IconType {
    family: IconFamily;
    name: string;
  }

  interface IconProps {
    icon: IconType;
    size?: number;
    color?: string;
  }

  interface IconButtonMainProps {
    icon: IconType;
    onPress?: () => void;
    backgroundColor?: string;
    color?: string;
    size?: number;
    disabled?: boolean;
    borderWidth?: number;
    borderColor?: string;
  }

  type IconButtonProps = IconButtonMainProps;

  interface LoaderProps {
    color?: string;
    size?: number | 'small' | 'large';
  }

  interface ObjectLayout {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
    minHeight?: number;
    minWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
  }

  interface RefManagerParams extends RefOptions {
    child: React.JSX.Element | null;
    onClose?: () => void;
  }

  interface GameCardSystemPlatformProps {
    systemPlatforms: string[];
    starSize?: number;
  }

  interface RenderHtmlProps {
    html: string;
    color?: string;
    maxLines?: number;
    children?: ReactNode;
  }

  interface TextBlockProps extends TextProps {
    fontFamily?: FontFamily;
    typography?: Typography;
    fontWeight?: FontWeight;
    color?: string;
    style?: StyleProp<Omit<TextStyle, 'fontFamily' | 'fontSize'>>;
  }

  interface TextFieldProps extends TextInputProps {
    placeholder: string;
    leadingIcon?: IconType;
    trailingIcon?: IconType;
    onPressTrailingIcon?: () => void;
    error?: string;
  }

  type GameListHeaderProps = GameListStylesProps & ViewProps;
}
