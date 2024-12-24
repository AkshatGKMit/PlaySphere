import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useAppSelector } from '@store';

const Loader = ({ color, size }: LoaderProps) => {
  const { colors: theme } = useAppSelector((state) => state.theme);

  return (
    <ActivityIndicator
      color={color ?? theme.primaryText}
      size={size ?? 'small'}
      animating
    />
  );
};

export default Loader;
