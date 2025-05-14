// src/database/repositories/userRepository.ts
import { getDb } from '../index';
import { User } from '../../entities/User';
import { v4 as uuidv4 } from 'uuid';

export const insertUser = (user: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const id = uuidv4();

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO user (id, name) VALUES (?, ?)',
        [id, user.name],
        () => resolve({ id, ...user }),
        (_, error) => {
          console.error('Erro ao inserir usuário:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          console.error('Erro ao buscar usuários:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};
