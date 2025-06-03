import React, { useState, useEffect } from 'react';
import { Grid, Box, Fab, Typography, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '../components/Task/TaskCard';
import MainLayout from '../components/Layout/MainLayout';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000';  // FastAPI default port
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'urgent' | 'normal' | 'low';
  completed: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error: any) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
      setError(`Failed to fetch tasks: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      
      const updatedTask = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !task.completed
      };

      console.log('Sending update request with data:', updatedTask);
      const response = await axios.put(`/api/tasks/${id}`, updatedTask);
      console.log('Update response:', response.data);
      
      fetchTasks();
      setError('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message;
      console.error('Error completing task:', {
        error,
        data: error.response?.data,
        status: error.response?.status,
        message: errorMessage
      });
      setError(`Failed to update task: ${errorMessage}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
      setError('');
    } catch (error: any) {
      console.error('Error deleting task:', error.response?.data || error.message);
      setError(`Failed to delete task: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit functionality
    console.log('Edit task:', id);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', minHeight: '80vh' }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'primary.main',
              fontFamily: '"Waltograph", Arial, sans-serif',
              textShadow: '2px 2px 4px rgba(27, 149, 224, 0.2)',
            }}
          >
            My Magical Tasks
          </Typography>

          {error && (
            <Box sx={{ 
              bgcolor: 'error.light', 
              color: 'error.contrastText', 
              p: 2, 
              mb: 2, 
              borderRadius: 1 
            }}>
              {error}
            </Box>
          )}

          <AnimatePresence>
            <Grid container spacing={3}>
              {tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>

          <motion.div
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Fab
              color="secondary"
              aria-label="add task"
              sx={{
                boxShadow: '0 4px 8px rgba(251, 140, 0, 0.4)',
              }}
            >
              <AddIcon />
            </Fab>
          </motion.div>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default TasksPage; 