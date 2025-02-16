import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const News: React.FC = () => {
  const newsItems = [
    {
      title: 'Major Grant Initiative Announced',
      date: 'February 15, 2024',
      category: 'Press Release',
      excerpt: 'The AIFAC Foundation announces a new $250 million initiative to support arts and humanities institutions.',
      image: 'news1.jpg'
    },
    {
      title: 'Supporting Digital Humanities',
      date: 'February 10, 2024',
      category: 'Program Update',
      excerpt: 'New funding opportunities for digital humanities projects and initiatives.',
      image: 'news2.jpg'
    },
    {
      title: 'Arts Education Impact Study',
      date: 'February 5, 2024',
      category: 'Research',
      excerpt: 'Results from a comprehensive study on the impact of arts education in underserved communities.',
      image: 'news3.jpg'
    },
    {
      title: 'Cultural Heritage Preservation',
      date: 'January 30, 2024',
      category: 'Grant Announcement',
      excerpt: 'Supporting initiatives to preserve and protect cultural heritage sites and artifacts.',
      image: 'news4.jpg'
    }
  ];

  const categories = ['All', 'Press Release', 'Program Update', 'Research', 'Grant Announcement'];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '40vh',
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
              News & Updates
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Stay informed about our latest initiatives, grants, and impact.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Category Filter */}
      <Box sx={{ py: 4, borderBottom: '1px solid #E5E5E5' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => {}}
                sx={{
                  backgroundColor: category === 'All' ? 'var(--primary-color)' : 'transparent',
                  color: category === 'All' ? 'white' : 'var(--primary-color)',
                  border: '1px solid var(--primary-color)',
                  '&:hover': {
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* News Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {newsItems.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                  <Box sx={{ 
                    height: 250,
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    News Image
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.date}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {item.excerpt}
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

          {/* Load More Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'var(--primary-color)',
                color: 'var(--primary-color)',
                '&:hover': {
                  borderColor: '#002548',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Load More News
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Stay Updated
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Subscribe to our newsletter to receive the latest news and updates about our initiatives, grants, and impact in the arts and humanities.
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
                Subscribe Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: 300,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Newsletter Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default News; 