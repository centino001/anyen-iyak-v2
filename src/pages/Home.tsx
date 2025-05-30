import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, CardMedia, CircularProgress, Fade, Grow, Slide, Zoom, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import useDataFetch from '../hooks/useDataFetch';
import EmptyState from '../components/EmptyState';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import ImageWithFallback from '../components/ImageWithFallback';

interface Program {
  _id: string;
  title: string;
  shortDescription: string;
  image?: string;
  slug: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  image?: string;
  publishDate: string;
  author: string;
  slug: string;
}

const Home: React.FC = () => {
  const { data: programs, loading: programsLoading } = useDataFetch<Program>('/programs');
  const { data: news, loading: newsLoading } = useDataFetch<NewsArticle>('/news');

  const renderFeaturedPrograms = () => {
    if (programsLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, minHeight: '300px', alignItems: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
        </Box>
      );
    }

    if (!programs || programs.length === 0) {
      return (
        <Fade in timeout={800}>
          <Box>
            <EmptyState 
              message="No programs available at the moment."
              icon={<AssignmentIcon sx={{ fontSize: 64 }} />}
            />
          </Box>
        </Fade>
      );
    }

    return (
      <Grid container spacing={4}>
        {programs.slice(0, 3).map((program, index) => (
          <Grid item xs={12} md={4} key={program._id}>
            <Grow in timeout={800 + (index * 200)}>
              <Card sx={{ 
                height: '100%', 
                boxShadow: 'none', 
                border: '1px solid #E5E5E5',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }
              }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 350,
                    width: '100%',
                    backgroundColor: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '10px',
                    borderRadius: 1
                  }}
                >
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    fallbackIcon={<AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary' }} />}
                    sx={{ 
                      width: '100%', 
                      height: '100%',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: 'var(--primary-color)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}>
                    {program.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {program.shortDescription}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/programs/${program.slug}`}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      color: 'var(--primary-color)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderNewsUpdates = () => {
    if (newsLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, minHeight: '300px', alignItems: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
        </Box>
      );
    }

    if (!news || news.length === 0) {
      return (
        <Fade in timeout={800}>
          <Box>
            <EmptyState 
              message="No news articles available at the moment."
              icon={<ArticleIcon sx={{ fontSize: 64 }} />}
            />
          </Box>
        </Fade>
      );
    }

    return (
      <Grid container spacing={4}>
        {news.slice(0, 4).map((article, index) => (
          <Grid item xs={12} md={6} key={article._id}>
            <Fade in timeout={800 + (index * 200)}>
              <Card sx={{ 
                display: 'flex', 
                boxShadow: 'none', 
                backgroundColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                }
              }}>
                <Box sx={{ 
                  width: 250, 
                  height: 250, 
                  backgroundColor: '#E5E5E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '10px',
                  borderRadius: 1
                }}>
                  <ImageWithFallback 
                    src={article.image} 
                    alt={article.title}
                    fallbackIcon={<ArticleIcon sx={{ fontSize: 60, color: 'text.secondary' }} />}
                    sx={{ 
                      width: '100%', 
                      height: '100%',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {new Date(article.publishDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '40px',
                      height: '2px',
                      backgroundColor: 'var(--primary-color)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}>
                    {article.title}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/news/${article.slug}`}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      color: 'var(--primary-color)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '80vh',
        backgroundImage: 'url(/images/aif.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }
      }}>
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3 }, 
            position: 'relative', 
            zIndex: 2, 
            pt: '300px',
            ml: '5px',
            mr: 'auto',
            width: 'auto'
          }}
        >
          <Slide direction="right" in timeout={1000}>
            <Box sx={{ maxWidth: '1200px', pl: '20px', textAlign: 'left' }}>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.0rem', md: '3.0rem' },
                mb: 3,
                color: 'white',
                textAlign: 'justify',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-family)',
                fontWeight: 300
              }}>
                Like the eyes of a fish that never closes in life or death,{'\n'}
                We see our Past, as we bring it to the Present in order to carry it forth to the Future.
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 4, 
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                color: 'white',
                fontWeight: 'bolder',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-family)'
              }}>
                Our eyes will never be shut in life or death.
              </Typography>

            </Box>
          </Slide>
        </Container>
      </Box>

      {/* Featured Programs Section */}
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
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 4, 
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
              Featured Programs
            </Typography>
          </Fade>
          {renderFeaturedPrograms()}
        </Container>
      </Box>

      {/* News & Updates Section */}
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
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 4, 
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
              News & Updates
            </Typography>
          </Fade>
          {renderNewsUpdates()}
        </Container>
      </Box>

      {/* Impact Section */}
      <Box sx={{ py: 8, backgroundColor: '#1e1e1e' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1000}>
                <Box sx={{ 
                  height: 400,
                  backgroundColor: '#E5E5E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}>
                  <img 
                    src="/images/john.jpg" 
                    alt="Ibibio Dancer" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in timeout={1000}>
                <Box>
                  <Typography variant="h4" sx={{ 
                    mb: 3, 
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
                    Contribute to OUR MISSION
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
                  Support our mission to preserve and promote art and culture, foster artistic development and unify the African Art and culture ecosystem.
                  </Typography>
                  <Stack spacing={2} direction="column" sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/membership"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderColor: 'var(--primary-color)',
                        color: 'var(--primary-color)',
                        transition: 'all 0.3s ease',
                        justifyContent: 'flex-start',
                        '&:hover': {
                          borderColor: 'var(--primary-color)',
                          backgroundColor: 'rgba(184, 134, 11, 0.05)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      Become a Member
                    </Button>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/donate"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderColor: 'var(--primary-color)',
                        color: 'var(--primary-color)',
                        transition: 'all 0.3s ease',
                        justifyContent: 'flex-start',
                        '&:hover': {
                          borderColor: 'var(--primary-color)',
                          backgroundColor: 'rgba(184, 134, 11, 0.05)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      Donate
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 