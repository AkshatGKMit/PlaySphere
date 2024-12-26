import React from 'react';
import { ActivityIndicator } from 'react-native';

import { TestIds } from '@constants';
import { useAppSelector } from '@store';

const { loader: loaderTestId } = TestIds.unit;

const Loader = ({ color, size }: LoaderProps) => {
  const { colors: theme } = useAppSelector((state) => state.theme);

  return (
    <ActivityIndicator
      color={color ?? theme.primaryText}
      size={size ?? 'small'}
      animating
      testID={loaderTestId}
    />
  );
};

export default Loader;
