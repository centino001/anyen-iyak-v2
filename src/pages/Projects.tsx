import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Button
} from '@mui/material';
import { fetchProjects } from '../utils/api';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

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
      month: 'short',
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

  const handleCardClick = (project: Project) => {
    navigate(`/projects/${project.slug}`);
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
            Loading projects...
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

  if (error) {
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
            Error: {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{ 
              backgroundColor: '#007bff',
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
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
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#666',
                mb: 2
              }}
            >
              No Projects Available
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#999',
                mb: 4,
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              There are currently no projects available. Check back later or contact an administrator to add new projects.
            </Typography>
            <Box sx={{ fontSize: '4rem', opacity: 0.3, mb: 2 }}>🎨</Box>
          </Container>
        </Box>
    </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
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

      {/* Projects Grid Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
 

          {/* Projects Grid */}
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid 
                item 
                xs={12} 
                sm={projects.length === 1 ? 12 : 6} 
                md={projects.length === 1 ? 12 : 6} 
                key={project._id}
              >
                <Card
                  onClick={() => handleCardClick(project)}
                  sx={{
                    height: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                      '& .project-image': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  {/* Project Image */}
                  <Box
                    className="project-image"
                    sx={{
                      height: '300px',
                      backgroundImage: project.image ? `url(${project.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      transition: 'transform 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                      }
                    }}
                  >
                    {!project.image && (
                    <Box
                      sx={{
                        position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '3rem',
                          opacity: 0.7,
                          zIndex: 2
                        }}
                      >
                        🎨
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    {/* Project Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 600,
                        fontSize: '1.125rem',
                          mb: 1,
                        lineHeight: 1.3,
                        color: '#1a1a1a'
                        }}
                      >
                      {project.title}
                      </Typography>

                    {/* Category */}
                      <Typography
                        variant="body2"
                        sx={{
                        color: '#666',
                          mb: 2,
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                      {project.category}
                      </Typography>

                    {/* Funding Information - Only show if requires donation */}
                    {project.requiresDonation && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: '#1a1a1a',
                            mb: 0.5
                          }}
                        >
                          {formatCurrency(project.currentFunding || 0)}
                        </Typography>
                        {project.fundraisingGoal && (
                      <Typography
                        variant="body2"
                        sx={{
                              color: '#666',
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                              fontWeight: 500
                        }}
                      >
                            / {formatCurrency(project.fundraisingGoal)} goal
                      </Typography>
                        )}
                    </Box>
                    )}

                    {/* Project Status - Only show if requires donation */}
                    {project.requiresDonation && (
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label="Fundraising"
                          size="small"
                          sx={{
                            backgroundColor: '#fff3cd',
                            color: '#856404',
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: '24px',
                            '& .MuiChip-label': {
                              px: 1.5
                            }
                          }}
                        />
                  </Box>
                    )}

                    {/* Last Activity */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontSize: '0.875rem',
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                        mb: 3
                      }}
                    >
                      {project.requiresDonation && project.contributors && project.contributors.length > 0
                        ? `Last contribution ${getTimeAgo(project.contributors[0].contributedAt)}`
                        : `Started ${formatDate(project.startDate)}`
                      }
                    </Typography>
                  </CardContent>
                </Card>
                </Grid>
            ))}
          </Grid>

          {/* Pagination Info */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {projects.length} / {projects.length} projects shown
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Projects; 