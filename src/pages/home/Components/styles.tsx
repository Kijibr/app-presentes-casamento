import styled from "styled-components";

import logo from '../../../assets/logo_nossa.png'

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;

  justify-content: center;
  align-items: center;

  flex-direction: column;

  background-color: #fff;

  &.logo{
    animation: fade 2s forwards;
    opacity: 0;
    
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
    background-image: url("${logo}");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Title = styled.span`
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 36px;

  padding-top: 24px;
`;

const Subtitle = styled(Title)`
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 24px;
  align-self: center;
  padding-top: 24px;

  z-index: 1;
`;

const OptionsWrapper = styled.div`
  display: flex;

  flex-direction: row;
  max-width: 100dvw;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
  
  margin-top: 24px;
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

  border: 2px solid rgba(0, 0, 0, 0.256);
  border-radius: 8px;
    
  img {
    width: 100px;
    object-fit: contain;
  };
  
  span {
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
  };

  transition: all .4s ease-in-out; 
  
  cursor: pointer;

  &:hover{
    transform: scale(1.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.256);
  }

`;


export { Header, Title, OptionsWrapper, Options, Subtitle };