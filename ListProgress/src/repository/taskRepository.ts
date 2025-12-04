import { supabase } from "../config/supabaseClient.ts";
import type { Task } from "../types/Task";

export const TaskRepository = {
   async create(task: any) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async list(): Promise<Task[]> {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  async update(id: string, updatedCard: Partial<Task>): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedCard)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async findById(id: string): Promise<Task | null> {   
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
};
