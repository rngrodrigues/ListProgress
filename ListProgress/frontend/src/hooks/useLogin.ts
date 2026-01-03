import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiFetch";
import { useAuth } from "../contexts/authContext";
import { toast } from "../components/Utils/Toasts/Toasts";

/**
 Hook responsável por gerenciar autenticação de usuários.
 
 - Realiza login e cadastro via API
 - Valida preenchimento de campos
 - Armazena usuário e token no contexto de autenticação
 - Controla estado de carregamento
 - Exibe feedbacks visuais e redireciona após sucesso
 
 **/

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
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

      login(response.user, response.token, true);
      toast.success(`Olá, ${response.user.name}!`);
      navigate("/"); 
    } catch (err: any) {
      console.error("Erro no login:", err);
      toast.error("Email ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
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
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");  
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      toast.error("Email já cadastrado!");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading };
}
