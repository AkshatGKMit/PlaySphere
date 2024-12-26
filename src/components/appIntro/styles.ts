import { StyleSheet } from 'react-native';

import { Colors, globalStyles } from '@themes';

const styles = StyleSheet.create({
  gradientContainer: {
    ...globalStyles.flex1,
    ...globalStyles.columnCenter,
    height: '100%',
    gap: 10,
  },
  appLogo: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});

export default styles;
