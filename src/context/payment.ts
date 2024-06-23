import { createContext, useContext } from "react";

export type GiftType = {
  id: number,
  createdAt?: string,
  valueToSend: string,
  name: string,
  image?: string,
  payer?: string
}

interface paymentProps {
  gift: GiftType,
  payGift: (param: string) => void,
  setGiftDetails: (param: GiftType) => void,
  clearGift: () => void,
}

const PaymentContext = createContext<paymentProps>({
  gift: {
    id: 0,
    createdAt: "",
    valueToSend: "0",
    name: "",
    payer: ""
  },
  payGift: (param: string) => { },
  setGiftDetails: (param: GiftType) => { },
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