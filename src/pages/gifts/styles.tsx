import { mediaQueryDown } from "src/styles/breakPoints";
import { maxHeight } from "src/styles/global";
import styled from "styled-components";

const Content = styled.div`
  background:${props => props.theme.off_white};
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

  justify-content: center;

  position: relative;
  gap: 32px;
  padding: 48px 24px;
`;

const GiftBox = styled.div`
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
    font-size: 14px;
    
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

const SendGiftButton = styled.span`
  border: 1px solid ${props => props.theme.green};
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  width: 78px;
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

  font-size: 0.8vmax;

  ${mediaQueryDown.xs} {
    font-size: 1.4vmax;
  }

  &:hover{
    border: 1px solid ${props => props.theme.light_green};
    background-color: ${props => props.theme.green};
  }

  &.loading {
    font-size: 12px;
  }

  transition: all 0.5s;
`;

const PaymentOptionsContainer = styled.div<{ showContent: boolean }>`
  display: flex;
  overflow: ${props => props.showContent ? 'visible' : 'hidden'};

  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  
  width: 100vw;
  height: ${props => props.showContent ? '156px' : '0'};;
  max-height: 156px;
  transition: all 0.2s ease-in-out;
  gap: 8px;

  background-color: ${props => props.theme.off_white};
  box-shadow: 0px -1px 40px 3px rgba(173,171,173,1);
  border-radius: 24px 24px 0px 0px;
  
  // Styles to show title after open payment options with transition
  & > * {
    opacity: ${props => props.showContent ? 1 : 0};
    transform: translateY(${props => props.showContent ? '0' : '20px'});
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  caption {
    overflow: ${props => props.showContent ? 'visible' : 'hidden'};
    margin-bottom: 24px;
    font-size: 18px;
  }
`;

export { Content, WrapperItems, GiftBox, SendGiftButton, PaymentOptionsContainer };