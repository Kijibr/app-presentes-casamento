import styled from "styled-components";

const Content = styled.div`
  background:${props => props.theme.off_white};
  display: flex;
  justify-items: center;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
  max-width: 100dvw;
  max-height: 100dvh;
`;

export { Content };