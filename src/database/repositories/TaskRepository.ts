// src/database/repositories/taskRepository.ts
import { getDb } from '../index';
import { Task } from '../../entities/Task';
import { v4 as uuidv4 } from 'uuid';

export const insertTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const db = getDb();
  const id = uuidv4();

  const title = task.title.replace(/'/g, "''");
  const description = (task.description || '').replace(/'/g, "''");
  const date = task.date ?? '';
  const type = (task.type || '').replace(/'/g, "''");
  const completed = task.completed ?? 0;
  const userId = task.user_id ?? '';
  const routineId = task.routine_id ?? '';

  try {
    await db.execAsync(
      `INSERT INTO tasks (id, title, description, date, type, completed, user_id, routine_id)
       VALUES ('${id}', '${title}', '${description}', '${date}', '${type}', ${completed}, '${userId}', '${routineId}')`
    );
    return { id, ...task };
  } catch (error) {
    console.error('Erro ao inserir tarefa:', error);
    throw error;
  }
};

export const getTasksByUser = async (userId: string): Promise<Task[]> => {
  const db = getDb();
  const safeUserId = userId.replace(/'/g, "''");

  try {
    return await db.getAllAsync<Task>(
      `SELECT * FROM tasks WHERE user_id = '${safeUserId}' ORDER BY date ASC`
    );
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};
