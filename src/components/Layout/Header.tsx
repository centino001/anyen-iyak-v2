import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Container, Menu, MenuItem, IconButton, Popper, Paper, ClickAwayListener, MenuList, Grow, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface HeaderProps {
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme }) => {
  const theme = useTheme();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [insideAifacAnchor, setInsideAifacAnchor] = useState<null | HTMLElement>(null);

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

  const insideAifacItems = [
    { title: 'Mission', path: '/mission' },
    { title: 'History', path: '/history' },
    { title: 'People', path: '/people' },
    { title: 'Financials', path: '/financials' },
    { title: 'News', path: '/news' },
    { title: 'Events', path: '/events' },
  ];

  const menuItems = [
    { title: 'About', path: '/about' },
    { title: 'Programs', path: '/programs' },
    { title: 'Grants', path: '/grants' },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', padding: '1rem 0' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ 
              width: '200px', 
              height: '50px', 
              backgroundColor: theme.palette.mode === 'light' ? '#E5E5E5' : '#333333',
              color: theme.palette.text.primary,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              LOGO
            </Box>
          </Link>
          
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '2rem', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
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
                    <Paper sx={{ mt: 1, minWidth: 200 }}>
                      <ClickAwayListener onClickAway={handleInsideAifacClose}>
                        <MenuList>
                          {insideAifacItems.map((item) => (
                            <MenuItem 
                              key={item.path}
                              onClick={handleInsideAifacClose}
                              component={Link}
                              to={item.path}
                              sx={{ color: theme.palette.text.primary }}
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

            <IconButton onClick={onToggleTheme} color="inherit" sx={{ ml: 1 }}>
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: 'var(--primary-color)',
                '&:hover': {
                  backgroundColor: '#002548',
                },
              }}
            >
              Search
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton onClick={onToggleTheme} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
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
                }
              }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.path} onClick={handleMobileMenuClose}>
                  <Link to={item.path} className="nav-link" style={{ width: '100%' }}>
                    {item.title}
                  </Link>
                </MenuItem>
              ))}
              <Box sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'var(--primary-color)' }}>
                Inside Aifac
              </Box>
              {insideAifacItems.map((item) => (
                <MenuItem key={item.path} onClick={handleMobileMenuClose}>
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
                      backgroundColor: '#002548',
                    },
                  }}
                >
                  Search
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 