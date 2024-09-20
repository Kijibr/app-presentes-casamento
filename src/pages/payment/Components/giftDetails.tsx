import styled from "styled-components";
import QRCode from "react-qr-code";
import { GiftToPay } from "src/types";
import { Clipboard } from "src/components/Clipboard";

const GiftContent = styled.div`
  background: ${props => props.theme.white};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 100vh;
  padding-top: -20%;
  padding-bottom: 4px;
  
  border: 1px #c8c8c8;
  border-radius: 8px;
  gap: 16px;

  overflow: hidden;

  font-family: 'Gill Sans', sans-serif;
`;

const QrCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2%;
  
  width: fit-content;
  border-radius: 8px;
  .qrcode {
    padding: 2px;
    max-width: 180px;
    height: fit-content;
  }
`;

const GiftName = styled.span`
  margin: 4% 0;
  width: 360px;
  text-align: center;

  font-size: 18px;
`;

const CopyAndPaste = styled.span`
  font-size: 0.800rem;
  cursor: pointer;
  padding: 8px;
  margin: 14px;
  word-break: keep-all;
  
  border: 1px solid gray;
  border-radius: 2px;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  
  &:hover {
    opacity: 88%;
  }
  max-width: 60vw;

  transition: 0.5s ease-in-out;

  text-align: center;
  .loader {
    font-size: 16px;
    animation: spin 1s infinite linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  };

`;

export const Details: React.FC<GiftToPay> = ({ id, name, qrCode }) => {
  return (
    <GiftContent className="gift-container">
      <GiftName>{name}</GiftName>
      <caption>Abra a câmera do seu aplicativo bancário e aponte para o QR Code.</caption>
      <QrCodeWrapper>
        <QRCode className="qrcode" value={qrCode} />
      </QrCodeWrapper>
      <CopyAndPaste>
        <>
          <Clipboard content={qrCode} />
          Copie a chave pix para enviar o valor.
        </>
      </CopyAndPaste>
    </GiftContent >
  );
}