import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, TextField, Select, MenuItem, InputAdornment, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Chip, IconButton, Grid, Divider, Paper, Dialog, Drawer,
    DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { 
    Search, Add, Visibility, Edit, Delete, Close 
} from '@mui/icons-material';
import api from '../api/axiosConfig';

export default function Students() {
    // --- STATE ---
    const [students, setStudents] = useState([]);
    const [docTypes, setDocTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDocType, setFilterDocType] = useState('ALL');
    const [filterGender, setFilterGender] = useState('ALL');

    // Form Data & Errors
    const initialFormState = {
        student_code: '', doc_type_id: '', document_number: '',
        first_name: '', last_name: '', gender: '', birth_date: '',
        email: '', phone: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // --- FETCH DATA ---
    useEffect(() => {
        fetchDocTypes();
        fetchStudents();
    }, []);

    const fetchDocTypes = async () => {
        try {
            const res = await api.get('/document-types/');
            setDocTypes(res.data);
        } catch (error) {
            console.error("Error fetching document types", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await api.get('/students/');
            setStudents(res.data);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    // --- FORM HANDLERS ---
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name] || errors.duplicate) {
            setErrors({}); 
        }
    };

    const handleOpenForm = (student = null) => {
        if (student) {
            setFormData({
                student_code: student.student_code || '',
                doc_type_id: docTypes.find(d => d.abbreviation === student.doc_type)?.doc_type_id || '',
                document_number: student.document_number || '',
                first_name: student.first_name || '',
                last_name: student.last_name || '',
                gender: student.gender || '',
                birth_date: student.birth_date ? student.birth_date.split('T')[0] : '',
                email: student.email || '',
                phone: student.phone || ''
            });
            setEditingId(student.student_id);
        } else {
            setFormData(initialFormState);
            setEditingId(null);
        }
        setErrors({});
        setShowForm(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await api.put(`/students/${editingId}/`, formData);
            } else {
                await api.post('/students/', formData);
            }
            setShowForm(false);
            fetchStudents();
        } catch (error) {
            if (error.response?.status === 409 && error.response?.data?.code === 'DUP_VAL_ON_INDEX') {
                setErrors({
                    duplicate: true,
                    student_code: true,
                    document_number: true,
                    email: true,
                    message: 'Data already registered.'
                });
            } else {
                alert("Server Error while saving");
            }
        }
    };

    // --- DELETE HANDLERS ---
    const confirmDelete = (id) => {
        setStudentToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/students/${studentToDelete}/`);
            setDeleteModalOpen(false);
            fetchStudents();
        } catch (error) {
            alert(error.response?.data?.error || "Error deleting student");
        }
    };

    // --- FILTER LOGIC ---
    const filteredStudents = students.filter(s => {
        const matchesSearch = (s.first_name + s.last_name + s.document_number).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDoc = filterDocType === 'ALL' || s.doc_type === filterDocType;
        const matchesGender = filterGender === 'ALL' || s.gender === filterGender;
        return matchesSearch && matchesDoc && matchesGender;
    });

    return (
        <Box sx={{ pb: 5 }}>
            {/* 1. TOP BAR */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                    Student Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField 
                        size="small" 
                        placeholder="Search student..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
                            }
                        }}
                        sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                    <Button 
                        variant="contained" 
                        startIcon={<Add />}
                        onClick={() => handleOpenForm()}
                        sx={{ bgcolor: '#1E293B', '&:hover': { bgcolor: '#0F172A' }, px: 3, textTransform: 'none' }}
                    >
                        New Student
                    </Button>
                </Box>
            </Box>

            {/* 2. INLINE FILTERS */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Select
                    size="small"
                    value={filterDocType}
                    onChange={(e) => setFilterDocType(e.target.value)}
                    sx={{ bgcolor: 'white', minWidth: 150, '& fieldset': { borderColor: '#E2E8F0' } }}
                >
                    <MenuItem value="ALL">All Documents</MenuItem>
                    {docTypes.map(doc => (
                        <MenuItem key={doc.doc_type_id} value={doc.abbreviation}>{doc.name}</MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    sx={{ bgcolor: 'white', minWidth: 150, '& fieldset': { borderColor: '#E2E8F0' } }}
                >
                    <MenuItem value="ALL">All Genders</MenuItem>
                    <MenuItem value="M">Male (M)</MenuItem>
                    <MenuItem value="F">Female (F)</MenuItem>
                    <MenuItem value="O">Other (O)</MenuItem>
                </Select>
            </Box>

            {/* 3. MAIN TABLE (Checkboxes Removed) */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Document</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Contact</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((row) => (
                            <TableRow key={row.student_id} hover sx={{ '& td': { borderBottom: '1px solid #F1F5F9' } }}>
                                <TableCell sx={{ fontWeight: 500 }}>{row.first_name} {row.last_name}</TableCell>
                                <TableCell>{row.student_code}</TableCell>
                                <TableCell>{row.doc_type} - {row.document_number}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={row.gender} 
                                        size="small" 
                                        sx={{ 
                                            fontWeight: 600,
                                            bgcolor: row.gender === 'M' ? '#E0F2FE' : row.gender === 'F' ? '#FCE7F3' : '#F1F5F9',
                                            color: row.gender === 'M' ? '#0369A1' : row.gender === 'F' ? '#BE185D' : '#475569'
                                        }} 
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.email}</Typography>
                                    <Typography variant="caption" color="text.secondary">{row.phone}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" color="primary" title="View Record"><Visibility fontSize="small"/></IconButton>
                                    <IconButton size="small" onClick={() => handleOpenForm(row)} title="Edit"><Edit fontSize="small"/></IconButton>
                                    <IconButton size="small" color="error" onClick={() => confirmDelete(row.student_id)} title="Delete"><Delete fontSize="small"/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

{/* 4. SIDE DRAWER FORM */}
            <Drawer 
                anchor="right" 
                open={showForm} 
                onClose={() => setShowForm(false)}
            >
                <Box sx={{ width: { xs: '100vw', sm: 450 }, p: 4, height: '100%', overflowY: 'auto' }}>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h6" fontWeight={700}>
                            {editingId ? 'Edit Student' : 'Student Registration'}
                        </Typography>
                        <IconButton onClick={() => setShowForm(false)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Block 1: Identification */}
                    <Typography variant="subtitle2" color="primary" mb={2}>Identification</Typography>
                    <Grid container spacing={2.5} mb={4}>
                        <Grid xs={12}>
                            <TextField select fullWidth label="Document Type" name="doc_type_id" value={formData.doc_type_id} onChange={handleInputChange} size="small">
                                {docTypes.map(doc => <MenuItem key={doc.doc_type_id} value={doc.doc_type_id}>{doc.name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid  xs={12}>
                            <TextField fullWidth label="Document Number" name="document_number" value={formData.document_number} onChange={handleInputChange} size="small" 
                                error={errors.document_number} helperText={errors.document_number ? errors.message : ''} />
                        </Grid>
                        <Grid  xs={12}>
                            <TextField fullWidth label="Institutional Code (Optional)" name="student_code" value={formData.student_code} onChange={handleInputChange} size="small" 
                                error={errors.student_code} helperText={errors.student_code ? errors.message : ''} disabled={!!editingId} 
                                placeholder={!editingId ? "Autogenerated upon saving" : ""} 
                                slotProps={{
                                    inputLabel: !editingId ? { shrink: true } : {}
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />

                    {/* Block 2: Personal Data */}
                    <Typography variant="subtitle2" color="primary" mb={2}>Personal Data</Typography>
                    <Grid container spacing={2.5} mb={4}>
                        {/* First and Last name share a row because they fit perfectly */}
                        <Grid  xs={12} sm={6}>
                            <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} size="small" />
                        </Grid>
                        <Grid  xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleInputChange} size="small" />
                        </Grid>
                        
                        {/* Birth Date and Gender get their own full-width rows to prevent squishing */}
                        <Grid xs={12}>
                            <TextField fullWidth type="date" label="Birth Date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} size="small" disabled={!!editingId}
                                slotProps={{
                                    inputLabel: { shrink: true }
                                }} 
                            />                        
                        </Grid>
                        <Grid  xs={12}>
                            <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} size="small" disabled={!!editingId}>
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                                <MenuItem value="O">Other</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />

                    {/* Block 3: Contact */}
                    <Typography variant="subtitle2" color="primary" mb={2}>Contact Information</Typography>
                    <Grid container spacing={2.5} mb={5}>
                        <Grid  xs={12}>
                            <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleInputChange} size="small" 
                                error={errors.email} helperText={errors.email ? errors.message : ''} />
                        </Grid>
                        <Grid  xs={12}>
                            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} size="small" />
                        </Grid>
                    </Grid>

                    {/* Form Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pb: 4 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ bgcolor: '#1E293B', '&:hover': { bgcolor: '#0F172A' } }} onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            {/* DELETE CONFIRMATION MODAL */}
            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this student? This action cannot be undone and will fail if the student has academic records.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}