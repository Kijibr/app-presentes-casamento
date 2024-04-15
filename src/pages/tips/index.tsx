import { Content } from "../../styles/style";
import { Tips, Wrapper, Title, Paper } from "./Components/styles";

export function TipsPage() {

  return (
    <Content>
      <Paper>
        <Wrapper>
          <Title>Aqui vão algumas dicas para o dia do casamento!</Title>
          <Tips>Procurem não utilizar roupas muito pesadas, estaremos no verão.</Tips>
          <Tips>Cheguem cedo, terá uma mesa de boas-vindas aguardando a presença de todos!</Tips>
          <Tips>As fotos com o casal ocorrerão na própria mesa dos convidados</Tips>
          
          <Tips>Recomendamos trajes de tons mais claros para que se sintam mais confortável em relação ao clima;</Tips>
          <br />
          <Tips>Para as mulheres:</Tips>
          <Tips>O local possui bastante vegetação e área coberta, porém a cerimônia será ao ar livre, recomendamos calçados de sola ampla, evitando saltos finos;</Tips>
          <Tips>Distribuiremos leques para que possam se refrescar caso tenha calor durante o casamento;</Tips>
        </Wrapper>
      </Paper>
    </Content>
  )
}