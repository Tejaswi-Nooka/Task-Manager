import { useState } from 'react';
import axios from '../utils/axiosInstance';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        username,
        password
      });

      console.log('Registration response:', response);
      
      if (response.data) {
        alert("User registered successfully!");
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Registration failed';
      
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            id="username"
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
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
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
          Register
        </button>
      </form>
    </div>
  );
}

