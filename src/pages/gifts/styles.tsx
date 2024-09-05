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
  background:${props => props.theme.off_white};
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
  min-width: 220px;
  
  width: 220px;
  height: 316px;

  background-color:${props => props.theme.banner_home};
  
  font-family: "Questrial", sans-serif;
  font-weight: 400;
  color:${props => props.theme.light_white};

  img {
    width: 160px;
    max-width: 240px;
    height: auto;

    object-fit: cover;
    aspect-ratio: 3/4;
    border-radius: 12px;
  };
  
  p {
    font-size: 14px;
    text-align: center;
    
    &.giftValue{
      font-size: 12px;
      margin-top: -4px;
    }
  }

  span {
    border: 1px solid ${props => props.theme.green};
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    
    background-color: ${props => props.theme.light_green};
    color: ${props => props.theme.light_white};
    
    &:hover{
      border: 1px solid ${props => props.theme.light_green};
      background-color: ${props => props.theme.green};
    }

    transition: all 0.5s;
  }

  border-radius: 16px;
`;

export { Content, WrapperItems, GiftBox };