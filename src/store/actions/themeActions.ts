import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { Theme, ThemeMode } from '@themes';

export const switchThemeAction: CaseReducer<ThemeState, PayloadAction<ThemeMode>> = (
  state,
  actions,
) => {
  const { payload: newThemeMode } = actions;

  state.mode = newThemeMode;
  state.colors = Theme[newThemeMode];
  state.isDark = newThemeMode === ThemeMode.dark;
};
