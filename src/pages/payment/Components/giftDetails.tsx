import styled from "styled-components";
import QRCode from "react-qr-code";
import { useTransition } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { GiftToPay } from "src/types";

const GiftContent = styled.div`
  background: ${props => props.theme.white};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 100vh;
  padding-top: -20%;
  
  border: 1px #c8c8c8;
  border-radius: 8px;
  gap: 2%;

  overflow: hidden;

  font-family: 'Gill Sans', sans-serif;
`;

const QrCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 4%;
  
  width: fit-content;
  height: 72%;

  border: 1px #999 solid;
  border-radius: 8px;
  .qrcode {
    padding: 4px;
    max-width: 180px;
  }
`;

const GiftName = styled.span`
  margin: 4% 0;
  width: 360px;
  text-align: center;

  font-size: 18px;
`;

const CopyAndPaste = styled.span`
  font-size: 0.875rem;
  cursor: pointer;
  padding: 12px;
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

export const Details: React.FC<GiftToPay> = ({ id, name, qrCode }) => {
  const [isTransition, loadTransition] = useTransition();

  function addKeyInClipboard() {
    loadTransition(() => {
      navigator.clipboard.writeText(qrCode);
    })
  }

  return (
    <GiftContent className="gift-container">
      <QrCodeWrapper>
        <QRCode className="qrcode" value={qrCode} />
        <CopyAndPaste
          onClick={addKeyInClipboard}
        >
          {isTransition
            ?
            <IoReloadOutline className="loader" />
            :
            <>Copie e cole a chave pix para enviar o valor.</>
          }
        </CopyAndPaste>
      </QrCodeWrapper>
      <GiftName>{name}</GiftName>
    </GiftContent >
  );
}