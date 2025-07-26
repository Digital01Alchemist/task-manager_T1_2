import React from 'react';
import { Container } from '@mui/material';
import { TaskDetails } from '../components/TaskDetails';

export const TaskPage: React.FC = () => (
  <Container sx={{ py: 4 }}>
    <TaskDetails />
  </Container>
); 