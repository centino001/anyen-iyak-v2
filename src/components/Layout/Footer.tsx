import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  Fade, 
  Zoom, 
  IconButton, 
  TextField, 
  Button, 
  Alert,
  Snackbar
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';

const Footer: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showAlert, setShowAlert] = useState(false);
  
  // Use black logo on blue background (light mode), white logo on black background (dark mode)
  const logoSrc = theme.palette.mode === 'light' ? '/logos/new-black.PNG' : '/logos/new-black.PNG';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribers/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'footer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setSubscribeStatus('success');
      setEmail('');
      setShowAlert(true);
      
      // Log successful subscription
      console.log('Subscription successful:', data);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('error');
      setShowAlert(true);
    }
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <FacebookIcon />, 
      url: 'https://www.facebook.com/profile.php?id=61556236898203',
      color: '#1877f2' 
    },
    { 
      name: 'Twitter', 
      icon: <XIcon />, 
      url: 'https://x.com/Anyeniyak',
      color: '#1da1f2' 
    },
    { 
      name: 'Instagram', 
      icon: <InstagramIcon />, 
      url: 'https://instagram.com/anyen_iyak_foundation',
      color: '#e4405f' 
    },
    // { 
    //   name: 'WhatsApp', 
    //   icon: <WhatsAppIcon />, 
    //   url: 'https://wa.me/2348000000000',
    //   color: '#25d366' 
    // },
    { 
      name: 'LinkedIn', 
      icon: <LinkedInIcon />, 
      url: 'https://www.linkedin.com/company/anyen-iyak-foundation-for-art-and-culture/',
      color: '#0077b5' 
    }
  ];

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
        <Grid container spacing={6} alignItems="center">
          {/* Logo and Address */}
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
              <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
                Anyen lyak Foundation for Art & Culture<br />
                Plot 94-Unit A, Ewet Housing Estate<br />
                Uyo, Akwa Ibom State<br />
                Nigeria.
              </Typography>
            </Fade>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={800}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                  }
                }}>
                  Connect With Us
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  {socialLinks.map((social, index) => (
                    <Zoom in timeout={1000 + (index * 100)} key={social.name}>
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: social.color,
                            color: '#FFFFFF',
                            transform: 'translateY(-3px) scale(1.1)',
                            boxShadow: `0 8px 20px ${social.color}40`
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Zoom>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Email Subscription Section */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={1200}>
              <Box>
                <Typography variant="h6" sx={{ 
                  mb: 2, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'relative',
                  display: 'inline-block',
                  width: '100%',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                  }
                }}>
                  Stay Updated
                </Typography>
                <Typography variant="body2" sx={{ 
                  mb: 3, 
                  textAlign: 'center',
                  opacity: 0.8 
                }}>
                  Subscribe to our newsletter for the latest updates on our programs, events, and cultural initiatives.
                </Typography>
                <Box 
                  component="form" 
                  onSubmit={handleSubscribe}
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2 
                  }}
                >
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                        '&::placeholder': {
                          color: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
                        }
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={subscribeStatus === 'loading'}
                    startIcon={<EmailIcon />}
                    sx={{
                      backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
                      color: theme.palette.mode === 'light' ? '#FFFFFF' : '#000000',
                      fontWeight: 'bold',
                      py: 1.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'light' ? '#333333' : '#E0E0E0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                      },
                      '&:disabled': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        color: 'rgba(255,255,255,0.6)'
                      }
                    }}
                  >
                    {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Fade in timeout={1400}>
              <Box sx={{ 
                borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)'}`, 
                pt: 3, 
                mt: 3 
              }}>
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

      {/* Success/Error Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={subscribeStatus === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {subscribeStatus === 'success' 
            ? 'Successfully subscribed to our newsletter!' 
            : 'Failed to subscribe. Please try again later.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer; 