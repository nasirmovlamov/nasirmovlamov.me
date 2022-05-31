import styled from "styled-components";

export const StyledDashboardCard = styled.div`
  width: 410px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  padding: 10px 20px;
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
    font-size: 2.2rem;
    text-align: start ;
    font-weight: 600;
  }


`
/* @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  } */
