import { memo } from "react"
import { PaymentOptionsContainer, SendGiftButton } from "../styles";
import { CircularProgress } from "@mui/material";

interface PaymentOptionsProps {
  enablePixLoading: boolean;
  enableCreditCardLoading: boolean;
  showPaymentOptions: boolean;
  redirectToPayment: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = memo(({
  enablePixLoading,
  enableCreditCardLoading,
  showPaymentOptions,
  redirectToPayment
}) => {
  return (
    <PaymentOptionsContainer showContent={showPaymentOptions}>
      <caption>Selecione a forma de pagamento</caption>
      <SendGiftButton
        onClick={redirectToPayment}
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
        onClick={redirectToPayment}
        className="payment-options"
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