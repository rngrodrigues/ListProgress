import {
  Container,
  Title,
  Subtitle,
  Text,
  TeamSection,
  TeamContainer,
  TeamCard,
  TeamImage,
  Equipe
} from "./SobreNos.styles";
import Footer from "../../components/Footer";
import desenvolvedorImg from "../../assets/icons/img/desenvolvedor.png";

export const SobreNos = () => {

  return (
    <>
      <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.50, ease: "easeOut" }}
      >
         <Title>Sobre nós</Title>

<Text>
  ListProgress é um sistema web desenvolvido para auxiliar na criação e no
  acompanhamento de metas de forma simples e organizada. O sistema utiliza
  cards e tarefas personalizadas para que cada usuário possa estruturar seus
  objetivos de acordo com suas necessidades.
</Text>

<Text>
  O progresso de cada card é calculado automaticamente com base nas tarefas
  concluídas, exibindo percentuais que facilitam a visualização da evolução das
  metas. Dessa forma, o usuário consegue acompanhar seu desempenho de maneira
  clara e intuitiva.
</Text>

<Text>
  Este projeto foi idealizado, projetado e desenvolvido individualmente por mim,
  com foco em aprendizado, portfólio e uso pessoal, aplicando boas práticas de
  desenvolvimento e design de interfaces.
</Text>

<TeamSection>
  <Subtitle>Equipe</Subtitle>
  <Equipe>Projeto desenvolvido de forma independente.</Equipe>

  <TeamContainer>
    <TeamCard>
      <TeamImage src={desenvolvedorImg} alt="Desenvolvedor do projeto" />
      <h3>Renan Rodrigues</h3>
      <p>
        Desenvolvedor Front-End, Designer, Idealizador e Responsável por todo o
        desenvolvimento do sistema.
      </p>
    </TeamCard>
  </TeamContainer>
</TeamSection>


        </Container>

  <Footer />
  </>
  );
};

export default SobreNos;
