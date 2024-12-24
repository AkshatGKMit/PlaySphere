import { StyleProp, TextProps, TextStyle } from 'react-native';

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

  interface GameListFooterProps {
    showNoConnectionScreenMessage: boolean;
    hasNextPage: boolean;
    hasData: boolean;
  }

  interface GameListHeaderProps extends GameListStylesProps {
    orderBy: DropDownItem;
    setOrderBy: (item: DropDownItem) => void;
    selectedSystemPlatform: DropDownItem;
    setSelectedSystemPlatform: (item: DropDownItem) => void;
    show?: boolean;
  }

  interface GameListListEmptyComponentProps extends GameListStylesProps {
    theme: ThemeColors;
    show?: boolean;
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

  interface TextBlockProps extends TextProps {
    fontFamily?: FontFamily;
    typography?: Typography;
    fontWeight?: FontWeight;
    color?: string;
    style?: StyleProp<Omit<TextStyle, 'fontFamily' | 'fontSize' | 'color'>>;
  }

  interface TextFieldProps extends TextInputProps {
    placeholder: string;
    leadingIcon?: IconType;
    trailingIcon?: IconType;
    onPressTrailingIcon?: () => void;
    error?: string;
  }
}
