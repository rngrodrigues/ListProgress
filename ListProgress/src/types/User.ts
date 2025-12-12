export interface User {
  id?: string;
  email: string;
  password: string;
  name?: string;
  created_at?: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}
