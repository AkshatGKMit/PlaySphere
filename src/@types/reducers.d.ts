interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

interface AuthState {
  isAuthorized: boolean | null;
  isLogin: boolean;
}

interface HomeScreenState {
  lastIndex: number | null;
  currentIndex: number;
  numberOfPushedScreens: number;
  history: number[];
}

interface UserCollection {
  id: number;
  name: string;
  image: string;
  gameIds: number[];
}

interface UserState {
  user: User | null;
}

type UserCollections = UserCollection[];
