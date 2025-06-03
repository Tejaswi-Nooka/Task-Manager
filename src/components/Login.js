import { useState } from 'react';
import axios from '../utils/axiosInstance';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      // Using URLSearchParams as FastAPI expects form data for login
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('Login response:', response);

      if (response.data?.access_token) {
        localStorage.setItem('token', response.data.access_token);
        setUsername('');
        setPassword('');
        onLogin();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed';
      
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map(error => error.msg).join(', ');
        } else {
          errorMessage = err.response.data.detail;
        }
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login-username">Username:</label>
          <input 
            id="login-username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              margin: '8px 0',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input 
            id="login-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              margin: '8px 0',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        {error && typeof error === 'string' && (
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
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
