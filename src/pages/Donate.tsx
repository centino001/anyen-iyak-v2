import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Fade,
  Slide,
  Modal,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Donate: React.FC = () => {
  // State for modal
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    customAmount: '',
    paymentMethod: ''
  });

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    if (submitSuccess) {
      setFormData({
        name: '',
        email: '',
        amount: '',
        customAmount: '',
        paymentMethod: ''
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      amount: formData.amount === 'custom' ? formData.customAmount : formData.amount
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', submissionData);
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

  // Predefined donation amounts
  const donationAmounts = [
    { value: '5000', label: '₦5,000' },
    { value: '10000', label: '₦10,000' },
    { value: '25000', label: '₦25,000' },
    { value: '50000', label: '₦50,000' },
    { value: '100000', label: '₦100,000' },
    { value: 'custom', label: 'Custom Amount' }
  ];

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
                Support Our Cause
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: 'white' }}>
                Your contribution helps preserve and promote Akwa Ibom's rich cultural heritage.
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
                  Make a Difference
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  At the Anyen Iyak Foundation for Art and Culture, we're passionate about promoting art and cultural preservation in Akwa Ibom. Your support allows us to continue the work we do for our cultural heritage.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Donations help fund cultural programs, community outreach, and platforms for local creatives, ensuring that the history and culture of Akwa Ibom thrive for generations.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Your contribution is vital in making this vision a reality.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleOpen}
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
                  Donate Now
                </Button>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Impact Section */}
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
              Your Impact
            </Typography>
          </Fade>
          
          <Grid container spacing={4}>
            {[
              {
                title: 'Cultural Programs',
                description: "Support workshops, exhibitions, and events that showcase Akwa Ibom's rich heritage"
              },
              {
                title: 'Community Outreach',
                description: 'Help us reach more communities and engage with local artists and cultural practitioners'
              },
              {
                title: 'Creative Platform',
                description: 'Provide opportunities for local creatives to showcase and develop their talents'
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #333',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Donation Form Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="donation-form-modal"
        aria-describedby="modal-to-make-a-donation"
      >
        <Box sx={modalStyle}>
          {submitSuccess ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'var(--primary-color)', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                Thank You!
              </Typography>
              <Typography variant="body1">
                Your donation has been received. We appreciate your support in preserving Akwa Ibom's cultural heritage.
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Make a Donation
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
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
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
                      <InputLabel id="amount-label">Donation Amount</InputLabel>
                      <Select
                        labelId="amount-label"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleSelectChange}
                        label="Donation Amount"
                        required
                      >
                        {donationAmounts.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {formData.amount === 'custom' && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Custom Amount (₦)"
                        name="customAmount"
                        type="number"
                        value={formData.customAmount}
                        onChange={handleInputChange}
                        variant="outlined"
                        inputProps={{ min: 1000 }}
                      />
                    </Grid>
                  )}
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="payment-method-label">Payment Method</InputLabel>
                      <Select
                        labelId="payment-method-label"
                        id="payment-method"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleSelectChange}
                        label="Payment Method"
                        required
                      >
                        <MenuItem value="card">Credit/Debit Card</MenuItem>
                        <MenuItem value="bank">Bank Transfer</MenuItem>
                        <MenuItem value="ussd">USSD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
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
                        'Complete Donation'
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

export default Donate; 