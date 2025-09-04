import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Email as EmailIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../contexts/AdminContext';
import useDataFetch from '../../hooks/useDataFetch';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  source: string;
  preferences: {
    newsletters: boolean;
    eventUpdates: boolean;
    programAnnouncements: boolean;
  };
}

interface SubscriberStats {
  total: number;
  active: number;
  inactive: number;
  recent: number;
}

const SubscriberManagement: React.FC = () => {
  const { admin } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch subscribers and stats
  const { data: subscribersData, loading: subscribersLoading, error: subscribersError } = useDataFetch<any>(
    `/subscribers/admin/all?status=${statusFilter}`, 
    { isAdminRoute: true }
  );
  
  const { data: statsData, loading: statsLoading } = useDataFetch<SubscriberStats>(
    '/subscribers/admin/stats', 
    { isAdminRoute: true }
  );

  const subscribers = subscribersData?.[0]?.subscribers || [];
  const pagination = subscribersData?.[0]?.pagination || {};
  const stats = statsData?.[0] || { total: 0, active: 0, inactive: 0, recent: 0 };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribers/admin/export?status=${statusFilter}`, {
        headers: {
          'Authorization': `Bearer ${admin?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export subscribers');
      }

      const data = await response.json();
      
      // Convert to CSV and download
      const csvContent = [
        ['Email', 'Status', 'Subscribed Date', 'Source', 'Newsletters', 'Event Updates', 'Program Announcements'].join(','),
        ...data.data.map((sub: any) => [
          sub.email,
          sub.status,
          sub.subscribedAt,
          sub.source,
          sub.newsletters,
          sub.eventUpdates,
          sub.programAnnouncements
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscribers_${statusFilter}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber: Subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setDetailsOpen(true);
  };

  if (subscribersLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Subscriber Management</Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          disabled={subscribers.length === 0}
        >
          Export Subscribers
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Subscribers
                  </Typography>
                  <Typography variant="h4">
                    {stats.total}
                  </Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Active Subscribers
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.active}
                  </Typography>
                </Box>
                <EmailIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Recent (30 days)
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {stats.recent}
                  </Typography>
                </Box>
                <PersonAddIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Unsubscribed
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.inactive}
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'contained' : 'outlined'}
              onClick={() => setStatusFilter(status)}
              size="small"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Subscribers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Subscribed Date</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No subscribers found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber: Subscriber) => (
                <TableRow key={subscriber._id}>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={subscriber.isActive ? 'Active' : 'Inactive'}
                      color={subscriber.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={subscriber.source}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(subscriber)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Subscriber Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Subscriber Details</DialogTitle>
        <DialogContent>
          {selectedSubscriber && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Email:</strong> {selectedSubscriber.email}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Status:</strong>{' '}
                <Chip
                  label={selectedSubscriber.isActive ? 'Active' : 'Inactive'}
                  color={selectedSubscriber.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Subscribed:</strong> {new Date(selectedSubscriber.subscribedAt).toLocaleString()}
              </Typography>
              {selectedSubscriber.unsubscribedAt && (
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Unsubscribed:</strong> {new Date(selectedSubscriber.unsubscribedAt).toLocaleString()}
                </Typography>
              )}
              <Typography variant="subtitle1" gutterBottom>
                <strong>Source:</strong> {selectedSubscriber.source}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                <strong>Preferences:</strong>
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2">
                  • Newsletters: {selectedSubscriber.preferences.newsletters ? '✓' : '✗'}
                </Typography>
                <Typography variant="body2">
                  • Event Updates: {selectedSubscriber.preferences.eventUpdates ? '✓' : '✗'}
                </Typography>
                <Typography variant="body2">
                  • Program Announcements: {selectedSubscriber.preferences.programAnnouncements ? '✓' : '✗'}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriberManagement; 