import React, { ReactElement, useState } from 'react';
import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';

import { GlobalStyle } from '@styled-components/styled-global';
import { Sty_Layout } from './Layout.style';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Sty_Layout>
        {children}
      </Sty_Layout>
    </StyledThemeProvider>
  );
};
