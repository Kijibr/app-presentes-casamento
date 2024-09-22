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
  justify-content: space-between;
  
  width: 80svw;
  height: 88dvh;
  
  border: 1px #c8c8c8;
  border-radius: 8px;
  gap: 16px;

  overflow: hidden;

  font-family: 'Asap Condesed', Arial, sans-serif;

  caption {
    width: fit-content;
    font-size: 14px;
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
    max-width: 236px;
    height: fit-content;
  }
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 24px;
  margin-top: 4%;
  margin-bottom: 42px;


  background-color: ${props => props.theme.light_green};
  color: ${props => props.theme.light_white};
  
  border-radius: 8px;

  box-shadow: inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45);
  padding: 12px;
`;

const GiftName = styled.span`
  font-family: "Questrial";
  font-size: 28px;
  text-align: center;
  text-decoration: underline;
`;

const GiftValue = styled(GiftName)`
  font-size: 24px;
  text-decoration: none;
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
      <caption>
        Abra a câmera do seu aplicativo bancário e aponte para o QR Code.
      </caption>
      <Clipboard
        content={qrCode}
        label="Copie a chave pix"
        isButton
      />
    </GiftContent >
  );
}