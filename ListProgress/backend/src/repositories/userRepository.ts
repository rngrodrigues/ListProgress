import { supabase } from "../config/supabaseClient.ts";
import type { User, PublicUser } from "../types/User.ts";

export class UserRepository {

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;
    return data;
  }

  async createUser(user: User): Promise<PublicUser> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select("id, email, name, created_at");

    if (error || !data) {
      throw new Error("Erro ao criar usuário");
    }

    return data[0];
  }
}
