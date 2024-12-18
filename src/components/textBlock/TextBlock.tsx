import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

import { Typography } from '@constants';
import { useAppSelector } from '@store';

const TextBlock = (props: TextBlockProps) => {
  const { fontFamily, typography, fontWeight, style, children, color } = props;

  const { colors: theme } = useAppSelector((state) => state.theme);

  const textStyles: StyleProp<TextStyle> = [
    style,
    {
      ...(typography ?? Typography.bodyMedium),
      color: color ?? theme.primaryText,
      fontFamily,
      fontWeight,
    },
  ];

  return (
    <Text
      {...props}
      style={textStyles}
    >
      {children}
    </Text>
  );
};

export default TextBlock;
