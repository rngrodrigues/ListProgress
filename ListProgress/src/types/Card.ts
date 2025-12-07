export interface Card {
  id: string;
  title: string;
  category?: string;
  description?: string;
  created_at: string;
  completed: boolean;
}
