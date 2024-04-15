import { createContext, useContext } from "react";

export type GiftType = {
  id: number,
  valueToSend?: number,
  name?: string,
  image?: string,
  payer?: string
}

interface paymentProps {
  gift: GiftType,
  payGift: (param: GiftType) => void,
  clearGift: () => void,
}

const PaymentContext = createContext<paymentProps>({
  gift: {
    id: 0,
    valueToSend: 0.0,
    payer: ""
  },
  payGift: (param: GiftType) => { },
  clearGift: () => { }
});

PaymentContext.displayName = "Payment";

export { PaymentContext };

export function usePaymentContext() {
  const currentContext = useContext(PaymentContext);
  if (!currentContext) {
    throw new Error(
      "Has a error in provider",
    )
  }

  return currentContext;
}