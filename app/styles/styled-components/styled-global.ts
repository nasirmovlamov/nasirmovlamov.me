import styled, { createGlobalStyle } from 'styled-components';

import { ThemeType } from './styled-theme/styled-theme';

type Props = {
  theme: ThemeType
}



export const GlobalStyle = createGlobalStyle<Props>`
  body {
    background-color: ${({ theme }) => theme.body};
  }

`
