import styled,  {StyledComponentInnerAttrs, StyledComponentProps, css} from "styled-components";

export const StyledContainer = styled.div<any>`
  width: ${({width}) => width ? width : "100%"};
  height: ${({height}) => height ? height : "auto"};
  display: ${({flex , grid , }) => flex ? 'flex' || grid ? "grid" : "initial" : "initial"};
  margin-top: ${({marginTop}) => marginTop? marginTop :"0"};
  margin-bottom: ${({marginBottom}) => marginBottom? marginBottom :"0"};
`;


export const StyledFRow = styled.div<any>`
  flex-direction: row;
  justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'flex-start'};
  display: flex;
`;

export const StyledFColumn = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: ${({width}) => width ? width : "100%"};
  height: ${({height}) => height ? height : "auto"};
`;

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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


export const StyledSpacing = styled.div<any>`
  margin-top: ${({marginTop}) => marginTop ? marginTop : "0"};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : "0"};
  margin-left: ${({marginLeft}) => marginLeft ? marginLeft : "0"};
  margin-right: ${({marginRight}) => marginRight ? marginRight : "0"};
  padding-top: ${({paddingTop}) => paddingTop ? paddingTop : "0"};
  padding-bottom: ${({paddingBottom}) => paddingBottom ? paddingBottom : "0"};
  padding-left: ${({paddingLeft}) => paddingLeft ? paddingLeft : "0"};
  padding-right: ${({paddingRight}) => paddingRight ? paddingRight : "0"};
`



export const StyledFlex = styled.div<any>`
  display: flex;
  justify-content: ${({center , spaceBetween , spaceAround , spaceEvenly , flexEnd , flexStart}) => center ? 'center' : spaceBetween ? 'space-between' : spaceAround ? 'space-around' : spaceEvenly ? 'space-evenly' : flexEnd ? 'flex-end' : flexStart ? 'flex-start' : 'flex-start'};
  width: 100%;
  margin-top: ${({marginTop}) => marginTop? marginTop :"0"};
  margin-bottom: ${({marginBottom}) => marginBottom? marginBottom :"0"};
  column-gap: ${({columnGap}) => columnGap? columnGap :"0"};
  /* ${props => StyledSpacing} */
`;
