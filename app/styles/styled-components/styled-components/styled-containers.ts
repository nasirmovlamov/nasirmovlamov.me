import styled, { StyledComponentInnerAttrs, StyledComponentProps } from "styled-components";

export const StyledFRow = styled.div<{center:boolean , spaceBetween:boolean, spaceAround:boolean, spaceEvenly:boolean, flexEnd:boolean, flexStart:boolean }>`
  flex-direction: row;
  justify-content: ${({center , spaceBetween , spaceAround , spaceEvenly , flexEnd , flexStart}) => center ? 'center' || spaceBetween ? 'space-between' : spaceAround ? 'space-around' : spaceEvenly ? 'space-evenly' : flexEnd ? 'flex-end' : flexStart ? 'flex-start' : 'flex-start' : 'flex-start'};

`;

export const StyledFColumn = styled.div`
  flex-direction: column;
`;

export const StyledCenter = styled.div`
  justify-content: center;
  align-items: center;
`;


export const StyledFlex = styled.div<any>`
  display: flex;
  justify-content: ${({center , spaceBetween , spaceAround , spaceEvenly , flexEnd , flexStart}) => center ? 'center' : spaceBetween ? 'space-between' : spaceAround ? 'space-around' : spaceEvenly ? 'space-evenly' : flexEnd ? 'flex-end' : flexStart ? 'flex-start' : 'flex-start'};
  width: 100%;
`;


export const StyledMargin = styled.div<{left:number, right:number, top:number, bottom:number}>`
  margin-left: ${({left}) => left} + "px";
  margin-right: ${({right}) => right} + "px";
  margin-top: ${({top}) => top} + "px";
  margin-bottom: ${({bottom}) => bottom} + "px";
`;

export const StyledPadding = styled.div<{left:number, right:number, top:number, bottom:number}>`
  padding-left: ${({left}) => left} + "px";
  padding-right: ${({right}) => right} + "px";
  padding-top: ${({top}) => top} + "px";
  padding-bottom: ${({bottom}) => bottom} + "px";
`;
