import { useNavigate } from "react-router-dom";
import { Header, Options, OptionsWrapper, Subtitle } from "./Components/styles";
import { Content } from "../../styles/style";
import { Links, links } from "./constants";
import save from "../../assets/save_de_date.svg";
import { getFromStorage } from "src/utils/storage";
import { UserInfoType } from "src/components/BaseKit";

export function Home() {
  const navigate = useNavigate();
  const confirmed = !!getFromStorage<UserInfoType>('userInfo')?.confirmed;
  
  const optionsAllowedToGuest = links.filter(x => x.guestConfirmed === confirmed);

  return (
    <Content>
      <Header className="logo">
        <img src={save} alt="" />
      </Header>
      <Subtitle>Selecione uma opção abaixo</Subtitle>
      <OptionsWrapper>
        {optionsAllowedToGuest.map((item: Links, index) => {
          return (
            <Options key={index} onClick={() => navigate(item.path)}>
              <span>
                {item.name}
              </span>
              <img src={item.icon} alt={item.autor} />
            </Options>
          );
        })}
      </OptionsWrapper>
    </Content>
  );
}