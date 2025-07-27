import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@entities/task/model/types';

/**
 * Состояние задач в Redux store
 */
interface TaskState {
  /** Массив всех задач */
  tasks: Task[];
  /** Флаг загрузки (для будущего использования с API) */
  loading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
}

/**
 * Загружает задачи из localStorage
 * Если данных нет или произошла ошибка, возвращает начальные задачи
 * @returns Массив задач из localStorage или начальные задачи
 */
const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : getInitialTasks();
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return getInitialTasks();
  }
};

/**
 * Сохраняет задачи в localStorage
 * Обрабатывает ошибки записи в localStorage
 * @param tasks - Массив задач для сохранения
 */
const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Возвращает начальные задачи для демонстрации
 * Используется при первом запуске приложения
 * @returns Массив начальных задач
 */
const getInitialTasks = (): Task[] => [
  {
    id: '1',
    title: 'Исправить баг с авторизацией',
    description: 'Пользователь не может войти в систему после обновления.',
    category: 'Bug',
    status: 'To Do',
    priority: 'High',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Добавить страницу профиля',
    description:
      'Реализовать отображение и редактирование профиля пользователя.',
    category: 'Feature',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: '3',
    title: 'Обновить документацию API',
    description: 'Добавить новые эндпоинты в документацию.',
    category: 'Documentation',
    status: 'Done',
    priority: 'Low',
    createdAt: new Date('2024-01-14').toISOString(),
  },
];

/**
 * Начальное состояние для Redux store
 */
const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

/**
 * Redux slice для управления задачами
 * Содержит все CRUD операции и автоматическое сохранение в localStorage
 */
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * Создает новую задачу
     * Автоматически генерирует ID и дату создания
     * Сохраняет в localStorage после создания
     */
    createTask: (
      state,
      action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>
    ) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    /**
     * Обновляет существующую задачу
     * Сохраняет в localStorage после обновления
     */
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    /**
     * Удаляет задачу по ID
     * Сохраняет в localStorage после удаления
     */
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    /**
     * Устанавливает состояние загрузки
     * Для будущего использования с API
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    /**
     * Устанавливает сообщение об ошибке
     * Для будущего использования с API
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { createTask, updateTask, deleteTask, setLoading, setError } =
  taskSlice.actions;
export default taskSlice.reducer;
