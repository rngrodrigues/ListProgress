const BASE_URL = "https://listprogress-server.up.railway.app";
// URL da API real: https://listprogress-server.up.railway.app localhost: http://192.168.1.9:3001

type ApiFetchOptions = RequestInit & {
  auth?: boolean; // Define se a requisição deve incluir token de autenticação
};

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}) {
  // Pega accessToken do localStorage
  let token: string | null = localStorage.getItem("accessToken");

  const buildHeaders = (token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  };

  let headers = buildHeaders(token ?? undefined);

 const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Refresh token não encontrado");

  const refreshResp = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshResp.ok) throw new Error("Refresh token inválido");

  const data = await refreshResp.json();

  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Tokens não recebidos");
  }

  // Atualiza os dois tokens
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data.accessToken;
};

  // Tenta requisição original
  let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // Se 401, tenta refresh (somente se houver refresh token)
  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      headers = buildHeaders(token);
      response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    } catch (err) {
      // Se refresh falhar, limpa storage e força logout
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Sessão expirada, faça login novamente");
        
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || "Erro na requisição");
  }

  return response.json();
}
