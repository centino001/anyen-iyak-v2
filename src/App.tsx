import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Mission from './pages/Mission';
import History from './pages/History';
import People from './pages/People';
import PersonDetail from './pages/PersonDetail';
import Shop from './pages/Shop';
import Membership from './pages/Membership';
import Financials from './pages/Financials';
import Donate from './pages/Donate';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import NewsManagement from './pages/Admin/NewsManagement';
import ProgramManagement from './pages/Admin/ProgramManagement';
import PeopleManagement from './pages/Admin/PeopleManagement';
import SubscriberManagement from './pages/Admin/SubscriberManagement';
import { AdminProvider } from './contexts/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import ProgramDetail from './pages/ProgramDetail';

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
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
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
          <ScrollToTop />
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
              <Route path="subscribers" element={<SubscriberManagement />} />
            </Route>

            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/history" element={<History />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:slug" element={<PersonDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/financials" element={<Financials />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
