import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ).filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={item.image} variant="square" sx={{ width: 60, height: 60, objectFit: 'contain' }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price} · ${item.category}`}
                      sx={{ ml: 2 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                      <IconButton size="small" onClick={() => handleDecreaseQuantity(item.id)}>
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => handleIncreaseQuantity(item.id)}>
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">${calculateTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => alert('Checkout functionality would be implemented here')}
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;