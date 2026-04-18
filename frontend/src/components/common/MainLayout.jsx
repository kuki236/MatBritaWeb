import React, { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

export default function MainLayout({ children }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Validate token existence; if not found, kick back to login
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [navigate]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FA' }}>
            <CssBaseline />
            
            <Sidebar />

            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    p: 4, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    overflowX: 'hidden'
                }}
            >
                <Navbar username={username} />
                
                {/* Child components (e.g., specific pages/forms) will be injected here */}
                <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', minHeight: '80vh' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}