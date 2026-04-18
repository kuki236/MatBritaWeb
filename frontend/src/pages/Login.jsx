import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import { 
  Button, 
  TextField, 
  Paper, 
  Box, 
  Typography, 
  InputAdornment, 
  IconButton,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputLabel
} from '@mui/material';
import { Visibility, VisibilityOff, Person, LockOutlined, School } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: { main: '#003366' },
    background: { default: '#F2F4F7' },
  },
  typography: {
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { 
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px',
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login/', {
        username: username,
        password: password
      });

        const { access, user } = response.data;
        const role = user.role;

        localStorage.setItem('token', access);
        localStorage.setItem('role', role);

      switch (role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'RECEPTIONIST':
          navigate('/recepcion');
          break;
        default:
          setError("Unauthorized role.");
      }

    } catch (err) {
      setError('Invalid credentials or inactive user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ 
          minHeight: '100vh',
          width: '100vw',        
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 2 
      }}>
        
        <Paper elevation={4} sx={{ 
            display: 'flex', 
            width: '100%', 
            maxWidth: 1000, 
            mx: 'auto',          
            height: { xs: 'auto', md: 600 },
            overflow: 'hidden' 
        }}>
          
          <Box sx={{ 
              flex: 1, 
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 6, 
              backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1683749809617-bb6885a1e7ae?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
          }}>
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0, 51, 102, 0.7)' }} />
            
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 2, letterSpacing: 1 }}>
                    <School sx={{ fontSize: 40 }} /> 
                    MatBritánico
                </Typography>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, lineHeight: 1.2 }}>
                  Academic Management Excellence.
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 2, opacity: 0.9, fontWeight: 400 }}>
                  Manage enrollments, catalogs, and sections efficiently and intuitively.
                </Typography>
            </Box>
          </Box>

          <Box sx={{ 
              flex: 1, 
              p: { xs: 4, md: 6 }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              bgcolor: 'white' 
          }}>
            <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
              
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A1A', mb: 1 }}>
                Welcome
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                Enter your credentials to access the system.
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

              <form onSubmit={handleLogin}>
                
                <Box sx={{ mb: 3 }}>
                    <InputLabel sx={{ mb: 1, fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>
                        Username
                    </InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: '#9CA3AF' }} />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <InputLabel sx={{ mb: 1, fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>
                        Password
                    </InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined sx={{ color: '#9CA3AF' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ bgcolor: '#003366', fontSize: '1.1rem', py: 1.5, '&:hover': { bgcolor: '#002244' } }}
                >
                    {loading ? 'Validating...' : 'Log In'}
                </Button>

              </form>

            </Box>
          </Box>

        </Paper>
      </Box>
    </ThemeProvider>
  );
}