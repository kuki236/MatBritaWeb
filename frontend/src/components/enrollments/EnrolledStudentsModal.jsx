import {
  Dialog, DialogTitle, DialogContent,
  Typography, Box, Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

export default function EnrolledStudentsModal({ open, onClose, section }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (section) fetchStudents();
  }, [section]);

  const fetchStudents = async () => {
    const res = await api.get(`/sections/${section.section_id}/enrolled-students/`);
    setStudents(res.data);
  };

  const handleDelete = async (student_id) => {
    await api.delete(`/enrollments/${section.section_id}/${student_id}/`);
    fetchStudents();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>
        Enrolled Students - {section?.course_name}
      </DialogTitle>

      <DialogContent>

        {students.length === 0 ? (
          <Typography>No students enrolled</Typography>
        ) : (
          students.map(s => (
            <Box key={s.student_id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
              sx={{
                p: 1,
                borderRadius: 2,
                '&:hover': { bgcolor: '#fef2f2' }
              }}
            >
              <Typography>
                {s.first_name} {s.last_name}
              </Typography>

              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => handleDelete(s.student_id)}
              >
                Remove
              </Button>
            </Box>
          ))
        )}

      </DialogContent>
    </Dialog>
  );
}