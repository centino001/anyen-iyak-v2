import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Grants from './pages/Grants';
import News from './pages/News';
import Mission from './pages/Mission';
import History from './pages/History';
import People from './pages/People';
import PersonDetail from './pages/PersonDetail';
import Financials from './pages/Financials';
import './index.css';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#003C71',
            dark: '#002548',
          },
          secondary: {
            main: '#E5E5E5',
          },
          text: {
            primary: mode === 'light' ? '#333333' : '#FFFFFF',
            secondary: mode === 'light' ? '#666666' : '#AAAAAA',
          },
          background: {
            default: mode === 'light' ? '#FFFFFF' : '#121212',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 700,
            fontSize: '3.5rem',
            '@media (max-width:600px)': {
              fontSize: '2.5rem',
            },
          },
          h4: {
            fontWeight: 700,
            fontSize: '2rem',
            '@media (max-width:600px)': {
              fontSize: '1.75rem',
            },
          },
          h5: {
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.4,
          },
          body1: {
            fontSize: '1.125rem',
            lineHeight: 1.6,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                padding: '0.75rem 1.5rem',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header onToggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />
          <main style={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/news" element={<News />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/history" element={<History />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<PersonDetail />} />
              <Route path="/financials" element={<Financials />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
