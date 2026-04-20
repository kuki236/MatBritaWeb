import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import api from '../api/axiosConfig';

import SectionCard from '../components/enrollments/SectionCard';
import EnrollmentModal from '../components/enrollments/EnrollmentModal';
import EnrolledStudentsModal from '../components/enrollments/EnrolledStudentsModal';

export default function Enrollments() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const [enrollOpen, setEnrollOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const res = await api.get('/sections/');
    setSections(res.data);
  };

  const handleEnroll = (section) => {
    setSelectedSection(section);
    setEnrollOpen(true);
  };

  const handleView = (section) => {
    setSelectedSection(section);
    setViewOpen(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        {sections.map(sec => (
          <Grid item xs={12} md={4} key={sec.section_id}>
            <SectionCard
              section={sec}
              onEnroll={handleEnroll}
              onView={handleView}
            />
          </Grid>
        ))}
      </Grid>

      <EnrollmentModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        section={selectedSection}
      />

      <EnrolledStudentsModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        section={selectedSection}
      />
    </>
  );
}