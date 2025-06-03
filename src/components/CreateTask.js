import { useState } from 'react';
import axios from '../utils/axiosInstance';

export default function CreateTask({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      await axios.post('/tasks/', { title, description });
      setTitle('');
      setDescription('');
      onTaskCreated(); // refresh task list
    } catch (err) {
      alert("Failed to create task: " + err.response?.data?.detail);
    }
  };

  return (
    <div>
      <h3>Create a Task</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
} 