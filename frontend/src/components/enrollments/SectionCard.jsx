import {
  Card, CardContent, Typography,
  Button, Chip, Stack
} from '@mui/material';

export default function SectionCard({ section, onEnroll, onView }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        transition: '0.25s',
        border: '1px solid #e2e8f0',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 1 }}>

        <Stack spacing={1.5}>

          {/* TITLE */}
          <Typography fontWeight={700} fontSize={17}>
            {section.course_name}
          </Typography>

          {/* INFO */}
          <Typography variant="body2" color="text.secondary">
            {section.schedule_desc}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {section.teacher_name}
          </Typography>

          {/* CHIP */}
          <Chip
            label={`${section.available_seats} seats`}
            size="small"
            sx={{
              width: 'fit-content',
              bgcolor: '#E0F2FE',
              color: '#0369A1',
              fontWeight: 600
            }}
          />

          {/* BOTONES */}
          <Stack direction="row" spacing={1} mt={1}>

            <Button
              fullWidth
              variant="contained"
              onClick={() => onEnroll(section)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1D4ED8' }
              }}
            >
              Enroll
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => onView(section)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: '#CBD5F5',
                color: '#1E293B',
                '&:hover': {
                  borderColor: '#94A3B8',
                  bgcolor: '#F8FAFC'
                }
              }}
            >
              View
            </Button>

          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
}