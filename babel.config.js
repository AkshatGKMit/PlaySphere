module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@network': './src/network',
          '@screens': './src/screens',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utility': './src/utility',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'API',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
