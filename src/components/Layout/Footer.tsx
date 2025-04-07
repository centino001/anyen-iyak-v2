import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, Fade, Zoom } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  // Use black logo on blue background (light mode), white logo on black background (dark mode)
  const logoSrc = theme.palette.mode === 'light' ? '/logos/18.png' : '/logos/19.png';

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.mode === 'light' ? 'var(--primary-color)' : '#000000',
      color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
      py: 6,
      px: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: 'linear-gradient(90deg, transparent 0%, var(--primary-color) 50%, transparent 100%)'
      }
    }}>
      <Box sx={{ maxWidth: '1800px', margin: '0 auto', px: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Zoom in timeout={800}>
              <Box
                component="img"
                src={logoSrc}
                alt="Anyen Iyak Logo"
                sx={{ 
                  height: '200px',
                  width: 'auto',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  mb: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Zoom>
            <Fade in timeout={1000}>
              <Typography variant="body2" sx={{ mt: 2 }}>
              Anyen lyak Foundation for Art & Culture<br />
              Plot 94-Unit A, Ewet Housing Estate<br />
              Uyo, Akwa Ibom State<br />
              Nigeria
              </Typography>
            </Fade>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Fade in timeout={800}>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '30px',
                        height: '2px',
                        backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                      }
                    }}>
                      About
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Link 
                        href="/mission" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Our Mission
                      </Link>
                      <Link 
                        href="/history" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        History
                      </Link>
                      <Link 
                        href="/leadership" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Leadership
                      </Link>
                      <Link 
                        href="/careers" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Careers
                      </Link>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Fade in timeout={1000}>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '30px',
                        height: '2px',
                        backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                      }
                    }}>
                      PROJECTS
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Link 
                        href="/grants" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        OPEN CALLS
                      </Link>
                      <Link 
                        href="/shop" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        SHOP
                      </Link>
                      <Link 
                        href="/initiatives" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Initiatives
                      </Link>
                      <Link 
                        href="/research" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Research
                      </Link>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Fade in timeout={1200}>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '30px',
                        height: '2px',
                        backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                      }
                    }}>
                      Connect
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Link 
                        href="/contact" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Contact
                      </Link>
                      <Link 
                        href="/newsletter" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Newsletter
                      </Link>
                      <Link 
                        href="/social-media" 
                        color="inherit"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            paddingLeft: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                          }
                        }}
                      >
                        Social Media
                      </Link>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Fade in timeout={1400}>
              <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, mt: 3 }}>
                <Typography variant="body2" sx={{ 
                  textAlign: 'center',
                  animation: 'pulse 3s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.8 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.8 }
                  }
                }}>
                  © {new Date().getFullYear()} Anyen Iyak Foundation for Art and Culture. All rights reserved.
                </Typography>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer; 