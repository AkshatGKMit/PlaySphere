import { StyleSheet } from 'react-native';

import { globalStyles, Colors } from '@themes';
import { colorWithOpacity } from '@utility/style';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    maxWidth: '50%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    ...globalStyles.columnCenter,
    gap: 4,
    backgroundColor: colorWithOpacity(Colors.black, 0.5),
    padding: 8,
  },
  title: {
    textTransform: 'capitalize',
    textAlign: 'center',
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
