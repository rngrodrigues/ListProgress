import {
  Container,
  Title,
  Subtitle,
  Text,
  TeamSection,
  TeamContainer,
  TeamCard,
  TeamImage,
  Button,
  Equipe
} from "./SobreNos.styles";

import Footer from "../../components/Footer";

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
             Proin tincidunt lacus id arcu consequat, vitae bibendum urna ornare.
            Morbi porttitor felis id commodo suscipit Proin tincidunt lacus id
            arcu consequat, vitae bibendum urna ornare. Morbi porttitor felis id
            commodo suscipit Proin tincidunt lacus id arcu consequat, vitae
          
          </Text>

          <Text>
             Proin tincidunt lacus id arcu consequat, vitae bibendum urna ornare.
            Morbi porttitor felis id commodo suscipit.Proin tincidunt lacus id
            arcu consequat, vitae bibendum urna ornare. Morbi porttitor felis id
       
          </Text>

          <Text>
             Proin tincidunt lacus id arcu consequat, vitae bibendum urna ornare.
            Morbi porttitor felis id commodo suscipit.Proin tincidunt lacus id
            arcu consequat, vitae bibendum urna ornare. Morbi porttitor felis id
          </Text>

          <TeamSection>
            <Subtitle>Equipe</Subtitle>
            <Equipe>Conheça alguns dos profissionais que trabalharam no desenvolvimento do sistema.</Equipe>

            <TeamContainer>
              <TeamCard>
                <TeamImage src="https://picsum.photos/300/200" alt="Membro da equipe" />
                <h3>Renan Rodrigues</h3>
                <p>Desenvolvedor Front-End, Designer, Estilista, Deployer, Usuário, Fundador.</p>
              </TeamCard>
            </TeamContainer>
          </TeamSection>

          <Button>Fale comigo</Button>
        </Container>

  <Footer />
  </>
  );
};

export default SobreNos;
