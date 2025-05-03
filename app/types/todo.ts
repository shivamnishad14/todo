export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'other';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
} 