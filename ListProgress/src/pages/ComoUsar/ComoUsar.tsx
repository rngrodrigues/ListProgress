import { useState } from "react";
import Footer from "../../components/Footer";
import { Container, MaxWidthContainer, TextContainer, Title, TitleContainer } from "./ComoUsar.styles";
import MainContainer from "../../components/MainContainer";

const stepsData = [
  {
    title: "Criar nova tarefa",
    text: "Basta clicar no grande botão escrito 'Adicionar lista'. Basta clicar no grande botão escrito 'Adicionar lista'.  Basta clicar no grande botão escrito 'Adicionar lista'. "
  },
  {
    title: "Navegar pelos menus",
    text: "Use o menu lateral para acessar suas listas. Basta clicar no grande botão escrito 'Adicionar lista'.  Basta clicar no grande botão escrito 'Adicionar lista'. "
  },
  {
    title: "Editar tarefas",
    text: "Clique na tarefa para editar seu conteúdo.adsf gawergrae grea "
  },
  {
    title: "Excluir tarefas",
    text: "Use o ícone de lixeira para remover uma tarefa."
  }
];

const ComoUsar = () => {
  const [openItems, setOpenItems] = useState(
    stepsData.map(() => false)
  );

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <MainContainer>
        <Title>Como usar?</Title>

        {stepsData.map((step, index) => (

          <Container key={index} onClick={() => toggle(index)}>
            <TitleContainer>{step.title}</TitleContainer>

            <TextContainer open={openItems[index]}>
              {step.text}
            </TextContainer>
          </Container>

        ))}

      </MainContainer>

      <Footer />
    </>
  );
};

export default ComoUsar;
