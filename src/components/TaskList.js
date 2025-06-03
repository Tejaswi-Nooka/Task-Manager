import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'status'
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks/');
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks: " + err.response?.data?.detail || err.message);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      await axios.put(`/tasks/${taskId}`, {
        completed: !currentStatus
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task: " + err.response?.data?.detail || err.message);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        setError("Failed to delete task: " + err.response?.data?.detail || err.message);
      }
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      await axios.put(`/tasks/${editingTask.id}`, {
        title: editTitle,
        description: editDescription,
        completed: editingTask.completed
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError("Failed to update task: " + err.response?.data?.detail || err.message);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'status') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    // Sort by date (assuming tasks have a creation_date field)
    return new Date(b.creation_date) - new Date(a.creation_date);
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Your Tasks</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {error && (
        <div style={{ 
          color: 'red', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}

      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className="task-item">
            {editingTask?.id === task.id ? (
              <div style={{ width: '100%' }}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description (optional)"
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={saveEdit}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#2ecc71',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEdit}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#95a5a6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id, task.completed)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  <div>
                    <span style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#888' : 'inherit'
                    }}>
                      {task.title}
                    </span>
                    {task.description && (
                      <p style={{ 
                        margin: '5px 0 0 0',
                        fontSize: '0.9em',
                        color: '#666',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className={task.completed ? "status-complete" : "status-incomplete"}>
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                  <button
                    onClick={() => startEditing(task)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No tasks yet. Add some tasks to get started!
        </p>
      )}
    </div>
  );
} 