import { User } from '../entities/User'
import * as userRepo from '../database/repositories/UserRepository';

export const createUser = async (name: string): Promise<User> => {
  return await userRepo.insertUser({ name });
};

export const listUsers = async (): Promise<User[]> => {
  return await userRepo.getAllUsers();
};
