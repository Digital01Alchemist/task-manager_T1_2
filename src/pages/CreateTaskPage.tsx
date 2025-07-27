import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import { TaskForm } from '../components/TaskForm';
import { useAppDispatch } from '../store/hooks';
import { createTask } from '../store/taskSlice';
import type { Task } from '@entities/task/model/types';

/**
 * Страница создания новой задачи
 * Использует универсальный компонент TaskForm с пустыми начальными значениями
 * Автоматически возвращается на главную страницу после создания
 */
export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Обработчик создания новой задачи
   * Диспатчит действие создания и перенаправляет на главную
   * @param taskData - Данные новой задачи (без id и createdAt)
   */
  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    dispatch(createTask(taskData));
    navigate('/');
  };

  /**
   * Обработчик отмены создания
   * Возвращает пользователя на главную страницу
   */
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Создать новую задачу
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialValues={{
            title: '',
            description: '',
            category: 'Feature',
            status: 'To Do',
            priority: 'Medium',
          }}
        />
      </Paper>
    </Container>
  );
};
