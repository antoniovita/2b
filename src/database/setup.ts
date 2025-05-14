import { SQLiteDatabase } from 'expo-sqlite';

export const applyPragmas = async (db: SQLiteDatabase) => {
  await db.execAsync(`PRAGMA foreign_keys = ON;`);
  await db.execAsync(`PRAGMA journal_mode = WAL;`);
};
