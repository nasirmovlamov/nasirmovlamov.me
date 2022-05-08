import React, { useContext, useState } from 'react'

import { CustomThemeContext } from '@store/context/theme.context'
import { StyledThemeChangerBtn } from './theme-changer.styled'
import { SvgThemeElement } from './elements/svg-theme.element'

type Props = {}

export const ThemeChanger = (props: Props) => {
  const {darkMode , changeTheme} = useContext<any>(CustomThemeContext)



  return (
      <StyledThemeChangerBtn darkMode={darkMode} onClick={changeTheme}>
          <SvgThemeElement theme={darkMode}/>
      </StyledThemeChangerBtn>
  )
}


