import { Content, GiftBox, SendGiftButton, WrapperItems } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/payment";
import { createPaymentAsync } from "src/api";
import { GiftToPay, GiftType } from "src/types";
import { getAllgifts } from "src/api/gifts";
import { useEffect, useState } from "react";
import { formatCurrencyValue } from "src/utils/formatCurrency";
import { getFromStorage } from "src/utils/storage";
import CircularProgress from '@mui/material/CircularProgress';


const paymentPath = "/gifts/payment";

export const GiftsPage = () => {
  const navigate = useNavigate();
  const { setGiftDetails } = usePaymentContext();

  const [loadingGiftButton, setLoading] = useState<string | null>(null);

  const [giftsList, setGifts] = useState<GiftType[]>();

  useEffect(() => {
    (async () => {
      const items = await getAllgifts();
      setGifts(items);
    })();
  }, [])

  const redirectToPayment = async (navigate: NavigateFunction, item: GiftType) => {
    setLoading(item.id);
    const currentUser = getFromStorage<string>('userInfo') ?? "MockUser";
    const generatePayment = await createPaymentAsync(item, currentUser);

    const giftToPay: GiftToPay = {
      id: item.id,
      paymentId: generatePayment.id,
      giftValue: item.giftValue,
      name: item.name,
      qrCode: generatePayment.qr_code
    };

    setGiftDetails(giftToPay);
    setLoading(null);
    navigate(paymentPath);
  };

  return (
    <Content>
      <WrapperItems>
        {giftsList?.length ? giftsList.map(item => {
          const giftValueFormatted = formatCurrencyValue(parseFloat(item.giftValue));

          const enableLoading = loadingGiftButton === item.id;
          return (
            <GiftBox key={item.id}>
              <img src={item.image} alt="" />
              <p>
                {item.name}
              </p>
              <p className="giftValue">
                {giftValueFormatted}
              </p>
              {enableLoading
                ?
                <SendGiftButton>
                  <CircularProgress color="inherit" size={16} />
                </SendGiftButton>
                :
                <SendGiftButton onClick={() => redirectToPayment(navigate, item)}>
                  Presentear
                </SendGiftButton>
              }
            </GiftBox>
          )
        }) : null}
      </WrapperItems>
    </Content>
  );
}