import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SectionFilter({ value, onChange }) {
  return (
    <TextField
      size="small"
      placeholder="Search course..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ bgcolor: 'white', borderRadius: 1, mb: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        )
      }}
    />
  );
}