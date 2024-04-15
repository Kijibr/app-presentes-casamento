import { useState } from "react";
import { GiftType, PaymentContext } from "../payment";

interface ProviderProps {
  children: React.ReactNode;
}

const baseGiftState: GiftType = {
  id: 0,
  valueToSend: 0.0,
  payer: ""
}

export const PaymentProvider: React.FC<ProviderProps> = ({ children }) => {
  const [gift, setGift] = useState<GiftType>(baseGiftState);


  const setGiftToPay = (giftToPay: GiftType) => {
    setGift(giftToPay);
  }

  const unsetGift = () => {
    setGift(baseGiftState);
  };

  return (
    <PaymentContext.Provider value={{
      gift,
      payGift(gift) {
        setGiftToPay(gift);
      },
      clearGift() {
        unsetGift();
      },
    }}>
      {children}
    </PaymentContext.Provider>
  )
}