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

  const changeTheme = () => {
    setDarkMode(!lightTheme)
    localStorage.setItem('darkMode' , JSON.stringify(darkMode))
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if( darkMode !== null){
      setDarkMode(JSON.parse(darkMode))
    }
  }, [])

  return (
    <CustomThemeContext.Provider value={{darkMode , setDarkMode}}>
      <StyledThemeProvider  theme={ darkMode ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Sty_Layout>
        {children}
        </Sty_Layout>
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  )
}
