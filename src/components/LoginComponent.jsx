import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../css/LoginComponent.css'; 

const LoginComponent = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please fill in both username and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.token);
        toast.success('Login successful!', {
          onClose: () => {
            setTimeout(() => {
              navigate('/employee');
            }, 500); 
          }
        });
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default LoginComponent;
