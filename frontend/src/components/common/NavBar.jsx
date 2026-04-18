import React, { useState } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationLinks } from '../../config/navConfig';

const primaryColor = '#003366';

export default function Navbar({ username }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Identify dynamic title based on current route
    const currentNav = navigationLinks.find(nav => location.pathname.startsWith(nav.link));
    const viewTitle = currentNav ? currentNav.text : 'Main Dashboard';

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 1 }}>
            {/* Left Side: Dynamic Title */}
            <Typography variant="h5" fontWeight={800} color="text.primary">
                {viewTitle}
            </Typography>

            {/* Right Side: Generic Avatar and Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {username || 'Administrator'}
                </Typography>
                
                <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                    <Avatar sx={{ bgcolor: primaryColor, width: 40, height: 40 }}>
                        <Person /> {/* Standard icon, no initials */}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{ 
                            paper: {
                                elevation: 3,
                                sx: { mt: 1.5, minWidth: 200, borderRadius: 2 }
                            }
                        }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><Logout fontSize="small" sx={{ color: '#d32f2f' }} /></ListItemIcon>
                        <Typography color="error">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}