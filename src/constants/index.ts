import { Platform } from 'react-native';

import { capitalizeWord } from '@utility/helpers';

export const isIos = Platform.OS === 'ios';

export const Routes = {
  Stack: {
    home: 'Home',
    search: 'Search',
    details: 'Details',
    collections: 'Collections',
    collectionGames: 'Collection Games',
  },
} as const;

export const LibraryStatus = {
  owned: 'owned',
  playing: 'playing',
  beaten: 'beaten',
  dropped: 'dropped',
  yet: 'yet',
  toPlay: 'toPlay',
} as const;

export const AuthFields: AuthFields = {
  email: 'email',
  password: 'password',
  username: 'username',
};

export const StorageKey = {
  token: 'token',
} as const;

export const RatingCategory = {
  exceptional: 'exceptional',
  recommended: 'recommended',
  meh: 'meh',
  skip: 'skip',
} as const;

export const Emoji = {
  diamond: '💎',
  hot: '🔥',
  neutralFace: '😐',
  forbidden: '🚫',
} as const;

export const AgeRating = {
  id1: { slug: 'everyone', age: 0, color: '#00FF00' },
  id2: { slug: 'everyone-10-plus', age: 10, color: '#A0D65D' },
  id3: { slug: 'teen', age: 13, color: '#FFA500' },
  id4: { slug: 'mature', age: 17, color: '#FF4500' },
  id5: { slug: 'adults-only', age: 18, color: '#FF0000' },
  id6: { slug: 'rating-pending', age: null, color: '#808080' },
} as const;

export const MainSystemPlatforms = {
  android: { id: 21, name: 'android' },
  ios: { id: 3, name: 'ios' },
  linux: { id: 6, name: 'linux' },
  macintosh: { id: 55, name: 'macintosh' },
  macos: { id: 5, name: 'macos' },
  nintendo: { id: 7, name: 'nintendo' },
  pc: { id: 4, name: 'pc' },
  playstation: { id: 7, name: 'playstation' },
  xbox: { id: 14, name: 'xbox' },
} as const;

export const DefaultObjectLayout: ObjectLayout = {
  height: 0,
  width: 0,
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
};

export const Errors = {
  noInternet: 'No Internet Connection',
};

export const orderByDropdownItems: DropdownItems = [
  { id: 1, value: 'relevance', label: 'Relevance' },
  { id: 2, value: 'name', label: 'Name' },
  { id: 3, value: 'released', label: 'Released' },
  { id: 4, value: 'added', label: 'Added' },
  { id: 5, value: 'created', label: 'Created' },
  { id: 6, value: 'updated', label: 'Updated' },
  { id: 7, value: 'rating', label: 'Rating' },
  { id: 8, value: 'metacritic', label: 'Critics Score' },
];

export const systemPlatformDropdownItems: DropdownItems = [
  {
    id: 0,
    value: 'any',
    label: 'Any',
  },
  {
    id: 1,
    value: MainSystemPlatforms.android.id,
    label: capitalizeWord(MainSystemPlatforms.android.name),
  },
  {
    id: 2,
    value: MainSystemPlatforms.ios.id,
    label: capitalizeWord(MainSystemPlatforms.ios.name),
  },
  {
    id: 3,
    value: MainSystemPlatforms.linux.id,
    label: capitalizeWord(MainSystemPlatforms.linux.name),
  },
  {
    id: 4,
    value: MainSystemPlatforms.macintosh.id,
    label: capitalizeWord(MainSystemPlatforms.macintosh.name),
  },
  {
    id: 5,
    value: MainSystemPlatforms.macos.id,
    label: capitalizeWord(MainSystemPlatforms.macos.name),
  },
  {
    id: 6,
    value: MainSystemPlatforms.nintendo.id,
    label: capitalizeWord(MainSystemPlatforms.nintendo.name),
  },
  {
    id: 7,
    value: MainSystemPlatforms.pc.id,
    label: capitalizeWord(MainSystemPlatforms.pc.name),
  },
  {
    id: 8,
    value: MainSystemPlatforms.playstation.id,
    label: capitalizeWord(MainSystemPlatforms.playstation.name),
  },
  {
    id: 9,
    value: MainSystemPlatforms.xbox.id,
    label: capitalizeWord(MainSystemPlatforms.xbox.name),
  },
];

export { displayName as APP_NAME } from '../../app.json';
export * from './componentSpecifications';
export * from './icons';
export * from './images';
export * from './query';
export * from './store';
export * from './style';
export * from './test';
