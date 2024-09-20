import { Clipboard } from "src/components/Clipboard";
import { Content } from "../../styles/style"
import { AddressText, AddressSection, MapWrapper, Title } from "./styles"

const locationAddress: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17510.656142494114!2d-43.45254328043104!3d-22.685012691849618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x996855d41430bf%3A0x827307e8eb48b7b1!2sS%C3%ADtio%20Sol%20da%20Justi%C3%A7a!5e0!3m2!1spt-BR!2sbr!4v1714710905032!5m2!1spt-BR!2sbr";

const address = "R. Cel. Alberto de Melo, 704 - Vila de Cava, Nova Iguaçu - RJ, 26051-560";
const reference = "Próximo ao Arco Metropolitano";

export const Location = () => {
  return (
    <Content>
      <MapWrapper>
        <Title>Visualize no mapa</Title>
        <iframe
          src={locationAddress}
          title="Endereco"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <AddressSection>
          <AddressText>
            <p>
              <Clipboard content={address} />
              ENDEREÇO: {address}
            </p>
            <p>
              REFERÊNCIA: {reference}
            </p>
          </AddressText>
        </AddressSection>
      </MapWrapper>
    </Content>
  )
}