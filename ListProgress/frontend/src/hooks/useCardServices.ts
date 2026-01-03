import { useAuth } from "../contexts/authContext";
import { CardDemoService } from "../services/cardDemoService";
import { CardServiceClient } from "../services/cardServiceClient";

/**
 Hook responsável por fornecer o serviço de cards adequado.
 - Usuário autenticado → usa o CardServiceClient (API real)
 - Usuário não autenticado → usa o CardDemoService (modo demo com LocalStorage)
 **/

export const useCardService = () => {
  const { user } = useAuth();

  if (!user) return CardDemoService; 
  return CardServiceClient;          
};
