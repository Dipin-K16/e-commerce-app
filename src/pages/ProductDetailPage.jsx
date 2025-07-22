import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Box, Paper, Divider, CircularProgress, Breadcrumbs } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

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

    if (loading) {
        return (
            <Container
                sx={{ py: 4, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (!product) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h5" color="error">
                    Product not found
                </Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/products")} sx={{ mt: 2 }}>
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Breadcrumbs sx={{ mb: 3, alignSelf: "flex-start" }}>
                <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                    Products
                </Link>
                <Typography
                    color="text.primary"
                    sx={{ maxWidth: 320, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {product.title}
                </Typography>
            </Breadcrumbs>

            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, sm: 5 },
                    borderRadius: 4,
                    boxShadow: "0px 8px 32px 0px rgba(56, 142, 60, 0.10)",
                    background: (theme) =>
                        theme.palette.mode === "light"
                            ? "linear-gradient(135deg, #fff 80%, #f9fbe7 100%)"
                            : "linear-gradient(135deg, #23272F 80%, #181A20 100%)",
                    width: "100%",
                    maxWidth: 1100,
                }}
            >
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    wrap="nowrap"
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                    <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box
                            sx={{
                                width: { xs: 220, sm: 300, md: 340 },
                                height: { xs: 220, sm: 320, md: 360 },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "linear-gradient(135deg, #f5f5f5 80%, #e8f5e9 100%)",
                                borderRadius: 3,
                                p: 2,
                                boxShadow: "0 4px 24px 0px rgba(56,142,60,0.10)",
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    borderRadius: 16,
                                    boxShadow: "0 2px 16px 0px rgba(56,142,60,0.10)",
                                    background: "#fff",
                                    padding: 12,
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7} sx={{ width: "100%" }}>
                        <Typography
                            variant="h5"
                            component="h4"
                            gutterBottom
                            sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}
                        >
                            {product.title}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    background: "linear-gradient(90deg, #035f07ff 80%, #035f07ff 100%)",
                                    color: "secondary.light",
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    boxShadow: "0 2px 8px rgba(56,142,60,0.08)",
                                    letterSpacing: 0.5,
                                }}
                            >
                                ${product.price}
                            </Box>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    bgcolor: "secondary.main",
                                    color: "primary.contrastText",
                                    px: 2,
                                    py: 0.7,
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    textTransform: "capitalize",
                                    letterSpacing: 0.2,
                                    boxShadow: "0 2px 8px rgba(255,193,7,0.08)",
                                }}
                            >
                                {product.category}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{ fontSize: "1.08rem", color: "text.secondary", mb: 3 }}
                        >
                            {product.description}
                        </Typography>

                        {product.rating && (
                            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}>
                                <Box
                                    sx={{
                                        display: "inline-block",
                                        background: "linear-gradient(90deg, #035f07ff 80%, #035f07ff 100%)",
                                        color: "#fff",
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        letterSpacing: 0.2,
                                    }}
                                >
                                    {product.rating.rate} ★
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    ({product.rating.count} reviews)
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCartIcon />}
                                onClick={handleAddToCart}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    px: 5,
                                    py: 1.5,
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

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate("/products")}
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    px: 4,
                                    py: 1.5,
                                    color: "primary.main",
                                    borderColor: "primary.main",
                                    background: "rgba(56,142,60,0.03)",
                                    "&:hover": {
                                        background: "rgba(56,142,60,0.08)",
                                    },
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
