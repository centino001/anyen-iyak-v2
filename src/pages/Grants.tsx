import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import useDataFetch from '../hooks/useDataFetch';
import EmptyState from '../components/EmptyState';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageIcon from '@mui/icons-material/Image';
import { useTheme } from '@mui/material/styles';

interface Grant {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  image?: string;
  startDate: string;
  deadline: string;
  isActive: boolean;
  fundingAmount: string;
  slug: string;
}

interface GrantsResponse {
  grants: Grant[];
  totalPages: number;
  currentPage: number;
}

const Grants: React.FC = () => {
  const { data, loading, error } = useDataFetch<GrantsResponse>('/grants');
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
          message="Error loading open calls. Please try again later."
          icon={<AssignmentIcon sx={{ fontSize: 64, color: 'error.main' }} />}
        />
      );
    }

    if (!data || data.length === 0 || !data[0]?.grants || data[0].grants.length === 0) {
      return (
        <EmptyState 
          message="No open calls available at the moment. Please check back later."
          icon={<AssignmentIcon sx={{ fontSize: 64 }} />}
        />
      );
    }

    const grants = data[0]?.grants || [];

    return (
      <Grid container spacing={4}>
        {grants.map((grant: Grant) => (
          <Grid item xs={12} sm={6} md={4} key={grant._id}>
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
              to={`/grants/${grant.slug}`}
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
                  src={grant.image}
                  alt={grant.title}
                  fallbackIcon={<ImageIcon sx={{ fontSize: 60, color: 'grey.400' }} />}
                  sx={{ width: '100%', height: '100%' }}
                />
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                  {grant.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {grant.shortDescription}
                </Typography>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
                  Funding: {grant.fundingAmount}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                  Deadline: {new Date(grant.deadline).toLocaleDateString()}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: 'var(--primary-color)' }}
                >
                  View Details
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
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: '#FFFFFF'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
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
          </Box>
        </Container>
      </Box>

      {/* Grants Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#121212' }}>
        <Container maxWidth="lg">
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="grants navigation">
            <Tab label="Current Open Calls" />

          </Tabs>
        </Container>
      </Box>

      {/* Grants Grid */}
      <Box sx={{ py: 8, backgroundColor: '#121212' }}>
        <Container maxWidth="lg">
          {tabValue === 0 && renderContent()}

          {tabValue === 1 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
                Past Opportunities
              </Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>
                Archive of our previous open calls and grant opportunities.
              </Typography>
            </Box>
          )}

          {tabValue === 2 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
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
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Grants; 