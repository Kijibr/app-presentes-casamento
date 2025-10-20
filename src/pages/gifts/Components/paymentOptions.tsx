import { memo } from "react"
import { PaymentOptionsContainer } from "../styles";
import { CircularProgress } from "@mui/material";
import { ActionButton } from "src/components/Cards/styles";

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
      <ActionButton
        onClick={redirectToPixPayment}
        className="payment-options"
      >
        {enablePixLoading
          ?
          <CircularProgress color="inherit" size={16} />
          :
          <span>PIX</span>
        }
      </ActionButton>
      <ActionButton
        className="payment-options"
        onClick={redirectToCreditCardPayment}
      >
        {enableCreditCardLoading
          ?
          <CircularProgress color="inherit" size={16} />
          :
          <span>Cartão de crédito</span>
        }
      </ActionButton>
    </PaymentOptionsContainer>
  )
});