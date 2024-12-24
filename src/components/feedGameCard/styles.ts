import { StyleSheet } from 'react-native';

import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/style';

const styles = StyleSheet.create({
  feedContainer: {
    ...globalStyles.flex1,
    maxWidth: '100%',
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5,
    padding: 6,
    backgroundColor: colorWithOpacity(Colors.black, 0.5),
    borderRadius: 15,
  },
});

export default styles;
