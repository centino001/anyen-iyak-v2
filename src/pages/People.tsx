import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Tabs, Tab, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const People: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  const departments = [
    'All',
    'Executive Leadership',
    'Programs',
    'Finance & Administration',
    'Communications',
    'Archives'
  ];

  const staff = [
    {
      id: 'elizabeth-alexander',
      name: 'Elizabeth Alexander',
      title: 'President',
      department: 'Executive Leadership',
      image: 'elizabeth-alexander.jpg'
    },
    {
      id: 'mohamed-haian-abdirahman',
      name: 'Mohamed Haian Abdirahman',
      title: 'Archives Manager',
      department: 'Archives',
      image: 'mohamed-haian-abdirahman.jpg'
    },
    // Add more staff members here
  ];

  const filteredStaff = selectedDepartment === 0 
    ? staff 
    : staff.filter(person => person.department === departments[selectedDepartment]);

  const handleDepartmentChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDepartment(newValue);
  };

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
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Our People
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Meet the team dedicated to supporting the arts and humanities.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Department Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
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
                '&.Mui-selected': {
                  color: 'var(--primary-color)',
                  fontWeight: 700,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--primary-color)',
              },
            }}
          >
            {departments.map((dept, index) => (
              <Tab key={index} label={dept} />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Staff Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filteredStaff.map((person) => (
              <Grid item xs={12} sm={6} md={4} key={person.id}>
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
                  to={`/people/${person.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box sx={{ 
                    height: 300,
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Staff Photo
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {person.title}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: 'var(--primary-color)' }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default People; 