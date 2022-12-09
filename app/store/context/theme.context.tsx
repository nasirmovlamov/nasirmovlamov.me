import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';
import { createContext, ReactFragment, useLayoutEffect, useState } from 'react';

import { GlobalStyle } from '@styled-components/styled-global';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
type CustomThemeContextType = {
  isMenuOpen: boolean;
  darkMode: 'light' | 'dark' | null;
  toggleMenu: () => void;
  toggleTheme: (theme: 'light' | 'dark') => void;
};
export const CustomThemeContext = createContext<CustomThemeContextType>({
  isMenuOpen: false,
  darkMode: 'dark',
  toggleMenu: () => {},
  toggleTheme: () => {},
});

type Props = {
  children: ReactFragment;
};

export const CustomThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.remove('dark');

    if (darkMode === 'dark') {
      localStorage.setItem('color-theme', 'light');
      root.classList.add('light');
      setDarkMode('light');
    }
    if (darkMode === 'light') {
      localStorage.setItem('color-theme', 'dark');
      root.classList.add('dark');
      setDarkMode('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const localTheme = localStorage.getItem('color-theme');
    console.log(localTheme);
    if (localTheme === 'dark') {
      root.classList.add('dark');
      setDarkMode('dark');
    }
    if (localTheme === 'light') {
      root.classList.add('light');
      setDarkMode('light');
    }

    if (localTheme === null) {
      root.classList.add('dark');
      setDarkMode('dark');
    }
  }, []);

  return (
    <CustomThemeContext.Provider value={{ isMenuOpen, toggleMenu, toggleTheme, darkMode }}>
      <StyledThemeProvider theme={darkMode === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <div className="min-h-screen mx-auto max-w-5xl px-4">{children}</div>
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  );
};
