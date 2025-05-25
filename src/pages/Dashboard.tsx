import React, { useEffect, useState } from 'react';
import useDataFetch from '../hooks/useDataFetch';
import { Person, Program, News, Grant, CountResponse } from '../types';
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { People, School, Article, Work } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const { data: peopleData, loading: peopleLoading, error: peopleError } = useDataFetch<Person>('/people', {});
  const { data: programsData, loading: programsLoading, error: programsError } = useDataFetch<Program>('/programs', {});
  const { data: newsData, loading: newsLoading, error: newsError } = useDataFetch<News>('/news', {});
  const { data: grantsData, loading: grantsLoading, error: grantsError } = useDataFetch<Grant>('/grants', {});
  const { data: peopleCountData, loading: peopleCountLoading, error: peopleCountError } = useDataFetch<CountResponse>('/people/count', {});
  const { data: programsCountData, loading: programsCountLoading, error: programsCountError } = useDataFetch<CountResponse>('/programs/count', {});
  const { data: newsCountData, loading: newsCountLoading, error: newsCountError } = useDataFetch<CountResponse>('/news/count', {});
  const { data: grantsCountData, loading: grantsCountLoading, error: grantsCountError } = useDataFetch<CountResponse>('/grants/count', {});

  return (
    <div>
      {/* Render your components here */}
    </div>
  );
};

export default Dashboard; 