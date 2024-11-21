import { memo } from "react"
import { PaymentOptionsContainer, SendGiftButton } from "../styles";
import { CircularProgress } from "@mui/material";

interface PaymentOptionsProps {
  enablePixLoading: boolean;
  enableCreditCardLoading: boolean;
  showPaymentOptions: boolean;
  redirectToPixPayment: () => void;
  redirectToCreditCardPayment: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = memo(({
  enablePixLoading,
  enableCreditCardLoading,
  showPaymentOptions,
  redirectToPixPayment,
  redirectToCreditCardPayment
}) => {
  return (
    <PaymentOptionsContainer showContent={showPaymentOptions}>
      <caption>Selecione a forma de pagamento</caption>
      <SendGiftButton
        onClick={redirectToPixPayment}
        className="payment-options"
      >
        {enablePixLoading
          ?
          <CircularProgress color="inherit" size={16} />
          :
          <span>PIX</span>
        }
      </SendGiftButton>
      <SendGiftButton
        className="payment-options"
        onClick={redirectToCreditCardPayment}
      >
        {enableCreditCardLoading
          ?
          <CircularProgress color="inherit" size={16} />
          :
          <span>Cartão de crédito</span>
        }
      </SendGiftButton>
    </PaymentOptionsContainer>
  )
});