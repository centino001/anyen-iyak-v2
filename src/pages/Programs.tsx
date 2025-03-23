import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import useDataFetch from '../hooks/useDataFetch';
import EmptyState from '../components/EmptyState';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageIcon from '@mui/icons-material/Image';
import { useTheme } from '@mui/material/styles';

interface Program {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  image?: string;
  slug: string;
  isActive: boolean;
}

const Programs: React.FC = () => {
  const { data: programs, loading, error } = useDataFetch<Program>('/programs');
  const theme = useTheme();

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <EmptyState 
          message="Error loading programs. Please try again later."
          icon={<AssignmentIcon sx={{ fontSize: 64, color: 'error.main' }} />}
        />
      );
    }

    if (!programs || programs.length === 0) {
      return (
        <EmptyState 
          message="No programs available at the moment. Please check back later."
          icon={<AssignmentIcon sx={{ fontSize: 64 }} />}
        />
      );
    }

    return (
      <Grid container spacing={4}>
        {programs.map((program) => (
          <Grid item xs={12} sm={6} md={4} key={program._id}>
            <Card 
              sx={{ 
                height: '100%',
                boxShadow: 'none',
                border: '1px solid #E5E5E5',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              component={Link}
              to={`/programs/${program.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Box 
                sx={{ 
                  height: 350,
                  width: '100%',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#E5E5E5',
                  padding: '10px',
                  borderRadius: 1
                }}
              >
                <ImageWithFallback
                  src={program.image}
                  alt={program.title}
                  fallbackIcon={<ImageIcon sx={{ fontSize: 60, color: 'grey.400' }} />}
                  sx={{ width: '100%', height: '100%' }}
                />
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                  {program.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {program.shortDescription}
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
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '40vh',
        backgroundColor: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Our Programs
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Discover our initiatives supporting arts and culture.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Programs Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Programs; 