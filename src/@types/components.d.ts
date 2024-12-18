import { StyleProp, TextProps, TextStyle } from 'react-native';

import { IconFamily } from '@constants';

declare global {
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

  interface TextBlockProps extends TextProps {
    fontFamily?: FontFamily;
    typography?: Typography;
    fontWeight?: FontWeight;
    color?: string;
    style?: StyleProp<Omit<TextStyle, 'fontFamily' | 'fontSize' | 'color'>>;
  }
}
