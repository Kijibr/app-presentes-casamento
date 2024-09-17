import betrothed from "../../assets/user-check.svg";
import tips from "../../assets/alert-triangle.svg";
import location from "../../assets/map-pin.svg";
import gift from "../../assets/gift.svg";

export type Links = {
  path: string,
  name: string,
  icon: string,
  autor: string,
  guestConfirmed: boolean;
}

export const links: Array<Links> = [
  {
    path: "/location",
    name: "Localização",
    icon: location,
    autor: "Maria Rita",
    guestConfirmed: true
  },
  {
    path: "/gifts",
    name: "Lista de presentes",
    icon: gift,
    autor: "Maria Rita",
    guestConfirmed: true
  },
  {
    path: "/tips",
    name: "Dicas",
    icon: tips,
    autor: "Maria Rita",
    guestConfirmed: false
  },
  {
    path: "/betrothed",
    name: "Confirmação de presença",
    icon: betrothed,
    autor: "Maria Rita",
    guestConfirmed: false
  },
]