import React, { useMemo } from 'react';
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
import Shop from './pages/Shop';
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

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 70px - 300px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#b8860b',
          },
          secondary: {
            main: '#9c27b0',
          },
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 4,
              },
            },
          },
        },
      }),
    []
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
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/news" element={<News />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/history" element={<History />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<PersonDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/financials" element={<Financials />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
