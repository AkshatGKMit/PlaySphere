export const AuthFields: AuthFields = {
  email: 'email',
  password: 'password',
  username: 'username',
};


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
  android: 'android',
  ios: 'ios',
  linux: 'linux',
  macintosh: 'macintosh',
  macos: 'macos',
  nintendo: 'nintendo',
  pc: 'pc',
  playstation: 'playstation',
  xbox: 'xbox',
} as const;


export { displayName as APP_NAME } from '../../app.json';
export * from './componentSpecifications';
export * from './icons';
export * from './images';
export * from './store';
export * from './style';
