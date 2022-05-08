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


export const SytledText = styled.span<any>`
  color: ${({ theme , gray_1 , gray_2, white_2 }) => white_2 ? theme.colors.white_2 : gray_1 ?  theme.colors.gray_1 : gray_2 ? theme.colors.gray_2 : theme.colors.gray_2 };
  font-weight: ${({theme, bold}) => bold ? "600" : "initial"};
`;

export const StyledHeaderLink = styled.span<any>`
  display: inline;
  font-size: ${({ theme }) => theme.font.sizes.link};
  color: ${(props) => props.bold ? props.theme.colors.white_2 : props.theme.colors.gray_2};
  font-weight: ${(props) => props.bold ? 600 : 'initial'};
  margin: 0;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: ${({theme }) => theme.colors.gray_3 };
  }

`;


export const StyledHeader = styled.h1<any>`
  font-size: ${({ theme }) => theme.font.sizes.title};
  color: ${({ theme }) => theme.colors.white_2};
  margin-bottom: 5px;
  width: 100%;
`;

export const StyledSubHeader = styled.h2<any>`
  font-size: ${({ theme , fontSize }) => fontSize ? fontSize :  theme.font.sizes.subTitle};
  color: ${({ theme }) => theme.colors.white_2};
  margin-bottom: 10px;
  margin-top: ${({marginTop})=> marginTop};
`;

export const StyledHr = styled.hr<any>`
  border: none;
  margin: 0;
  width: ${( props ) => props.width || "100%"};
  height: ${(props) =>  props.height || "1px"};
  background-color: ${({ theme }) => theme.colors.gray_1};
`;
