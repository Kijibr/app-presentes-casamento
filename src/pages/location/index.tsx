import { Content } from "../../styles/style"
import { Address, MapWrapper, Title } from "./styles"

export const Location = () => {

  return (
    <Content>
      <MapWrapper>
        <Title>
          Visualize no mapa a localização do evento.

          <br />
          <iframe
            width="1200"
            height="450"
            // style={{ border: 0 }}
            loading="lazy"
            // allowfullscreen
            // referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAFn82rYpYffWTCPrqu87qXkuwEEcv4Mic&q=Space+Needle,Seattle+WA">
          </iframe>
          <br />
          IMAGEM DO SITIO E LOCALIZAÇÃO NO MAPA
        </Title>
        <Address>
          ENDEREÇO: SITIO SOL DA JUSTIÇA
        </Address>
      </MapWrapper>
    </Content>
  )
}