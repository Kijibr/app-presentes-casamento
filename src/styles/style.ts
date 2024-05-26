import styled from "styled-components";

const Content = styled.div`
  background:${props => props.theme.off_white};
  display: flex;
  justify-items: center;
  flex-direction: column;
  
  width: 100vw;
  height: 100vh;
`;

export { Content };