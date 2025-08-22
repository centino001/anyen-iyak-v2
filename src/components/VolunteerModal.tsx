import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { submitVolunteerApplication } from '../utils/api';

interface VolunteerModalProps {
  open: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    portfolioUrl: '',
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    socialMediaLink: '',
    volunteerRole: ''
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const volunteerRoles = [
    'Event Coordinator',
    'Content Creator',
    'Social Media Manager',
    'Photographer/Videographer',
    'Graphic Designer',
    'Administrative Support',
    'Community Outreach',
    'Fundraising Coordinator',
    'Cultural Program Assistant',
    'Research Assistant',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await submitVolunteerApplication(formData);

      setAlert({
        show: true,
        type: 'success',
        message: 'Volunteer application submitted successfully!'
      });

      // Reset form
      setFormData({
        portfolioUrl: '',
        firstName: '',
        surname: '',
        email: '',
        phoneNumber: '',
        socialMediaLink: '',
        volunteerRole: ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setAlert({ show: false, type: 'success', message: '' });
      }, 2000);

    } catch (error: any) {
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'Failed to submit application. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setAlert({ show: false, type: 'success', message: '' });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 3, 
        pb: 2,
        backgroundColor: '#D05A34',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Volunteer Application
        </Typography>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: 'white',
            minWidth: 'auto',
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {alert.show && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 3 }}
            onClose={() => setAlert({ show: false, type: 'success', message: '' })}
          >
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Surname"
                value={formData.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                helperText="Your email address for communication"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Portfolio/CV URL (Google Drive)"
                placeholder="https://drive.google.com/..."
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                helperText="Link to your portfolio in Google Drive"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Social Media Link"
                placeholder="https://linkedin.com/in/... or https://twitter.com/..."
                value={formData.socialMediaLink}
                onChange={(e) => handleInputChange('socialMediaLink', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                helperText="Your LinkedIn, Twitter, or other professional profile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Volunteer Role Interested in"
                placeholder="Finance or Development"
                value={formData.volunteerRole}
                onChange={(e) => handleInputChange('volunteerRole', e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                helperText="Type in the role you are interested in"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Volunteer Role</InputLabel>
                <Select
                  value={formData.volunteerRole}
                  label="Volunteer Role"
                  onChange={(e) => handleInputChange('volunteerRole', e.target.value)}
                  required
                  disabled={loading}
                >
                  {volunteerRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.05)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#D05A34',
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#B0452A'
            },
            '&:disabled': {
              backgroundColor: '#ccc'
            }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Submitting...
            </Box>
          ) : (
            'Submit Application'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VolunteerModal; 