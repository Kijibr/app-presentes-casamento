import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tips = styled.ul<{ index: number }>`
  font-size: 24px;
  background-color: ${props => props.theme.white};
  color: gray;
  padding-left: 24px;
  padding: 12px 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 0px gray solid;
  border-radius: 4px;

  display: flex;
  align-items: center;

  opacity: 0;
  transform: translateY(50px);

  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${({ index }) => `${index * 0.1}s`};
  transition: transform 0.2s ease;
`;

const Paper = styled.div`
  margin: 48px;
  padding: 24px;
  background-color: #9ca771;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.span`
  font-size: 36px;
  align-self: center;
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};
`;

const Subtitle = styled(Title)`
  font-size: 32px;
`;

export { Paper, Wrapper, Title, Subtitle, Tips }