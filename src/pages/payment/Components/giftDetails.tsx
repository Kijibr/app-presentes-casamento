import styled from "styled-components";
import QRCode from "react-qr-code";
import { GiftToPay } from "src/types";
import { Clipboard } from "src/components/Clipboard";
import { formatCurrencyValue } from "src/utils/formatCurrency";
import Divider from "src/components/BaseKit/Divider";

const GiftContent = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 90svw;
  height: 96dvh;
  
  border: 1px #c8c8c8;
  border-radius: 8px;
  gap: 12px;

  overflow: hidden;

  font-family: 'Asap Condesed', Arial, sans-serif;
`;

const QrCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: 2%;
  border-radius: 8px;
  
  .qrcode {
    justify-self: center;
    padding: 2px;
    border-radius: 0.5rem;
    width: fit-content;
    max-width: 236px;
    height: fit-content;
  }
`;

const Title = styled.h1`
  font-family: "Questrial";
  font-weight: normal;
  font-size: 1.6rem;
`;

const GiftInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  background-color: ${props => props.theme.default_white};
  
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  
  padding: 1rem;
  margin-bottom: 1rem;
  gap: 6px;
  
  &.qrcode-wrapper {
    gap: 16px;

    caption {
      width: fit-content;
      font-size: 0.800rem;
      align-self: center;
      padding: 0px 12px;
    }
  }
`;

const Subtitle = styled.span`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
`;

const GiftName = styled.span`
  font-size: 14px;
  text-align: left;
  font-weight: normal;
`;

const GiftValue = styled(GiftName)`
  font-size: 18px;
  font-weight: bolder;
  color: ${props => props.theme.light_green};
`;

export const Details: React.FC<GiftToPay> = ({ id, name, qrCode = "", giftValue }) => {
  return (
    <GiftContent className="gift-container">
      <Title>Pagamento PIX</Title>
      <Divider />
      <GiftInfoWrapper>
        <Subtitle>
          Resumo do presente
        </Subtitle>
        <GiftName>{name}</GiftName>
        <GiftValue>{formatCurrencyValue(parseFloat(giftValue))}</GiftValue>
      </GiftInfoWrapper>
      <GiftInfoWrapper className="qrcode-wrapper">
        <Subtitle>
          QR Code para o pagamento
        </Subtitle>
        <QrCodeWrapper>
          <QRCode className="qrcode" value={qrCode} />
        </QrCodeWrapper>
        <caption>
          Abra o app do seu banco e escaneie o QR Code.
        </caption>
        <Clipboard
          content={qrCode}
          label="Copiar chave PIX"
          className="center"
          isButton
        />
      </GiftInfoWrapper>
    </GiftContent >
  );
}