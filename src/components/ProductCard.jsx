import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Tooltip, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';

const ProductCard = ({ filteredProducts, handleAddToCart }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const handleWishlistToggle = (product) => {
    let updated;
    if (wishlist.some((item) => item.id === product.id)) {
      updated = wishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <Grid
      container
      spacing={6}
      sx={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {filteredProducts.map((product) => (
        <Grid item key={product.id}>
          <Card
            sx={{
              height: "100%",
              width: 270,
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.25s cubic-bezier(.4,2,.6,1)",
              boxShadow: "0px 4px 10px rgba(0, 128, 32, 0.21)",
              borderRadius: 3,
              background: "linear-gradient(180deg, #ffffffff 20%,rgba(191, 191, 191, 0.59) 100%)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: "0px 12px 32px 0px rgba(56, 142, 60, 0.15)",
                border: "1px solid rgba(0, 130, 22, 0.59)",
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
              <Tooltip title={wishlist.some((item) => item.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist"}>
                <IconButton
                  onClick={e => {
                    e.stopPropagation();
                    handleWishlistToggle(product);
                  }}
                  color={wishlist.some((item) => item.id === product.id) ? 'error' : 'default'}
                  sx={{ background: '#fff', boxShadow: 1, '&:hover': { background: '#ffe0e0' } }}
                >
                  {wishlist.some((item) => item.id === product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            </Box>
            <Tooltip title="Click to view product details" placement="top">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    objectFit: "contain",
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    background: "#ffffffff",
                    boxShadow: "0px 0px 8px rgba(56, 142, 60, 0.04)",
                    p: 1,
                  }}
                />
              </Box>
            </Tooltip>

            <CardContent sx={{ flexGrow: 1, p: 2, pb: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.02rem",
                  minHeight: 20,
                  color: "text.primary",
                  mb: 1,
                  textAlign: "center",
                  lineHeight: 1.2,
                  letterSpacing: 0.1,
                }}
              >
                {product.title.length > 20 ? product.title.slice(0, 20) + "…" : product.title}
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
                  mb: 1.7,
                  minHeight: 33,
                  textAlign: "center",
                  fontSize: "0.7rem",
                }}
              >
                {product.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    background: "rgba(69, 70, 69, 0.69)",
                    color: "primary.contrastText",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    px: 1.5,
                    fontSize: "0.59rem",
                    letterSpacing: 0.1,
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "secondary.main",
                      background: "rgba(10, 13, 10, 0.64)",
                      fontSize: "0.76rem",
                      px: 1.6,
                      borderRadius: 2,
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
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
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  py: 1.2,
                  background: "linear-gradient(90deg, #035f07ff 80%, #035f07ff 100%)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(56,142,60,0.08)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2e7d32 80%, #2e7d32 100%)",
                    boxShadow: "0 6px 16px rgba(255,193,7,0.10)",
                  },
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
