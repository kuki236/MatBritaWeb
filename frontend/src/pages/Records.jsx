import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Drawer,
  Chip,
  Divider
} from '@mui/material';

import {
  Search,
  Visibility,
  Close
} from '@mui/icons-material';

import api from '../api/axiosConfig';

export default function Records() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students/');
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async (student) => {
    try {
      const res = await api.get(`/students/${student.student_id}/history/`);
      setSelectedStudent(student);
      setHistory(res.data);
      setOpenDrawer(true);
    } catch (error) {
      console.error(error);
      alert('Error loading academic history');
    }
  };

  const filteredStudents = students.filter((s) => {
    const text =
      `${s.first_name} ${s.last_name} ${s.document_number} ${s.student_code}`
        .toLowerCase();

    return text.includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (status) => {
    if (status === 'APROBADO') return '#DCFCE7';
    if (status === 'REPROBADO') return '#FEE2E2';
    return '#E0F2FE';
  };

  const getStatusText = (status) => {
    if (status === 'APROBADO') return '#166534';
    if (status === 'REPROBADO') return '#991B1B';
    return '#0369A1';
  };

  return (
    <Box sx={{ pb: 5 }}>
      {/* TOP BAR */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Academic Records
        </Typography>

        <TextField
          size="small"
          placeholder="Search student..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ bgcolor: 'white', width: 320 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              )
            }
          }}
        />
      </Box>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #E2E8F0',
          borderRadius: 2
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Document</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredStudents.map((row) => (
              <TableRow key={row.student_id} hover>
                <TableCell sx={{ fontWeight: 500 }}>
                  {row.first_name} {row.last_name}
                </TableCell>

                <TableCell>{row.student_code}</TableCell>

                <TableCell>
                  {row.doc_type} - {row.document_number}
                </TableCell>

                <TableCell>{row.email}</TableCell>

                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => fetchHistory(row)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: { xs: '100vw', sm: 600 },
            p: 4
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Academic History
              </Typography>

              {selectedStudent && (
                <Typography color="text.secondary">
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </Typography>
              )}
            </Box>

            <IconButton onClick={() => setOpenDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* HISTORY TABLE */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: '1px solid #E2E8F0',
              borderRadius: 2
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Term</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Grade</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {item.enrollment_date?.slice(0, 10)}
                      </TableCell>

                      <TableCell>{item.term_name}</TableCell>

                      <TableCell>{item.level_name}</TableCell>

                      <TableCell>{item.course_name}</TableCell>

                      <TableCell>
                        {item.final_grade ?? '-'}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: getStatusColor(item.status),
                            color: getStatusText(item.status)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No academic history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
    </Box>
  );
}