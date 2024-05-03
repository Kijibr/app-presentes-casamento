import styled from "styled-components";

const Content = styled.div`
  background:${props => props.theme.off_white};
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  
  max-width: 100vw;
  min-height: 100vh;
`;

export { Content };