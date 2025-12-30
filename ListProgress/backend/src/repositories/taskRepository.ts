import { supabase } from "../config/supabaseClient.ts";
import type { Task } from "../types/Task.ts";

export const TaskRepository = {
  async create(
    task: Omit<Task, "id" | "created_at">
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task) 
      .select()
      .single();

    if (error) {
      console.error("TaskRepository.create:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async listByUser(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("position", { ascending: true });

    if (error) {
      console.error("TaskRepository.listByUser:", error);
      throw new Error(error.message);
    }

    return data ?? [];
  },

  async listByCard(
    cardId: string,
    userId: string
  ): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("card_id", cardId)
      .eq("user_id", userId)
      .order("position", { ascending: true });

    if (error) {
      console.error("TaskRepository.listByCard:", error);
      throw new Error(error.message);
    }

    return data ?? [];
  },

  async update(
    id: string,
    userId: string,
    updatedTask: Partial<Task>
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("TaskRepository.update:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async delete(
    id: string,
    userId: string
  ): Promise<boolean> {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("TaskRepository.delete:", error);
      throw new Error(error.message);
    }

    return true;
  },

  async findById(
    id: string,
    userId: string
  ): Promise<Task | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle(); 

    if (error) {
      console.error("TaskRepository.findById:", error);
      throw new Error(error.message);
    }

    return data;
  }
};
