import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaymentUpdate } from "src/api";
import { usePaymentContext } from "src/context/payment";
import { GiftToPay } from "src/types";
import { PaymentMethods } from "../gifts";

export const usePaymentHook = () => {
  const { gift, payGift } = usePaymentContext();

  const giftFromStorage = sessionStorage.getItem('itemToPay');

  const details: GiftToPay = useMemo(() => {
    if (giftFromStorage) {
      const payload = JSON.parse(giftFromStorage) as GiftToPay;
      return payload;
    }
    return gift;
  }, [giftFromStorage]);

  const [isPaid, setIsPaid] = useState<boolean>(false);

  const intervalRef = typeof window !== 'undefined'
    ? useRef<number | null>(null) // Para navegadores
    : useRef<NodeJS.Timeout | null>(null); // Para Node.js

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaid]);

  useEffect(() => {
    if (giftFromStorage) {
      const paymentInfo = JSON.parse(giftFromStorage) as GiftToPay;
      if (!isPaid && paymentInfo.paymentId! && paymentInfo.paymentMethod === PaymentMethods.Pix) {
        intervalRef.current = setInterval(async () => {
          try {
            const paymentStatus = await getPaymentUpdate(paymentInfo.paymentId!);
            const isSuccess = paymentStatus === "approved";
            if (isSuccess) {
              setIsPaid(true);
              clearInterval(intervalRef.current!);
            }
          }
          catch (err) {
            console.error("Internal error to find payment: ", paymentInfo.paymentId);
          }
        }, 5000)
      }
    }
  }, [giftFromStorage, isPaid])

  function payItem(payer: string) {
    payGift(payer);
    setIsPaid(true);
  }

  return {
    details,
    isPaid,
    payItem
  }
}

export const useRedirectHook = () => {
  const navigate = useNavigate();

  const paymentPath = "/gifts/payment";
  const invoicePath = "/gifts/payment/invoice";

  const redirectToPaymentPage = (paymentId: string) => navigate(`${paymentPath}/${paymentId}`);
  const redirectToPaymentInvoice = (paymentId: string) => navigate(`${invoicePath}/${paymentId}`);

  return {
    redirectToPaymentPage,
    redirectToPaymentInvoice
  }
}