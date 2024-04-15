import styled from "styled-components";

const Tips = styled.li`
  font-size: 24px;
  color: rgb(224, 174, 66);
  padding-left: 24px;
`;
const Paper = styled.div`
  margin: 48px;
  padding: 24px;
  background-color: #828e51;

  border: 2px solid orange;
  border-radius: 30px;
  
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.span`
  font-size: 48px;
  align-self: center;
  
`;

export { Paper, Wrapper, Title, Tips }