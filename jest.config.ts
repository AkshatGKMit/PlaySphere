import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/testSetup/index.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-native|@react-native|react-redux|react-native-linear-gradient|react-native-community|react-native-vector-icons|@react-navigation|react-native-orientation-locker|react-native-video)/)',
  ],
};

export default config;
