import { useState, useEffect } from "react";
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = existingCart.findIndex((item) => item.id === product.id);

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    };

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...cartProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/cart");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        Our Products
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ width: "100%", justifyContent: "center", display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {products.map((product) => (
            <Grid item key={product.id} >
              <Card
                sx={{
                  height: "100%",
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    cursor: "pointer",
                  },
                  borderRadius: 2,
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    objectFit: "contain",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    noWrap
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                      height: "40px",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                      ${product.price}
                    </Typography>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ backgroundColor: "primary.light", color: "white" }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="medium"
                    variant="contained"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/cart")}
          startIcon={<ShoppingCartIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          View Cart
        </Button>
      </Box>
    </Container>
  );
};

export default ProductsPage;
