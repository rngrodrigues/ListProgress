import { supabase } from "../config/supabaseClient.ts";
import type { Card } from "../types/Card";

export const CardRepository = {
   async create(card: any) {
    const { data, error } = await supabase
      .from("cards")
      .insert([card])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async list(): Promise<Card[]> {
    const { data, error } = await supabase.from("cards").select("*");
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("cards").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  async update(id: string, updatedCard: Partial<Card>): Promise<Card> {
    const { data, error } = await supabase
      .from("cards")
      .update(updatedCard)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async findById(id: string): Promise<Card | null> {   // <--- adicionei aqui
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
};
