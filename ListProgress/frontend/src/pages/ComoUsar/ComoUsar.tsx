import { useState } from "react";
import Footer from "../../components/Footer";
import { Container, TextContainer, TitleContainer } from "./ComoUsar.styles";
import MainContainer from "../../components/MainContainer";

const stepsData = [
  {
    title: "Navegação pelos menus",
    text: "Utilize o menu principal para acessar suas listas, consultar o histórico, obter informações sobre o sistema ou realizar login."
  },
  {
    title: "Como gerenciar um card?",
    text: "Clique no ícone de informação (I), localizado acima do card, para visualizar sua descrição e acessar as opções de edição ou exclusão."
  },
  {
    title: "Como criar um novo card?",
    text: "Clique no botão “Adicionar lista”. Informe um título, selecione uma categoria e, opcionalmente, adicione uma descrição para facilitar a organização."
  },
  {
    title: "Como editar um card?",
    text: "Clique no ícone de lápis no card desejado para alterar suas informações."
  },
  {
    title: "Como excluir um card?",
    text: "Clique no ícone de lixeira para remover o card selecionado. Atenção: essa ação é permanente e não poderá ser desfeita."
  },
  {
    title: "Como criar uma tarefa?",
    text: "Acesse o card desejado e clique em “Adicionar tarefa”. Informe um título e, se necessário, inclua uma descrição."
  },
  {
    title: "Como editar uma tarefa?",
    text: "Clique no ícone de lápis da tarefa para editar seus dados."
  },
  {
    title: "Como excluir uma tarefa?",
    text: "Utilize o ícone de lixeira para excluir a tarefa selecionada."
  },
  {
    title: "Como se cadastrar?",
    text: "Clique em “Login” e, em seguida, selecione a opção “Cadastre-se”. Preencha os dados solicitados e finalize o processo de cadastro."
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
