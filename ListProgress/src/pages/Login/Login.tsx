import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./Login.styles.ts";
import { GenericBtn, GenericBtnBlack } from "../../components/Utils/Buttons";
import { NameInput, EmailInput, PasswordInput } from "../../components/Utils/Inputs";
import { apiFetch } from "../../services/apiFetch";
import { useAuth } from "../../contexts/authContext";
import { toast } from "../../components/Utils/Toasts/Toasts.ts";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [fade, setFade] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerSwitch = (toLogin: boolean) => {
    setFade(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      setFade(false);
    }, 200);
  };
 async function handleLogin() {
    if (!email || !password) {
    toast.warning("Preencha todos os campos!");
    return;
  }

    try {
      setLoading(true);

      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      login(response.user, response.token, rememberMe);
      toast.success(`Olá, ${response.user.name}!`);
      navigate("/");
    } catch (err: any) {
      console.error("Erro no login:", err);
      toast.error("Email ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  }


  async function handleRegister() {
     if (!name || !email || !password) {
    toast.warning("Preencha todos os campos!");
    return;
  }

    try {
      setLoading(true);

      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      login(response.user, response.token, true);
      navigate("/");
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      toast.error("Email já cadastrado!");
    } finally {
      setLoading(false);
    }
  }


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
                    handleLogin();
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
                      
                  <div id="gambiarra">
                    <GenericBtnBlack disabled={loading}>
                      {loading ? "Entrando..." : "Entrar"}
                    </GenericBtnBlack>
                  </div>
                  <p className="mobile-text">
                      Ainda não possui uma conta? <button  type="button" className="mobile-link" onClick={() => triggerSwitch(false)}>Cadastre-se </button> 
                    </p>
  
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
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
