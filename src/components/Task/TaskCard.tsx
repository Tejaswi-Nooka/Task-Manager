import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import DragHandleIcon from '@mui/icons-material/DragHandle';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  marginTop: '20px',
  marginLeft: '20px',
}));

// Debug component to show the actual image
const DebugImage = ({ src }: { src: string }) => (
  <img 
    src={src} 
    alt="debug" 
    style={{ 
      position: 'absolute',
      top: -20,
      left: -20,
      width: 40,
      height: 40,
      zIndex: 2,
    }} 
  />
);

const characterIcons = {
  urgent: process.env.PUBLIC_URL + '/images/mickey-urgent.svg',
  normal: process.env.PUBLIC_URL + '/images/goofy-normal.svg',
  low: process.env.PUBLIC_URL + '/images/donald-low.svg',
};

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: 'urgent' | 'normal' | 'low';
    completed: boolean;
  };
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDelete, onEdit }) => {
  const priorityColors = {
    urgent: '#FF4081',
    normal: '#1B95E0',
    low: '#4CAF50',
  };

  const priorityIcons = {
    urgent: <PriorityHighIcon fontSize="small" />,
    normal: <DragHandleIcon fontSize="small" />,
    low: <LowPriorityIcon fontSize="small" />,
  };

  const priorityLabels = {
    urgent: 'Urgent',
    normal: 'Normal',
    low: 'Low',
  };

  // Debug logging for icon paths
  useEffect(() => {
    console.log('Character icon path:', characterIcons[task.priority]);
    // Try to fetch the icon to verify it exists
    fetch(characterIcons[task.priority])
      .then(response => {
        console.log('Icon fetch response:', response.status);
      })
      .catch(error => {
        console.error('Error fetching icon:', error);
      });
  }, [task.priority]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <StyledCard
        sx={{
          '&::before': {
            backgroundImage: `url("${characterIcons[task.priority]}")`,
            filter: task.completed ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.3s ease',
          },
          backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.05)' : 'white',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Debug image */}
        <DebugImage src={characterIcons[task.priority]} />
        
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.disabled' : 'text.primary',
                transition: 'all 0.3s ease',
              }}
            >
              {task.title}
            </Typography>
            <Box>
              <Chip
                icon={priorityIcons[task.priority]}
                label={priorityLabels[task.priority]}
                size="small"
                sx={{
                  backgroundColor: priorityColors[task.priority],
                  color: '#fff',
                  mr: 1,
                  opacity: task.completed ? 0.6 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
          >
            {task.description}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onComplete(task.id)}
              color={task.completed ? 'primary' : 'default'}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onEdit(task.id)}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onDelete(task.id)} 
              color="error"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default TaskCard; 