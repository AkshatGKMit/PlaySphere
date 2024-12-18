import { createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import { switchThemeAction } from '@store/actions/themeActions';
import { Theme, ThemeMode } from '@themes';

const { NAME: sliceName } = STORE_CONSTANTS.THEME;

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: Theme[ThemeMode.light],
  isDark: false,
};

const themeSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: { switchTheme: switchThemeAction },
});

const themeReducer = themeSlice.reducer;

export const { switchTheme } = themeSlice.actions;

export default themeReducer;
