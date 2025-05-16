import { Routine } from '../entities/Routine';
import * as routineRepo from '../database/repositories/RoutineRepository';

export const createRoutine = async (
  user_id: string,
  day_of_week: string
): Promise<Routine> => {
  return await routineRepo.insertRoutine({ user_id, day_of_week });
};

export const listRoutinesByUser = async (
  user_id: string
): Promise<Routine[]> => {
  return await routineRepo.getRoutinesByUser(user_id);
};
