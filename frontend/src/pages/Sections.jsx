import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, TextField, Select, MenuItem, 
    Drawer, IconButton, Grid 
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/axiosConfig';

const localizer = momentLocalizer(moment);
const primaryColor = '#003366';

export default function Sections() {
    // --- STATE ---
    const [sections, setSections] = useState([]);
    const [catalogs, setCatalogs] = useState({ courses: [], terms: [], teachers: [], schedules: [], classrooms: [] });
    
    // Filters (Context Bar)
    const [filterTerm, setFilterTerm] = useState('ALL');
    const [filterClassroom, setFilterClassroom] = useState('ALL');

    // Drawer Form State
    const [drawerOpen, setDrawerOpen] = useState(false);
    const initialFormState = { course_id: '', term_id: '', teacher_id: '', schedule_id: '', classroom_id: '', total_capacity: '' };
    const [formData, setFormData] = useState(initialFormState);

    // --- FETCH DATA ---
    useEffect(() => {
        fetchCatalogs();
        fetchSections();
    }, []);

    const fetchCatalogs = async () => {
        try {
            const res = await api.get('/section-form-data/');
            setCatalogs(res.data);
            if (res.data.terms.length > 0) {
                setFilterTerm(res.data.terms[0].term_id); // Default to the latest term
            }
        } catch (err) {
            console.error("Error fetching catalogs", err);
        }
    };

    const fetchSections = async () => {
        try {
            const res = await api.get('/sections/');
            setSections(res.data);
        } catch (err) {
            console.error("Error fetching sections", err);
        }
    };

    // --- PARSE TIMES AND BUILD CALENDAR EVENTS ---
    const getCalendarEvents = () => {
        let events = [];

        // Apply context bar filters
        const filteredSections = sections.filter(s => 
            (filterTerm === 'ALL' || s.term_id === filterTerm) && 
            (filterClassroom === 'ALL' || s.classroom_id === filterClassroom)
        );

        filteredSections.forEach(section => {
            // Find the schedule for this section to get the times and days
            const schedule = catalogs.schedules.find(sch => sch.schedule_id === section.schedule_id);
            
            if (schedule && schedule.days_of_week) {
                // Convert '1,3,5' into [1, 3, 5]
                const days = schedule.days_of_week.split(',').map(Number);
                
                // Parse '07:00 AM' into Moment time objects
                const startTime = moment(schedule.start_time, 'hh:mm A');
                const endTime = moment(schedule.end_time, 'hh:mm A');

                days.forEach(dayIndex => {
                    // Create exact JS Dates for the calendar grid based on the current week
                    const eventStart = moment().day(dayIndex).hour(startTime.hour()).minute(startTime.minute()).toDate();
                    const eventEnd = moment().day(dayIndex).hour(endTime.hour()).minute(endTime.minute()).toDate();

                    events.push({
                        title: `${section.course_name} (${section.classroom_name})`,
                        start: eventStart,
                        end: eventEnd,
                        resource: section,
                        teacher: section.teacher_name,
                        capacity: `${section.available_seats} / ${section.total_capacity}`
                    });
                });
            }
        });
        return events;
    };

    // --- EVENT HANDLERS ---
    const handleSelectSlot = (slotInfo) => {
        setFormData({
            ...initialFormState,
            term_id: filterTerm !== 'ALL' ? filterTerm : '',
            classroom_id: filterClassroom !== 'ALL' ? filterClassroom : '',
        });
        setDrawerOpen(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await api.post('/sections/', formData);
            setDrawerOpen(false);
            fetchSections(); // Refresh the calendar to show the new block
        } catch (error) {
            alert("Error saving section.");
        }
    };

    // --- CUSTOM CALENDAR STYLING ---
    const eventPropGetter = (event) => {
        return {
            style: {
                backgroundColor: '#F8FAFC', // Very light gray/white
                border: 'none',
                borderLeft: `4px solid ${primaryColor}`, // The corporate left line
                color: '#1E293B',
                borderRadius: '4px',
                fontSize: '0.75rem',
                padding: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }
        };
    };

    // Custom component to format the text inside the blocks beautifully
    const EventComponent = ({ event }) => (
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>{event.title}</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#475569' }}>{event.teacher}</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#10B981', fontWeight: 600 }}>Seats: {event.capacity}</Typography>
        </Box>
    );

    return (
        <Box sx={{ pb: 5, height: '85vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* 1. CONTEXT BAR */}
            <Box sx={{ display: 'flex', gap: 3, mb: 3, bgcolor: '#FFFFFF', p: 2, borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>ACADEMIC TERM</Typography>
                    <Select size="small" fullWidth value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} sx={{ mt: 0.5 }}>
                        <MenuItem value="ALL">All Terms</MenuItem>
                        {catalogs.terms.map(t => <MenuItem key={t.term_id} value={t.term_id}>{t.name}</MenuItem>)}
                    </Select>
                </Box>
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>CLASSROOM / LOCATION</Typography>
                    <Select size="small" fullWidth value={filterClassroom} onChange={(e) => setFilterClassroom(e.target.value)} sx={{ mt: 0.5 }}>
                        <MenuItem value="ALL">All Classrooms</MenuItem>
                        {catalogs.classrooms.map(c => <MenuItem key={c.classroom_id} value={c.classroom_id}>{c.name}</MenuItem>)}
                    </Select>
                </Box>
            </Box>

            {/* 2. THE INTERACTIVE WORKSPACE */}
            <Box sx={{ flex: 1, bgcolor: '#FFFFFF', p: 2, borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Calendar
                    localizer={localizer}
                    events={getCalendarEvents()}
                    defaultView="work_week"
                    views={['work_week', 'day']}
                    min={new Date(2026, 1, 1, 6, 0, 0)} // Grid starts at 6:00 AM
                    max={new Date(2026, 1, 1, 22, 0, 0)} // Grid ends at 10:00 PM
                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    eventPropGetter={eventPropGetter}
                    components={{ event: EventComponent }} // Uses our custom typography
                    toolbar={false} 
                    formats={{ dayFormat: 'dddd' }} 
                />
            </Box>

            {/* 3. SLIDING DRAWER FORM */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h6" fontWeight={700}>Open New Section</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid xs={12}>
                            <TextField select fullWidth label="Course" name="course_id" value={formData.course_id} onChange={handleInputChange} size="small">
                                {catalogs.courses.map(c => <MenuItem key={c.course_id} value={c.course_id}>{c.name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        
                        <Grid xs={12}>
                            <TextField select fullWidth label="Teacher" name="teacher_id" value={formData.teacher_id} onChange={handleInputChange} size="small">
                                {catalogs.teachers.map(t => <MenuItem key={t.teacher_id} value={t.teacher_id}>{t.first_name} {t.last_name}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid  xs={12} sm={6}>
                            <TextField select fullWidth label="Classroom" name="classroom_id" value={formData.classroom_id} onChange={handleInputChange} size="small">
                                {catalogs.classrooms.map(c => <MenuItem key={c.classroom_id} value={c.classroom_id}>{c.name}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid  xs={12} sm={6}>
                            <TextField type="number" fullWidth label="Capacity" name="total_capacity" value={formData.total_capacity} onChange={handleInputChange} size="small" />
                        </Grid>

                        <Grid  xs={12}>
                            <TextField select fullWidth label="Schedule Map" name="schedule_id" value={formData.schedule_id} onChange={handleInputChange} size="small">
                                {catalogs.schedules.map(s => (
                                    <MenuItem key={s.schedule_id} value={s.schedule_id}>
                                        {s.description} ({s.start_time} - {s.end_time})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                        <Button variant="contained" sx={{ bgcolor: primaryColor }} onClick={handleSave}>Aperturar Sección</Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}