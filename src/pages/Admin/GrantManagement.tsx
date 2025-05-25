import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../contexts/AdminContext';
import useDataFetch from '../../hooks/useDataFetch';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ImageWithFallback from '../../components/ImageWithFallback';

interface Grant {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image?: string;
  startDate: string;
  deadline: string;
  isActive: boolean;
  fundingAmount: string;
  eligibility: string[];
  applicationUrl?: string;
  slug: string;
}

interface FormData {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  startDate: Date;
  deadline: Date;
  isActive: boolean;
  fundingAmount: string;
  eligibility: string[];
  applicationUrl: string;
}

const INITIAL_FORM_DATA: FormData = {
  title: '',
  description: '',
  shortDescription: '',
  category: '',
  startDate: new Date(),
  deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  isActive: true,
  fundingAmount: '',
  eligibility: [],
  applicationUrl: '',
};

const GrantManagement = () => {
  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [eligibilityInput, setEligibilityInput] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { data: grants, loading, error } = useDataFetch<Grant>('/grants/admin/all', { isAdminRoute: true });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (grant?: Grant) => {
    if (grant) {
      setSelectedGrant(grant);
      setFormData({
        title: grant.title,
        description: grant.description,
        shortDescription: grant.shortDescription,
        category: grant.category,
        startDate: new Date(grant.startDate),
        deadline: new Date(grant.deadline),
        isActive: grant.isActive,
        fundingAmount: grant.fundingAmount,
        eligibility: grant.eligibility,
        applicationUrl: grant.applicationUrl || '',
      });
      if (grant.image) {
        setImagePreview(grant.image);
      } else {
        setImagePreview('');
      }
    } else {
      setSelectedGrant(null);
      setFormData(INITIAL_FORM_DATA);
      setImagePreview('');
    }
    setSelectedImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGrant(null);
    setSelectedImage(null);
    setImagePreview('');
    setEligibilityInput('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEligibility = () => {
    if (eligibilityInput.trim()) {
      setFormData({
        ...formData,
        eligibility: [...formData.eligibility, eligibilityInput.trim()]
      });
      setEligibilityInput('');
    }
  };

  const handleRemoveEligibility = (index: number) => {
    const updatedEligibility = [...formData.eligibility];
    updatedEligibility.splice(index, 1);
    setFormData({
      ...formData,
      eligibility: updatedEligibility
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value instanceof Date) {
          formDataToSend.append(key, value.toISOString());
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const url = selectedGrant
        ? `${process.env.REACT_APP_API_URL}/grants/${selectedGrant._id}`
        : `${process.env.REACT_APP_API_URL}/grants`;

      const response = await fetch(url, {
        method: selectedGrant ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to save grant');
      }

      showSnackbar(
        `Grant ${selectedGrant ? 'updated' : 'created'} successfully`,
        'success'
      );
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving grant:', error);
      showSnackbar('Error saving grant', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this grant?')) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/grants/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete grant');
      }

      showSnackbar('Grant deleted successfully', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting grant:', error);
      showSnackbar('Error deleting grant', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Open Calls Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Open Call
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grants && grants.length > 0 ? (
              grants.map((grant: Grant) => (
                <TableRow key={grant._id}>
                  <TableCell>
                    <Box sx={{ width: 60, height: 60 }}>
                      <ImageWithFallback
                        src={grant.image}
                        alt={grant.title}
                        fallbackIcon={<ImageIcon sx={{ fontSize: 40, color: 'grey.400' }} />}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{grant.title}</TableCell>
                  <TableCell>{grant.category}</TableCell>
                  <TableCell>{grant.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{new Date(grant.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(grant)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(grant._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No open calls found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Grant Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedGrant ? 'Edit Open Call' : 'Add Open Call'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <TextField
              label="Short Description"
              fullWidth
              multiline
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              required
              helperText="Brief summary for listings (max 150 characters)"
            />

            <TextField
              label="Full Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <MenuItem value="Research">Research</MenuItem>
                <MenuItem value="Arts and Culture">Arts and Culture</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Community Development">Community Development</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Funding Amount"
              fullWidth
              value={formData.fundingAmount}
              onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
              required
              helperText="E.g., $5,000 - $10,000"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => date && setFormData({ ...formData, startDate: date })}
                  sx={{ flexGrow: 1 }}
                />
                <DatePicker
                  label="Deadline"
                  value={formData.deadline}
                  onChange={(date) => date && setFormData({ ...formData, deadline: date })}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              label="Application URL"
              fullWidth
              value={formData.applicationUrl}
              onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
              helperText="Link to the application form or page"
            />

            <Box>
              <Typography variant="subtitle1">Eligibility Criteria</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Add eligibility criteria"
                  value={eligibilityInput}
                  onChange={(e) => setEligibilityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEligibility()}
                />
                <Button variant="contained" onClick={handleAddEligibility}>
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                {formData.eligibility.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      • {item}
                    </Typography>
                    <IconButton size="small" onClick={() => handleRemoveEligibility(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Image
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="outlined" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {imagePreview && (
                  <Box sx={{ width: 100, height: 100, overflow: 'hidden' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GrantManagement; 