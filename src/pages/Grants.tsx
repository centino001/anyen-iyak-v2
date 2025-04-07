import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, Tabs, Tab } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Grants: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const recentGrants = [
    {
      recipient: 'Cultural Institution Name',
      amount: '$2,500,000',
      program: 'Arts and Culture',
      description: 'Supporting the development of innovative cultural programs and exhibitions.'
    },
    {
      recipient: 'University Name',
      amount: '$1,750,000',
      program: 'Higher Learning',
      description: 'Advancing inclusive teaching and learning initiatives in higher education.'
    },
    {
      recipient: 'Research Institute',
      amount: '$3,000,000',
      program: 'Public Knowledge',
      description: 'Preserving and digitizing important historical archives.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '60vh',
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: '#FFFFFF'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '600px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              OPEN CALLS
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Supporting transformative ideas and initiatives in the arts and humanities.
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
              Apply for a Grant
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Grants Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#121212' }}>
        <Container maxWidth="lg">
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="grants navigation">
            <Tab label="Recent Grants" />
            <Tab label="Grant Programs" />
            <Tab label="Application Process" />
          </Tabs>
        </Container>
      </Box>

      {/* Recent Grants Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {tabValue === 0 && (
            <Grid container spacing={4}>
              {recentGrants.map((grant, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {grant.recipient}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {grant.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Program: {grant.program}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { md: 'flex-end' } }}>
                          <Typography variant="h4" sx={{ mb: 2, color: 'var(--primary-color)' }}>
                            {grant.amount}
                          </Typography>
                          <Button
                            endIcon={<ArrowForwardIcon />}
                            sx={{ color: 'var(--primary-color)' }}
                          >
                            View Details
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Grant Programs
              </Typography>
              <Typography variant="body1">
                Information about our grant programs will be displayed here.
              </Typography>
            </Box>
          )}

          {tabValue === 2 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Application Process
              </Typography>
              <Typography variant="body1">
                Details about the grant application process will be shown here.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Resources Section */}
      <Box sx={{ py: 8, backgroundColor: '#1e1e1e', color: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Grant Resources
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Application Guidelines
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Learn about our grant application requirements and process.
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: 'var(--primary-color)' }}
                  >
                    View Guidelines
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    FAQs
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Find answers to commonly asked questions about our grants.
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: 'var(--primary-color)' }}
                  >
                    Read FAQs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Contact Us
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Get in touch with our grants team for assistance.
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: 'var(--primary-color)' }}
                  >
                    Contact
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Grants; 