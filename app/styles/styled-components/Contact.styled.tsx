import { IStyledTypes } from './styled-types/styled-types';
import styled from 'styled-components';

interface ISty_Contact extends IStyledTypes {
}

export const Sty_Contact = styled.div<ISty_Contact>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
  height: 100px;
`;
