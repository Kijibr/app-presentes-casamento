import styled from "styled-components";
import { GiftType } from "../../../context/payment";


const GiftContent = styled.div`
  background: ${props => props.theme.gold};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  max-height: 100%;

  gap: 8px;

  overflow: hidden;

  img{
    margin-top: 24px;
    padding: 12px;
    width: 36%;
    object-fit: contain;
    border: 2px #333 solid;
    border-radius: 8px;
  }

  span{
    width: 360px;
    text-align: center;

    font-size: 24px;
    font-family: 'Asap';
  }

  border-right: 2px black dotted;
`;


export const Details: React.FC<GiftType> = ({ id, image, name, payer }) => {

  return (
    <GiftContent>
      <img src={image} alt={name} />
      <span>{payer}</span>
    </GiftContent >
  );
}