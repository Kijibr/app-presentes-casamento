import betrothed from "../../assets/pombas.png";
import tips from "../../assets/luz.png";
import location from "../../assets/mapa.png";
import gift from "../../assets/presente.png";

export type Links = {
  path: string,
  name: string,
  icon: string,
  autor: string,
}

export const links: Array<Links> = [
  {
    path: "/betrothed",
    name: "Noivos",
    icon: betrothed,
    autor: "https://www.flaticon.com/br/autores/special/lineal-color?author_id=1&type=standard"
  },
  {
    path: "/gifts",
    name: "Lista de presentes",
    icon: gift,
    autor: ""
  },
  {
    path: "/tips",
    name: "Dicas",
    icon: tips,
    autor: "https://www.flaticon.com/br/autores/design-circle"
  },
  {
    path: "/location",
    name: "Localização",
    icon: location,
    autor: "https://www.flaticon.com/br/autores/basic-rounded/flat?author_id=1&type=standard"
  },
]