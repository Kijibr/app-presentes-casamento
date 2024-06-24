import { useState } from "react";
import { PaymentContext } from "../payment";
import { addNewPayer } from "src/services/payments";
import { v4 as uuidv4 } from 'uuid';
import { GiftToPay, PaymentType } from "src/types";

interface ProviderProps {
  children: React.ReactNode;
}

const baseGiftState: GiftToPay = {
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

  const setGiftToPay = (giftOwner: string) => {
    let selectedGift: GiftToPay = gift;
    if (giftFromStorage) {
      selectedGift = JSON.parse(giftFromStorage) as GiftToPay;
    }
    const giftToPay: PaymentType = {
      giftId: selectedGift.id,
      giftName: selectedGift.name,
      name: giftOwner,
      value: selectedGift.giftValue,
      id: uuidv4()
    };

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