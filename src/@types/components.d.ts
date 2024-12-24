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

  interface TextBlockProps extends TextProps {
    fontFamily?: FontFamily;
    typography?: Typography;
    fontWeight?: FontWeight;
    color?: string;
    style?: StyleProp<Omit<TextStyle, 'fontFamily' | 'fontSize' | 'color'>>;
  }
}
