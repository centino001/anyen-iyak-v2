import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Fade, Zoom } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
                ABOUT US
            </Typography>
              <Typography variant="h5" sx={{ maxWidth: '800px', mb: 4, lineHeight: 1.6 }}>
                Welcome to the Anyen Iyak Foundation for Art and Culture, where we celebrate and preserve the vibrant heritage of Akwa Ibom.
            </Typography>
          </Box>
          </Fade>
        </Container>
      </Box>

      <Box sx={{
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <Typography variant="h1" sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 3
              }}>
                OUR MISSION
              </Typography>
              <Typography variant="h5" sx={{ maxWidth: '800px', mb: 4, lineHeight: 1.6 }}>
              Our mission is to promote the rich traditions of the region both locally and globally through impactful initiatives. Inspired by the Ibibio term "Anyen Iyak," meaning "Fish Eye," we strive to keep Akwa Ibom's legacy alive for future generations.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>


      {/* Main Content */}
      {/* <Box sx={{ py: 8, backgroundColor: '#1e1e1e' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Fade in timeout={800}>
                <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                  Our mission is to promote the rich traditions of the region both locally and globally through impactful initiatives. Inspired by the Ibibio term "Anyen Iyak," meaning "Fish Eye," we strive to keep Akwa Ibom's legacy alive for future generations.
                </Typography>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* Three Pillars Section */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: '#121212',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 5, 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: 'var(--primary-color)'
              }
            }}>
              Our work is built on three core pillars:
            </Typography>
          </Fade>

          <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
              <Zoom in timeout={800}>
                <Paper sx={{ 
                  p: 4, 
                  backgroundColor: '#1e1e1e',
                  borderLeft: '4px solid var(--primary-color)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'visible'
                    }}>
                      Cultural Regeneration, Preservation, and Continuity
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                      We are committed to preserving Akwa Ibom's traditions through research and documentation.
                    </Typography>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            <Grid item xs={12}>
              <Zoom in timeout={1000}>
                <Paper sx={{ 
                  p: 4, 
                  backgroundColor: '#1e1e1e',
                  borderLeft: '4px solid var(--primary-color)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'visible'
                    }}>
                      Artistic Development
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                      We empower both emerging and veteran artists by offering tools and platforms to amplify their voices.
                    </Typography>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            <Grid item xs={12}>
              <Zoom in timeout={1200}>
                <Paper sx={{ 
                  p: 4, 
                  backgroundColor: '#1e1e1e',
                  borderLeft: '4px solid var(--primary-color)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'visible'
                    }}>
                      Unification of the African Art and Culture Ecosystem
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                      We are building a strong network of African artists and cultural advocates to promote collaboration and eliminate barriers.
                    </Typography>
              </Box>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values Section */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: '#1e1e1e',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 5, 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: 'var(--primary-color)'
              }
            }}>
              At the heart of everything we do are our fundamental values:
          </Typography>
          </Fade>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Fade in timeout={800}>
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  borderLeft: '3px solid var(--primary-color)', 
                  backgroundColor: 'rgba(184, 134, 11, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    • Teamwork
                  </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
                    Collaboration is key—every effort, big or small, adds to the bigger picture.
                  </Typography>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Fade in timeout={1000}>
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  borderLeft: '3px solid var(--primary-color)', 
                  backgroundColor: 'rgba(184, 134, 11, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    • Leadership
                </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
                    Leadership is not just for the few; it is for everyone. We empower individuals to inspire change and lead with intention.
                </Typography>
                </Box>
              </Fade>
          </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Fade in timeout={1200}>
              <Box sx={{ 
                  mb: 4,
                  p: 3,
                  borderLeft: '3px solid var(--primary-color)', 
                  backgroundColor: 'rgba(184, 134, 11, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    • Integrity
                  </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
                    Our actions are built on honesty and transparency, earning us trust through consistent integrity.
                  </Typography>
              </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Fade in timeout={1400}>
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  borderLeft: '3px solid var(--primary-color)', 
                  backgroundColor: 'rgba(184, 134, 11, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    • Mutual Respect
              </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
                    We honor every voice, creating an inclusive environment where our diverse perspectives bring us closer.
              </Typography>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Fade in timeout={1600}>
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  borderLeft: '3px solid var(--primary-color)', 
                  backgroundColor: 'rgba(184, 134, 11, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    • Resilience
                  </Typography>
                  <Typography sx={{ lineHeight: 1.7 }}>
                    Challenges are opportunities for growth, so we face them head-on while staying focused on our mission.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>

          
        </Container>
      </Box>
    </Box>
  );
};

export default About; 