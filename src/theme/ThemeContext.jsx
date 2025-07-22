import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ColorModeContext from './ColorModeContext';

const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'light' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode
                primary: {
                  main: '#035607ff',
                  light: '#4CAF50',
                  dark: '#1B5E20',
                  contrastText: '#FFFFFF',
                },
                secondary: {
                  main: '#FF5722',
                  light: '#FF8A65',
                  dark: '#E64A19',
                  contrastText: '#FFFFFF',
                },
                background: {
                  default: '#f7f7f7f4',
                  paper: '#FFFFFF',
                },
                text: {
                  primary: '#212121',
                  secondary: '#757575',
                },
              }
            : {
                // Dark mode
                primary: {
                  main: '#2E7D32',
                  light: '#4CAF50',
                  dark: '#1B5E20',
                  contrastText: '#FFFFFF',
                },
                secondary: {
                  main: '#FF7043',
                  light: '#FFAB91',
                  dark: '#E64A19',
                  contrastText: '#FFFFFF',
                },
                background: {
                  default: '#121212',
                  paper: '#1E1E1E',
                },
                text: {
                  primary: '#FFFFFF',
                  secondary: '#B0B0B0',
                },
              }),
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                },
              },
              contained: {
                '&:hover': {
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: 12,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor:"#3d3d29"
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWrapper;