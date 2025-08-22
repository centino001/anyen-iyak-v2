import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const News: React.FC = () => {
  // Array of news images - you can replace with actual news images
  const newsImages = [
    '/programs/museum.svg',
    '/programs/museum_photo.svg',
    '/programs/museum_chair.svg',
  ];

      return (
    <Box>
      {/* Top Image Grid - Same as Programs page */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        height: { xs: '400px', md: '500px' },
        gap: 0
      }}>
        {/* Top Left - Landing */}
        <Box
          sx={{
            backgroundImage: 'url(/images/landing.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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

      {/* Orange Section */}
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
            Stay Updated With Our Latest News And Events
            </Typography>
        </Container>
      </Box>

      {/* News Grid Section */}
      <Box sx={{
        backgroundColor: 'white',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Create 8 news cards in a 2x2 grid */}
            {[...Array(8)].map((_, index) => {
              const imageIndex = index % newsImages.length;
              
              return (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '300px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundImage: `url(${newsImages[imageIndex]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                        zIndex: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        padding: 3,
                      }}
                    >
                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          color: 'white',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          mb: 1,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        }}
                      >
                        Anyen Iyak Foundation News Update
                      </Typography>

                      {/* Subtitle */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          color: 'white',
                          mb: 2,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        }}
                      >
                        Latest Updates From Our Foundation Activities
                      </Typography>

                      {/* Date */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                          color: 'white',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        }}
                      >
                        {new Date().toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default News; 