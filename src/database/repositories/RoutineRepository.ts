// src/database/repositories/routineRepository.ts
import { getDb } from '../index';
import { Routine } from '../entities/Routine';
import { v4 as uuidv4 } from 'uuid';

export const insertRoutine = async (
  routine: Omit<Routine, 'id'>
): Promise<Routine> => {
  const db = getDb();
  const id = uuidv4();

  const userId = routine.user_id ?? '';
  const day = routine.day_of_week.replace(/'/g, "''");

  try {
    await db.execAsync(
      `INSERT INTO routine (id, user_id, day_of_week) VALUES ('${id}', '${userId}', '${day}')`
    );
    return { id, ...routine };
  } catch (error) {
    console.error('Erro ao inserir rotina:', error);
    throw error;
  }
};

export const getRoutinesByUser = async (userId: string): Promise<Routine[]> => {
  const db = getDb();
  const safeUserId = userId.replace(/'/g, "''");

  try {
    return await db.getAllAsync<Routine>(
      `SELECT * FROM routine WHERE user_id = '${safeUserId}'`
    );
  } catch (error) {
    console.error('Erro ao buscar rotinas:', error);
    throw error;
  }
};
