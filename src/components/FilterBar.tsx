import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { TaskCategory, TaskPriority, TaskStatus } from '../types/task';

interface FilterBarProps {
  status: TaskStatus | '';
  setStatus: (status: TaskStatus | '') => void;
  category: TaskCategory | '';
  setCategory: (category: TaskCategory | '') => void;
  priority: TaskPriority | '';
  setPriority: (priority: TaskPriority | '') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  status, setStatus, category, setCategory, priority, setPriority,
}) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Статус</InputLabel>
      <Select
        value={status}
        label="Статус"
        onChange={(e) => setStatus(e.target.value as TaskStatus | '')}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
    </FormControl>
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Категория</InputLabel>
      <Select
        value={category}
        label="Категория"
        onChange={(e) => setCategory(e.target.value as TaskCategory | '')}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="Bug">Bug</MenuItem>
        <MenuItem value="Feature">Feature</MenuItem>
        <MenuItem value="Documentation">Documentation</MenuItem>
        <MenuItem value="Refactor">Refactor</MenuItem>
        <MenuItem value="Test">Test</MenuItem>
      </Select>
    </FormControl>
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Приоритет</InputLabel>
      <Select
        value={priority}
        label="Приоритет"
        onChange={(e) => setPriority(e.target.value as TaskPriority | '')}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    </FormControl>
  </Box>
); 