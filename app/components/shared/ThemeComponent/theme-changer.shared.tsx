import React, { useContext, useState } from 'react';

import { CustomThemeContext } from '@store/context/theme.context';
import { StyledThemeChangerBtn } from './theme-changer.styled';
import { SvgThemeElement } from './elements/svg-theme.element';

type Props = {};

export const ThemeChanger = (props: Props) => {
  const { darkMode, toggleTheme } = useContext(CustomThemeContext);

  return (
    <StyledThemeChangerBtn darkMode={darkMode === 'light' ? false : true} onClick={toggleTheme}>
      <SvgThemeElement theme={darkMode === 'light' ? false : true} />
    </StyledThemeChangerBtn>
  );
};
