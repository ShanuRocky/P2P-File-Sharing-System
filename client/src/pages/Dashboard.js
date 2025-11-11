import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import uploadIcon from '../assets/Upload.png'; // Adjust the path as needed
import showIcon from '../assets/show.png';     // Adjust the path as needed
import '../styles.css';                        // Import your CSS

const Dashboard = () => {

  return (
    <div className="dashboard container">
      <h1>Welcome to ShareSphere</h1>
      <div className="dashboard-options">
        <Link to="/upload" className="dashboard-button">
          <img src={uploadIcon} alt="Upload File Icon" className="button-icon" />
          Upload File
        </Link>
        <Link to="/files" className="dashboard-button">
          <img src={showIcon} alt="View Shared Files Icon" className="button-icon" />
          View Shared Files
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;
