import { supabase } from "../config/supabaseClient.ts";
import type { Card } from "../types/Card";

export const CardRepository = {
  async create(card: Partial<Card> & { user_id: string }): Promise<Card> {
    const { data, error } = await supabase
      .from("cards")
      .insert([card])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async listByUser(userId: string): Promise<Card[]> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", userId)
      .order("position", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async deleteByUser(id: string, userId: string): Promise<boolean> {
    const { error, count } = await supabase
      .from("cards")
      .delete({ count: "exact" })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return !!count;
  },

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
      .single();

    if (error) return null;
    return data;
  },

  async findByIdByUser(id: string, userId: string): Promise<Card | null> {
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  }
};
