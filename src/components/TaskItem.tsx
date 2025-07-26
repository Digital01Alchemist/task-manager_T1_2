import React from 'react';
import type { Task } from '../types/task';
import { Card, CardContent, Typography, Chip, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TaskItemProps {
  task: Task;
}

const getColor = (type: string, value: string) => {
  if (type === 'category') {
    switch (value) {
      case 'Bug': return 'error';
      case 'Feature': return 'primary';
      case 'Documentation': return 'info';
      case 'Refactor': return 'secondary';
      case 'Test': return 'success';
      default: return 'default';
    }
  }
  if (type === 'status') {
    switch (value) {
      case 'To Do': return 'default';
      case 'In Progress': return 'warning';
      case 'Done': return 'success';
      default: return 'default';
    }
  }
  if (type === 'priority') {
    switch (value) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      default: return 'default';
    }
  }
  return 'default';
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {task.description}
          </Typography>
        )}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={task.category} color={getColor('category', task.category)} size="small" />
          <Chip label={task.status} color={getColor('status', task.status)} size="small" />
          <Chip label={task.priority} color={getColor('priority', task.priority)} size="small" />
        </Stack>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/task/${task.id}`)}
        >
          Редактировать
        </Button>
      </CardContent>
    </Card>
  );
}; 