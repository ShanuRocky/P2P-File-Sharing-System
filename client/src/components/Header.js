// client/src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import '../styles.css';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const hideNavLinks = ['/login', '/register'];

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="/logo.png" alt="ShareSphere Logo" className="logo" />
                <h1 className="app-name">ShareSphere</h1>
            </div>
            {user && !hideNavLinks.includes(location.pathname) && (
                <nav className="nav-links">
                    <button onClick={handleLogout} className="logout-button" aria-label="Logout">
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
