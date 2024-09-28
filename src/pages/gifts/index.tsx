import { Content, PaymentOptions, SendGiftButton, WrapperItems } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/payment";
import { createPaymentAsync } from "src/api";
import { GiftToPay, GiftType } from "src/types";
import React, { memo, useRef, useState } from "react";
import { getFromStorage } from "src/utils/storage";
import { UserInfoType } from "src/components/BaseKit";
import { GiftCard } from "./Components/cards";
import { CircularProgress } from "@mui/material";
import { useGiftHook } from "./giftsHook";

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

  const giftSelected = useRef<GiftType | null>(null);
  const paymentMethodRef = useRef<PaymentMethods>();

  function togglePaymentOptions(value: boolean, item?: GiftType) {
    giftSelected.current = item!;
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

  const enableLoading = loadingGiftButton === giftSelected.current?.id;
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

      <PaymentOptions showContent={showPaymentOptions}>
        <caption>Selecione a forma de pagamento</caption>
        <SendGiftButton
          onClick={() => redirectToPayment(navigate, giftSelected.current!, PaymentMethods.Pix)}
          className="payment-options"
        >
          {enableLoading && paymentMethodRef.current == PaymentMethods.Pix
            ?
            <CircularProgress color="inherit" size={16} />
            :
            <span>PIX</span>
          }
        </SendGiftButton>
        <SendGiftButton
          onClick={() => redirectToPayment(navigate, giftSelected.current!, PaymentMethods.CreditCard)}
          className="payment-options"
        >
          {enableLoading && paymentMethodRef.current == PaymentMethods.CreditCard
            ?
            <CircularProgress color="inherit" size={16} />
            :
            <span>Cartão de crédito</span>
          }
        </SendGiftButton>
      </PaymentOptions>
    </Content>
  );
});