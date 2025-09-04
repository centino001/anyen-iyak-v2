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
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../contexts/AdminContext';
import useDataFetch from '../../hooks/useDataFetch';
import useFormSubmit from '../../hooks/useFormSubmit';
import ImageWithFallback from '../../components/ImageWithFallback';
import { Person } from '../../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';



interface FormData {
  name: string;
  title: string;
  role: string;
  department: string;
  phone: string;
  order: number;
  isLeadership: boolean;
  socialLinks: {
    twitter: string;
    linkedin: string;
  };
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  title: '',
  role: '',
  department: 'Core Team', // Set default department
  phone: '',
  order: 0,
  isLeadership: false,
  socialLinks: {
    twitter: '',
    linkedin: '',
  },
};

const DEPARTMENTS = [
  'Executive Leadership',
  'Board of Directors',
  'Expert Advisors',
  'Core Team',
  'Champions'
];

const PeopleManagement = () => {
  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data: people, loading, error } = useDataFetch<Person>('/people/admin/all', { 
    isAdminRoute: true,
    refreshTrigger: refreshTrigger > 0
  });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (person?: Person) => {
    if (person) {
      setSelectedPerson(person);
      setFormData({
        name: person.name,
        title: person.title,
        role: person.role || '',
        department: person.department,
        phone: person.phone || '',
        order: person.order,
        isLeadership: person.isLeadership,
        socialLinks: {
          twitter: person.socialLinks?.twitter || '',
          linkedin: person.socialLinks?.linkedin || '',
        },
      });
      if (person.image) {
        console.log('Person has image:', person.image);
        setImagePreview(person.image);
      } else {
        console.log('Person has no image');
        setImagePreview('');
      }
    } else {
      setSelectedPerson(null);
      setFormData(INITIAL_FORM_DATA);
      setImagePreview('');
    }
    setSelectedImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPerson(null);
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('File size exceeds 5MB limit', 'error');
      event.target.value = '';
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showSnackbar('Invalid file type. Please upload a JPEG, PNG, or GIF image.', 'error');
      event.target.value = '';
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.onerror = () => {
      showSnackbar('Error reading file', 'error');
      event.target.value = '';
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate required fields
      const errors = [];
      if (!formData.name) errors.push('Name is required');
      if (!formData.title) errors.push('Title is required');
      if (!formData.department) errors.push('Department is required');
  

      if (errors.length > 0) {
        setSnackbar({
          open: true,
          message: `Validation failed: ${errors.join(', ')}`,
          severity: 'error'
        });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('department', formData.department);

      if (formData.phone) formDataToSend.append('phone', formData.phone);
      formDataToSend.append('order', formData.order.toString());
      formDataToSend.append('isLeadership', formData.isLeadership.toString());
      formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        `${API_BASE_URL}/people${selectedPerson ? `/${selectedPerson._id}` : ''}`,
        {
          method: selectedPerson ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
          body: formDataToSend,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      showSnackbar(
        `Person ${selectedPerson ? 'updated' : 'created'} successfully`,
        'success'
      );
      
      // Close the dialog first
      handleClose();
      
      // Then refresh the data
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error: any) {
      console.error('Error saving person:', error);
      
      let errorMessage = 'Failed to save person. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showSnackbar(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/people/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete person');
      }

      showSnackbar('Person deleted successfully', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting person:', error);
      showSnackbar('Error deleting person', 'error');
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
        <Typography variant="h4">People Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Person
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Leadership</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person._id}>
                <TableCell>
                  <Box sx={{ 
                    width: 80, 
                    height: 100, 
                    overflow: 'hidden',
                    borderRadius: 1,
                    padding: '5px',
                    backgroundColor: '#E5E5E5'
                  }}>
                    <ImageWithFallback 
                      src={person.image} 
                      alt={`${person.name}`}
                      fallbackIcon={<PersonIcon sx={{ color: 'grey.400' }} />}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                </TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.title}</TableCell>
                <TableCell>{person.department}</TableCell>
                <TableCell>{person.isLeadership ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(person)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(person._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPerson ? 'Edit Person' : 'Add Person'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {imagePreview ? (
                  <Box
                    sx={{
                      width: 160,
                      height: 200,
                      overflow: 'hidden',
                      borderRadius: 1,
                      padding: '10px',
                      backgroundColor: '#E5E5E5'
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 160,
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'grey.100',
                      borderRadius: 1,
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                  </Box>
                )}
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>

              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
              />

              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
                required
              />

              <TextField
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                fullWidth
                placeholder="e.g., Senior Developer, Project Manager, etc."
                helperText="Optional: Specific role or position within the department"
              />

              <FormControl fullWidth required>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  label="Department"
                >
                  {DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>





              <TextField
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                fullWidth
              />

              <TextField
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                fullWidth
                helperText="Lower numbers appear first"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isLeadership}
                    onChange={(e) => setFormData({ ...formData, isLeadership: e.target.checked })}
                  />
                }
                label="Leadership Team Member"
              />

              <Typography variant="subtitle1" sx={{ mt: 2 }}>Social Links</Typography>

              <TextField
                label="Twitter URL"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                fullWidth
              />

              <TextField
                label="LinkedIn URL"
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                fullWidth
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Saving...' : (selectedPerson ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PeopleManagement; 