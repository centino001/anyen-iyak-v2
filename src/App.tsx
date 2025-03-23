import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import NewsManagement from './pages/Admin/NewsManagement';
import ProgramManagement from './pages/Admin/ProgramManagement';
import PeopleManagement from './pages/Admin/PeopleManagement';
import { AdminProvider } from './contexts/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

interface MainLayoutProps {
  onToggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onToggleTheme }) => {
  return (
    <div className="App">
      <Header onToggleTheme={onToggleTheme} />
      <main style={{ 
        minHeight: 'calc(100vh - 70px - 300px)',
        width: '100%'
      }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#B8860B',
          },
          secondary: {
            main: '#000000',
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#000000',
            paper: mode === 'light' ? '#ffffff' : '#000000',
          },
          text: {
            primary: mode === 'light' ? '#000000' : '#ffffff',
            secondary: mode === 'light' ? '#000000' : '#ffffff',
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#000000',
                color: mode === 'light' ? '#000000' : '#ffffff',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#000000',
                color: mode === 'light' ? '#000000' : '#ffffff',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                '&.MuiButton-containedPrimary': {
                  backgroundColor: '#B8860B',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#8B6914',
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <AdminProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="news" element={<NewsManagement />} />
              <Route path="programs" element={<ProgramManagement />} />
              <Route path="people" element={<PeopleManagement />} />
            </Route>

            {/* Public Routes */}
            <Route element={<MainLayout onToggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />}>
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
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
