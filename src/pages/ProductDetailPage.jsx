import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Divider,
  CircularProgress,
  Breadcrumbs
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    };
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...cartProduct, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">Product not found</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          Products
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>
      
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box 
              sx={{ 
                height: 400, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                p: 2
              }}
            >
              <img 
                src={product.image} 
                alt={product.title} 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            
            <Typography 
              variant="h5" 
              color="primary" 
              sx={{ fontWeight: 'bold', my: 2 }}
            >
              ${product.price}
            </Typography>
            
            <Box sx={{ 
              display: 'inline-block', 
              bgcolor: 'primary.light', 
              color: 'white', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 1,
              mb: 2
            }}>
              {product.category}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Rating: {product.rating.rate}/5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 4
                }}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="outlined"
                size="large"
                onClick={() => navigate('/products')}
                startIcon={<ArrowBackIcon />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Back to Products
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;