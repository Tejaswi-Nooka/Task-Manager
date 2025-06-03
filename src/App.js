import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <h2>Task Manager</h2>
        <div className="auth-container">
          <div className="auth-form">
            <Register />
          </div>
          <div className="auth-form">
            <Login onLogin={() => setIsLoggedIn(true)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <button className="logout" onClick={logout}>Logout</button>
      <div className="create-task-form">
        <CreateTask onTaskCreated={() => window.location.reload()} />
      </div>
      <TaskList />
    </div>
  );
}

export default App;
