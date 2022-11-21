import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';
import { createContext, ReactFragment, useEffect, useState } from 'react';

import { GlobalStyle } from '@styled-components/styled-global';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

type CustomThemeContextType = {
  isMenuOpen: boolean;
  isDarkMode: boolean;
  changeTheme: () => void;
  toggleMenu: () => void;
};
export const CustomThemeContext = createContext<CustomThemeContextType>({
  isMenuOpen: false,
  isDarkMode: true,
  changeTheme: () => {},
  toggleMenu: () => {},
});

type Props = {
  children: ReactFragment;
};

export const CustomThemeProvider = ({ children }: Props) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [isMenuOpen, ietIsMenuOpen] = useState<boolean>(false);

  const rawSetTheme = (theme: any) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
  };

  const changeTheme = () => {
    setDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    console.log('darkMode ', isDarkMode);
    // rawSetTheme(!darkMode ? 'dark' : 'light');
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(!isDarkMode ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    ietIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode !== null) {
      setDarkMode(JSON.parse(darkMode));
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    }
  }, []);

  return (
    <CustomThemeContext.Provider value={{ isMenuOpen, isDarkMode, changeTheme, toggleMenu }}>
      <StyledThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
        <GlobalStyle />
        <div className="min-h-screen mx-auto max-w-5xl px-7">{children}</div>
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  );
};
