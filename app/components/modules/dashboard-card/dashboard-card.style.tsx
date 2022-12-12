import styled from "styled-components";

export const StyledDashboardCard = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  padding: 10px 10px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.black_1};
  border-color: ${({ theme }) => theme.colors.white_1};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray_1};
  .card-title {
    font-size: 1.2rem;
  text-align: start ;

  }
  .card-view-count {
    font-size: 1.5rem;
    text-align: start ;
    font-weight: 600;
  }


`
/* @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  } */
