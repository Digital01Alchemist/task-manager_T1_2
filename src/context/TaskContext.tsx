import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Task } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Исправить баг с авторизацией',
    description: 'Пользователь не может войти в систему после обновления.',
    category: 'Bug',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: '2',
    title: 'Добавить страницу профиля',
    description: 'Реализовать отображение и редактирование профиля пользователя.',
    category: 'Feature',
    status: 'In Progress',
    priority: 'Medium',
  },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (task: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  const getTaskById = (id: string) => tasks.find((t) => t.id === id);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
}; 