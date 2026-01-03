import { supabase } from "../config/supabaseClient.ts";
import type { Card } from "../types/Card.ts";

export const CardRepository = {

  // Cria um novo card para o usuário especificado
  async create(card: Partial<Card> & { user_id: string }): Promise<Card> {
    const { data, error } = await supabase
      .from("cards")
      .insert([card])       // Insere o card na tabela
      .select()             // Retorna os campos recém-criados
      .single();            // Garante que retorna apenas um registro

    if (error) throw new Error(error.message);
    return data;
  },

  // Lista todos os cards de um usuário, ordenados pela posição
  async listByUser(userId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", userId)           // Filtra apenas cards do usuário
      .order("position", { ascending: true }); // Ordena para manter a ordem visual

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  // Deleta um card específico do usuário e retorna true se houve exclusão
  async deleteByUser(id: string, userId: string): Promise<boolean> {
    const { error, count } = await supabase
      .from("cards")
      .delete({ count: "exact" })  // Pede que o Supabase conte quantos registros foram deletados
      .eq("id", id)
      .eq("user_id", userId);      // Garante que só deletará o card do usuário correto

    if (error) throw new Error(error.message);
    return !!count;                // Retorna true se count > 0
  },

  // Atualiza um card específico do usuário
  async updateByUser(
    id: string,
    updatedCard: Partial<Card>,
    userId: string
  ): Promise<Card | null> {
    const { data, error } = await supabase
      .from("cards")
      .update(updatedCard)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();                   // Retorna o card atualizado

    if (error) return null;        // Retorna null em caso de falha
    return data;
  },

  // Busca um card pelo ID e pelo usuário
  async findByIdByUser(id: string, userId: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)        // Garante que só retorna card do usuário correto
      .single();                    // Espera apenas um registro

    if (error) return null;         // Retorna null se não encontrar
    return data;
  }
};
