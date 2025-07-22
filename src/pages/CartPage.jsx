import { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: "80vh" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 4 }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ color: "text.secondary", fontWeight: 500 }}>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            sx={{
              mt: 3,
              fontWeight: 700,
              fontSize: "1.1rem",
              borderRadius: 3,
              background: "primary.main",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(56,142,60,0.08)",
              "&:hover": {
                background: "linear-gradient(90deg, #2e7d32 80%, #2e7d32 100%)",
                boxShadow: "0 6px 16px rgba(255,193,7,0.10)",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #fff 80%, #f9fbe7 100%)"
                    : "linear-gradient(135deg, #23272F 80%, #181A20 100%)",
                borderRadius: 4,
                boxShadow: "0px 4px 24px 0px rgba(56, 142, 60, 0.10)",
                p: { xs: 2, sm: 4 },
              }}
            >
              <List>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <ListItem
                      sx={{
                        borderRadius: 3,
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(56,142,60,0.04)",
                        mb: 2,
                        px: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                      }}
                    >
                      <Box sx={{ display: "flex", width: "100%", alignItems: "center", mb: { xs: 1, sm: 0 } }}>
                        <ListItemAvatar>
                          <Avatar
                            alt={item.title}
                            src={item.image}
                            variant="square"
                            sx={{ width: 60, height: 60, objectFit: "contain", borderRadius: 2, background: "#f5f5f5" }}
                          />
                        </ListItemAvatar>
                        <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "text.primary", ml: 2 }}>
                          {item.title}
                        </Typography>
                      </Box>

                      <Box sx={{ width: "100%", mb: { xs: 1, sm: 0 }, pl: { xs: 2, sm: 0 } }}>
                        <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                          {`$${item.price} · ${item.category}`}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pl: { xs: 2, sm: 0 },
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "primary.main" }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              background: "#f9fbe7",
                              borderRadius: 2,
                              px: 1,
                              mr: 2,
                            }}
                          >
                            <IconButton size="small" onClick={() => handleDecreaseQuantity(item.id)}>
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 1, fontWeight: 600 }}>{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => handleIncreaseQuantity(item.id)}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>

                          <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 3,
                    py: 1.2,
                    color: "primary.main",
                    borderColor: "primary.main",
                    background: "rgba(56,142,60,0.03)",
                    "&:hover": {
                      background: "rgba(56,142,60,0.08)",
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0px 4px 24px 0px rgba(56, 142, 60, 0.10)",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #fff 80%, #f9fbe7 100%)"
                    : "linear-gradient(135deg, #23272F 80%, #181A20 100%)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">${calculateTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {}}
                  sx={{
                    mt: 2,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    background: "primary.main",
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(56,142,60,0.08)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #2e7d32 80%, #2e7d32 100%)",
                      boxShadow: "0 6px 16px rgba(255,193,7,0.10)",
                    },
                  }}
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
