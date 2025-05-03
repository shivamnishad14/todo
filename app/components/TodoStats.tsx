'use client';

import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const highPriorityTasks = todos.filter((todo) => todo.priority === 'high').length;
  const dueTodayTasks = todos.filter(
    (todo) => new Date(todo.dueDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-sm text-blue-600 font-medium">Total Tasks</div>
        <div className="text-2xl font-bold text-blue-700">{totalTasks}</div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="text-sm text-green-600 font-medium">Completed</div>
        <div className="text-2xl font-bold text-green-700">{completedTasks}</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-sm text-red-600 font-medium">High Priority</div>
        <div className="text-2xl font-bold text-red-700">{highPriorityTasks}</div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="text-sm text-yellow-600 font-medium">Due Today</div>
        <div className="text-2xl font-bold text-yellow-700">{dueTodayTasks}</div>
      </div>
    </div>
  );
} 