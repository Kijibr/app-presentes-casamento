import styled from "styled-components";

const locationBackground: string = "https://cdn0.casamentos.com.br/vendor/8337/original/1280/jpeg/whatsapp-image-2022-11-10-at-15-34-31-1_13_138337-166810548944151.webp";
const locationBackground2: string = "https://cdn0.casamentos.com.br/vendor/8337/original/1280/jpeg/whatsapp-image-2023-01-27-at-20-28-45_13_138337-167492588239051.webp";

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;
  height: 100vh;

  width: 100dvw;
  
  background: url(${locationBackground}) no-repeat;
  background-position: center;
  background-size: cover;

  /* opacity: 0.5; */
  color: ${props => props.theme.white};

  iframe {
    position: relative;
    
    border-radius: 16px;
    border: 0;

    width: 70%;
    height: 70%;

    transition: 0.8s ease-in-out;

    &:hover{
      box-shadow: 2px 2px 8px 4px ${props => props.theme.gray};
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(91, 91, 91, 0.463);
`;

const Title = styled.span`
    position: relative;
  margin-top: 8px;
  font-family: 'Jost';
  font-size: 36px;

  background-color: ${props => props.theme.off_white};
  border-radius: 8px;
  color: ${props => props.theme.green};
  padding: 0 24px;
`;

const Address = styled.span`
    position: relative;
  font-size: 16px;
  background-color: ${props => props.theme.off_white};
  border-radius: 8px;
  color: ${props => props.theme.green};
  padding: 0 24px;
`;

export {
  Title,
  MapWrapper,
  Overlay,
  Address
};