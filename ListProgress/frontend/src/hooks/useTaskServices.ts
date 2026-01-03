import { useAuth } from "../contexts/authContext";
import { TaskDemoService } from "../services/taskDemoService";
import { TaskServiceClient } from "../services/taskServiceClient";
/**
 Hook responsável por fornecer o serviço de tasks adequado.
 - Usuário autenticado → usa o taskServiceClient (API real)
 - Usuário não autenticado → usa o taskDemoService (modo demo com LocalStorage)
 **/
export const useTaskService = () => {
  const { user } = useAuth();

  if (!user) return TaskDemoService;
  return TaskServiceClient;
};
