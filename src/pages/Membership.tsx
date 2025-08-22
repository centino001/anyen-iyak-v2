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
    icon: <img src="/images/kids.svg" alt="Kids" style={{ width: 80, height: 80, color: '#D05A34', fill: '#D05A34' }} />,
    benefits: [
      'Free access to kid-friendly workshops, storytelling sessions, and art activities',
      'Special invitations to kids-only exhibitions and interactive events',
      'Welcome pack with child-centered art materials and foundation-branded goodies',
      'Birthday shoutout on the foundation\'s social media',
      '10% discount on merchandise at the foundation\'s shop'
    ],
    color: '#FF6B35'
  },
  {
    id: 'student',
    title: 'Student Membership',
    subtitle: 'Valid student ID required',
    price: '10,000 NGN/month',
    icon: <img src="/images/grad_cap.svg" alt="Student" style={{ width: 80, height: 80, color: '#D05A34', fill: '#D05A34' }} />,
    benefits: [
      'Free access to exhibitions and student-only art forums & mentorship sessions',
      'Discounts on art materials, workshops, and masterclasses',
      'Networking opportunities with artists, curators, and cultural leaders',
      'Priority access to internship and volunteer opportunities',
      '15% discount at the foundation\'s shop and workspace'
    ],
    color: '#FF6B35'
  },
  {
    id: 'individual',
    title: 'Individual Membership',
    subtitle: 'For art and culture enthusiasts',
    price: '25,000 NGN/month',
    icon: <img src="/images/individual.svg" alt="Individual" style={{ width: 80, height: 80, color: '#D05A34', fill: '#D05A34' }} />,
    benefits: [
      'Free year-round admission to the foundation\'s exhibitions and events',
      'Invitations to exclusive exhibition openings and member-only events',
      'Monthly e-newsletter with updates on programs and activities',
      '5% discount at the foundation\'s shop and workspace'
    ],
    color: '#FF6B35'
  },
  {
    id: 'family',
    title: 'Family Membership',
    subtitle: 'For up to 4 family members',
    price: '50,000 NGN/month',
    icon: <img src="/images/family.svg" alt="Family" style={{ width: 80, height: 80, color: '#D05A34', fill: '#D05A34' }} />,
    benefits: [
      'Admission for up to 4 family members to all exhibitions and events',
      'Special family-friendly workshops and interactive activities',
      'Discounts on art programs and classes for both children and adults',
      'Exclusive invitations to family-oriented events',
      '10% discount at the foundation\'s shop and café'
    ],
    color: '#FF6B35'
  }
];

const premiumMemberships = [
  {
    id: 'corporate',
    title: 'Corporate Membership',
    subtitle: 'For businesses and organizations',
    price: '5,000,000 NGN/year',
    icon: <img src="/images/corporate.svg" alt="Corporate" style={{ width: 60, height: 60, color: '#D05A34', fill: '#D05A34' }} />,
    benefits: [
      'Opportunities to host corporate events at the foundation\'s venue',
      'Invitations to exclusive member-only events',
      'Brand recognition at foundation events and publications',
      'Free access to the foundation\'s workspace',
      'Discounted rates for corporate cultural retreats and team-building activities'
    ],
    color: '#FF6B35'
  },
  {
    id: 'elite',
    title: 'Anyen Iyak Circle',
    subtitle: 'Elite Membership',
    price: '2,500,000 NGN/year',
    icon: (
      <Box sx={{ position: 'relative' }}>
        <img src="/images/elite.svg" alt="Elite" style={{ width: 60, height: 60, color: '#D05A34', fill: '#D05A34' }} />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          color: 'white',
          fontWeight: 'bold',
          opacity: 0.8
        }}>
          ★
        </Box>
      </Box>
    ),
    benefits: [
      'All benefits of supporting membership',
      'Monthly e-newsletter with updates on programs and activities',
      'Invitation to the annual patrons\' dinner',
      'Opportunities to attend art/research trips for free or at discounted rates',
      'Prominent recognition on AIFAC platforms and event materials',
      'Exclusive access to behind-the-scenes cultural and artistic projects'
    ],
    color: '#FF6B35'
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
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: '#1a1a1a',
        py: 8,
        textAlign: 'center',
        // border: '2px solid #6a4c93',
        mx: 4,
        mt: 4,
        mb: 6
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              color: 'white',
              mb: 2,
              lineHeight: 1.2
            }}
          >
            Join Anyen Iyak Foundation For Art And Culture<br />
            And Be Part Of Preserving And Promoting Our<br />
            Rich Heritage.
              </Typography>
        </Container>
      </Box>

      {/* Become a Member Banner - Full Width */}
      <Box sx={{ 
        backgroundColor: '#D05A34', 
        py: 3, 
                  mb: 4, 
        width: '100%'
      }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            BECOME A MEMBER
                </Typography>
        </Container>
      </Box>

      {/* Description Text */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            fontSize: '0.9rem',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.6
          }}
        >
          At Anyen Iyak, We Share A Deep Love For Cultural Heritage That's Why We're Committed To Preserving Akwa Ibom Art And Culture So They Are Not Just Remembered But Passed On. 
          Whether You're An Artist, Collector, Educator, Student, Or Simply Someone Who Appreciates The Beauty And Power Of Art, There's A Membership Level That's Right For You. Being A Member Of Our Tot Society
          Membership Provides Access To Programs, Networks, And Initiatives That Help Preserve And Grow Akwa Ibom's Creative And Cultural Economy.
            </Typography>
      </Container>

      {/* Section Title */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'white',
            textAlign: 'left',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          INDIVIDUAL AND FAMILY MEMBERSHIPS
        </Typography>
      </Container>

      {/* Membership Cards */}
      <Container maxWidth="xl" sx={{ pb: 8, px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={4}>
            {membershipTypes.map((membership, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: '#2a2a2a',
                  borderRadius: 0,
                  p: 3,
                  pt: 5,
                    height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                    position: 'relative',
                  mt: 1
                }}
              >
                {/* Icon - Positioned outside card (floating) */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 2,
                  position: 'relative',
                  top: '-85px',
                  zIndex: 2
                  }}>
                    <Box sx={{ 
                    p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                      {membership.icon}
                    </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    mb: 1,
                    mt: -10,
                  }}
                >
                        {membership.title}
                      </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '0.8rem',
                    color: '#ccc',
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                        {membership.subtitle}
                      </Typography>

                {/* Price */}
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '1.1rem',
                    color: '#D05A34',
                    textAlign: 'center',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                        {membership.price}
                      </Typography>

                {/* HR Line */}
                <Box sx={{ 
                  borderTop: '1px solid #444',
                  mb: 3
                }} />

                {/* Features */}
                <Box sx={{ flexGrow: 1, mb: 3 }}>
                  {membership.benefits.map((benefit, featureIndex) => (
                    <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{
                        color: '#D05A34',
                        fontSize: '18px',
                        mt: 0.25,
                        mr: 1.5,
                        flexShrink: 0
                      }} />
                      <Typography
                        sx={{
                          fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          fontSize: '0.75rem',
                          color: 'white',
                          lineHeight: 1.4
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                        ))}
                </Box>

                {/* Join Button with Home page style */}
                <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1 }}>
                      <Button 
                        onClick={() => handleOpen(membership.id)}
                        sx={{ 
                      backgroundColor: '#D05A34',
                      color: 'white',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      borderRadius: 0,
                      minHeight: '48px',
                      flex: 1,
                          '&:hover': {
                        backgroundColor: '#B8472A'
                          }
                        }}
                      >
                    JOIN TODAY
                      </Button>
                  <Box
                    sx={{
                      backgroundColor: '#D05A34',
                      minHeight: '48px',
                      width: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#B8472A'
                      }
                    }}
                    onClick={() => handleOpen(membership.id)}
                  >
                    <ArrowForwardIcon sx={{ color: 'white', fontSize: '28px', transform: 'rotate(-45deg)' }} />
                  </Box>
                </Box>
              </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

      {/* Premium Memberships Section */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'white',
            textAlign: 'left',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          PREMIUM MEMBERSHIPS
            </Typography>
      </Container>

      {/* Premium Membership Cards */}
      <Container maxWidth="xl" sx={{ pb: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Empty space on the left to balance the layout */}
          <Grid item xs={0} sm={0} md={1}></Grid>

          {/* First premium card - starts from edge, larger size */}
          <Grid item xs={12} sm={6} md={4.5}>
            <Box
              sx={{
                backgroundColor: '#2a2a2a',
                borderRadius: 0,
                p: 3,
                    height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Top section with icon and title/subtitle */}
      <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                mb: 2
              }}>
                {/* Icon */}
                      <Box sx={{ 
                        width: 60,
                        height: 60,
                  backgroundColor: '#D05A34',
                  borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                  mr: 2,
                  flexShrink: 0
                      }}>
                  {premiumMemberships[0].icon}
                      </Box>

                {/* Title and Subtitle next to icon */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'white',
                      textTransform: 'uppercase',
                      mt: 1,
                      mb: 0.5,
                      lineHeight: 1.2
                    }}
                  >
                    {premiumMemberships[0].title}
                        </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.8rem',
                      color: '#ccc',
                      lineHeight: 1.2
                    }}
                  >
                    {premiumMemberships[0].subtitle}
                        </Typography>
                      </Box>
                    </Box>
                    
              {/* Price under the icon */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '1.1rem',
                    color: '#D05A34',
                    fontWeight: 600
                  }}
                >
                  {premiumMemberships[0].price}
                    </Typography>
              </Box>

              {/* HR Line */}
              <Box sx={{ 
                borderTop: '1px solid #444',
                mb: 3
              }} />

              {/* Features */}
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                {premiumMemberships[0].benefits.map((benefit, featureIndex) => (
                  <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{
                      color: '#D05A34',
                      fontSize: '18px',
                      mt: 0.25,
                      mr: 1.5,
                      flexShrink: 0
                    }} />
                    <Typography
                      sx={{
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '0.75rem',
                        color: 'white',
                        lineHeight: 1.4
                      }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Join Button with Home page style */}
              <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1 }}>
                    <Button 
                  onClick={() => handleOpen(premiumMemberships[0].id)}
                      sx={{ 
                    backgroundColor: '#D05A34',
                    color: 'white',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    px: 3,
                        py: 1.5,
                    fontSize: '0.9rem',
                    borderRadius: 0,
                    minHeight: '48px',
                    flex: 1,
                        '&:hover': {
                      backgroundColor: '#B8472A'
                        }
                      }}
                    >
                  JOIN TODAY
                    </Button>
                <Box
                  sx={{
                    backgroundColor: '#D05A34',
                    minHeight: '48px',
                    width: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#B8472A'
                    }
                  }}
                  onClick={() => handleOpen(premiumMemberships[0].id)}
                >
                  <ArrowForwardIcon sx={{ color: 'white', fontSize: '28px', transform: 'rotate(-45deg)' }} />
      </Box>
              </Box>
            </Box>
          </Grid>

          {/* Empty space to push second card to the right */}
          <Grid item xs={0} sm={0} md={1}></Grid>

          {/* Second premium card - aligned with last individual card position */}
          <Grid item xs={12} sm={6} md={4.5}>
            <Box
              sx={{
                backgroundColor: '#2a2a2a',
                borderRadius: 0,
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
        position: 'relative'
              }}
            >
              {/* Top section with icon and title/subtitle */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                mb: 2
              }}>
                {/* Icon */}
                      <Box sx={{ 
                        width: 60,
                        height: 60,
                  backgroundColor: '#D05A34',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                  mr: 2,
                  flexShrink: 0
                }}>
                  {premiumMemberships[1].icon}
                </Box>

                {/* Title and Subtitle next to icon */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'white',
                      textTransform: 'uppercase',
                      mt: 1,
                      mb: 0.5,
                      lineHeight: 1.2
                    }}
                  >
                    {premiumMemberships[1].title}
              </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '0.8rem',
                      color: '#ccc',
                      lineHeight: 1.2
                    }}
                  >
                    {premiumMemberships[1].subtitle}
              </Typography>
                      </Box>
                    </Box>
                    
              {/* Price under the icon */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: '1.1rem',
                    color: '#D05A34',
                    fontWeight: 600
                  }}
                >
                  {premiumMemberships[1].price}
                    </Typography>
              </Box>

              {/* HR Line */}
              <Box sx={{ 
                borderTop: '1px solid #444',
                mb: 3
              }} />

              {/* Features */}
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                {premiumMemberships[1].benefits.map((benefit, featureIndex) => (
                  <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{
                      color: '#D05A34',
                      fontSize: '18px',
                      mt: 0.25,
                      mr: 1.5,
                      flexShrink: 0
                    }} />
                    <Typography
                      sx={{
                        fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '0.75rem',
                        color: 'white',
                        lineHeight: 1.4
                      }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Join Button with Home page style */}
              <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1 }}>
              <Button 
                  onClick={() => handleOpen(premiumMemberships[1].id)}
                sx={{ 
                    backgroundColor: '#D05A34',
                    color: 'white',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    px: 3,
                  py: 1.5,
                    fontSize: '0.9rem',
                    borderRadius: 0,
                    minHeight: '48px',
                    flex: 1,
                  '&:hover': {
                      backgroundColor: '#B8472A'
                  }
                }}
              >
                  JOIN TODAY
              </Button>
                <Box
                  sx={{
                    backgroundColor: '#D05A34',
                    minHeight: '48px',
                    width: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#B8472A'
                    }
                  }}
                  onClick={() => handleOpen(premiumMemberships[1].id)}
                >
                  <ArrowForwardIcon sx={{ color: 'white', fontSize: '28px', transform: 'rotate(-45deg)' }} />
            </Box>
      </Box>
            </Box>
              </Grid>

          {/* Empty space on the right to balance the layout */}
          <Grid item xs={0} sm={0} md={1}></Grid>
          </Grid>
        </Container>

      {/* Call to Action Section */}


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