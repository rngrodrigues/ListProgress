import { useAuth } from "../contexts/authContext";
import { CardDemoService } from "../services/cardDemoService";
import { CardServiceClient } from "../services/cardServiceClient";

export const useCardService = () => {
  const { user } = useAuth();

  if (!user) return CardDemoService; 
  return CardServiceClient;          
};
