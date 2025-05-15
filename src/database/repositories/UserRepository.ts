import { getDb } from '../index';
import { User } from '../entities/User';
import { v4 as uuidv4 } from 'uuid';

export const insertUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const db = getDb();
  const id = uuidv4();

  const safeName = user.name.replace(/'/g, "''");

  try {
    await db.execAsync(
      `INSERT INTO user (id, name) VALUES ('${id}', '${safeName}')`
    );
    return { id, ...user };
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  const db = getDb();

  try {
    const result = await db.getAllAsync<User>('SELECT * FROM user');
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};
