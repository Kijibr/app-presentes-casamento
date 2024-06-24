import styled from "styled-components";
import { usePaymentContext } from "../../context/payment"
import { Details } from "./Components/giftDetails";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "src/components/BaseKit/Input";
import Divider from "src/components/BaseKit/Divider";
import { GiftToPay, PaymentType } from "src/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 

  width: 36vw;
  height: 64vh;
  
  gap: 12px;
  
  @media (max-width: 800px) {
    width: 88vw;
  }

  align-items: center;
  
  background: ${props => props.theme.off_white};
  border: 1px gray solid;
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
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.gray};
  }
  transition: 0.6s ease-in-out;
  &:hover{
    opacity: 88%;
  }
  padding: 8px 12px;
  border: 1px solid gray;
  border-radius: 16px;

  p{
    align-self: center;
    text-align: center;
  }

  width: 60%;
`;

export const CheckoutPage = () => {
  const { gift, payGift } = usePaymentContext();
  const { register, watch } = useForm<PaymentType>();
  const payer = watch('name') ?? '';

  const [details, setDetails] = useState<GiftToPay>(gift);
  const [isPayed, setIsPayed] = useState<boolean>(false);

  const giftFromStorage = sessionStorage.getItem('itemToPay');

  useEffect(() => {
    if (giftFromStorage) {
      const payload = JSON.parse(giftFromStorage) as GiftToPay;
      setDetails(payload);
    }
  }, []);

  const handleButtonClick = () => {
    payGift(payer);
    setIsPayed(true);
  };

  return (
    <Container>
      <Details {...details} />
      <Divider />
      <div className="payer">
        <InputComponent
          name="name"
          label="Insira o seu nome"
          register={register}
          value={payer}
        />
        <Button
          onClick={handleButtonClick}
          type="submit"
          disabled={isPayed}
        >
          <p>Pagar</p>
        </Button>
      </div>
    </Container>
  )
}