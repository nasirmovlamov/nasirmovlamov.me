import { ThemeType } from "@styled-components/styled-theme/styled-theme";
import styled from "styled-components";

export const StyledParagraph = styled.p<any>`
    color: ${({ theme }) => theme.colors.body};
    margin: 0;
`;


export const StyledSideParagraph = styled.p<any>`
    color: ${({ theme }) => theme.colors.gray_2};
    margin: 0;
`;

export const StyledHeaderLink = styled.p<any>`
  display: inline;
  font-size: ${({ theme }) => theme.font.sizes.link};
  color: ${(props) => props.bold ? props.theme.colors.white_2 : props.theme.colors.gray_2};
  margin: 0;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: ${({theme}) => theme.colors.gray_1};
  }

`;


export const StyledHeader = styled.h1<any>`
  font-size: ${({ theme }) => theme.font.sizes.title};
  color: ${({ theme }) => theme.colors.white_2};
  margin-bottom: 5px;
  width: 100%;
`;

export const StyledSubHeader = styled.h2<any>`
  font-size: ${({ theme }) => theme.font.sizes.subTitle};
  color: ${({ theme }) => theme.colors.white_2};
  margin-bottom: 20px;
`;

export const StyledHr = styled.hr<any>`
  border: none;
  margin: 0;
  width: ${( props ) => props.width || "100%"};
  height: ${(props) =>  props.height || "1px"};
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.gray_1};
  
`;
