import styled from "styled-components";

export const  StyledPersonImage = styled.div`
  width: 126px;
  height: 126px;
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: grayscale(1);
  }

`
