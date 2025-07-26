import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import {
  Box, TextField, Button, MenuItem, Stack, Typography, Paper,
} from '@mui/material';
import type{ TaskCategory, TaskPriority, TaskStatus } from '../types/task';

const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTaskById, updateTask } = useTaskContext();
  const navigate = useNavigate();

  const task = getTaskById(id!);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState<TaskCategory>(task?.category || 'Feature');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'To Do');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'Medium');

  if (!task) {
    return <Typography>Задача не найдена</Typography>;
  }

  const handleSave = () => {
    updateTask({
      ...task,
      title,
      description,
      category,
      status,
      priority,
    });
    navigate('/');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, margin: '0 auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">Редактирование задачи</Typography>
        <TextField
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />
        <TextField
          select
          label="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Статус"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          {statuses.map((st) => (
            <MenuItem key={st} value={st}>{st}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Приоритет"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          {priorities.map((pr) => (
            <MenuItem key={pr} value={pr}>{pr}</MenuItem>
          ))}
        </TextField>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSave}>Сохранить</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Отмена</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}; 