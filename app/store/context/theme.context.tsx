import React, { ReactFragment, createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from '@styled-components/styled-theme/styled-theme';

import { GlobalStyle } from "@styled-components/styled-global";
import { Sty_Layout } from "@components/layout/layout.style";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const CustomThemeContext = createContext({})


type Props = {
  children: ReactFragment;
};


export const CustomThemeProvider = ({children}:Props) => {
  const [darkMode , setDarkMode] = useState(false)

  const rawSetTheme = (theme:any) => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  const changeTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode' , JSON.stringify(!darkMode))
    console.log("darkMode " ,darkMode)
    rawSetTheme(!darkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if( darkMode !== null){
      setDarkMode(JSON.parse(darkMode))
    }
  }, [])

  return (
    <CustomThemeContext.Provider value={{darkMode , changeTheme}}>
      <StyledThemeProvider  theme={ darkMode ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Sty_Layout>
        {children}
        </Sty_Layout>
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  )
}
