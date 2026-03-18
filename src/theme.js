import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#09090b',
      paper: '#18181b',
    },
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#a1a1aa',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#ffffff',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#a1a1aa',
    },
    divider: '#27272a',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: 28,
      fontWeight: 700,
      color: '#e5e7eb',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,
      color: '#e5e7eb',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 16,
      fontWeight: 600,
      color: '#e5e7eb',
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#18181b',
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #27272a',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)',
          },
        },
        outlined: {
          borderColor: '#27272a',
          color: '#e5e7eb',
          '&:hover': {
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#27272a',
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          color: '#a1a1aa',
          backgroundColor: '#09090b',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#09090b',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#27272a',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#52525b',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#09090b',
          borderRight: '1px solid #27272a',
        }
      }
    }
  },
});
