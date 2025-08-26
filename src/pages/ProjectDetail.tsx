import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { fetchProjects } from '../utils/api';
import { Project } from '../types';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projects = await fetchProjects();
        const foundProject = projects.find(p => p.slug === slug);
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
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
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#666', fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
            Loading project...
          </Typography>
          <Box sx={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            mx: 'auto',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
        </Box>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="error" sx={{ mb: 2, fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
            {error || 'Project not found'}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/projects')}
            sx={{ 
              backgroundColor: '#007bff',
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            Back to Projects
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content - Left Side */}
          <Grid item xs={12} lg={project.requiresDonation ? 8 : 12}>
            {/* Project Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 2,
                  color: '#1a1a1a',
                  textAlign: 'justify'
                }}
              >
                {project.title}
              </Typography>

              {/* Project Image */}
              {project.image && (
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    mb: 4
                  }}
                />
              )}
            </Box>

            {/* Funding Progress */}
            {project.requiresDonation && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' },
                    color: '#007bff',
                    mb: 1,
                    textAlign: 'justify'
                  }}
                >
                  {formatCurrency(project.currentFunding || 0)}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    color: '#666',
                    mb: 3,
                    textAlign: 'justify'
                  }}
                >
                  Raised of {project.fundraisingGoal ? formatCurrency(project.fundraisingGoal) : 'goal'}
                </Typography>
              </Box>
            )}

            {/* Project Description */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  mb: 2,
                  color: '#1a1a1a',
                  textAlign: 'justify'
                }}
              >
                Our goal
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  color: '#333',
                  mb: 2,
                  whiteSpace: 'pre-wrap',
                  textAlign: 'justify'
                }}
              >
                {project.description}
              </Typography>
              
              {project.shortDescription && (
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '1.125rem',
                    lineHeight: 1.7,
                    color: '#333',
                    whiteSpace: 'pre-wrap',
                    textAlign: 'justify'
                  }}
                >
                  {project.shortDescription}
                </Typography>
              )}
            </Box>

            {/* Contributors Section */}
            {project.requiresDonation && project.contributors && project.contributors.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    mb: 2,
                    color: '#1a1a1a',
                    textAlign: 'justify'
                  }}
                >
                  Contributions
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    color: '#666',
                    mb: 3,
                    textAlign: 'justify'
                  }}
                >
                  {project.contributors.length}
                </Typography>

                <Grid container spacing={2}>
                  {project.contributors.slice(0, 5).map((contributor, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: '#007bff' }}>
                          {contributor.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                              fontWeight: 600,
                              color: '#1a1a1a',
                              textAlign: 'justify'
                            }}
                          >
                            {contributor.isAnonymous ? 'Anonymous' : contributor.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                              color: '#666',
                              textAlign: 'justify'
                            }}
                          >
                            {formatCurrency(contributor.amount)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {project.contributors.length > 5 && (
                  <Button
                    variant="text"
                    sx={{
                      color: '#007bff',
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      textTransform: 'none',
                      mt: 2
                    }}
                  >
                    View all
                  </Button>
                )}
              </Box>
            )}
          </Grid>

          {/* Floating Donation Card - Right Side */}
          {project.requiresDonation && (
            <Grid item xs={12} lg={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    backgroundColor: 'white',
                    p: 3
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* Funding Progress */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 700,
                          color: '#007bff',
                          mb: 1,
                          textAlign: 'justify'
                        }}
                      >
                        {formatCurrency(project.currentFunding || 0)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          color: '#666',
                          mb: 2,
                          textAlign: 'justify'
                        }}
                      >
                        Raised of {project.fundraisingGoal ? formatCurrency(project.fundraisingGoal) : 'goal'}
                      </Typography>
                    </Box>

                    {/* Donate Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        py: 1.5,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                        mb: 3,
                        '&:hover': {
                          backgroundColor: '#0056b3'
                        }
                      }}
                    >
                      Contribute
                    </Button>

                    {/* Benefits */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          color: '#666',
                          textAlign: 'justify',
                          mb: 1
                        }}
                      >
                        100% tax-deductible
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          color: '#666',
                          textAlign: 'justify',
                          mb: 1
                        }}
                      >
                        No fees
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          color: '#666',
                          textAlign: 'justify'
                        }}
                      >
                        100% goes to program recipients
                      </Typography>
                    </Box>

                    {/* Share Button */}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#007bff',
                        color: '#007bff',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                        '&:hover': {
                          borderColor: '#0056b3',
                          backgroundColor: 'rgba(0, 123, 255, 0.1)'
                        }
                      }}
                    >
                      Share
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetail; 