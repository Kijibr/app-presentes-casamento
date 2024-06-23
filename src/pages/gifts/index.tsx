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
import { GiftType, usePaymentContext } from "../../context/payment";
import { createPayment } from "src/api";

const paymentPath = "/gifts/payment";

const itemList: GiftType[] = [
  {
    id: 0,
    name: "3 MESES DE MUAY-THAI PARA O NOIVO",
    image: muayThai,
    valueToSend: '450'
  },
  {
    id: 1,
    name: "6 MESES DE SPOTIFY PARA A NOIVA",
    image: spotify,
    valueToSend: '230'
  },
  {
    id: 2,
    name: "VIAGEM DE LUA DE MEL PARA GRAMADO - RS",
    image: viagem,
    valueToSend: '6800'
  },
  {
    id: 3,
    name: "NOTEBOOK",
    image: notebook,
    valueToSend: '3400'
  },
  {
    id: 4,
    name: "JANTAR ROMÂNTICO PARA O CASAL",
    image: jantar,
    valueToSend: '450'
  },
  {
    id: 5,
    name: "SPA PARA A NOIVA",
    image: spa,
    valueToSend: '600'
  },
  {
    id: 6,
    name: "1 ANO DE ACADEMIA PARA O CASAL",
    image: academia,
    valueToSend: '2650'
  },
  {
    id: 7,
    name: "6 MESES DE ACADEMIA PARA O CASAL",
    image: academia,
    valueToSend: '1325'
  },
  {
    id: 8,
    name: "RESERVA PARA 5 DIAS EM CHALÉ TERESÓPOLIS.",
    image: chale,
    valueToSend: '3415'
  },
];

export const GiftsPage = () => {
  const navigate = useNavigate();

  const { setGiftDetails } = usePaymentContext();

  const redirectToPayment = async (navigate: NavigateFunction, item: GiftType) => {
    const generatePayment = await createPayment(item.name, parseInt(item.valueToSend));
    item.valueToSend = generatePayment.qr_code;
    setGiftDetails(item);
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