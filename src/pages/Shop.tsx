import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Shop: React.FC = () => {
  const shopItems = [
    {
      id: 1,
      name: 'Anyen Iyak T-Shirt',
      price: '$25.00',
      image: '/placeholder.jpg'
    },
    {
      id: 2,
      name: 'Anyen Iyak Tote Bag',
      price: '$15.00',
      image: '/placeholder.jpg'
    },
    {
      id: 3,
      name: 'Anyen Iyak Mug',
      price: '$12.00',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        height: '40vh',
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: '#FFFFFF'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3
            }}>
              SHOP
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Support our mission through our exclusive merchandise.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Shop Items */}
      <Box sx={{ py: 8, backgroundColor: '#121212' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {shopItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    boxShadow: 'none',
                    border: '1px solid #E5E5E5',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={item.image}
                    alt={item.name}
                    sx={{ backgroundColor: '#E5E5E5' }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 'bold' }}>
                      {item.price}
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        backgroundColor: 'var(--primary-color)',
                        '&:hover': {
                          backgroundColor: '#002548',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Coming Soon Message */}
      <Box sx={{ py: 4, backgroundColor: '#1e1e1e', color: '#FFFFFF' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            More products coming soon!
          </Typography>
          <Typography variant="body1">
            We're constantly adding new items to our shop. Check back regularly for updates.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Shop; 