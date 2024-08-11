import { useState } from "react";
import { PaymentContext } from "../payment";
import { GiftToPay } from "src/types";
import { createPaymentAsync } from "src/api";

interface ProviderProps {
  children: React.ReactNode;
}

const baseGiftState: GiftToPay = {
  paymentId: 0,
  id: "",
  giftValue: "0.0",
  name: "",
  qrCode: "",
  image: "",
}

export const PaymentProvider: React.FC<ProviderProps> = ({ children }) => {
  const [gift, setGift] = useState<GiftToPay>(baseGiftState);
  const giftFromStorage = sessionStorage.getItem('itemToPay');

  const saveGift = (gift: GiftToPay) => {
    setGift(gift);
    sessionStorage.setItem('itemToPay', JSON.stringify(gift));
  }

  const setGiftToPay = async (giftOwner: string) => {
    if (giftFromStorage) { 
      const selectedGift = JSON.parse(giftFromStorage) as GiftToPay;
      await createPaymentAsync(selectedGift, giftOwner);
    }
  }

  const unsetGift = () => {
    setGift(baseGiftState);
    sessionStorage.removeItem('itemToPay');
  };

  return (
    <PaymentContext.Provider value={{
      gift,
      payGift(giftOwner: string) {
        setGiftToPay(giftOwner);
      },
      setGiftDetails(gift) {
        saveGift(gift)
      },
      clearGift() {
        unsetGift();
      },
    }}>
      {children}
    </PaymentContext.Provider>
  )
}