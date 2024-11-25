import { useEffect, useRef, useState } from "react";
import { getPaymentUpdate } from "src/api";
import { usePaymentContext } from "src/context/payment";
import { GiftToPay } from "src/types";

export const usePaymentHook = () => {
  const { gift, payGift } = usePaymentContext();

  const giftFromStorage = sessionStorage.getItem('itemToPay');

  const [details, setDetails] = useState<GiftToPay>(() => {
    if (giftFromStorage) {
      const payload = JSON.parse(giftFromStorage) as GiftToPay;
      return payload;
    }
    return gift;
  });
  const [isPayed, setIsPayed] = useState<boolean>(false);

  const intervalRef = typeof window !== 'undefined'
    ? useRef<number | null>(null) // Para navegadores
    : useRef<NodeJS.Timeout | null>(null); // Para Node.js

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPayed]);

  useEffect(() => {
    if (giftFromStorage) {
      const paymentInfo = JSON.parse(giftFromStorage) as GiftToPay;
      if (!isPayed && paymentInfo.paymentId!) {
        intervalRef.current = setInterval(async () => {
          try {
            const paymentStatus = await getPaymentUpdate(paymentInfo.paymentId!);
            const isSuccess = paymentStatus === "approved";
            if (isSuccess) {
              setIsPayed(true);
              clearInterval(intervalRef.current!);
            }
          }
          catch (err) {
            console.error("Internal error to find payment: ", paymentInfo.paymentId);
          }
        }, 5000)
      }
    }
  }, [giftFromStorage, isPayed])

  function payItem(payer: string) {
    payGift(payer);
    setIsPayed(true);
  }

  return {
    details,
    isPayed,
    payItem
  }
}