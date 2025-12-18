import { useAuth } from "../contexts/authContext.tsx";
import { TaskDemoService } from "../services/taskDemoService.ts";
import { TaskServiceClient } from "../services/taskServiceClient.ts";

export const useTaskService = () => {
  const { user } = useAuth();

  if (!user) return TaskDemoService;
  return TaskServiceClient;
};
