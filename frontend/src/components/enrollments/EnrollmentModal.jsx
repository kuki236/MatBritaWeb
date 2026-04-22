import {
  Dialog, DialogTitle, DialogContent,
  Typography, Box, Button, TextField,
  Snackbar, Alert
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

export default function EnrollmentModal({ open, onClose, section }) {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [reload, setReload] = useState(false);

  // 🔥 NUEVO: estado para mensajes
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if (section && open) {
      fetchStudents();
    }
  }, [section, reload, open]);

  const fetchStudents = async () => {
    try {
      const res = await api.get(
        `/sections/${section.section_id}/eligible-students/`
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleEnroll = async (student_id) => {
    try {
      await api.post('/enrollments/', {
        student_id,
        section_id: section.section_id,
        user_id: 1
      });

      setMessage('Student enrolled successfully');
      setSeverity('success');
      setOpenSnack(true);

      setReload(prev => !prev);

    } catch (err) {
      const msg = err.response?.data?.error || "";

      if (msg.includes("Section is full")) {
        setMessage("No spaces available in this section");
      } 
      else if (msg.includes("prerequisite")) {
        setMessage("The student does not meet the requirement");
      } 
      else if (msg.includes("already enrolled")) {
        setMessage("The student is already enrolled");
      } 
      else {
        setMessage("Enrollment error");
      }

      setSeverity('error');
      setOpenSnack(true);
    }
  };

  const filtered = students.filter(s =>
    `${s.first_name} ${s.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

        <DialogTitle>
          Enroll Student - {section?.course_name}
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            size="small"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          {filtered.length === 0 ? (
            <Typography>No eligible students</Typography>
          ) : (
            filtered.map(s => (
              <Box
                key={s.student_id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#f1f5f9' }
                }}
              >
                <Typography>
                  {s.first_name} {s.last_name}
                </Typography>

                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleEnroll(s.student_id)}
                >
                  Enroll
                </Button>
              </Box>
            ))
          )}

        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}