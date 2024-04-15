import { Content, GiftBox, SearchBar, WrapperItems } from "./styles";
import muayThai from "../../assets/muay-thai.png";
import spotify from "../../assets/spotify.png";
import viagem from "../../assets/mundo.png";
import notebook from "../../assets/notebook.png";
import jantar from "../../assets/jantar-romantico.png";
import spa from "../../assets/spa.png";
import academia from "../../assets/academia.png";
import chale from "../../assets/chale.png";

const itemList = [
  {
    id: 0,
    name: "3 MESES DE MUAY-THAI PARA O NOIVO",
    image: muayThai
  },
  {
    id: 1,
    name: "6 MESES DE SPOTIFY PARA A NOIVA",
    image: spotify
  },
  {
    id: 2,
    name: "VIAGEM DE LUA DE MEL PARA GRAMADO - RS",
    image: viagem
  },
  {
    id: 3,
    name: "NOTEBOOK",
    image: notebook
  },
  {
    id: 4,
    name: "JANTAR ROMÂNTICO PARA O CASAL",
    image: jantar
  },
  {
    id: 5,
    name: "SPA PARA A NOIVA",
    image: spa
  },
  {
    id: 6,
    name: "1 ANO DE ACADEMIA PARA O CASAL",
    image: academia
  },
  {
    id: 7,
    name: "6 MESES DE ACADEMIA PARA O CASAL",
    image: academia
  },
  {
    id: 8,
    name: "RESERVA PARA 5 DIAS EM CHALÉ TERESÓPOLIS.",
    image: chale
  },
]

export const GiftsPage = () => {

  return (
    <Content>
      <WrapperItems>
        {itemList.map(item => {
          return (
            <GiftBox>
              <img src={item.image} alt="" />
              {item.name}

              <span>Presentear</span>
            </GiftBox>
          )
        })}
      </WrapperItems>
    </Content>
  );
}