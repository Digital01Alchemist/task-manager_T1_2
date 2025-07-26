import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';

const App: React.FC = () => (
  <TaskProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);

export default App; 