import { supabase } from "../config/supabaseClient";
import type { Card } from "../types/Card";

export const CardRepository = {
  async createCard(data: Partial<Card>): Promise<Card> {
    const { data: result, error } = await supabase
      .from("cards")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as Card;
  },

  async getAll(): Promise<Card[]> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Card[];
  },

  async findById(id: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Card;
  }
};
