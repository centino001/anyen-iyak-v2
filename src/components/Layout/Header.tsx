import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, Container, Menu, MenuItem, IconButton, Popper, Paper, ClickAwayListener, MenuList, Grow, useTheme, Stack, Typography, Fade, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme }) => {
  const theme = useTheme();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [insideAifacAnchor, setInsideAifacAnchor] = useState<null | HTMLElement>(null);
  const logoSrc = theme.palette.mode === 'dark' ? '/logos/19.png' : '/logos/18.png';
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

  const handleInsideAifacOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInsideAifacAnchor(event.currentTarget);
  };

  const handleInsideAifacClose = () => {
    setInsideAifacAnchor(null);
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    if (theme.palette.mode !== mode) {
      onToggleTheme();
    }
  };

  const insideAifacItems = [
    { title: 'Mission', path: '/mission' },
    // { title: 'History', path: '/history' },
    { title: 'People', path: '/people' },
    // { title: 'Financials', path: '/financials' },
    { title: 'News', path: '/news' },
    // { title: 'Events', path: '/events' },
  ];

  const menuItems = [
    { title: 'About', path: '/about' },
    { title: 'Programs', path: '/programs' },
    // { title: 'Grants', path: '/grants' },
  ];

  const ThemeButtons = () => (
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center" 
      sx={{ 
        p: 0.5
      }}
    >
      <Button
        onClick={() => handleThemeChange('light')}
        startIcon={<LightModeIcon />}
        sx={{
          color: theme.palette.mode === 'light' ? 'secondary.main' : 'text.secondary',
          textTransform: 'none',
          minWidth: 'auto',
          px: 1,
          '&:hover': { bgcolor: 'transparent' },
          cursor: theme.palette.mode === 'light' ? 'default' : 'pointer'
        }}
      >
        Light
      </Button>
      <Button
        onClick={() => handleThemeChange('dark')}
        startIcon={<DarkModeIcon />}
        sx={{
          color: theme.palette.mode === 'dark' ? 'secondary.main' : 'text.secondary',
          textTransform: 'none',
          minWidth: 'auto',
          px: 1,
          '&:hover': { bgcolor: 'transparent' },
          cursor: theme.palette.mode === 'dark' ? 'default' : 'pointer'
        }}
      >
        Dark
      </Button>
    </Stack>
  );

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
                height: scrolled ? '50px' : '60px',
                width: 'auto',
                maxWidth: scrolled ? '70px' : '80px',
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
                    padding: '5px 0'
                  }}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Inside Aifac Dropdown */}
              <Box>
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleInsideAifacOpen}
                  sx={{ 
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Inside Aifac
                </Button>
                <Popper
                  open={Boolean(insideAifacAnchor)}
                  anchorEl={insideAifacAnchor}
                  placement="bottom-start"
                  transition
                  sx={{ zIndex: 1300 }}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper sx={{ 
                        mt: 1, 
                        minWidth: 200,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        overflow: 'hidden'
                      }}>
                        <ClickAwayListener onClickAway={handleInsideAifacClose}>
                          <MenuList>
                            {insideAifacItems.map((item, index) => (
                              <MenuItem 
                                key={item.path}
                                onClick={handleInsideAifacClose}
                                component={Link}
                                to={item.path}
                                sx={{ 
                                  color: theme.palette.text.primary,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    backgroundColor: theme.palette.mode === 'light' 
                                      ? 'rgba(184, 134, 11, 0.05)' 
                                      : 'rgba(184, 134, 11, 0.15)',
                                    paddingLeft: '24px'
                                  }
                                }}
                              >
                                {item.title}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            </Box>
          </Slide>
        </Box>

        {/* Theme Toggle - Desktop */}
        <Fade in timeout={1000}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 'auto' }}>
            <ThemeButtons />
          </Box>
        </Fade>

        {/* Mobile Menu */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          gap: 1,
          ml: 'auto'
        }}>
          <Fade in timeout={1000}>
            <Box>
              <ThemeButtons />
            </Box>
          </Fade>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(10deg)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '300px',
                mt: 1,
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                animation: 'fadeIn 0.3s ease'
              },
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(-10px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            {menuItems.map((item) => (
              <MenuItem 
                key={item.path} 
                onClick={handleMobileMenuClose}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(184, 134, 11, 0.05)' 
                      : 'rgba(184, 134, 11, 0.15)',
                    paddingLeft: '24px'
                  }
                }}
              >
                <Link to={item.path} className="nav-link" style={{ width: '100%' }}>
                  {item.title}
                </Link>
              </MenuItem>
            ))}
            <Box sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'var(--primary-color)' }}>
              Inside Aifac
            </Box>
            {insideAifacItems.map((item) => (
              <MenuItem 
                key={item.path} 
                onClick={handleMobileMenuClose}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(184, 134, 11, 0.05)' 
                      : 'rgba(184, 134, 11, 0.15)',
                    paddingLeft: '32px'
                  }
                }}
              >
                <Link to={item.path} className="nav-link" style={{ width: '100%', paddingLeft: '1rem' }}>
                  {item.title}
                </Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  '&:hover': {
                    backgroundColor: '#8B6914',
                  },
                }}
              >
                Search
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 