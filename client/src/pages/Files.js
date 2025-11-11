// client/src/pages/Files.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link
import '../styles.css';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Please login first');
                    return;
                }
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/files`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFiles(res.data);
            } catch (error) {
                console.error('Error fetching files:', error);
                alert('Failed to fetch files');
            }
        };
        fetchFiles();
    }, [user]);

    const handleDownload = async (id, originalName) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/files/download/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', originalName);
            document.body.appendChild(link);
            link.click();
            link.remove(); // Clean up
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            alert('Please enter a search query.');
            return;
        }
        try {
            setIsSearching(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/files/search?query=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFiles(res.data);
            setIsSearching(false);
        } catch (error) {
            console.error('Error searching files:', error);
            alert('Failed to search files');
            setIsSearching(false);
        }
    };

    const handleClearSearch = async () => {
        setSearchQuery('');
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/files`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFiles(res.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            alert('Failed to fetch files');
        }
    };

    return (
        <div className="container files-container">
            <h2>Shared Files</h2>
            
            {/* Back Button */}
            <Link to="/dashboard">
                <button className="back-button">← Back to Dashboard</button>
            </Link>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search by name, type, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
                {isSearching === false && searchQuery.trim() !== '' && (
                    <button type="button" onClick={handleClearSearch} className="clear-button">
                        Clear Search
                    </button>
                )}
            </form>

            {/* Display Files in Reverse Order */}
            {files.length === 0 ? (
                <p>No files available.</p>
            ) : (
                <ul className="file-list">
                    {files.slice().reverse().map(file => (  // Reverse the array here
                        <li key={file._id} className="file-item">
                            <div className="file-details">
                                <strong>{file.originalName}</strong> <br />
                                <span>{file.description}</span> <br />
                                <span>Category: {file.category}</span> <br />
                                <span>Uploaded by: {file.uploadedBy.username}</span> <br />
                                
                                {/* Display Shared With and Sent At Details */}
                                {file.sharedWith && file.sharedWith.length > 0 && (
                                    <div className="shared-with">
                                        <strong>Shared With:</strong>
                                        <ul>
                                            {file.sharedWith.map((sw, index) => (
                                                <li key={index}>
                                                    {sw.user.username} <br />
                                                    <small>Sent at: {new Date(sw.sentAt).toLocaleString()}</small>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => handleDownload(file._id, file.originalName)} className="button">Download</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Files;
