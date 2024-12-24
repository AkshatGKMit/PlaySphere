/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import App from './App';
import { name as appName } from './app.json';

export const storage = new MMKV();

AppRegistry.registerComponent(appName, () => App);
