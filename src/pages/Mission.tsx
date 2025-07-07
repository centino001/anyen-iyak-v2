import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Mission: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '60vh',
        backgroundColor: '#E5E5E5',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Our Mission
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              The Anyen Iyak Foundation for Art and Culture believes that the arts and humanities are where we express our complex humanity.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission Statement Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.25rem', lineHeight: 1.8 }}>
                We support the flourishing of culture through programs for arts organizations, universities, libraries, and other institutions that sustain our shared cultural record and create new possibilities for understanding.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.25rem', lineHeight: 1.8 }}>
                Our programs aim to build just communities where ideas and imagination can thrive through the arts and humanities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                height: 300,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4
              }}>
                Mission Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold' }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Social Justice',
                description: 'We believe in the power of the arts and humanities to advance social justice.'
              },
              {
                title: 'Collaboration',
                description: 'We work in partnership with organizations and communities to achieve lasting impact.'
              },
              {
                title: 'Innovation',
                description: 'We support new ideas and approaches that push boundaries and create change.'
              },
              {
                title: 'Excellence',
                description: 'We strive for excellence in everything we do and support organizations that do the same.'
              }
            ].map((value, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 4, backgroundColor: 'white', height: '100%' }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1">
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Impact Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: 400,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Impact Image
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Our Impact
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Through strategic programming and thoughtful collaboration, we've supported countless initiatives that strengthen the arts and humanities across the United States and beyond.
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  '&:hover': {
                    backgroundColor: '#002548',
                  },
                }}
              >
                View Our Work
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Mission; 