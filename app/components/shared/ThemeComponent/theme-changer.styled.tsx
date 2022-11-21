import styled from 'styled-components';

export const StyledThemeChangerBtn = styled.button<any>`
  width: 45px;
  height: 45px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.gray_1 : theme.colors.white_2};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  svg {
    width: 25px;
    color: ${({ theme, isDarkMode }) => (isDarkMode ? theme.colors.black_1 : theme.colors.black_1)};
    path {
      color: ${({ theme, isDarkMode }) =>
        isDarkMode ? theme.colors.black_1 : theme.colors.black_1};
    }
  }
  :hover {
    border: 1px;
    box-shadow: ${({ theme, isDarkMode }) =>
      isDarkMode ? `0px 0px 4px ${theme.colors.gray_1}` : `0px 0px 4px ${theme.colors.white_2}`};
  }
`;
