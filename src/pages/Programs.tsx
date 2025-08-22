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
import { fetchPrograms } from '../utils/api';
import { Program } from '../types';

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
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

  const handleCardClick = (program: Program) => {
    navigate(`/programs/${program.slug}`);
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
            Loading programs...
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

  if (programs.length === 0) {
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
              No Programs Available
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#999',
                mb: 4,
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              There are currently no programs available. Check back later or contact an administrator to add new programs.
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

      {/* Programs Grid Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
 

          {/* Programs Grid */}
          <Grid container spacing={3}>
            {programs.map((program) => (
              <Grid 
                item 
                xs={12} 
                sm={programs.length === 1 ? 12 : 6} 
                md={programs.length === 1 ? 12 : 6} 
                key={program._id}
              >
                <Card
                  onClick={() => handleCardClick(program)}
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
                      '& .program-image': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  {/* Program Image */}
                  <Box
                    className="program-image"
                    sx={{
                      height: '300px',
                      backgroundImage: program.image ? `url(${program.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                    {!program.image && (
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
                    {/* Program Title */}
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
                      {program.title}
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
                      {program.category}
                      </Typography>

                    {/* Funding Information - Only show if requires donation */}
                    {program.requiresDonation && (
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
                          {formatCurrency(program.currentFunding || 0)}
                        </Typography>
                        {program.fundraisingGoal && (
                      <Typography
                        variant="body2"
                        sx={{
                              color: '#666',
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                              fontWeight: 500
                        }}
                      >
                            / {formatCurrency(program.fundraisingGoal)} goal
                      </Typography>
                        )}
                    </Box>
                    )}

                    {/* Program Status - Only show if requires donation */}
                    {program.requiresDonation && (
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
                      {program.requiresDonation && program.contributors && program.contributors.length > 0
                        ? `Last contribution ${getTimeAgo(program.contributors[0].contributedAt)}`
                        : `Started ${formatDate(program.startDate)}`
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
              {programs.length} / {programs.length} programs shown
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Programs; 