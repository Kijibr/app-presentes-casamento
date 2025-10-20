import { mediaQueryDown, mediaQueryUp } from "src/styles/breakPoints";
import styled from "styled-components";

export const GiftBox = styled.div`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  
  gap: 8px;
  min-width: 220px;
  max-width: 240px;
  
  width: 220px;
  height: 316px;

  ${mediaQueryDown.xs} {
    min-width: 140px;
    height: 296px;
  }

  ${mediaQueryDown.xxs}{
    min-width: 100px;
    height: 248px;
  }

  background-color:${props => props.theme.banner_home};
  
  font-family: "Questrial", sans-serif;
  font-weight: 400;
  color:${props => props.theme.light_white};

  img {
    width: 160px;

    ${mediaQueryDown.xs} {
      width: 128px;
    }
    ${mediaQueryDown.xxs}{
      width: 98px;
    }

    max-width: 240px;
    height: auto;
    
    object-fit: cover;
    aspect-ratio: 3/4;
    border-radius: 12px;
  };
  
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    width: 90%;
    
    ${mediaQueryDown.xs} {
      font-size: 1.8vmax;
    }
    
    ${mediaQueryDown.xxs}{
      font-size: 1.6vmax;
    }

    text-align: center;
    padding: 0 4px;

    &.giftValue{
      font-size: 12px;
      margin-top: -2px;
    }
  }

  border-radius: 16px;
`;

export const ActionButton = styled.span`
  border: 1px solid ${props => props.theme.green};
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  width: fit-content;
  &.payment-options {
    width: 180px;
  }
  &.disabled {
    &:hover {
      background-color: ${props => props.theme.gray};
    }
    background-color: ${props => props.theme.gray};
    cursor: not-allowed;
  }
  height: 32px;
  text-align: center;
  
  background-color: ${props => props.theme.light_green};
  color: ${props => props.theme.light_white};

  
  /* ${mediaQueryDown.xs} {
    font-size: 1.4vmax;
  }
  
  ${mediaQueryUp.md} {
    font-size: 0.8vmax;
    } */
   font-size: 16px;

  &:hover{
    border: 1px solid ${props => props.theme.light_green};
    background-color: ${props => props.theme.green};
  }

  &.loading {
    font-size: 12px;
  }

  transition: all 0.5s;
`;