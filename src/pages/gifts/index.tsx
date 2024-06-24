import { Content, GiftBox, WrapperItems } from "./styles";
import muayThai from "src/assets/muay-thai.png";
import spotify from "src/assets/spotify.png";
import viagem from "src/assets/mundo.png";
import notebook from "src/assets/notebook.png";
import jantar from "src/assets/jantar-romantico.png";
import spa from "src/assets/spa.png";
import academia from "src/assets/academia.png";
import chale from "src/assets/chale.png";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/payment";
import { createPayment } from "src/api";
import { GiftToPay, GiftType } from "src/types";

const paymentPath = "/gifts/payment";

const itemList: GiftType[] = [
  {
    id: "",
    name: "3 MESES DE MUAY-THAI PARA O NOIVO",
    image: muayThai,
    giftValue: '450'
  },
  {
    id: "",
    name: "6 MESES DE SPOTIFY PARA A NOIVA",
    image: spotify,
    giftValue: '230'
  },
  {
    id: "",
    name: "VIAGEM DE LUA DE MEL PARA GRAMADO - RS",
    image: viagem,
    giftValue: '6800'
  },
  {
    id: "",
    name: "NOTEBOOK",
    image: notebook,
    giftValue: '3400'
  },
  {
    id: "",
    name: "JANTAR ROMÂNTICO PARA O CASAL",
    image: jantar,
    giftValue: '450'
  },
  {
    id: "",
    name: "SPA PARA A NOIVA",
    image: spa,
    giftValue: '600'
  },
  {
    id: "",
    name: "1 ANO DE ACADEMIA PARA O CASAL",
    image: academia,
    giftValue: '2650'
  },
  {
    id: "",
    name: "6 MESES DE ACADEMIA PARA O CASAL",
    image: academia,
    giftValue: '1325'
  },
  {
    id: "",
    name: "RESERVA PARA 5 DIAS EM CHALÉ TERESÓPOLIS.",
    image: chale,
    giftValue: '3415'
  },
];

export const GiftsPage = () => {
  const navigate = useNavigate();

  const { setGiftDetails } = usePaymentContext();

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
        {itemList.map(item => {
          return (
            <GiftBox key={item.id}>
              <img src={item.image} alt="" />
              <p>
                {item.name}
              </p>
              <span onClick={() => redirectToPayment(navigate, item)}>Presentear</span>
            </GiftBox>
          )
        })}
      </WrapperItems>
    </Content>
  );
}