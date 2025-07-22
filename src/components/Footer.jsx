import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: '100%',
      py: 3,
      mt: 6,
      background: (theme) =>
        theme.palette.mode === 'light'
          ? 'linear-gradient(90deg, #f9fbe7 80%, #e8f5e9 100%)'
          : 'linear-gradient(90deg, #23272F 80%, #181A20 100%)',
      textAlign: 'center',
      color: 'text.secondary',
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: 0.5,
      boxShadow: '0 -2px 8px rgba(56,142,60,0.04)',
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} E-Shop. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
