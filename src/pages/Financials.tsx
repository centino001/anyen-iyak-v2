import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';

interface FinancialReport {
  year: string;
  title: string;
  description: string;
  fileSize: string;
  type: string;
}

interface FinancialHighlight {
  title: string;
  value: string;
  description: string;
}

const Financials: React.FC = () => {
  const financialReports: FinancialReport[] = [
    {
      year: '2023',
      title: 'Annual Report',
      description: 'Comprehensive overview of our financial performance and impact.',
      fileSize: '2.5 MB',
      type: 'PDF',
    },
    {
      year: '2023',
      title: 'Form 990-PF',
      description: 'Return of Private Foundation.',
      fileSize: '1.8 MB',
      type: 'PDF',
    },
    {
      year: '2023',
      title: 'Audited Financial Statements',
      description: "Independent auditor's report and financial statements.",
      fileSize: '3.2 MB',
      type: 'PDF',
    },
  ];

  const financialHighlights: FinancialHighlight[] = [
    {
      title: 'Total Assets',
      value: '$9.2 Billion',
      description: 'Market value as of December 31, 2023',
    },
    {
      title: 'Annual Grantmaking',
      value: '$500 Million',
      description: 'Total grants awarded in 2023',
    },
    {
      title: 'Investment Return',
      value: '12.4%',
      description: 'Net investment return for 2023',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '40vh',
        backgroundColor: '#E5E5E5',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              Financial Information
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Transparency and accountability in our financial management.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Financial Highlights */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold' }}>
            Financial Highlights
          </Typography>
          <Grid container spacing={4}>
            {financialHighlights.map((highlight, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h3" sx={{ 
                      color: 'var(--primary-color)',
                      mb: 2,
                      fontWeight: 'bold'
                    }}>
                      {highlight.value}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {highlight.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {highlight.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Financial Reports */}
      <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold' }}>
            Financial Reports
          </Typography>
          <Grid container spacing={4}>
            {financialReports.map((report, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ boxShadow: 'none', border: '1px solid #E5E5E5' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Grid container alignItems="center" spacing={4}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                          {report.year} {report.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {report.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {report.fileSize} • {report.type}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          sx={{
                            backgroundColor: 'var(--primary-color)',
                            '&:hover': {
                              backgroundColor: '#002548',
                            },
                          }}
                        >
                          Download
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Investment Philosophy */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Investment Philosophy
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Our investment strategy focuses on long-term growth and sustainability, enabling us to maintain and expand our support for the arts and humanities. We work with a diverse set of investment managers and maintain a balanced portfolio across multiple asset classes.
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: 'var(--primary-color)',
                  '&:hover': {
                    backgroundColor: '#002548',
                  },
                }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: 400,
                backgroundColor: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Investment Image
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Financials; 