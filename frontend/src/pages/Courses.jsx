import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, TextField, Select, MenuItem, 
    Drawer, IconButton, Paper, Divider, Grid
} from '@mui/material';
import { Add, Close, Circle } from '@mui/icons-material';
import api from '../api/axiosConfig';

const primaryColor = '#003366';

export default function Courses() {
    // --- STATE ---
    const [levels, setLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [errors, setErrors] = useState({});

    // Form State
    const initialFormState = { name: '', level_id: '', prerequisite_id: '' };
    const [formData, setFormData] = useState(initialFormState);

    // --- FETCH DATA ---
    useEffect(() => {
        fetchLevels();
        fetchCourses();
    }, []);

    const fetchLevels = async () => {
        try {
            const res = await api.get('/academic-levels/');
            setLevels(res.data);
        } catch (err) {
            console.error("Error fetching levels", err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses/');
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses", err);
        }
    };

    // --- LOGIC: BUILD THE PATHWAY CHAINS ---
    // This function takes all courses in a level and sorts them by their prerequisite chain
    // (e.g., Basic 1 -> Basic 2 -> Basic 3) so they render in a perfect vertical line.
    const getSortedChain = (levelId) => {
        const levelCourses = courses.filter(c => c.level_id === levelId);
        if (levelCourses.length === 0) return [];

        const sorted = [];
        // Find the "root" course (either it has no prerequisite, or its prerequisite is from a different level)
        let current = levelCourses.find(c => !c.prerequisite_id || !levelCourses.some(lc => lc.course_id === c.prerequisite_id));
        
        // Follow the chain
        while (current) {
            sorted.push(current);
            current = levelCourses.find(c => c.prerequisite_id === current.course_id);
        }
        
        // Append any orphans (failsafe just in case the chain is broken)
        levelCourses.forEach(c => {
            if (!sorted.includes(c)) sorted.push(c);
        });

        return sorted;
    };

    // --- FORM HANDLERS ---
    const handleOpenDrawer = (course = null) => {
        if (course) {
            setFormData({
                name: course.course_name,
                level_id: course.level_id,
                prerequisite_id: course.prerequisite_id || ''
            });
            setEditingCourse(course);
        } else {
            setFormData(initialFormState);
            setEditingCourse(null);
        }
        setErrors({});
        setDrawerOpen(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
    };

    const handleSave = async () => {
        try {
            if (editingCourse) {
                // Note: If you add an update_course procedure later, call it here.
                // For now, based on your package, we only have create_course.
                alert("Edit functionality requires backend update_course procedure.");
            } else {
                await api.post('/courses/', formData);
                setDrawerOpen(false);
                fetchCourses();
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setErrors({ name: true, message: 'This course name already exists.' });
            } else {
                alert("Error saving course");
            }
        }
    };

    return (
        <Box sx={{ pb: 5, minHeight: '80vh', bgcolor: '#F8FAFC', borderRadius: 3, p: 3 }}>
            {/* 1. TOP BAR */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                    Curriculum Pathway Map
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={() => handleOpenDrawer()}
                    sx={{ bgcolor: '#1E293B', '&:hover': { bgcolor: '#0F172A' }, px: 3, textTransform: 'none', borderRadius: 2 }}
                >
                    Add Course
                </Button>
            </Box>

            {/* 2. THE PATHWAY CANVAS (Lanes) */}
            <Box sx={{ display: 'flex', gap: 4, overflowX: 'auto', pb: 2 }}>
                {levels.map(level => {
                    const chain = getSortedChain(level.level_id);
                    
                    return (
                        <Box key={level.level_id} sx={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Lane Header */}
                            <Typography variant="subtitle1" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 4 }}>
                                {level.name}
                            </Typography>

                            {/* Lane Background & Nodes */}
                            <Box sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                position: 'relative'
                            }}>
                                {/* Very subtle vertical line representing the "Lane" */}
                                <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '2px', bgcolor: '#E2E8F0', zIndex: 0 }} />

                                {chain.map((course, index) => (
                                    <Box key={course.course_id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '100%' }}>
                                        
                                        {/* The Prerequisite Connecting Line (Drawn above everything except the first item) */}
                                        {index > 0 && (
                                            <Box sx={{ height: 30, width: '2px', bgcolor: primaryColor, opacity: 0.4 }} />
                                        )}

                                        {/* The Course Node (Pill) */}
                                        <Paper 
                                            elevation={0}
                                            onClick={() => handleOpenDrawer(course)}
                                            sx={{
                                                px: 3, py: 1.5,
                                                borderRadius: '50px', // Pill shape
                                                border: '1px solid #CBD5E1',
                                                bgcolor: '#FFFFFF',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                width: '80%',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    borderColor: primaryColor,
                                                    boxShadow: '0 4px 12px rgba(0,51,102,0.1)',
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                        >
                                            {/* Active Status Indicator (Green dot) */}
                                            <Circle sx={{ fontSize: 10, color: '#10B981' }} />
                                            <Typography fontWeight={600} color="text.primary">
                                                {course.course_name}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            {/* 3. SIDE DRAWER FORM */}
            <Drawer 
                anchor="right" 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h6" fontWeight={700}>
                            {editingCourse ? 'Course Details' : 'New Course'}
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Course Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                size="small"
                                placeholder="e.g. Basic 1"
                                error={errors.name}
                                helperText={errors.name ? errors.message : ''}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField 
                                select 
                                fullWidth 
                                label="Academic Level" 
                                name="level_id" 
                                value={formData.level_id} 
                                onChange={handleInputChange} 
                                size="small"
                            >
                                {levels.map(lvl => (
                                    <MenuItem key={lvl.level_id} value={lvl.level_id}>{lvl.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                select 
                                fullWidth 
                                label="Prerequisite" 
                                name="prerequisite_id" 
                                value={formData.prerequisite_id} 
                                onChange={handleInputChange} 
                                size="small"
                            >
                                <MenuItem value=""><em>None (Root Course)</em></MenuItem>
                                {courses.map(c => (
                                    <MenuItem key={c.course_id} value={c.course_id}>
                                        {c.course_name} ({c.level_name})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ bgcolor: primaryColor }} onClick={handleSave}>
                            Save Course
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}