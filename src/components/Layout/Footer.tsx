import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.mode === 'light' ? 'var(--primary-color)' : '#000000',
      color: '#FFFFFF',
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              width: '200px', 
              height: '50px', 
              backgroundColor: theme.palette.mode === 'light' ? '#E5E5E5' : '#333333',
              color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}>
              LOGO
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              140 S. Dearborn Street<br />
              Chicago, IL 60603-5285
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  About
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/mission" color="inherit">Our Mission</Link>
                  <Link href="/history" color="inherit">History</Link>
                  <Link href="/leadership" color="inherit">Leadership</Link>
                  <Link href="/careers" color="inherit">Careers</Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Programs
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/grants" color="inherit">Grants</Link>
                  <Link href="/initiatives" color="inherit">Initiatives</Link>
                  <Link href="/research" color="inherit">Research</Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Connect
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/contact" color="inherit">Contact</Link>
                  <Link href="/newsletter" color="inherit">Newsletter</Link>
                  <Link href="/social-media" color="inherit">Social Media</Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, mt: 3 }}>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                © {new Date().getFullYear()} Anyen Iyak Foundation for Art and Culture. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 