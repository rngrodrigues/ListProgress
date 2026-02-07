const BASE_URL = "https://listprogress.onrender.com";

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}) {
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

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data.accessToken;
};

  let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      headers = buildHeaders(token);
      response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    } catch (err) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); 
      throw new Error("Sessão expirada, faça login novamente");
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || "Erro na requisição");
  }

  return response.json();
}
