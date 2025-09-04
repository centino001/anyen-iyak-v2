import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useDataFetch from '../../hooks/useDataFetch';

interface CountResponse {
  count: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: newsCountData } = useDataFetch<CountResponse>('/news/count');
  const { data: projectsCountData } = useDataFetch<CountResponse>('/projects/count');
  const { data: peopleCountData } = useDataFetch<CountResponse>('/people/count');

  // Extract counts from response data
  const newsCount = newsCountData && newsCountData.length > 0 ? newsCountData[0].count : 0;
      const projectsCount = projectsCountData && projectsCountData.length > 0 ? projectsCountData[0].count : 0;
  const peopleCount = peopleCountData && peopleCountData.length > 0 ? peopleCountData[0].count : 0;

  const stats = [
    {
      title: 'News Articles',
      count: newsCount.toString(),
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      path: '/admin/news',
      color: '#1976d2',
    },
    {
      title: 'Projects',
      count: projectsCount.toString(),
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      path: '/admin/projects',
      color: '#2e7d32',
    },
    {
      title: 'Team Members',
      count: peopleCount.toString(),
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/admin/people',
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: stat.color,
                color: 'white',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {stat.icon}
                <Typography variant="h4">{stat.count}</Typography>
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage news articles, projects, and team member profiles.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/admin/news')}>
                Manage News
              </Button>
              <Button size="small" onClick={() => navigate('/admin/projects')}>
                Manage Projects
              </Button>
              <Button size="small" onClick={() => navigate('/admin/people')}>
                Manage People
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 