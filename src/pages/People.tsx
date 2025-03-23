import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Tabs, Tab, Button, useTheme, CircularProgress, Fade, Grow, Zoom } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import useDataFetch from '../hooks/useDataFetch';
import EmptyState from '../components/EmptyState';
import ImageWithFallback from '../components/ImageWithFallback';

interface Person {
  _id: string;
  name: string;
  title: string;
  department: string;
  image?: string;
  slug: string;
  order: number;
  isLeadership: boolean;
}

const People: React.FC = () => {
  const theme = useTheme();
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const { data: people, loading, error } = useDataFetch<Person>('/people');

  const departments = [
    'All',
    'Executive Leadership',
    'Board of Governors',
    'Programs',
    'Finance & Administration',
    'Communications',
    'Archives'
  ];

  const handleDepartmentChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDepartment(newValue);
  };

  const filteredPeople = selectedDepartment === 0 
    ? people 
    : people?.filter(person => person.department === departments[selectedDepartment]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, minHeight: '50vh', alignItems: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
        </Box>
      );
    }

    if (error) {
      return (
        <Fade in timeout={800}>
          <Box>
            <EmptyState 
              message="Error loading team members. Please try again later."
              icon={<PersonIcon sx={{ fontSize: 64, color: 'error.main' }} />}
            />
          </Box>
        </Fade>
      );
    }

    if (!filteredPeople || filteredPeople.length === 0) {
      return (
        <Fade in timeout={800}>
          <Box>
            <EmptyState 
              message={selectedDepartment === 0 
                ? "No team members available at the moment."
                : `No team members in ${departments[selectedDepartment]} department.`}
              icon={<PersonIcon sx={{ fontSize: 64 }} />}
            />
          </Box>
        </Fade>
      );
    }

    return (
      <Grid container spacing={4}>
        {filteredPeople.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={person._id}>
            <Grow 
              in 
              timeout={500 + (index * 100)}
              style={{ transformOrigin: '0 0 0' }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  },
                }}
                component={Link}
                to={`/people/${person.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box sx={{ 
                  height: 550,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '10px',
                  borderRadius: 2,
                  // backgroundColor: theme => theme.palette.mode === 'light' ? '#F5F5F5' : '#1A1A1A',
                  transition: 'all 0.3s ease',
                }}>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      justifyContent: 'center',
                      paddingTop: '10px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ImageWithFallback
                      src={person.image}
                      alt={`${person.name}`}
                      fallbackIcon={<PersonIcon sx={{ fontSize: 60, color: 'white.100' }} />}
                      sx={{ 
                        width: '100%', 
                        height: '100%',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ 
                    mb: 1, 
                    color: 'text.primary',
                    fontWeight: 'bold',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: 'var(--primary-color)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {person.title}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      color: 'var(--primary-color)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Fade in timeout={800}>
        <Box sx={{ 
          height: '40vh',
          backgroundImage: theme => `url(/images/people/${theme.palette.mode === 'light' ? 'manyblack.jpg' : 'manywhite.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme => theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.75)'
              : 'rgba(0, 0, 0, 0.65)',
            zIndex: 1
          }
        }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Zoom in timeout={1000}>
              <Box sx={{ maxWidth: '800px' }}>
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  color: theme => theme.palette.mode === 'light' ? 'text.primary' : 'common.white',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: '80px',
                    height: '4px',
                    backgroundColor: 'var(--primary-color)'
                  }
                }}>
                  Our People
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 4,
                  color: theme => theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}>
                  Meet the team dedicated to supporting the arts and humanities.
                </Typography>
              </Box>
            </Zoom>
          </Container>
        </Box>
      </Fade>

      {/* Department Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Tabs 
              value={selectedDepartment} 
              onChange={handleDepartmentChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--primary-color)',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: 'var(--primary-color)',
                    fontWeight: 700,
                  },
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'light' 
                      ? 'rgba(184, 134, 11, 0.05)' 
                      : 'rgba(184, 134, 11, 0.15)',
                    color: 'var(--primary-color)'
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--primary-color)',
                  height: '3px',
                  borderRadius: '3px'
                },
              }}
            >
              {departments.map((dept, index) => (
                <Tab key={index} label={dept} />
              ))}
            </Tabs>
          </Fade>
        </Container>
      </Box>

      {/* Staff Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default People; 