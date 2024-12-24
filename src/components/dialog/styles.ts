import { Dimensions, StyleSheet } from 'react-native';

import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

const ThemedStyles = (_: ThemeColors) => {
  const { height, width } = Dimensions.get('window');

  return StyleSheet.create({
    dialog: {
      ...globalStyles.flex1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colorWithOpacity(Colors.black, 0.5),
    },
    container: {
      ...globalStyles.columnCenter,
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      flex: 1,
      maxHeight: height * 0.7,
      maxWidth: width * 0.9,
    },
  });
};

export default ThemedStyles;
