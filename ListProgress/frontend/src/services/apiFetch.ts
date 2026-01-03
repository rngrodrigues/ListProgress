const BASE_URL = "https://listprogress-server.up.railway.app";
// URL da API real: https://listprogress-server.up.railway.app localhost: http://192.168.1.9:3001

type ApiFetchOptions = RequestInit & {
  auth?: boolean; // Define se a requisição deve incluir token de autenticação
};

export async function apiFetch(
  endpoint: string, // Caminho da API a ser chamado
  options: ApiFetchOptions = {} // Configurações adicionais da requisição
) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token"); // Busca token JWT

  const headers: Record<string, string> = {
    "Content-Type": "application/json", // Define tipo de conteúdo
    ...(options.headers as Record<string, string>), // Permite sobrescrever ou adicionar headers
  };

  // Adiciona token se a requisição requer autenticação
  if (options.auth !== false && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Executa requisição HTTP
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options, // Merge das opções passadas (method, body, etc)
    headers, // Usa headers preparados acima
  });

  // Trata respostas de erro
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})); // Tenta ler mensagem de erro do backend
    throw new Error(errorBody.error || "Erro na requisição"); // Lança erro com mensagem do backend ou genérica
  }

  return response.json(); 
}
