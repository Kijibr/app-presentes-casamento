import { maxHeight } from "src/styles/global";
import styled from "styled-components";

const Content = styled.div`
  background:${props => props.theme.green};
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
`;

const WrapperItems = styled.div`
  background:${props => props.theme.green};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: relative;
  gap: 32px;
  padding: 48px 32px;
`;

const GiftBox = styled.div`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  
  gap: 8px;
  min-width: 240px;
  max-width: 360px;
  height: 240px;

  background-color:${props => props.theme.off_white};

  img {
    width: 100px;
    object-fit: contain;
  };
  
  span {
    border: 2px solid green;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    
    &:hover{
      background-color: #e0ae42;
    }

    transition: all 0.5s;
  }
  
  border: 2px solid rgba(0, 0, 0, 0.256);
  border-radius: 8px;
`;

export { Content, WrapperItems, GiftBox };