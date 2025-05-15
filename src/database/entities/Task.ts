export interface Task {
    id: string;
    title: string;
    description?: string;
    date?: string;
    type?: string;
    completed?: number;
    user_id?: string;
    routine_id?: string;
  }
  