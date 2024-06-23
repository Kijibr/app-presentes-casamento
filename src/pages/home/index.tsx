import { useNavigate } from "react-router-dom";
import { Header, Options, OptionsWrapper, Subtitle, Title } from "./Components/styles";
import { Content } from "../../styles/style";
import { Links, links } from "./constants";

export function Home() {
  const navigate = useNavigate();

  return (
    <Content>
      <Header className="logo" />
      <Subtitle>Selecione uma opção abaixo</Subtitle>
      <OptionsWrapper>
        {links.map((item: Links, index) => {
          return (
            <Options key={index} onClick={() => navigate(item.path)}>
              <img src={item.icon} alt={item.autor} />
              <span>
                {item.name}
              </span>
            </Options>
          )
        })}
      </OptionsWrapper>
    </Content>
  );
}