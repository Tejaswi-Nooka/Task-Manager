import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { DisneyTheme } from './theme/DisneyTheme';
import TasksPage from './pages/TasksPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={DisneyTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 