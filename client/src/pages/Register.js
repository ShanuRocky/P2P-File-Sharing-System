// client/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added confirm password state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { username, email, password });
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            alert(message);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Register</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Username"
                    className="form-input" // Apply the class for styling
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password" // Added confirm password input
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
