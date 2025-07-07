import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Divider,
  Chip,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import useDataFetch from '../hooks/useDataFetch';
import ImageWithFallback from '../components/ImageWithFallback';
import ArticleIcon from '@mui/icons-material/Article';
import EmptyState from '../components/EmptyState';

interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  publishDate: string;
  author: string;
  slug: string;
  isPublished: boolean;
}

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: newsData, loading, error } = useDataFetch<NewsArticle>(`/news/${slug}`);
  const article = newsData[0];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <EmptyState
        message="Error loading news article. Please try again later."
        icon={<ErrorIcon sx={{ fontSize: 64, color: 'error.main' }} />}
      />
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Breadcrumbs separator="/" sx={{ mb: 3 }}>
          <Button component={Link} to="/news" startIcon={<ArrowBackIcon />} sx={{ color: 'var(--primary-color)' }}>
            Back to News
          </Button>
        </Breadcrumbs>
        
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {/* Featured Image */}
          <Box sx={{ 
            width: '100%', 
            height: 400, 
            backgroundColor: '#E5E5E5', 
            borderRadius: 2, 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 4 
          }}>
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              fallbackIcon={<ArticleIcon sx={{ fontSize: 80, color: 'grey.400' }} />}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          {/* Article Meta */}
          <Box sx={{ mb: 3 }}>
            <Chip 
              label={article.category} 
              sx={{ 
                backgroundColor: 'var(--primary-color)', 
                color: 'white',
                mb: 2
              }} 
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  By {article.author}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Article Title */}
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            {article.title}
          </Typography>

          {/* Article Excerpt */}
          {article.excerpt && (
            <>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                {article.excerpt}
              </Typography>
              <Divider sx={{ mb: 4 }} />
            </>
          )}

          {/* Article Content */}
          <Box sx={{ 
            '& p': { mb: 2, lineHeight: 1.8 },
            '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 3, mb: 2, fontWeight: 'bold' },
            '& ul, & ol': { mb: 2, pl: 3 },
            '& li': { mb: 1 },
            '& blockquote': { 
              borderLeft: '4px solid var(--primary-color)', 
              pl: 2, 
              ml: 0, 
              fontStyle: 'italic',
              backgroundColor: 'rgba(184, 134, 11, 0.05)',
              py: 1
            }
          }}>
            <Typography variant="body1" component="div">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </Typography>
          </Box>

          {/* Share/Back Section */}
          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #E5E5E5' }}>
            <Button
              component={Link}
              to="/news"
              startIcon={<ArrowBackIcon />}
              sx={{ 
                color: 'var(--primary-color)',
                '&:hover': {
                  backgroundColor: 'rgba(184, 134, 11, 0.1)'
                }
              }}
            >
              Back to All News
            </Button>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
};

export default NewsDetail; 