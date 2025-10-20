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

export const WrapperItems = styled.div`
  background:${props => props.theme.off_white};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: flex-start;

  position: relative;
  gap: 32px;
  padding: 48px 24px;
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

export { Content, PaymentOptionsContainer };