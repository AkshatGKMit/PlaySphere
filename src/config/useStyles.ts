import { useMemo } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSelector } from '@store';

function useStyles<T>(themedStyleFunc: (colors: ThemeColors, insets: EdgeInsets) => T): T {
  const insets = useSafeAreaInsets();
  const { colors: theme } = useAppSelector((state) => state.theme);

  const styles = useMemo(() => {
    return themedStyleFunc(theme, insets);
  }, [theme, themedStyleFunc, insets]);

  return styles;
}

export default useStyles;
