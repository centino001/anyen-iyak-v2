import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Divider, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fetchPeopleByDepartment } from '../utils/api';
import { Person } from '../types';

const People: React.FC = () => {
  const [people, setPeople] = useState<{ [key: string]: Person[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const departments = [
    'Board of Directors',
    'Executive Leadership', 
    'Expert Advisors',
    'Champions',
    'Core Team'
  ];

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        const peopleData: { [key: string]: Person[] } = {};
        
        // Fetch people for each department
        for (const dept of departments) {
          try {
            const deptPeople = await fetchPeopleByDepartment(dept);
            if (deptPeople && deptPeople.length > 0) {
              peopleData[dept] = deptPeople;
            }
          } catch (err) {
            console.error(`Failed to fetch people for ${dept}:`, err);
          }
        }
        
        setPeople(peopleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load people');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const renderTeamSection = (title: string, members: Person[]) => {
    // Don't render section if no members
    if (!members || members.length === 0) {
      return null;
    }

    return (
    <Box sx={{
      backgroundColor: '#121212',
      color: 'white',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            textAlign: 'center',
            marginBottom: 6,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {title}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {members.map((member, index) => (
              <Grid item xs={12} md={4} key={member._id || index}>
              <Box
                sx={{ 
                  backgroundColor: '#3a3a3a',
                  borderRadius: '8px',
                  padding: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                {/* Profile Image */}
                  <Box 
                    sx={{ 
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 20px',
                      backgroundImage: member.image ? `url(${member.image})` : 'url(/people/first_person.svg)',
                    backgroundSize: 'cover',
                      backgroundPosition: 'center top',
                    border: '3px solid #D05A34',
                  }}
                />

                {/* Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                      marginBottom: 1,
                    color: 'white',
                  }}
                >
                  {member.name}
                </Typography>

                {/* Role - Only show if exists */}
                {member.role && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      marginBottom: 2,
                      color: '#D05A34',
                      fontStyle: 'italic'
                    }}
                  >
                    {member.role}
                  </Typography>
                )}



                {/* LinkedIn Profile Link */}
                {member.socialLinks?.linkedin && (
                  <>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <LinkedInIcon sx={{ color: '#0077b5', fontSize: '1.2rem' }} />
                      <Typography
                        component="a"
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: '#0077b5',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        LinkedIn Profile
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Typography variant="h6" sx={{ color: '#666', fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
          Loading people...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Typography variant="h6" color="error" sx={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  // Check if there are any people at all
  const hasAnyPeople = Object.values(people).some(deptPeople => deptPeople && deptPeople.length > 0);

  if (!hasAnyPeople) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        {/* Image Grid Section */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gridTemplateRows: { xs: 'repeat(5, 200px)', md: 'repeat(2, 300px)' },
          gap: 0,
          height: { xs: '1000px', md: '600px' }
        }}>
          {/* Top Left - Landing */}
          <Box
            sx={{
              backgroundImage: 'url(/images/landing.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1,
              },
            }}
          />
          
          {/* Top Right - Newspaper Room */}
          <Box
            sx={{
              backgroundImage: 'url(/images/newspaper_room.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Bottom Left - Potter */}
          <Box
            sx={{
              backgroundImage: 'url(/images/potter.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Bottom Right - Split between Potter 2 and Lightroom */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gap: 0
          }}>
            <Box
              sx={{
                backgroundImage: 'url(/images/potter_2.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Box
              sx={{
                backgroundImage: 'url(/images/lightroom.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Box>
        </Box>

        {/* Empty State */}
        <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#121212', color: 'white' }}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: 'white',
                mb: 2
              }}
            >
              No Team Members Available
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#cccccc',
                mb: 4,
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              There are currently no team members available. Check back later.
            </Typography>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      {/* Image Grid Section */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gridTemplateRows: { xs: 'repeat(5, 200px)', md: 'repeat(2, 300px)' },
        gap: 0,
        height: { xs: '1000px', md: '600px' }
      }}>
        {/* Top Left - Landing */}
        <Box
          sx={{
            backgroundImage: 'url(/images/landing.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            },
          }}
        />
        
        {/* Top Right - Newspaper Room */}
        <Box
          sx={{
            backgroundImage: 'url(/images/newspaper_room.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Bottom Left - Potter */}
        <Box
          sx={{
            backgroundImage: 'url(/images/potter.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Bottom Right - Split between Potter 2 and Lightroom */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateRows: '1fr 1fr',
          gap: 0
        }}>
          <Box
            sx={{
              backgroundImage: 'url(/images/potter_2.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box
            sx={{
              backgroundImage: 'url(/images/lightroom.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          </Box>
      </Box>

      {/* Orange Section - Only show if there are people */}
      {hasAnyPeople && (
      <Box sx={{
        backgroundColor: '#D05A34',
        color: 'white',
        py: 4,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
              sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Meet The Dedicated Individuals Who Bring Our Mission To Life
          </Typography>
        </Container>
      </Box>
      )}

      {/* Render each department section only if it has people */}
      {people['Board of Directors'] && people['Board of Directors'].length > 0 && 
        renderTeamSection("Board Of Directors", people['Board of Directors'])}

      {people['Executive Leadership'] && people['Executive Leadership'].length > 0 && 
        renderTeamSection("Executive Leadership", people['Executive Leadership'])}

      {people['Expert Advisors'] && people['Expert Advisors'].length > 0 && 
        renderTeamSection("Expert Advisors", people['Expert Advisors'])}

      {people['Champions'] && people['Champions'].length > 0 && 
        renderTeamSection("Champions", people['Champions'])}

      {people['Core Team'] && people['Core Team'].length > 0 && 
        renderTeamSection("Core Team", people['Core Team'])}
    </Box>
  );
};

export default People; 