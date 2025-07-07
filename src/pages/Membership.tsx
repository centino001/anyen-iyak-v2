import React, { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Fade,
  Slide,
  Zoom,
  Modal,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
  IconButton,
  Input,
  FormHelperText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link } from 'react-router-dom';

// Define membership types and content
const membershipTypes = [
  {
    id: 'kids',
    title: 'Kids Membership',
    subtitle: 'Ages 5-16',
    price: '5,000 NGN/month',
    icon: <ChildCareIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Free access to kid-friendly workshops, storytelling sessions, and art activities',
      'Special invitations to kids-only exhibitions and interactive events',
      'Welcome pack with child-centered art materials and foundation-branded goodies',
      'Birthday shoutout on the foundation\'s social media',
      '10% discount on merchandise at the foundation\'s shop'
    ],
    color: '#b8860b'
  },
  {
    id: 'student',
    title: 'Student Membership',
    subtitle: 'Valid student ID required',
    price: '10,000 NGN/month',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Free access to exhibitions and student-only art forums & mentorship sessions',
      'Discounts on art materials, workshops, and masterclasses',
      'Networking opportunities with artists, curators, and cultural leaders',
      'Priority access to internship and volunteer opportunities',
      '15% discount at the foundation\'s shop and workspace'
    ],
    color: '#b8860b'
  },
  {
    id: 'individual',
    title: 'Individual Membership',
    subtitle: 'For art and culture enthusiasts',
    price: '25,000 NGN/month',
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Free year-round admission to the foundation\'s exhibitions and events',
      'Invitations to exclusive exhibition openings and member-only events',
      'Monthly e-newsletter with updates on programs and activities',
      '5% discount at the foundation\'s shop and workspace'
    ],
    color: '#b8860b'
  },
  {
    id: 'family',
    title: 'Family Membership',
    subtitle: 'For up to 4 family members',
    price: '50,000 NGN/month',
    icon: <FamilyRestroomIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Admission for up to 4 family members to all exhibitions and events',
      'Special family-friendly workshops and interactive activities',
      'Discounts on art programs and classes for both children and adults',
      'Exclusive invitations to family-oriented events',
      '10% discount at the foundation\'s shop and café'
    ],
    color: '#b8860b'
  }
];

const premiumMemberships = [
  {
    id: 'corporate',
    title: 'Corporate Membership',
    subtitle: 'For businesses and organizations',
    price: '5,000,000 NGN/year',
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'Opportunities to host corporate events at the foundation\'s venue',
      'Invitations to exclusive member-only events',
      'Brand recognition at foundation events and publications',
      'Free access to the foundation\'s workspace',
      'Discounted rates for corporate cultural retreats and team-building activities'
    ],
    color: '#DAA520'
  },
  {
    id: 'elite',
    title: 'Anyen Iyak Circle',
    subtitle: 'Elite Membership',
    price: '2,500,000 NGN/year',
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    benefits: [
      'All benefits of supporting membership',
      'Monthly e-newsletter with updates on programs and activities',
      'Invitation to the annual patrons\' dinner',
      'Opportunities to attend art/research trips for free or at discounted rates',
      'Prominent recognition on AIFAC platforms and event materials',
      'Exclusive access to behind-the-scenes cultural and artistic projects'
    ],
    color: '#DAA520'
  }
];

const Membership: React.FC = () => {
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for modal
  const [open, setOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: '',
    companyName: '',
    schoolName: '',
    studentIdImage: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  // Handle modal open/close
  const handleOpen = (membershipId: string) => {
    setSelectedMembership(membershipId);
    setFormData({
      ...formData,
      membershipType: membershipId
    });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setSelectedFileName('');
    // Reset form after a successful submission if modal is closed
    if (submitSuccess) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        membershipType: '',
        companyName: '',
        schoolName: '',
        studentIdImage: null
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle dropdown change
  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      membershipType: e.target.value
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Comment out the existing code with issues
    /*
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        studentIdImage: file
      });
      setSelectedFileName(file.name);
    }
    */
    
    // New improved file upload handling
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please select an image under 5MB.");
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, JPG, or GIF)");
        return;
      }
      
      // Create a new FileReader to validate the image loads correctly
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        // Successfully loaded the file
        setFormData({
          ...formData,
          studentIdImage: file
        });
        setSelectedFileName(file.name);
      };
      
      reader.onerror = () => {
        alert("Error reading file. Please try another image.");
      };
      
      // Start reading the file
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        if (open) {
          handleClose();
        }
      }, 2000);
    }, 1500);
  };

  // Modal style
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: '#1e1e1e',
    border: '1px solid #333',
    borderTop: '4px solid var(--primary-color)',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '60vh',
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/heroo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center calc(50% + 50px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Slide direction="right" in timeout={1000}>
            <Box sx={{ maxWidth: '800px' }}>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 3,
                color: 'white'
              }}>
                Become a Member
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: 'white' }}>
                Join the Anyen Iyak Foundation for Art and Culture and be part of preserving and promoting our rich heritage.
              </Typography>
            </Box>
          </Slide>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Box sx={{ py: 8, backgroundColor: '#1e1e1e' }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '60px',
                    height: '3px',
                    backgroundColor: 'var(--primary-color)'
                  }
                }}>
                  Membership
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  At Anyen Iyak, we share a deep love for cultural heritage. That's why we're committed to preserving Akwa Ibom art and culture so they are not just remembered but passed on.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Whether you're a student discovering your roots, a creative looking for inspiration or a company that values cultural preservation, our membership is an invitation for you to belong. Membership provides access to programs, networks, and initiatives that help preserve and grow Nigeria's creative and cultural economy.
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  Become a Member today!
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Key Membership Categories
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[
                    'Kids Membership (Ages 5-16)',
                    'Student Membership',
                    'Individual Membership',
                    'Family Membership',
                    'Corporate Membership',
                    'Anyen Iyak Circle (Elite Membership)'
                  ].map((category, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(184, 134, 11, 0.1)',
                        borderLeft: '3px solid var(--primary-color)',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(184, 134, 11, 0.15)',
                          transform: 'translateX(5px)'
                        }
                      }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {category}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Regular Memberships Section */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: '#121212',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: 'var(--primary-color)'
              }
            }}>
              Individual & Family Memberships
            </Typography>
          </Fade>
          
          <Grid container spacing={4}>
            {membershipTypes.map((membership, index) => (
              <Grid item xs={12} sm={6} md={3} key={membership.id}>
                <Zoom in timeout={800 + (index * 200)}>
                  <Card sx={{ 
                    height: '100%', 
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #333',
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      '& .MuiBox-root': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}>
                    <Box sx={{ 
                      position: 'absolute',
                      top: -20,
                      left: 20,
                      bgcolor: membership.color,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'black',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                      {membership.icon}
                    </Box>
                    <CardContent sx={{ pt: 5 }}>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {membership.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        {membership.subtitle}
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        mb: 3, 
                        color: 'var(--primary-color)',
                        fontWeight: 'bold' 
                      }}>
                        {membership.price}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List sx={{ mb: 2 }}>
                        {membership.benefits.map((benefit, index) => (
                          <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36, color: 'var(--primary-color)' }}>
                              <CheckCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText 
                              primary={benefit} 
                              primaryTypographyProps={{ variant: 'body2' }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleOpen(membership.id)}
                        sx={{ 
                          borderColor: 'var(--primary-color)',
                          color: 'var(--primary-color)',
                          '&:hover': {
                            backgroundColor: 'rgba(184, 134, 11, 0.1)',
                            borderColor: 'var(--primary-color)',
                          }
                        }}
                      >
                        Join Today
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Premium Memberships Section */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: '#1e1e1e',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)'
        }
      }}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Typography variant="h4" sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                backgroundColor: 'var(--primary-color)'
              }
            }}>
              Premium Memberships
            </Typography>
          </Fade>
          
          <Grid container spacing={6}>
            {premiumMemberships.map((membership, index) => (
              <Grid item xs={12} md={6} key={membership.id}>
                <Fade in timeout={1000 + (index * 300)}>
                  <Paper sx={{ 
                    p: 4, 
                    height: '100%',
                    backgroundColor: '#121212',
                    borderTop: `4px solid ${membership.color}`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ 
                        mr: 2,
                        bgcolor: membership.color,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black'
                      }}>
                        {membership.icon}
                      </Box>
                      <Box>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                          {membership.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {membership.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h5" sx={{ 
                      mb: 3, 
                      color: 'var(--primary-color)',
                      fontWeight: 'bold' 
                    }}>
                      {membership.price}
                    </Typography>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    <List sx={{ mb: 3 }}>
                      {membership.benefits.map((benefit, index) => (
                        <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36, color: 'var(--primary-color)' }}>
                            <CheckCircleOutlineIcon />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit} 
                            primaryTypographyProps={{ variant: 'body1' }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button 
                      variant="contained" 
                      size="large"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleOpen(membership.id)}
                      sx={{ 
                        backgroundColor: 'var(--primary-color)',
                        color: 'black',
                        fontWeight: 'bold',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#8B6914',
                        }
                      }}
                    >
                      Join Today
                    </Button>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ 
        py: 8, 
        backgroundColor: '#121212',
        textAlign: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Box>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                JOIN US
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', maxWidth: '800px', mx: 'auto' }}>
                Becoming a member of Anyen Iyak Foundation for Art and Culture means actively participating in the preservation and advancement of Nigerian art and culture. Whether as an individual, student, or corporate entity, your membership contributes to a vibrant creative ecosystem while unlocking exclusive benefits.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleOpen('')}
                sx={{ 
                  backgroundColor: 'var(--primary-color)',
                  color: 'black',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#8B6914',
                  }
                }}
              >
                Apply for Membership
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Membership Form Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="membership-form-modal"
        aria-describedby="modal-to-apply-for-membership"
      >
        <Box sx={modalStyle}>
          {submitSuccess ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'var(--primary-color)', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                Application Submitted!
              </Typography>
              <Typography variant="body1">
                Thank you for applying for membership. We'll contact you shortly with next steps.
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Membership Application
                </Typography>
                <IconButton 
                  onClick={handleClose}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="membership-type-label">Membership Type</InputLabel>
                      <Select
                        labelId="membership-type-label"
                        id="membership-type"
                        name="membershipType"
                        value={formData.membershipType}
                        onChange={handleSelectChange}
                        label="Membership Type"
                        required
                      >
                        <MenuItem value="kids">Kids Membership</MenuItem>
                        <MenuItem value="student">Student Membership</MenuItem>
                        <MenuItem value="individual">Individual Membership</MenuItem>
                        <MenuItem value="family">Family Membership</MenuItem>
                        <MenuItem value="corporate">Corporate Membership</MenuItem>
                        <MenuItem value="elite">Anyen Iyak Circle</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {formData.membershipType === 'corporate' && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                  )}

                  {formData.membershipType === 'student' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Name of School"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box 
                          sx={{ 
                            border: '1px dashed #666', 
                            borderRadius: 1,
                            p: 3,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'var(--primary-color)',
                              backgroundColor: 'rgba(184, 134, 11, 0.05)'
                            }
                          }}
                          onClick={handleUploadClick}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                          {formData.studentIdImage ? (
                            <Box sx={{ mb: 2 }}>
                              {/* Comment out potentially problematic image preview code */}
                              {/*
                              <img 
                                src={URL.createObjectURL(formData.studentIdImage)} 
                                alt="Student ID Preview" 
                                style={{ 
                                  maxWidth: '100%', 
                                  maxHeight: '200px', 
                                  borderRadius: '4px',
                                  border: '2px solid var(--primary-color)'
                                }} 
                              />
                              */}
                              
                              {/* More reliable image preview */}
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '200px',
                                  borderRadius: '4px',
                                  border: '2px solid var(--primary-color)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundSize: 'contain',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundImage: `url(${formData.studentIdImage ? URL.createObjectURL(formData.studentIdImage) : ''})`,
                                }}
                              />
                            </Box>
                          ) : (
                            <FileUploadIcon sx={{ fontSize: 40, color: 'var(--primary-color)', mb: 1 }} />
                          )}
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {formData.studentIdImage ? 'Replace Student ID' : 'Upload Student ID'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedFileName ? selectedFileName : 'Click to browse or drag and drop image here (JPEG, PNG, GIF up to 5MB)'}
                          </Typography>
                        </Box>
                        <FormHelperText>Please upload a clear image of your student ID card (max 5MB)</FormHelperText>
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting || (formData.membershipType === 'student' && (!formData.schoolName || !formData.studentIdImage))}
                      sx={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'black',
                        fontWeight: 'bold',
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#8B6914',
                        },
                        '&.Mui-disabled': {
                          backgroundColor: 'rgba(184, 134, 11, 0.5)',
                          color: 'rgba(0, 0, 0, 0.5)'
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: 'black' }} />
                      ) : (
                        'Join Now'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Membership; 