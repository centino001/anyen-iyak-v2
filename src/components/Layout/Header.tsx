import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const logoSrc = '/logos/19.png';
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const menuItems = [
    { title: 'About', path: '/about' },
    { title: 'Mission', path: '/mission' },
    { title: 'People', path: '/people' },
    { title: 'Projects', path: '/programs' },
    { title: 'Open Calls', path: '/grants' },
    { title: 'News', path: '/news' },
    { title: 'Shop', path: '/shop' },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        padding: '0.5rem 2rem',
        gap: 2,
        minHeight: scrolled ? '60px' : '70px',
        transition: 'all 0.3s ease'
      }}>
        <Fade in timeout={800}>
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Box
              component="img"
              src={logoSrc}
              alt="Anyen Iyak Logo"
              sx={{ 
                height: scrolled ? '60px' : '80px',
                width: 'auto',
                maxWidth: scrolled ? '100px' : '120px',
                objectFit: 'contain',
                transition: 'all 0.3s ease'
              }}
            />
          </Link>
        </Fade>
        
        {/* Desktop Menu */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          gap: '2rem', 
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
          <Slide direction="down" in timeout={800}>
            <Box sx={{ display: 'flex', gap: '2rem' }}>
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="nav-link"
                  style={{
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    padding: '5px 0',
                    color: location.pathname === item.path ? 'var(--primary-color)' : theme.palette.text.primary,
                    borderBottom: location.pathname === item.path ? '2px solid var(--primary-color)' : 'none'
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
          </Slide>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
          sx={{ 
            display: { xs: 'flex', md: 'none' },
            ml: 'auto'
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        {mobileMenuAnchor && (
          <Box
            sx={{
              position: 'fixed',
              top: scrolled ? '60px' : '70px',
              left: 0,
              right: 0,
              backgroundColor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              zIndex: 1200,
              display: { xs: 'block', md: 'none' }
            }}
          >
            <Box sx={{ p: 2 }}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: location.pathname === item.path ? 'var(--primary-color)' : theme.palette.text.primary,
                    textDecoration: 'none',
                    borderLeft: location.pathname === item.path ? '3px solid var(--primary-color)' : 'none',
                    backgroundColor: location.pathname === item.path ? 'rgba(184, 134, 11, 0.1)' : 'transparent'
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 