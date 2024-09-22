import styled from "styled-components";
import { Details } from "./Components/giftDetails";
import { useForm } from "react-hook-form";
import Divider from "src/components/BaseKit/Divider";
import { PaymentType } from "src/types";
import { usePaymentHook } from "./paymentsHook";
import CheckmarkAnimation from "src/assets/checkmarkAnimation";
import { Invoice } from "./Components/invoice";

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

export const CheckoutPage = () => {
  const { details, isPayed, payItem } = usePaymentHook();

  const { register, watch } = useForm<PaymentType>();
  const payer = watch('name') ?? '';

  return (
    <>
      {isPayed ?
        <Invoice />
        : (
          <Container>
            <>
              <Details {...details} />
            </>
          </Container>
        )}
    </>
  )
}