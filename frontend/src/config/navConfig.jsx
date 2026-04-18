import People from '@mui/icons-material/People';
import AccountTree from '@mui/icons-material/AccountTree';
import MeetingRoom from '@mui/icons-material/MeetingRoom';
import EventNote from '@mui/icons-material/EventNote';
import AssignmentInd from '@mui/icons-material/AssignmentInd';

export const navigationLinks = [
    { text: 'Students', link: '/students', icon: <People /> },
    { text: 'Academic Levels', link: '/academic-levels', icon: <AccountTree /> },
    { text: 'Section Management', link: '/sections', icon: <MeetingRoom /> },
    { text: 'Enrollments', link: '/enrollments', icon: <EventNote /> },
    { text: 'Academic Records', link: '/records', icon: <AssignmentInd /> }
];