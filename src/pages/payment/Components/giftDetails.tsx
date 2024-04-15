import styled from "styled-components";
import { GiftType } from "../../../context/payment";


const GiftContent = styled.div`
  /* background: ${props => props.theme.gold}; */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 50%;
  max-height: 100%;

  /* padding-top: 16px; */
  gap: 8px;

  overflow: hidden;

  img{
    padding-top: 24px;
    width: 400px;
    height: 360px;
    object-fit: contain;
  }

  span{
    width: 360px;
    text-align: center;
    text-decoration: underline;

    font-size: 24px;
    font-family: 'Asap';
  }

  border-right: 2px black dotted;
`;


export const Details: React.FC<GiftType> = (props) => {

  return (
    <GiftContent>
      {/* {Object.entries(props) && (
        <> */}
          <img src={props.image} />
          <span>Agradeçemos imensamente pelo presente de {props.name},
          que Deus venha te abençoar inúmeras vezes mais sempre!!!</span>
          <span>{props.payer}</span>
        {/* </>
      ) */}
      {/* } */}
    </GiftContent >
  );
}