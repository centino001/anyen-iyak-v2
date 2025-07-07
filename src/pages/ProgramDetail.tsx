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
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import useDataFetch from '../hooks/useDataFetch';
import ImageWithFallback from '../components/ImageWithFallback';
import ImageIcon from '@mui/icons-material/Image';
import EmptyState from '../components/EmptyState';

interface Program {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  goals?: string[];
  requirements?: string[];
  applicationUrl?: string;
  slug: string;
}

const ProgramDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: programData, loading, error } = useDataFetch<Program>(`/programs/${slug}`);
  const program = programData[0];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !program) {
    return (
      <EmptyState
        message="Error loading program details. Please try again later."
        icon={<ErrorIcon sx={{ fontSize: 64, color: 'error.main' }} />}
      />
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Breadcrumbs separator="/" sx={{ mb: 3 }}>
          <Button component={Link} to="/programs" startIcon={<ArrowBackIcon />} sx={{ color: 'var(--primary-color)' }}>
            Back to Programs
          </Button>
        </Breadcrumbs>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Box sx={{ width: '100%', height: 320, backgroundColor: '#E5E5E5', borderRadius: 2, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <ImageWithFallback
              src={program.image}
              alt={program.title}
              fallbackIcon={<ImageIcon sx={{ fontSize: 80, color: 'grey.400' }} />}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            {program.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            {program.shortDescription}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            <span dangerouslySetInnerHTML={{ __html: program.description }} />
          </Typography>
          {program.applicationUrl && (
            <Button
              variant="contained"
              color="primary"
              href={program.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2 }}
            >
              Apply / Learn More
            </Button>
          )}
          {program.goals && program.goals.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Program Goals
              </Typography>
              <List>
                {program.goals.map((goal, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={goal} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {program.requirements && program.requirements.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Requirements
              </Typography>
              <List>
                {program.requirements.map((req, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Container>
    </Fade>
  );
};

export default ProgramDetail; 