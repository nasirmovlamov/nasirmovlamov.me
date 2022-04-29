import styled from 'styled-components';

export const Sty_Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
  height: 100vh;
  background-color: #363740;
  left: 0px;
`;

export const Sty_Sidebar_Top = styled.div`
  width: 100%;
  /* height: 60px; */
  column-gap: 10px;
  display: flex;
  flex: 0 0 60px;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const Sty_Sidebar_Middle = styled.div`
  width: 100%;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: white;
  padding-top: 50px;
`;

export const Sty_Sidebar_Bottom = styled.div`
  width: 100%;
  flex: 0 0 100px;
  display: flex;
  justify-content: space-around;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
  color: white;
`;

export const Sty_Sidebar_Link = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border: 1px solid white;
  cursor: pointer;
`;

export const Sty_Sidebar_Social = styled.a`
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;
