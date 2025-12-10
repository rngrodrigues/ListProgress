import { useState } from "react";
import Footer from "../../components/Footer";
import { 
  LoginMainContainer, 
  GrayContainer, 
  WhiteContainer, 
  TitleWhiteContainer, 
  TextContainer, 
  AnswerContainer, 
  TitleGrayContainer, 
  MaxWidthContainerGray, 
  MaxWidthContainerWhite 
} from "./Login.styles.ts";
import { GenericBtn, GenericBtnBlack } from "../../components/Utils/Buttons";
import { NameInput, EmailInput, PasswordInput } from "../../components/Utils/Inputs";

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const showLogin = () => setIsLogin(true);
  const showRegister = () => setIsLogin(false);


  const handleLogin = () => console.log("Login:", { email, password });
  const handleRegister = () => console.log("Cadastrar:", { name, email, password });

  return (
    <>
      <LoginMainContainer>


        <WhiteContainer>
          <MaxWidthContainerWhite>
            {isLogin ? (
              <>
                <TitleWhiteContainer>Olá, novamente!</TitleWhiteContainer>
                <TextContainer>
                  Todas suas metas serão salvas automaticamente ao fazer login.
                </TextContainer>
                <AnswerContainer>Ainda não possui uma conta?</AnswerContainer>
                <GenericBtn onClick={showRegister}>Cadastre-se</GenericBtn>
              </>
            ) : (
              <>
                <TitleWhiteContainer>Olá, bem-vindo!</TitleWhiteContainer>
                <TextContainer>
                  Crie uma conta e tenha todas suas metas salvas, em qualquer lugar.
                </TextContainer>
                <AnswerContainer>Você já possui uma conta?</AnswerContainer>
                
                <GenericBtn onClick={showLogin}>Entrar</GenericBtn>
              </>
            )}
          </MaxWidthContainerWhite>
        </WhiteContainer>


        <GrayContainer>
          <MaxWidthContainerGray>
            {isLogin ? (
              <>
                <TitleGrayContainer>Login</TitleGrayContainer>
                <EmailInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
           
                 <div id="gambiarra">
                  <GenericBtnBlack onClick={handleLogin}>Entrar</GenericBtnBlack>
                </div>
              </>
            ) : (
              <>
                <TitleGrayContainer>Cadastre-se</TitleGrayContainer>
                <NameInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <EmailInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                 <div id="gambiarra">
                  <GenericBtnBlack onClick={handleRegister}>Cadastrar</GenericBtnBlack>
                </div>
              </>
            )}
          </MaxWidthContainerGray>
        </GrayContainer>

      </LoginMainContainer>
      <Footer />
    </>
  );
};

export default Login;
