import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomeComponent.css'; 

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="welcome-text">
        <h1>Welcome to Our INS LAB PVT LTD</h1>
      </div>
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default HomeComponent;
