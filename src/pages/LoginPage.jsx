import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('hasVisitedLogin', 'true'); 
    window.dispatchEvent(new Event('authChange'));
    navigate('/products');
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 5 },
          mt: { xs: 4, sm: 8 },
          borderRadius: 4,
          boxShadow: '0px 8px 32px 0px rgba(56, 142, 60, 0.10)',
          background: (theme) => theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #fff 80%, #f9fbe7 100%)'
            : 'linear-gradient(135deg, #23272F 80%, #181A20 100%)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              background: (theme) => theme.palette.mode === 'light' ? '#fff' : '#23272F',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(56,142,60,0.10)',
              mb: 1.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                fontWeight: 900,
                fontSize: 28,
                fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif',
                letterSpacing: 1.5,
                userSelect: 'none',
              }}
            >
              E
            </Typography>
          </Box>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1.2, color: 'primary.main' }}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary', mb: 1 }}>
            Sign in to your E-Shop account
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3, mb: 2, py: 1.3,
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: 3,
              background: 'linear-gradient(90deg, #388e3c 80%, #FFC107 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(56,142,60,0.08)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2e7d32 80%, #FFA000 100%)',
                boxShadow: '0 6px 16px rgba(255,193,7,0.10)',
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;