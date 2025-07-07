import React from 'react';
import { Box, Container, Grid, Typography, Paper, Divider } from '@mui/material';

const History: React.FC = () => {
  const timelineEvents = [
    {
      year: '1969',
      title: 'Foundation Established',
      description: 'The Anyen Iyak Foundation for Art and Culture is established through the consolidation of the Avalon Foundation and the Old Dominion Foundation.'
    },
    {
      year: '1970s',
      title: 'Focus on Higher Education',
      description: 'The Foundation begins its long-standing commitment to supporting higher education and the humanities.'
    },
    {
      year: '1980s',
      title: 'Expansion of Programs',
      description: 'Programs expand to include support for libraries, conservation, and scholarly communications.'
    },
    {
      year: '1990s',
      title: 'Digital Initiatives',
      description: 'The Foundation becomes a leader in supporting digital initiatives in the humanities and cultural heritage preservation.'
    },
    {
      year: '2000s',
      title: 'Global Reach',
      description: 'Programs extend internationally, supporting cultural exchange and global scholarship.'
    },
    {
      year: '2010s',
      title: 'Social Justice Focus',
      description: 'The Foundation strengthens its commitment to social justice through the arts and humanities.'
    },
    {
      year: 'Today',
      title: 'Continued Impact',
      description: 'The Foundation continues to be the largest supporter of the arts and humanities in the United States.'
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
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Our History
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Over five decades of supporting the arts and humanities.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative' }}>
            {timelineEvents.map((event, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  mb: index === timelineEvents.length - 1 ? 0 : 4,
                  pl: { xs: 4, md: 0 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: { xs: '8px', md: '50%' },
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--primary-color)',
                    transform: { md: 'translateX(-50%)' },
                  }
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={5} sx={{ textAlign: { md: 'right' } }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {event.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-color)',
                        position: 'absolute',
                        left: { xs: 0, md: '50%' },
                        transform: { md: 'translateX(-50%)' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        border: '1px solid #E5E5E5',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {event.description}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Legacy Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Our Legacy
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.125rem', lineHeight: 1.8 }}>
                Since its founding, the Anyen Iyak Foundation for Art and Culture has demonstrated an abiding commitment to the humanities and the arts. We believe that these fields are essential to human flourishing and to the wellbeing of diverse and democratic societies.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Through our programming, we seek to build just communities enriched by meaning and empowered by critical thinking, where ideas and imagination can thrive.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: 400,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Legacy Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Historical Photos Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
            Historical Photos
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Box sx={{ 
                  height: 250,
                  backgroundColor: '#E5E5E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  Historical Photo {item}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Caption for historical photo {item}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default History; 