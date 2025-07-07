import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button, CircularProgress, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import useDataFetch from '../hooks/useDataFetch';
import EmptyState from '../components/EmptyState';
import ImageWithFallback from '../components/ImageWithFallback';

interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  publishDate: string;
  author: string;
  slug: string;
  isPublished: boolean;
  content: string; // Added content field
}

const News: React.FC = () => {
  const { data: news, loading, error } = useDataFetch<NewsArticle>('/news');
  const theme = useTheme();

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
          message="Error loading news articles. Please try again later."
          icon={<ArticleIcon sx={{ fontSize: 64, color: 'error.main' }} />}
        />
      );
    }

    if (!news || news.length === 0) {
      return (
        <EmptyState 
          message="No news articles available at the moment. Please check back later."
          icon={<ArticleIcon sx={{ fontSize: 64 }} />}
        />
      );
    }

    return (
      <Grid container spacing={4}>
        {news.map((article) => (
          <Grid item xs={12} md={6} key={article._id}>
            <Card 
              sx={{ 
                display: 'flex',
                height: '100%',
                boxShadow: 'none',
                border: '1px solid #E5E5E5',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              component={Link}
              to={`/news/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Box sx={{ 
                width: 300,
                height: 350,
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
                  fallbackIcon={<ArticleIcon sx={{ fontSize: 60, color: 'grey.400' }} />}
                  sx={{ width: '100%', height: '100%' }}
                />
              </Box>
              <CardContent sx={{ flex: 1, p: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  {new Date(article.publishDate).toLocaleDateString()} | {article.category}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                  {article.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {article.excerpt}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    By {article.author}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: 'var(--primary-color)' }}
                  >
                    Read More
                  </Button>
                </Box>
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
        backgroundColor: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              News & Updates
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Stay informed about our latest initiatives and impact.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* News Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default News; 