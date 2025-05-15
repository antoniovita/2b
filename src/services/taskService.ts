import { Task } from '../database/entities/Task';
import * as taskRepo from '../database/repositories/TaskRepository';

export const createTask = async (
  task: Omit<Task, 'id'>
): Promise<Task> => {
  return await taskRepo.insertTask(task);
};

export const listTasksByUser = async (
  user_id: string
): Promise<Task[]> => {
  return await taskRepo.getTasksByUser(user_id);
};
