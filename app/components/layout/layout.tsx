import React, { ReactElement, ReactFragment, useState } from 'react';
import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';

import { GlobalStyle } from '@styled-components/styled-global';
import { Sty_Layout } from './layout.style';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

type Props = {
  children: ReactFragment;
};

export const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />

      <Sty_Layout>
        {children}
      </Sty_Layout>
    </StyledThemeProvider>
  );
};
