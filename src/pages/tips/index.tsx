import { Content } from "../../styles/style";
import { Tips, Wrapper, Title, Paper, Subtitle } from "./Components/styles";
import { Flower } from 'lucide-react';

const generalTips = [
  'No calor os mosquitos costumam atacar, não esqueça o repelente.',
  'Optamos pelo traje esporte fino.',
  'Distribuiremos leques para que possam se refrescar caso tenha calor durante o casamento.'
];

const womenTips = [
  'Na hora de escolherem seus looks deem preferêcia para vestidos.',
  'O local possui bastante vegetação e área coberta, porém a cerimônia será ao ar livre, recomendamos calçados de sola ampla, evitando saltos finos.',
  'A cerimônia será na grama, então tome cuidado com saltos finos.',
];

export function TipsPage() {

  return (
    <Content>
      <Paper>
        <Wrapper>
          <Title>
            <Flower size={32} color="white" />
            Anote essas dicas para que tudo corra bem e você esteja super confortável no grande dia
            <Flower size={32} color="white" />
          </Title>
          {generalTips.map((item, index) =>
            <Tips index={index} >
              <Flower size={32} />
              {item}
            </Tips>
          )}

          <Subtitle>
            Para as mulheres
          </Subtitle>
          {womenTips.map((item, index) =>
            <Tips index={index} >
              <Flower size={32} />
              {item}
            </Tips>
          )}
        </Wrapper>
      </Paper>
    </Content>
  )
}