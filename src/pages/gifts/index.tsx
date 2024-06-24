import { Content, GiftBox, WrapperItems } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/payment";
import { createPayment } from "src/api";
import { GiftToPay, GiftType } from "src/types";
import { getAllgifts } from "src/services/gifts";
import { useEffect, useState } from "react";

const paymentPath = "/gifts/payment";

export const GiftsPage = () => {
  const navigate = useNavigate();
  const { setGiftDetails } = usePaymentContext();

  const [giftsList, setGifts] = useState<GiftType[]>();
  useEffect(() => {
    (async () => {
      const items = await getAllgifts();
      setGifts(items);
    })();
  }, [])

  const redirectToPayment = async (navigate: NavigateFunction, item: GiftType) => {
    const generatePayment = await createPayment(item.name, parseInt(item.giftValue));

    const giftToPay: GiftToPay = {
      id: item.id,
      giftValue: item.giftValue,
      name: item.name,
      qrCode: generatePayment.qr_code
    };

    setGiftDetails(giftToPay);
    navigate(paymentPath);
  };

  return (
    <Content>
      <WrapperItems>
        {giftsList?.length ? giftsList.map(item => {
          return (
            <GiftBox key={item.id}>
              <img src={item.image} alt="" />
              <p>
                {item.name}
              </p>
              <span onClick={() => redirectToPayment(navigate, item)}>Presentear</span>
            </GiftBox>
          )
        }) : null}
      </WrapperItems>
    </Content>
  );
}