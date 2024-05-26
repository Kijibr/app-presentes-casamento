import styled from "styled-components";
import { GiftType } from "../../../context/payment";
import QRCode from "react-qr-code";


const GiftContent = styled.div`
  background: ${props => props.theme};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  max-height: 100%;

  gap: 8px;

  overflow: hidden;

  .qrcode{
    margin-top: 24px;
    padding: 12px;
    width: 56%;
    object-fit: contain;
    border: 1px #999 solid;
    border-radius: 8px;
  }

  span{
    padding: 12px;
    margin-top: 8%;
    width: 360px;
    text-align: center;

    font-size: 24px;
    
    font-family: 'Gill Sans', sans-serif;
  }
`;

const qrValue: string = import.meta.env.VITE_QR_CODE;

export const Details: React.FC<GiftType> = ({ id, image, name, valueToSend }) => {

  return (
    <GiftContent>
      <span>{name}</span>
      <QRCode className="qrcode" value={qrValue} />
      {/* {!valueToSend ? (
        <img src={image} alt={name} />
      ) : ( */}
      {/* )}
      <span>{valueToSend}</span> */}
    </GiftContent >
  );
}