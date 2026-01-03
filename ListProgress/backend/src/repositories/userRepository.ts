import { supabase } from "../config/supabaseClient.ts";
import type { User, PublicUser } from "../types/User.ts";

export class UserRepository {

  /**
   * Busca um usuário pelo email.
   * @param email Email do usuário a ser buscado
   * @returns Retorna o usuário completo ou null se não encontrado
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")          // Seleciona todos os campos do usuário
      .eq("email", email)   // Filtra pelo email
      .single();            // Espera no máximo 1 registro

    if (error) return null; // Retorna null se não encontrado ou erro
    return data;
  }

  /**
   * Cria um novo usuário na tabela "users".
   * Retorna apenas os dados públicos do usuário (sem senha)
   * @param user Dados completos do usuário a ser criado
   * @returns PublicUser com id, email, nome e data de criação
   */
  async createUser(user: User): Promise<PublicUser> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])                       // Insere o usuário na tabela
      .select("id, email, name, created_at"); // Retorna apenas campos públicos

    if (error || !data) {
      throw new Error("Erro ao criar usuário");
    }

    return data[0]; // Supabase retorna um array, então pegamos o primeiro elemento
  }
}
