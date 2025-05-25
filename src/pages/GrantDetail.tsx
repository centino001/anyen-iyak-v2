import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Fade,
  Zoom,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import useDataFetch from '../hooks/useDataFetch';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageIcon from '@mui/icons-material/Image';
import EmptyState from '../components/EmptyState';
import { format } from 'date-fns';

interface Grant {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image?: string;
  startDate: string;
  deadline: string;
  isActive: boolean;
  fundingAmount: string;
  eligibility: string[];
  applicationUrl?: string;
}

const GrantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: grantData, loading, error } = useDataFetch<Grant>(`/grants/${id}`);
  
  // Extract grant from data array
  const grant = grantData && grantData.length > 0 ? grantData[0] : null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !grant) {
    return (
      <EmptyState
        message="Error loading grant details. Please try again later."
        icon={<ErrorIcon sx={{ fontSize: 64, color: 'error.main' }} />}
      />
    );
  }

  const isDeadlinePassed = new Date(grant.deadline) < new Date();

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {/* Hero Section with Image */}
        <Box
          sx={{
            backgroundColor: '#121212',
            backgroundImage: grant.image ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${grant.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 8,
            color: 'white',
          }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs 
              separator={<ChevronRightIcon fontSize="small" />} 
              sx={{ color: 'white', mb: 2 }}
            >
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              <Link to="/grants" style={{ color: 'white', textDecoration: 'none' }}>Open Calls</Link>
              <Typography color="white">{grant.title}</Typography>
            </Breadcrumbs>
            
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
              {grant.title}
            </Typography>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {grant.shortDescription}
                </Typography>
                
                <Typography variant="h6" sx={{ color: 'var(--primary-color)', mt: 2 }}>
                  Funding: {grant.fundingAmount}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <TimeIcon sx={{ mr: 1, color: isDeadlinePassed ? 'error.main' : 'success.main' }} />
                  <Typography>
                    {isDeadlinePassed ? 'Deadline passed: ' : 'Deadline: '}
                    {format(new Date(grant.deadline), 'MMMM d, yyyy')}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                {grant.applicationUrl && !isDeadlinePassed && (
                  <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                    <Button
                      variant="contained"
                      size="large"
                      href={grant.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        mt: { xs: 3, md: 0 },
                        backgroundColor: 'var(--primary-color)',
                        '&:hover': {
                          backgroundColor: '#c99212',
                        },
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Apply Now
                    </Button>
                  </Zoom>
                )}
                {isDeadlinePassed && (
                  <Paper sx={{ p: 2, bgcolor: 'error.dark', color: 'white' }}>
                    <Typography variant="h6">
                      Application Period Closed
                    </Typography>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Box sx={{ py: 6, backgroundColor: '#121212' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                  About This Opportunity
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
                    {grant.description.split('\n').map((paragraph, index) => (
                      <React.Fragment key={index}>
                        {paragraph}
                        <br /><br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </Box>

                {grant.image && (
                  <Box sx={{ mb: 4, display: { xs: 'block', md: 'none' } }}>
                    <ImageWithFallback
                      src={grant.image}
                      alt={grant.title}
                      fallbackIcon={<ImageIcon sx={{ fontSize: 80, color: 'grey.400' }} />}
                      sx={{ width: '100%', borderRadius: 1 }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {grant.category}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Opening Date
                    </Typography>
                    <Typography variant="body1">
                      {format(new Date(grant.startDate), 'MMMM d, yyyy')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Deadline
                    </Typography>
                    <Typography variant="body1" color={isDeadlinePassed ? 'error.main' : 'inherit'}>
                      {format(new Date(grant.deadline), 'MMMM d, yyyy')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Funding Amount
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {grant.fundingAmount}
                    </Typography>
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Eligibility
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List disablePadding>
                    {grant.eligibility.map((criterion, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={criterion} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                component={Link}
                to="/grants"
                startIcon={<ArrowBackIcon />}
                sx={{ color: 'var(--primary-color)' }}
              >
                Back to All Open Calls
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
};

export default GrantDetail; 