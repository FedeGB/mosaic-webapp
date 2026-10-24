import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

const theme = createTheme({
  palette: {
    primary: { main: '#7b5b28', dark: '#513b1d', light: '#b9995c' },
    secondary: { main: '#4f6c58' },
    error: { main: '#9e3b32' },
    background: { default: '#e8dfcb', paper: '#f8f3e8' },
    text: { primary: '#2d2a24', secondary: '#6d6559' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: { fontWeight: 700, letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename='/mosaic-webapp/'>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
