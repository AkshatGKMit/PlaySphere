import { jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

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

jest.mock('@react-native-community/blur', () => {
  return {
    BlurView: jest.fn(({ children }) => {
      children;
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn().mockImplementation(() => ({
    Navigator: jest.fn<MockChildrenFn>().mockImplementation(({ children }) => children),
    Screen: jest.fn<MockChildrenFn>().mockImplementation(({ children }) => children),
  })),
}));

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: jest.fn<MockChildrenFn>().mockImplementation(({ children }) => children),
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    })),
    useRoute: jest.fn().mockImplementation(() => ({
      params: {},
    })),
    StackActions: {
      replace: jest.fn(),
    },
  };
});

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

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };

  return {
    SafeAreaProvider: jest.fn<MockChildrenFn>().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

//#region - Mocking react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: jest.fn<MockChildrenFn>().mockImplementation(({ children }) => children),
  QueryClient: jest.fn().mockImplementation(() => ({
    getQueryData: jest.fn(),
    setQueryData: jest.fn(),
  })),
  useQuery: jest.fn().mockImplementation(() => ({
    data: undefined,
  })),
  useInfiniteQuery: jest.fn().mockImplementation(() => ({
    data: undefined,
  })),
  usePrefetchInfiniteQuery: jest.fn(),
  useMutation: jest.fn().mockImplementation(() => ({
    mutate: jest.fn(),
  })),
  useQueryClient: jest.fn().mockImplementation(() => ({
    getQueryCache: jest.fn().mockImplementation(() => ({
      getAll: jest.fn().mockImplementation(() => []),
    })),
  })),
}));

jest.mock('@tanstack/react-query-persist-client', () => ({
  PersistQueryClientProvider: jest
    .fn<MockChildrenFn>()
    .mockImplementation(({ children }) => children),
}));
//#endregion
