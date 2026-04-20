import {
  Dialog, DialogTitle, DialogContent,
  Typography, Box, Button, TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

export default function EnrollmentModal({ open, onClose, section }) {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [reload, setReload] = useState(false); // 🔥 clave

  // 🔁 se ejecuta cuando abres modal o cambias reload
  useEffect(() => {
    if (section && open) {
      fetchStudents();
    }
  }, [section, reload, open]);

  // 🔄 traer estudiantes elegibles
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

  // ✅ matricular estudiante
  const handleEnroll = async (student_id) => {
    try {
      await api.post('/enrollments/', {
        student_id,
        section_id: section.section_id,
        user_id: 1
      });

      // 🔥 FORZAR REFRESH
      setReload(prev => !prev);

    } catch (err) {
      console.log("ERROR COMPLETO:", err);
      console.log("DATA:", err.response?.data);
      alert(err.response?.data?.error || "Error enrolling student");
    }
  };

  // 🔍 filtro por nombre
  const filtered = students.filter(s =>
    `${s.first_name} ${s.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>
        Enroll Student - {section?.course_name}
      </DialogTitle>

      <DialogContent>

        {/* BUSCADOR */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* LISTA */}
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
  );
}