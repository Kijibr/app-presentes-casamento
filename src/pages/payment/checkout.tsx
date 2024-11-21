import styled from "styled-components";
import { Details } from "./Components/giftDetails";
import { usePaymentHook } from "./paymentsHook";
import { Invoice } from "./Components/invoice";
import { initMercadoPago } from '@mercadopago/sdk-react'

import { IAdditionalData, ICardPaymentBrickPayer, ICardPaymentFormData } from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { getFromStorage } from "src/utils/storage";
import { UserInfoType } from "src/components/BaseKit";
import CartaoCreditoVideo from "./Components/creditCard";
import { PaymentMethods } from "../gifts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  
  width: 36vw;
  height: min-content;
  
  
  gap: 12px;
  
  @media (max-width: 800px) {
    width: 88vw;
  }

  align-items: center;
  
  background: ${props => props.theme.off_white};

  border-radius: 8px;

  .payer{
    display: flex;
    flex-direction: column; 
    
    max-height: 100%;
    padding: 12px;

    align-items: center;
    font-size: 1.5rem;
    gap: 16px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.green};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.gray};
  }
  transition: 0.6s ease-in-out;
  
  &:hover{
    opacity: 88%;
    background-color: ${props => props.theme.green};
    color: ${props => props.theme.white};
  }

  padding: 8px 12px;
  border: 1px solid ${props => props.theme.green};
  border-radius: 16px;

  p{
    align-self: center;
    text-align: center;
  }

  width: 60%;
`;

const mpToken: string = import.meta.env.VITE_MP_ACCESS_KEY_DEV;
initMercadoPago(mpToken, { locale: 'pt-BR' });

export const CheckoutPage = () => {
  const { details, isPayed } = usePaymentHook();

  return (
    <>
      {isPayed ?
        <Invoice />
        : (
          <Container>
            <>
              {details.paymentMethod === PaymentMethods.Pix
                ?
                <Details {...details} />
                :
                <CartaoCreditoVideo />
              }
            </>
          </Container>
        )}
    </>
  )
}