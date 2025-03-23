import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, CircularProgress, Fade, Grow } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';
import useDataFetch from '../hooks/useDataFetch';
import ImageWithFallback from '../components/ImageWithFallback';
import EmptyState from '../components/EmptyState';

interface Person {
  _id: string;
  name: string;
  title: string;
  department: string;
  image?: string;
  bio: string;
  email: string;
  phone?: string;
  slug: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

const PersonDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useDataFetch<Person>(`/people/${slug}`);
  
  const person = data?.[0];

  // Log data for debugging
  useEffect(() => {
    if (data) {
      console.log("Person data:", data);
    }
    if (error) {
      console.error("Error fetching person:", error);
    }
  }, [data, error]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
      </Container>
    );
  }

  if (error || !person) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Box>
            <EmptyState 
              message="Person not found or error loading data."
              icon={<PersonIcon sx={{ fontSize: 64, color: 'error.main' }} />}
            />
            <Button
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/people"
              sx={{ 
                color: 'var(--primary-color)',
                mt: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-5px)'
                }
              }}
            >
              Back to People
            </Button>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '60vh',
        backgroundColor: theme => theme.palette.mode === 'light' ? '#F5F5F5' : '#121212',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={500}>
            <Button
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/people"
              sx={{ 
                color: 'var(--primary-color)',
                mb: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-5px)'
                }
              }}
            >
              Back to People
            </Button>
          </Fade>

          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Grow in timeout={800}>
                <Box sx={{ 
                  height: 600,
                  width: '100%',
                  backgroundColor: theme => theme.palette.mode === 'light' ? '#E5E5E5' : '#1A1A1A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  overflow: 'hidden',
                  padding: '10px',
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                  }
                }}>
                  <ImageWithFallback 
                    src={person.image} 
                    alt={person.name}
                    fallbackIcon={<PersonIcon sx={{ fontSize: 80, color: 'grey.400' }} />}
                    sx={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                </Box>
              </Grow>
              <Fade in timeout={1200}>
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  backgroundColor: theme => theme.palette.mode === 'light' ? 'white' : '#1A1A1A',
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                  <Typography variant="h6" color="var(--primary-color)" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Contact Information
                  </Typography>
                  {person.email && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'translateX(5px)' }
                    }}>
                      <EmailIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
                      <Typography variant="body1">
                        {person.email}
                      </Typography>
                    </Box>
                  )}
                  {person.phone && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'translateX(5px)' }
                    }}>
                      <PhoneIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
                      <Typography variant="body1">
                        {person.phone}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={8}>
              <Fade in timeout={600}>
                <Typography variant="h3" sx={{ 
                  mb: 2,
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: 'var(--primary-color)'
                  }
                }}>
                  {person.name}
                </Typography>
              </Fade>
              <Fade in timeout={800}>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                  {person.title}
                </Typography>
              </Fade>
              <Fade in timeout={1000}>
                <Typography variant="body1" sx={{ 
                  mb: 4, 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}>
                  {person.bio}
                </Typography>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PersonDetail; 