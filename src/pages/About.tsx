import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const About: React.FC = () => {
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
          <Box sx={{ maxWidth: '600px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              About The Foundation
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              The Anyen Iyak Foundation for Art and Culture is the nation's largest supporter of the arts and humanities.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                The Anyen Iyak Foundation for Art and Culture believes that the arts and humanities are where we express our complex humanity. We support the flourishing of culture through grants to arts organizations, universities, libraries, and other institutions that sustain our shared cultural record and create new possibilities for understanding.
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
                Learn More About Our Mission
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: 400,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Mission Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Leadership Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Our Leadership
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Box sx={{ 
                  height: 300,
                  backgroundColor: '#E5E5E5',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Leader Image {item}
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Leader Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position Title
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* History Section */}
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
                History Image
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Our History
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Since 1969, the Anyen Iyak Foundation for Art and Culture has demonstrated an abiding commitment to the humanities and the arts. We believe that these fields are essential to human flourishing and to the wellbeing of diverse and democratic societies.
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
                Explore Our History
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 