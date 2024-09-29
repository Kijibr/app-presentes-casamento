import { Content, WrapperItems } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/payment";
import { createPaymentAsync } from "src/api";
import { GiftToPay, GiftType } from "src/types";
import React, { memo, useRef, useState } from "react";
import { getFromStorage } from "src/utils/storage";
import { UserInfoType } from "src/components/BaseKit";
import { GiftCard } from "./Components/cards";
import { useGiftHook } from "./giftsHook";
import { PaymentOptions } from "./Components/paymentOptions";

enum PaymentMethods {
  Pix,
  CreditCard
}

const paymentPath = "/gifts/payment";

export const GiftsPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const { setGiftDetails } = usePaymentContext();
  const { giftsList } = useGiftHook();

  const [loadingGiftButton, setLoading] = useState<string | null>(null);
  const [showPaymentOptions, setShowPaymentOptionsState] = useState<boolean>(false);

  const giftSelectedRef = useRef<GiftType | null>(null);
  const paymentMethodRef = useRef<PaymentMethods>();

  function togglePaymentOptions(value: boolean, item?: GiftType) {
    giftSelectedRef.current = item!;
    setShowPaymentOptionsState(value);
  }

  const hidePaymentOptions = () => showPaymentOptions && togglePaymentOptions(false);

  const redirectToPayment = async (navigate: NavigateFunction, item: GiftType, paymentMethod: PaymentMethods) => {
    setLoading(item.id);
    paymentMethodRef.current = paymentMethod;
    const currentUser = getFromStorage<UserInfoType>('userInfo');

    if (paymentMethod === PaymentMethods.Pix) {
      const generatePayment = await createPaymentAsync(item, currentUser.name);

      const giftToPay: GiftToPay = {
        id: item.id,
        paymentId: generatePayment.id,
        giftValue: item.giftValue,
        name: item.name,
        qrCode: generatePayment.qr_code
      };

      setGiftDetails(giftToPay);
      setLoading(null);
      navigate(`${paymentPath}/${giftToPay.paymentId}`);
    }
  };

  const enableLoading = loadingGiftButton === giftSelectedRef.current?.id;
  return (
    <Content>
      <WrapperItems onClick={hidePaymentOptions}>
        {giftsList?.map(item =>
          <GiftCard
            giftContent={item}
            togglePaymentOptions={() => togglePaymentOptions(true, item)}
          />
        )}
      </WrapperItems>
      <PaymentOptions
        enablePixLoading={enableLoading && paymentMethodRef.current == PaymentMethods.Pix}
        enableCreditCardLoading={enableLoading && paymentMethodRef.current == PaymentMethods.CreditCard}
        redirectToPixPayment={() => redirectToPayment(navigate, giftSelectedRef.current!, PaymentMethods.Pix)}
        redirectToCreditCardPayment={() => redirectToPayment(navigate, giftSelectedRef.current!, PaymentMethods.CreditCard)}
        showPaymentOptions={showPaymentOptions}
      />
    </Content>
  );
});