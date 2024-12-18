import React from 'react';

import { ICON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';

import IconButtonMain from './IconButtonMain';

const { CONTAINER_COLOR } = ICON_BUTTON_CONSTANTS.STANDARD.THEME;

const IconButton = (props: IconButtonProps) => {
  const { colors: theme } = useAppSelector((state) => state.theme);

  return (
    <IconButtonMain
      backgroundColor={theme.all[CONTAINER_COLOR]}
      {...props}
    />
  );
};

export default IconButton;
