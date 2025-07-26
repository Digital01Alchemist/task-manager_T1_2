import React from 'react';
import { Grid } from '@mui/material';
import { TaskItem } from './TaskItem';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <Grid container spacing={2}>
    {tasks.map((task) => (
      <Grid item xs={12} sm={6} md={4} key={task.id}>
        <TaskItem task={task} />
      </Grid>
    ))}
  </Grid>
); 