import { mediaQueryDown } from "src/styles/breakPoints";
import styled from "styled-components";

const locationBackground: string = "https://cdn0.casamentos.com.br/vendor/8337/original/1280/jpeg/whatsapp-image-2022-11-10-at-15-34-31-1_13_138337-166810548944151.webp";

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100dvw;
  height: 100dvh;
  
  background: url(${locationBackground}) no-repeat;
  background-position: center;
  background-size: cover;

  color: ${props => props.theme.white};

  iframe {
    position: relative;
    
    border-radius: 16px 16px 0px 0px;
    border: 0;

    width: 100dvw;
    height: 100dvh;

    transition: 0.8s ease-in-out;

    &:hover{
      box-shadow: 2px 2px 8px 0px ${props => props.theme.gray};
    }
  }
`;

const Title = styled.span`
  font-family: 'Questrial';
  font-size: 36px;
  text-align: center;

  ${mediaQueryDown.xs} {
    font-size: 24px;
  }

  background-color: ${props => props.theme.white};
  color: ${props => props.theme.green};
  
  border-radius: 8px;

  padding: 12px;
  width: 100vw;
  height: max-content;
`;

const AddressSection = styled.div`
  background-color: ${props => props.theme.light_green};
  width: 100vw;
  height: 16vh;
`;

const AddressText = styled.span`
  font-size: 16px;
  color: ${props => props.theme.light_white};
  
  position: relative;
  padding: 12px 24px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export {
  Title,
  MapWrapper,
  AddressSection,
  AddressText
};