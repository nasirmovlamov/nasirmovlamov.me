import styled, { createGlobalStyle } from 'styled-components';

import { ThemeType } from './styled-theme/styled-theme';

type Props = {
  theme: ThemeType
}



export const GlobalStyle = createGlobalStyle<Props>`
  html{
    font-size: 18px;
  }

  body {
    background-color: ${({ theme }) => theme.colors.black_1};
    font-size: 1rem;
  }

  a {
    font-size: ${({ theme }) => theme.font.sizes.link};
    /* text-decoration: none; */
    cursor: pointer;
  }

  p, h1, h2, h3, h4, h5, h6 {
    width: 100%;
  }

  * {
    color:${({theme}) => theme.colors.white_2}
  }

`
