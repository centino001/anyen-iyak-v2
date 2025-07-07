import React, { useState, Suspense, useEffect } from 'react';
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

interface Program {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  goals: string[];
  requirements: string[];
  applicationUrl?: string;
  slug: string;
}

interface FormData {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  goals: string[];
  requirements: string[];
  applicationUrl: string;
}

const INITIAL_FORM_DATA: FormData = {
  title: '',
  description: '',
  shortDescription: '',
  category: '',
  startDate: new Date(),
  endDate: null,
  isActive: true,
  goals: [],
  requirements: [],
  applicationUrl: '',
};

const ProgramManagement = () => {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  
  useEffect(() => {
    import('react-quill').then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { data: programs, loading, error } = useDataFetch<Program>('/programs/admin/all', { isAdminRoute: true });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (program?: Program) => {
    if (program) {
      setSelectedProgram(program);
      setFormData({
        title: program.title,
        description: program.description,
        shortDescription: program.shortDescription,
        category: program.category,
        startDate: new Date(program.startDate),
        endDate: program.endDate ? new Date(program.endDate) : null,
        isActive: program.isActive,
        goals: program.goals,
        requirements: program.requirements,
        applicationUrl: program.applicationUrl || '',
      });
      if (program.image) {
        setImagePreview(program.image);
      } else {
        setImagePreview('');
      }
    } else {
      setSelectedProgram(null);
      setFormData(INITIAL_FORM_DATA);
      setImagePreview('');
    }
    setSelectedImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProgram(null);
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('File size too large. Maximum size is 5MB.', 'error');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        showSnackbar('Invalid file type. Only JPEG, PNG, GIF, and JPG are allowed.', 'error');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        showSnackbar('Error reading file. Please try another image.', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        showSnackbar('Title is required', 'error');
        return;
      }
      if (!formData.description.trim()) {
        showSnackbar('Description is required', 'error');
        return;
      }
      if (!formData.shortDescription.trim()) {
        showSnackbar('Short description is required', 'error');
        return;
      }
      if (!formData.category) {
        showSnackbar('Category is required', 'error');
        return;
      }
      if (!formData.startDate) {
        showSnackbar('Start date is required', 'error');
        return;
      }

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

      const url = selectedProgram
        ? `${process.env.REACT_APP_API_URL}/programs/${selectedProgram._id}`
        : `${process.env.REACT_APP_API_URL}/programs`;

      const response = await fetch(url, {
        method: selectedProgram ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save program');
      }

      showSnackbar(
        `Program ${selectedProgram ? 'updated' : 'created'} successfully`,
        'success'
      );
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving program:', error);
      showSnackbar(error instanceof Error ? error.message : 'Error saving program', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/programs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete program');
      }

      showSnackbar('Program deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting program:', error);
      showSnackbar('Error deleting program', 'error');
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
        <Typography variant="h4">Program Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Program
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
              <TableCell>Start Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program._id}>
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
                      src={program.image} 
                      alt={program.title}
                      fallbackIcon={<ImageIcon sx={{ color: 'grey.400' }} />}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                </TableCell>
                <TableCell>{program.title}</TableCell>
                <TableCell>{program.category}</TableCell>
                <TableCell>{program.isActive ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(program.startDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(program)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(program._id)}>
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
          {selectedProgram ? 'Edit Program' : 'Add Program'}
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
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
              required
            />

            {ReactQuill ? (
              <ReactQuill
                value={formData.description}
                onChange={(value: string) => setFormData({ ...formData, description: value })}
                style={{ height: '200px', marginBottom: '24px' }}
              />
            ) : (
              <div>Loading editor...</div>
            )}

            <TextField
              label="Short Description"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              multiline
              rows={2}
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                <MenuItem value="Higher Learning">Higher Learning</MenuItem>
                <MenuItem value="Arts and Culture">Arts and Culture</MenuItem>
                <MenuItem value="Public Knowledge">Public Knowledge</MenuItem>
                <MenuItem value="Humanities in Place">Humanities in Place</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date || new Date() })}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
              />
            </LocalizationProvider>

            <TextField
              label="Application URL"
              value={formData.applicationUrl}
              onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
              fullWidth
            />

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
            {selectedProgram ? 'Update' : 'Create'}
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

export default ProgramManagement; 