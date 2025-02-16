import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface StaffMember {
  id: string;
  name: string;
  title: string;
  department: string;
  image: string;
  bio?: string;
  email?: string;
  phone?: string;
}

const staff: StaffMember[] = [
  {
    id: 'elizabeth-alexander',
    name: 'Elizabeth Alexander',
    title: 'President',
    department: 'Executive Leadership',
    image: 'elizabeth-alexander.jpg',
    bio: 'Elizabeth Alexander is a renowned poet, educator, and scholar. As president of the Anyen Iyak Foundation for Art and Culture, she has focused on arts and culture, higher education, and social justice initiatives.',
    email: 'chris@aifac.com',
    phone: '(212) 555-0123',
  },
  {
    id: 'mohamed-haian-abdirahman',
    name: 'Mohamed Haian Abdirahman',
    title: 'Archives Manager',
    department: 'Archives',
    image: 'mohamed-haian-abdirahman.jpg',
    bio: `Mohamed Haian Abdirahman leads the Foundation's archives team, ensuring the preservation and accessibility of our historical records and cultural heritage materials.`,
    email: 'mabdirahman@aifac.com',
    phone: '(212) 555-0124',
  },
  // Add more staff members here
];

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const person = staff.find(p => p.id === id);
  const colleagues = staff.filter(p => p.department === person?.department && p.id !== id);

  if (!person) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4">Staff member not found</Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '60vh',
        backgroundColor: '#F5F5F5',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/people"
            sx={{ 
              color: 'var(--primary-color)',
              mb: 4
            }}
          >
            Back to People
          </Button>

          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                height: 400,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}>
                Staff Photo
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Contact Information
                </Typography>
                {person.email && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Email: {person.email}
                  </Typography>
                )}
                {person.phone && (
                  <Typography variant="body1">
                    Phone: {person.phone}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h2" sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                mb: 2
              }}>
                {person.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                {person.title}
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.125rem',
                lineHeight: 1.8,
                mb: 4
              }}>
                {person.bio}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Department Colleagues Section */}
      {colleagues.length > 0 && (
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold' }}>
              Other {person.department} Team Members
            </Typography>
            <Grid container spacing={4}>
              {colleagues.map((colleague) => (
                <Grid item xs={12} sm={6} md={4} key={colleague.id}>
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
                    to={`/people/${colleague.id}`}
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
                        {colleague.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {colleague.title}
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
      )}
    </Box>
  );
};

export default PersonDetail; 