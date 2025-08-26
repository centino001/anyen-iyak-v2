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
  const logoSrc = theme.palette.mode === 'light' ? '/logos/logo.svg' : '/logos/logo.svg';

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
    { 
      name: 'Gmail', 
      icon: <EmailIcon />, 
      url: 'mailto:anyeniyak@gmail.com',
      color: '#ea4335' 
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
    <>
      {/* Main Footer Content - White Background */}
      <Box sx={{ 
        backgroundColor: 'white',
        color: 'black',
        py: 6,
        px: 4,
        position: 'relative'
      }}>
        <Box sx={{ maxWidth: '1800px', margin: '0 auto', px: 2 }}>
          <Grid container spacing={4} alignItems="flex-start">
            {/* Logo Section */}
            <Grid item xs={12} md={3}>
              <Zoom in timeout={800}>
                <Box
                  component="img"
                  src={logoSrc}
                  alt="Anyen Iyak Logo"
                  className="hover-scale animate-float"
                  sx={{ 
                    height: '120px',
                    width: 'auto',
                    maxWidth: '120px',
                    objectFit: 'contain',
                    mb: 2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Zoom>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={3}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    letterSpacing: '1px'
                  }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                  Unit D, Plot 2B, Ewet Housing Estate<br />
                  Uyo 520231, Akwa Ibom<br />
                  Nigeria
                  </Typography>
                 
                </Box>
              </Fade>
            </Grid>

            {/* Social Media Section */}
            <Grid item xs={12} md={3}>
              <Fade in timeout={800}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    letterSpacing: '1px'
                  }}>
                    Socials
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
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
                          className="hover-lift hover-glow"
                          sx={{
                            color: 'black',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            width: '40px',
                            height: '40px',
                            '&:hover': {
                              backgroundColor: social.color,
                              color: '#FFFFFF',
                              transform: 'translateY(-5px) scale(1.1)',
                              boxShadow: `0 12px 25px ${social.color}60`
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
            <Grid item xs={12} md={3}>
              <Fade in timeout={1200}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    letterSpacing: '1px'
                  }}>
                    Sign Up For Our Newsletter
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
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#f5f5f5',
                          borderRadius: 0,
                          '& fieldset': {
                            borderColor: 'rgba(0,0,0,0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(0,0,0,0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                          fontSize: '0.875rem',
                          '&::placeholder': {
                            color: 'rgba(0,0,0,0.6)',
                          }
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={subscribeStatus === 'loading'}
                      className="hover-lift hover-glow"
                      sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: 'bold',
                        py: 1,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        borderRadius: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: '#333333',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 25px rgba(0,0,0,0.4)'
                        },
                        '&:disabled': {
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          color: 'rgba(0,0,0,0.6)'
                        }
                      }}
                    >
                      {subscribeStatus === 'loading' ? 'Subscribing...' : 'Submit'}
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Copyright Section - Black Background */}
      <Box sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 2,
        px: 4,
      }}>
        <Box sx={{ maxWidth: '1800px', margin: '0 auto', px: 2 }}>
          <Fade in timeout={1400}>
            <Typography variant="body2" sx={{ 
              textAlign: 'center',
              fontSize: '0.875rem',
              animation: 'pulse 3s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { opacity: 0.8 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.8 }
              }
            }}>
              © {new Date().getFullYear()} Anyen Iyak Foundation For Art And Culture. All Rights Reserved.
            </Typography>
          </Fade>
        </Box>
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
    </>
  );
};

export default Footer; 