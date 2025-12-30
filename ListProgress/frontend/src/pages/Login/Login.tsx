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
  MaxWidthContainerWhite,
  FadeWrapper,
  CheckInput
} from "./Login.styles";
import { GenericBtn, GenericBtnBlack } from "../../components/Utils/Buttons";
import { NameInput, EmailInput, PasswordInput } from "../../components/Utils/Inputs";
import { useLogin } from "../../hooks/useLogin"; 

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { handleLogin, handleRegister, loading } = useLogin(); 
  const triggerSwitch = (toLogin: boolean) => {
    setFade(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      setFade(false);
    }, 200);
  };

  return (
    <>
      <LoginMainContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WhiteContainer>
          <MaxWidthContainerWhite>
            <FadeWrapper $fade={fade}>
              {isLogin ? (
                <>
                  <TitleWhiteContainer>Olá, novamente!</TitleWhiteContainer>
                  <TextContainer>
                    Todas suas metas serão salvas automaticamente ao fazer login.
                  </TextContainer>
                  <AnswerContainer>Ainda não possui uma conta?</AnswerContainer>
                  <GenericBtn onClick={() => triggerSwitch(false)}>
                    Cadastre-se
                  </GenericBtn>
                </>
              ) : (
                <>
                  <TitleWhiteContainer>Olá, bem-vindo!</TitleWhiteContainer>
                  <TextContainer>
                    Crie uma conta e tenha todas suas metas salvas, em qualquer lugar.
                  </TextContainer>
                  <AnswerContainer>Você já possui uma conta?</AnswerContainer>
                  <GenericBtn onClick={() => triggerSwitch(true)}>
                    Entrar
                  </GenericBtn>
                </>
              )}
            </FadeWrapper>
          </MaxWidthContainerWhite>
        </WhiteContainer>

        <GrayContainer>
          <MaxWidthContainerGray>
            <FadeWrapper $fade={fade}>
              {isLogin ? (
                <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin(email, password); 
  }}
>
                  <TitleGrayContainer>Login</TitleGrayContainer>

                  <EmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    style={{
                      marginTop: "2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem"
                    }}
                  >
                    <CheckInput
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" style={{ fontSize: "1.8rem" }}>
                      Manter conectado
                    </label>
                  </div>

                  <div id="div-btn">
                    <GenericBtnBlack disabled={loading}>
                      {loading ? "Entrando..." : "Entrar"}
                    </GenericBtnBlack>
                  </div>
                  <p className="mobile-text">
                    Ainda não possui uma conta?{" "}
                    <button
                      type="button"
                      className="mobile-link"
                      onClick={() => triggerSwitch(false)}
                    >
                      Cadastre-se
                    </button>
                  </p>
                </form>
              ) : (
                <form
  onSubmit={(e) => {
    e.preventDefault();
    handleRegister(name, email, password); 
  }}
>
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
                    <GenericBtnBlack disabled={loading}>
                      {loading ? "Cadastrando..." : "Cadastrar"}
                    </GenericBtnBlack>
                  </div>

                  <p className="mobile-text">
                    Já possui uma conta?{" "}
                    <button
                      type="button"
                      className="mobile-link"
                      onClick={() => triggerSwitch(true)}
                    >
                      Entrar
                    </button>
                  </p>
                </form>
              )}
            </FadeWrapper>
          </MaxWidthContainerGray>
        </GrayContainer>
      </LoginMainContainer>

      <Footer />
    </>
  );
};

export default Login;
