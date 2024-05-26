import styled from "styled-components";
import { GiftType, usePaymentContext } from "../../context/payment"
import { Details } from "./Components/giftDetails";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "src/components/BaseKit/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 

  width: 36vw;
  height: 56vh;

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

    align-items: center;
    font-size: 1.5rem;
    
    gap: 36px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.green};
  
  cursor: pointer;
  
  transition: 0.6s ease-in-out;
  &:hover{
    opacity: 88%;
  }
  padding: 16px;
  border-radius: 16px;

  p{
    align-self: center;
    text-align: center;
  }

  width: 40%;
`;

export const CheckoutPage = () => {
  const { gift, payGift } = usePaymentContext();

  const { register, getValues, watch, setValue } = useForm<GiftType>();

  const giftFromStorage = sessionStorage.getItem('itemToPay');
  const [details, setDetails] = useState<GiftType>(gift);

  useEffect(() => {
    if (giftFromStorage) {
      const payload = JSON.parse(giftFromStorage) as GiftType;
      setDetails(payload);
    }
  }, [giftFromStorage]);

  const valueToSend = watch('valueToSend') ?? '';

  const handleButtonClick = () => {
    const giftValue = getValues().valueToSend;
    const giftToPay = {
      ...gift,
      valueToSend: giftValue
    }
    payGift(giftToPay);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^\d]/g, '');

    const floatValue = parseFloat(numericValue) / 100;

    const result = (isNaN(floatValue) ? '' : floatValue.toFixed(2));
    setValue('valueToSend', result);
  }

  function formatValue(value: string) {
    if (!value) return '0';

    const options = {
      style: 'currency',
      currency: 'BRL',
    };

    const formatter = new Intl.NumberFormat('pt-BR', options);
    return formatter.format(Number(value))
  }

  return (
    <Container>
      <Details {...details} />
      {/* <div className="payer">
        <InputComponent
          name="valueToSend"
          label="Insira o valor no qual deseja colaborar"
          register={register}
          handleChange={handleChange}
          value={formatValue(valueToSend)}
        />
        <Button
          onClick={handleButtonClick}
          type="submit"
        >
          <p>Pagar</p>
        </Button>
      </div> */}
    </Container>
  )
}