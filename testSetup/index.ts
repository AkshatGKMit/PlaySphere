import { jest } from '@jest/globals';

//#region - Mocking react-native-vector-icons
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('react-native-vector-icons/FontAwesome5Pro', () => 'FontAwesome5Pro');
jest.mock('react-native-vector-icons/FontAwesome6', () => 'FontAwesome6');
jest.mock('react-native-vector-icons/FontAwesome6Pro', () => 'FontAwesome6Pro');
jest.mock('react-native-vector-icons/Fontisto', () => 'Fontisto');
jest.mock('react-native-vector-icons/Foundation', () => 'Foundation');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/Octicons', () => 'Octicons');
jest.mock('react-native-vector-icons/SimpleLineIcons', () => 'SimpleLineIcons');
jest.mock('react-native-vector-icons/Zocial', () => 'Zocial');
//#endregion

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn().mockImplementation(() => ({
    Navigator: jest.fn(({ children }) => children),
    Screen: jest.fn(({ children }) => children),
  })),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-orientation-locker', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    lockToPortrait: jest.fn(),
    lockToLandscapeLeft: jest.fn(),
    lockToLandscapeRight: jest.fn(),
    unlockAllOrientations: jest.fn(),
  };
});
