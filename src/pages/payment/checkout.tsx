import styled from "styled-components";
import { usePaymentContext } from "../../context/payment"
import { Details } from "./Components/giftDetails";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 

  width: 72vw;
  height: 72vh;

  background: ${props => props.theme.green};
  border: 1px gray solid;

  border-radius: 8px;

  .payer{
    display: flex;
    flex-direction: column; 
    width: 50%;
    max-height: 100%;
    input{
      width: 100%;
      height: 16px;
    }
  }
`;

export const CheckoutPage = () => {

  const { gift } = usePaymentContext();
  return (
    <Container>
      <Details {...gift} />
      <div className="payer">
        <div>Insira aqui o seu nome</div>
        <input placeholder="Insira o valor no qual deseja colaborar" />
        <img src="" alt="" className="QRCODE" />
      </div>
    </Container>
  )
}