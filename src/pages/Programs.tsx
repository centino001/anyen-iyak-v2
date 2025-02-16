import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Programs: React.FC = () => {
  const programs = [
    {
      title: 'Higher Learning',
      description: 'Supporting inclusive excellence in higher education.',
      image: 'higher-learning.jpg'
    },
    {
      title: 'Arts and Culture',
      description: 'Nurturing artistic expression and cultural heritage.',
      image: 'arts-culture.jpg'
    },
    {
      title: 'Public Knowledge',
      description: 'Advancing the creation and preservation of knowledge as a public good.',
      image: 'public-knowledge.jpg'
    },
    {
      title: 'Humanities in Place',
      description: 'Supporting communities in their efforts to preserve and revitalize spaces of meaning and memory.',
      image: 'humanities-place.jpg'
    }
  ];

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
              Our Programs
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Supporting transformative work in the arts and humanities through strategic grantmaking.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Programs Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                  <Box sx={{ 
                    height: 300,
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Program Image
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {program.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {program.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: 'var(--primary-color)' }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Impact Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Program Impact
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Our programs have supported thousands of institutions and individuals worldwide, fostering innovation and preserving cultural heritage.
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
                View Impact Report
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
                Impact Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Programs; 