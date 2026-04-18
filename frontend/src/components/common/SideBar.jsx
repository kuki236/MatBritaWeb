import React from 'react';
import { Box, Drawer, List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import School from '@mui/icons-material/School';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationLinks } from '../../config/navConfig'; 

const drawerWidth = 260;
const primaryColor = '#003366';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': { 
                    width: drawerWidth, 
                    boxSizing: 'border-box', 
                    borderRight: 'none', 
                    bgcolor: '#003366',
                    p: 2,
                },
            }}
            variant="permanent"
            anchor="left"
        >
            {/* MatBritánico Logo - Changed Typography and Icon to white */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5, px: 1, mt: 1 }}>
            <School sx={{ color: '#FFFFFF', fontSize: 32 }} />
            <Typography 
                    variant="h6" 
                    fontWeight={800} 
                    sx={{ letterSpacing: 0.5 ,
                        color:'#FFFFFF'
                    }}
                >
                    MatBritánico
                </Typography>
            </Box>
            
            {/* Links List */}
            <List>
                {navigationLinks.map((item, index) => {
                    const isActive = location.pathname.startsWith(item.link);

                    return (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton 
                                sx={{ 
                                    borderRadius: 2, 
                                    // Adjusted active/hover states for the dark background
                                    bgcolor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent', 
                                    color: '#FFFFFF', 
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } 
                                }}
                                onClick={() => navigate(item.link)}
                            >
                                <ListItemIcon sx={{ color: '#FFFFFF', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    slotProps={{
                                        primary: {
                                            sx: {
                                                fontWeight: isActive ? 700 : 500, 
                                                fontSize: '0.95rem',
                                                color: '#FFFFFF'
                                            }
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}