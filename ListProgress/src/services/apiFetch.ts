const BASE_URL = "http://192.168.1.9:3001";

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  ...(options.headers as Record<string, string>),
};



  if (options.auth !== false && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));

   

    throw new Error(errorBody.error || "Erro na requisição");
  }

  return response.json();
}
