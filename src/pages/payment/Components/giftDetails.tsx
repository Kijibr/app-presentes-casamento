import styled from "styled-components";
import QRCode from "react-qr-code";
import { GiftToPay } from "src/types";
import { Clipboard } from "src/components/Clipboard";
import { formatCurrencyValue } from "src/utils/formatCurrency";

const GiftContent = styled.div`
  background: ${props => props.theme.white};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 80svw;
  height: 88dvh;
  
  border: 1px #c8c8c8;
  border-radius: 8px;
  gap: 16px;

  overflow: hidden;

  font-family: 'Asap Condesed', Arial, sans-serif;

  caption {
    font-size: 12px;
    word-break: break-all;
    padding: 0px 24px;
  }
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

const Title = styled.h1`
  font-weight: normal;
  font-size: 24px;
  margin-top: -48px;
  margin-bottom: 42px;
`;

const GiftName = styled.span`
  font-size: 18px;
  padding: 0 12px;
  text-align: center;
`;

const GiftValue = styled(GiftName)`
  font-size: 24px;
`;

const CopyAndPaste = styled.span`
  font-size: 0.800rem;
  cursor: pointer;
  padding: 8px;
  margin: 14px;
  word-break: keep-all;
  
  border: 1px solid gray;
  border-radius: 8px;
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

export const Details: React.FC<GiftToPay> = ({ id, name, qrCode, giftValue }) => {
  return (
    <GiftContent className="gift-container">
      <Title>QR Code criado para o presente</Title>
      <GiftName>{name}</GiftName>
      <GiftValue>{formatCurrencyValue(parseFloat(giftValue))}</GiftValue>
      <QrCodeWrapper>
        <QRCode className="qrcode" value={qrCode} />
      </QrCodeWrapper>
      <caption>Abra a câmera do seu aplicativo bancário e aponte para o QR Code.</caption>
      <CopyAndPaste>
        <>
          <Clipboard content={qrCode} />
          Copie a chave pix.
        </>
      </CopyAndPaste>
    </GiftContent >
  );
}