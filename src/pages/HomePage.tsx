import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { TaskList } from '../components/TaskList';
import { FilterBar } from '../components/FilterBar';
import { useTaskContext } from '../context/TaskContext';
import type { TaskCategory, TaskPriority, TaskStatus } from '../types/task';

export const HomePage: React.FC = () => {
  const { tasks } = useTaskContext();

  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [category, setCategory] = useState<TaskCategory | ''>('');
  const [priority, setPriority] = useState<TaskPriority | ''>('');

  const filteredTasks = tasks.filter((task) => {
    return (
      (status === '' || task.status === status) &&
      (category === '' || task.category === category) &&
      (priority === '' || task.priority === priority)
    );
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Менеджер задач
      </Typography>
      <FilterBar
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        priority={priority}
        setPriority={setPriority}
      />
      <TaskList tasks={filteredTasks} />
    </Container>
  );
}; 