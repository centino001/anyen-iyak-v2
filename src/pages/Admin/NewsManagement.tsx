import React, { useState, useEffect } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useDataFetch from '../../hooks/useDataFetch';
import useFormSubmit from '../../hooks/useFormSubmit';
import ImageWithFallback from '../../components/ImageWithFallback';

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string;
  publishDate: string;
  author: string;
  slug: string;
  isPublished: boolean;
}

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  publishDate: Date;
  isPublished: boolean;
}

const INITIAL_FORM_DATA: FormData = {
  title: '',
  content: '',
  excerpt: '',
  category: '',
  publishDate: new Date(),
  isPublished: false,
};

const NEWS_CATEGORIES = [
  'Press Release',
  'Program Update',
  'Research'
];

const NewsManagement = () => {
  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [ReactQuill, setReactQuill] = useState<any>(null);
  
  useEffect(() => {
    import('react-quill').then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  const { data: news, loading, error } = useDataFetch<NewsArticle>('/news/admin/all', { isAdminRoute: true });
  const { submitForm, isSubmitting } = useFormSubmit();

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleOpen = (article?: NewsArticle) => {
    if (article) {
      setSelectedArticle(article);
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        publishDate: new Date(article.publishDate),
        isPublished: article.isPublished,
      });
      if (article.image) {
        setImagePreview(article.image);
      } else {
        setImagePreview('');
      }
    } else {
      setSelectedArticle(null);
      setFormData(INITIAL_FORM_DATA);
      setImagePreview('');
    }
    setSelectedImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        showSnackbar('Title is required', 'error');
        return;
      }
      if (!formData.content?.trim()) {
        showSnackbar('Content is required', 'error');
        return;
      }
      if (!formData.excerpt?.trim()) {
        showSnackbar('Excerpt is required', 'error');
        return;
      }
      if (!formData.category) {
        showSnackbar('Category is required', 'error');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('content', formData.content.trim());
      formDataToSend.append('excerpt', formData.excerpt.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isPublished', formData.isPublished.toString());
      if (formData.publishDate) {
        formDataToSend.append('publishDate', formData.publishDate.toISOString());
      }
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/news${selectedArticle ? `/${selectedArticle._id}` : ''}`,
        {
          method: selectedArticle ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save news article');
      }

      showSnackbar(
        `News article ${selectedArticle ? 'updated' : 'created'} successfully`,
        'success'
      );
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving news:', error);
      showSnackbar(
        error instanceof Error ? error.message : 'Failed to save news article',
        'error'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete news article');
      }

      showSnackbar('News article deleted successfully', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting news article:', error);
      showSnackbar('Error deleting news article', 'error');
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
        <Typography variant="h4">News Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add News Article
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((article) => (
              <TableRow key={article._id}>
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
                      src={article.image} 
                      alt={article.title}
                      fallbackIcon={<ImageIcon sx={{ color: 'grey.400' }} />}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                </TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.isPublished ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(article.publishDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(article)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(article._id)}>
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
          {selectedArticle ? 'Edit News Article' : 'Add News Article'}
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
                value={formData.content}
                onChange={(value: string) => setFormData({ ...formData, content: value })}
                style={{ height: '200px', marginBottom: '24px' }}
              />
            ) : (
              <div>Loading editor...</div>
            )}

            <TextField
              label="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              multiline
              rows={2}
              fullWidth
              required
              helperText="A short summary of the article"
            />

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                {NEWS_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Publish Date"
                value={formData.publishDate}
                onChange={(date) => setFormData({ ...formData, publishDate: date || new Date() })}
              />
            </LocalizationProvider>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
              }
              label="Published"
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
            {isSubmitting ? 'Saving...' : (selectedArticle ? 'Update' : 'Create')}
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

export default NewsManagement; 