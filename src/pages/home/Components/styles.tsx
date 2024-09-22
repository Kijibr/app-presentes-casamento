import styled from "styled-components";

import { mediaQueryDown, mediaQueryUp } from "src/styles/breakPoints";

const Header = styled.div`
  display: flex;
  width: 100%;

  height: 70dvh;
  
  ${mediaQueryUp.sm} {
    height: 60dvh;
  }

  justify-content: center;
  align-items: center;

  flex-direction: column;

  background-color: ${props => props.theme.banner_home};

  border: 1px;
  &.logo{    
    width: 100%;
    border-radius: 0px 0px 36px 36px;

    animation: fade 2s forwards;
    opacity: 0;
    
    img { 
      ${mediaQueryUp.sm} {
        height: 60dvh;
      }
      
      ${mediaQueryDown.xs} {
        height: 55dvh;
      }
    }

    @keyframes fade {
      0% {
        opacity: 0;
        transform: scale(1.5);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
  }
`;

const Title = styled.span`
  font-family: 'Questrial';
  font-size: 36px;

  padding-top: 24px;
`;

const Subtitle = styled(Title)`
  font-size: 24px;
  align-self: center;

  z-index: 1;
`;

const OptionsWrapper = styled.div`
  display: flex;

  flex-direction: row;
  max-width: 100dvw;
  overflow: hidden;
  align-items: center;
  
  margin-top: 4%;
  padding: 24px;
  gap: 32px;

  overflow-x: scroll;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: relative;

  gap: 8px;

  min-width: 360px;
  height: 160px;

  border: 2px solid ${props => props.theme.light_green};
  border-radius: 8px;
    
  img {
    width: 100px;
    object-fit: contain;
  };
  
  span {
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    color: ${props => props.theme.off_white};
  };

  transition: all .4s ease-in-out; 
  
  cursor: pointer;

  &:hover{
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.256);
  }

  background-color: ${props => props.theme.green};
`;


export { Header, OptionsWrapper, Options, Subtitle };