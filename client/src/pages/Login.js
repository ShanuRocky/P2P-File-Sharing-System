// client/src/pages/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { username, password });
            const token = res.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id });
            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            alert(message);
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Login</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button">Login</button>
            </form>
            <p className="form-footer">
                Don't have an account? <Link to="/register" className="form-link">Register as a new user</Link>
            </p>
        </div>
    );
};

export default Login;
