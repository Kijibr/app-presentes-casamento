import { createContext, useContext } from "react";
import { GiftToPay, GiftType } from "src/types";

interface paymentProps {
  gift: GiftToPay,
  payGift: (param: string) => void,
  setGiftDetails: (param: GiftToPay) => void,
  clearGift: () => void,
}

const PaymentContext = createContext<paymentProps>({
  gift: {
    id: "",
    qrCode: "",
    giftValue: "0",
    name: "",
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