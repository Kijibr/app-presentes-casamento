import { useState } from "react";
import { GiftType, PaymentContext } from "../payment";
import { addNewPayer } from "src/services/payments";

interface ProviderProps {
  children: React.ReactNode;
}

const baseGiftState: GiftType = {
  id: 0,
  valueToSend: "0.0",
  name: "",
  payer: ""
}

export const PaymentProvider: React.FC<ProviderProps> = ({ children }) => {
  const [gift, setGift] = useState<GiftType>(baseGiftState);
  const giftFromStorage = sessionStorage.getItem('itemToPay');

  const saveGift = (gift: GiftType) => {
    setGift(gift);
    sessionStorage.setItem('itemToPay', JSON.stringify(gift));
  }

  const setGiftToPay = (giftOwner: string) => {
    let selectedGift: GiftType = gift;
    if (giftFromStorage) {
      selectedGift = JSON.parse(giftFromStorage) as GiftType;
    }

    const giftToPay: GiftType = {
      ...selectedGift,
      payer: giftOwner
    };

    saveGift(giftToPay);
    addNewPayer(giftToPay);
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