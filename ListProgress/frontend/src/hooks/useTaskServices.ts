import { useAuth } from "../contexts/authContext";
import { TaskDemoService } from "../services/taskDemoService";
import { TaskServiceClient } from "../services/taskServiceClient";

export const useTaskService = () => {
  const { user } = useAuth();

  if (!user) return TaskDemoService;
  return TaskServiceClient;
};
