import { supabase } from "../config/supabaseClient.ts";
import type { Task } from "../types/Task.ts";

export const TaskRepository = {

  // Cria uma nova task. Supabase gera automaticamente ID e created_at.
  async create(
    task: Omit<Task, "id" | "created_at">
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task)       // Insere a task na tabela
      .select()           // Retorna os campos recém-criados
      .single();          // Garante retorno único

    if (error) {
      console.error("TaskRepository.create:", error);
      throw new Error(error.message);
    }

    return data;
  },

  // Lista todas as tasks de um usuário, ordenadas pela posição
  async listByUser(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)           // Filtra apenas as tasks do usuário
      .order("position", { ascending: true }); // Mantém a ordem visual

    if (error) {
      console.error("TaskRepository.listByUser:", error);
      throw new Error(error.message);
    }

    return data ?? [];
  },

  // Lista todas as tasks de um card específico, garantindo que pertençam ao usuário
  async listByCard(
    cardId: string,
    userId: string
  ): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("card_id", cardId)           // Filtra pelo card
      .eq("user_id", userId)           // Filtra pelo usuário
      .order("position", { ascending: true }); // Ordena pela posição

    if (error) {
      console.error("TaskRepository.listByCard:", error);
      throw new Error(error.message);
    }

    return data ?? [];
  },

  // Atualiza uma task específica do usuário
  async update(
    id: string,
    userId: string,
    updatedTask: Partial<Task>
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", id)                    // Seleciona task pelo ID
      .eq("user_id", userId)           // Confirma que pertence ao usuário
      .select()
      .single();                        // Retorna apenas uma task

    if (error) {
      console.error("TaskRepository.update:", error);
      throw new Error(error.message);
    }

    return data;
  },

  // Deleta uma task pelo ID e usuário
  async delete(
    id: string,
    userId: string
  ): Promise<boolean> {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);          // Garante que só deletará a task do usuário

    if (error) {
      console.error("TaskRepository.delete:", error);
      throw new Error(error.message);
    }

    return true;
  },

  // Busca uma task pelo ID e usuário. Pode retornar null se não encontrada.
  async findById(
    id: string,
    userId: string
  ): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();                  // Retorna null se não existir

    if (error) {
      console.error("TaskRepository.findById:", error);
      throw new Error(error.message);
    }

    return data;
  }
};
