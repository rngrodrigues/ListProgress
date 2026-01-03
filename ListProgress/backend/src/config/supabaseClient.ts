import 'dotenv/config'; // Importa variáveis de ambiente definidas no arquivo .env
import { createClient } from '@supabase/supabase-js';

// Criação de instância do Supabase usando URL e chave privadas do .env
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
