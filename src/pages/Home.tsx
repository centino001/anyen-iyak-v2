import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '80vh',
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
              Advancing Transformative Ideas
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Supporting arts and humanities through grants and research initiatives.
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
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Programs Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Featured Programs
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: '#E5E5E5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Image Placeholder
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Program Title {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: 'var(--primary-color)' }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* News & Updates Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            News & Updates
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} md={6} key={item}>
                <Card sx={{ display: 'flex', boxShadow: 'none', backgroundColor: 'transparent' }}>
                  <Box sx={{ 
                    width: 150,
                    height: 150,
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Image
                  </Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      January {item}, 2024
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      News Title {item}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: 'var(--primary-color)' }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
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
                Through our grantmaking and research, we're working to strengthen and promote the arts and humanities in service of a more just and equitable society.
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

export default Home; 