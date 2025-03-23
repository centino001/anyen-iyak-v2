import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
            mb: 3
          }}>
            Our History
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mb: 4, lineHeight: 1.6 }}>
            Since our founding in 1990, the Anyen Iyak Foundation has been dedicated to supporting arts,
            culture, and humanities through strategic grantmaking and innovative programs.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Left Column - Timeline */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold' }}>
                Key Milestones
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  {
                    year: '1990',
                    title: 'Foundation Established',
                    description: 'The Anyen Iyak Foundation was established with a mission to support arts and culture.'
                  },
                  {
                    year: '1995',
                    title: 'First Grant Program',
                    description: 'Launched our first major grant program supporting local artists and cultural institutions.'
                  },
                  {
                    year: '2000',
                    title: 'Expansion of Mission',
                    description: 'Expanded our focus to include support for humanities and educational initiatives.'
                  },
                  {
                    year: '2010',
                    title: 'International Programs',
                    description: 'Began supporting international cultural exchange programs and global arts initiatives.'
                  },
                  {
                    year: '2020',
                    title: 'Digital Transformation',
                    description: 'Launched digital initiatives to support arts and culture in the digital age.'
                  }
                ].map((event, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    <Typography 
                      sx={{ 
                        color: 'var(--primary-color)',
                        fontWeight: 'bold',
                        minWidth: '60px'
                      }}
                    >
                      {event.year}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
              A Legacy of Supporting Arts and Culture
            </Typography>
            
            <Typography paragraph>
              The Anyen Iyak Foundation was established in 1990 with a clear vision: to nurture and
              sustain the arts and humanities as essential elements of vibrant human communities.
              Our founder believed that cultural expression and artistic innovation are fundamental
              to social progress and human understanding.
            </Typography>

            <Typography paragraph>
              Over the past three decades, we have evolved and adapted our approach while staying
              true to our core mission. We've supported thousands of artists, scholars, and cultural
              institutions, helping to bring transformative ideas and creative works to life.
            </Typography>

            <Box sx={{ my: 6 }}>
              <Paper sx={{ p: 4, bgcolor: '#f5f5f5' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Our Impact
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: 'var(--primary-color)', mb: 1 }}>
                      1000+
                    </Typography>
                    <Typography>
                      Grants Awarded
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: 'var(--primary-color)', mb: 1 }}>
                      50M+
                    </Typography>
                    <Typography>
                      Total Funding
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h3" sx={{ color: 'var(--primary-color)', mb: 1 }}>
                      30+
                    </Typography>
                    <Typography>
                      Countries Reached
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Looking to the Future
            </Typography>

            <Typography paragraph>
              As we look to the future, we remain committed to supporting innovative work in the
              arts and humanities. We're expanding our focus to address contemporary challenges,
              including digital transformation in the arts, cultural preservation in a rapidly
              changing world, and promoting diversity and inclusion in creative fields.
            </Typography>

            <Typography paragraph>
              Through our grantmaking, research initiatives, and collaborative programs, we continue
              to work towards our vision of a world where arts and culture thrive as essential
              components of human flourishing.
            </Typography>

            <Box sx={{ mt: 6 }}>
              <Divider sx={{ mb: 4 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Our Commitment
              </Typography>
              <Typography>
                We remain dedicated to supporting transformative ideas and creative expression
                that enrich our shared cultural heritage and promote understanding across
                communities.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 