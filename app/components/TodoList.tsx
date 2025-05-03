'use client';

import { useState, useEffect } from 'react';
import { Todo, Priority, Category } from '../types/todo';
import TodoItem from './TodoItem';
// import TodoForm from './TodoForm'; // Removing since module not found
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import TodoForm from './TodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  const [filter, setFilter] = useState({
    search: '',
    category: 'all' as Category | 'all',
    priority: 'all' as Priority | 'all',
    sortBy: 'createdAt' as 'createdAt' | 'dueDate' | 'priority',
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority, category: Category, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(filter.search.toLowerCase());
      const matchesCategory = filter.category === 'all' || todo.category === filter.category;
      const matchesPriority = filter.priority === 'all' || todo.priority === filter.priority;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      if (filter.sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b[filter.sortBy]).getTime() - new Date(a[filter.sortBy]).getTime();
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
            <p className="text-gray-600 mb-6">Organize your tasks efficiently</p>
            
            <TodoStats todos={todos} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <TodoFilter filter={filter} setFilter={setFilter} />
                <div className="mt-6 space-y-3">
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                  {filteredTodos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No tasks found. Add a new task to get started!
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-1">
                <TodoForm onAdd={addTodo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 