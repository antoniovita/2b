import { SQLiteDatabase } from 'expo-sqlite';

export const runMigrations = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS routine (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      day_of_week TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      type TEXT,
      completed INTEGER DEFAULT 0,
      user_id TEXT,
      routine_id TEXT,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (routine_id) REFERENCES routine(id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      goal_type TEXT,
      completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES user(id)
    );
  `);
};
