'use client';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00e5a0' },
    secondary: { main: '#00b37a' },
    background: { default: '#050d0a', paper: '#0d1f1a' },
    text: { primary: '#ffffff', secondary: '#a0b0a8' },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '50px' },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}
