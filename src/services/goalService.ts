import { Goal } from '../database/entities/Goal';
import * as goalRepo from '../database/repositories/GoalRepository';

export const createGoal = async (
  goal: Omit<Goal, 'id'>
): Promise<Goal> => {
  return await goalRepo.insertGoal(goal);
};

export const listGoalsByUser = async (
  user_id: string
): Promise<Goal[]> => {
  return await goalRepo.getGoalsByUser(user_id);
};
