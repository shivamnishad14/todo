'use client';

import { Priority, Category } from '../types/todo';

interface TodoFilterProps {
  filter: {
    search: string;
    category: Category | 'all';
    priority: Priority | 'all';
    sortBy: 'createdAt' | 'dueDate' | 'priority';
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    search: string;
    category: Category | 'all';
    priority: Priority | 'all';
    sortBy: 'createdAt' | 'dueDate' | 'priority';
  }>>;
}

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value as Category | 'all' })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="other">Other</option>
        </select>
        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value as Priority | 'all' })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Sort by:</span>
        <select
          value={filter.sortBy}
          onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as 'createdAt' | 'dueDate' | 'priority' })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
} 