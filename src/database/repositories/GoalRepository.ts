import { getDb } from '../index';
import { Goal } from '../../entities/Goal';
import { v4 as uuidv4 } from 'uuid';

export const insertGoal = async (goal: Omit<Goal, 'id'>): Promise<Goal> => {
  const db = getDb();
  const id = uuidv4();

  const goalType = goal.goal_type.replace(/'/g, "''");
  const completed = goal.completed ?? 0;
  const userId = goal.user_id ?? '';

  try {
    await db.execAsync(
      `INSERT INTO goals (id, user_id, goal_type, completed)
       VALUES ('${id}', '${userId}', '${goalType}', ${completed})`
    );
    return { id, ...goal };
  } catch (error) {
    console.error('Erro ao inserir meta:', error);
    throw error;
  }
};

export const getGoalsByUser = async (userId: string): Promise<Goal[]> => {
  const db = getDb();
  const safeUserId = userId.replace(/'/g, "''");

  try {
    return await db.getAllAsync<Goal>(
      `SELECT * FROM goals WHERE user_id = '${safeUserId}'`
    );
  } catch (error) {
    console.error('Erro ao buscar metas:', error);
    throw error;
  }
};
