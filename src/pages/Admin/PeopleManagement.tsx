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

interface Person {
  _id: string;
  name: string;
  title: string;
  department: string;
  image?: string;
  bio: string;
  email: string;
  phone?: string;
  order: number;
  isLeadership: boolean;
  slug: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

interface FormData {
  name: string;
  title: string;
  department: string;
  bio: string;
  email: string;
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
  department: '',
  bio: '',
  email: '',
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
  'Board of Governors',
  'Programs',
  'Finance & Administration',
  'Communications',
  'Archives'
];

const PeopleManagement = () => {
  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const { submitForm, isSubmitting } = useFormSubmit();

  const { data: people, loading, error } = useDataFetch<Person>('/people/admin/all', { isAdminRoute: true });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (person?: Person) => {
    if (person) {
      setSelectedPerson(person);
      setFormData({
        name: person.name,
        title: person.title,
        department: person.department,
        bio: person.bio,
        email: person.email,
        phone: person.phone || '',
        order: person.order,
        isLeadership: person.isLeadership,
        socialLinks: {
          twitter: person.socialLinks?.twitter || '',
          linkedin: person.socialLinks?.linkedin || '',
        },
      });
      if (person.image) {
        setImagePreview(person.image);
      } else {
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
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        showSnackbar('Name is required', 'error');
        return;
      }
      if (!formData.title.trim()) {
        showSnackbar('Title is required', 'error');
        return;
      }
      if (!formData.department) {
        showSnackbar('Department is required', 'error');
        return;
      }
      if (!formData.bio.trim()) {
        showSnackbar('Bio is required', 'error');
        return;
      }
      if (!formData.email.trim()) {
        showSnackbar('Email is required', 'error');
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'socialLinks') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const url = selectedPerson
        ? `${process.env.REACT_APP_API_URL}/people/${selectedPerson._id}`
        : `${process.env.REACT_APP_API_URL}/people`;

      await submitForm(url, formDataToSend, selectedPerson ? 'PUT' : 'POST', {
        onSuccess: () => {
          showSnackbar(
            `Person ${selectedPerson ? 'updated' : 'created'} successfully`,
            'success'
          );
          handleClose();
          window.location.reload();
        },
        onError: (error) => {
          console.error('Error details:', error);
          showSnackbar(error.message || 'Error saving person', 'error');
        },
      });
    } catch (error) {
      console.error('Error saving person:', error);
      showSnackbar(
        error instanceof Error ? error.message : 'Error saving person',
        'error'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/people/${id}`, {
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
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              multiline
              rows={4}
              fullWidth
              required
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              required
            />

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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isSubmitting}
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