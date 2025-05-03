'use client';

import { Todo, Priority, Category } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'shopping':
        return 'bg-pink-100 text-pink-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
      isOverdue ? 'border-red-500' : 'border-transparent'
    }`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(todo.priority)}`}>
              {todo.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(todo.category)}`}>
              {todo.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isOverdue ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              Due: {formatDate(todo.dueDate)}
            </span>
          </div>
          <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </p>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 