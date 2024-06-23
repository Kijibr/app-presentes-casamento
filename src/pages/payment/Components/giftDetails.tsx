import styled from "styled-components";
import { GiftType } from "../../../context/payment";
import QRCode from "react-qr-code";
import { useTransition } from "react";
import { IoReloadOutline } from "react-icons/io5";

const GiftContent = styled.div`
  background: ${props => props.theme.white};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  max-height: 100vh;
  padding-top: -20%;
  
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
  word-break: break-all;
  
  border: 1px solid gray;
  border-radius: 8px;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  
  &:hover {
    opacity: 88%;
  }
  width: 20vw;

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

const qrValue: string = import.meta.env.VITE_QR_CODE;


export const Details: React.FC<GiftType> = ({ id, image, name, payer, valueToSend }) => {
  const [isTransition, loadTransition] = useTransition();

  function addKeyInClipboard() {
    loadTransition(() => {
      navigator.clipboard.writeText(valueToSend);
    })
  }

  return (
    <GiftContent className="gift-container">
      <QrCodeWrapper>
        <QRCode className="qrcode"  value={valueToSend} />
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