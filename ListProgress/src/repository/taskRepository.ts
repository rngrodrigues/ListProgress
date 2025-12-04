import { supabase } from "../config/supabaseClient";
import type { Task } from "../types/Task";

export const TaskRepository = {
  async createTask(data: Partial<Task>): Promise<Task> {
    const { data: result, error } = await supabase
      .from("tasks")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as Task;
  },

  async findByCard(card_id: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("card_id", card_id)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as Task[];
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const { data: result, error } = await supabase
      .from("tasks")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result as Task;
  }
};
