import styled from "styled-components";

export const StyledFooterLink = styled.div<any>`
  /* display: inline; */
  font-size: ${({ theme }) => theme.font.sizes.link};
  color: ${(props) => props.bold ? props.theme.colors.white_2 : props.theme.colors.gray_2};
  font-weight: ${(props) => props.bold ? 600 : 'initial'};
  margin: 0;
  padding: 10px 0px;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
  }
`;
