import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  rowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  positionRelative: {
    position: 'relative',
  },
  fullPositionAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullDimensions: {
    height: '100%',
    width: '100%',
  },
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
});
