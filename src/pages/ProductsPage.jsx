import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider as MuiDivider,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Chip, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [drawerOpen, setDrawerOpen] = useState(false);
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

        const fetchCategories = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setCategories([]);
            }
        };

        fetchProducts();
        fetchCategories();
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
        // navigate("/cart");
    };

    const filteredProducts =
        selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory);

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setDrawerOpen(false);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, display: "flex", flexDirection: "row" }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 220,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 220,
                        boxSizing: "border-box",
                        // background: 'primary.background',
                        borderRight: "1px solid #e0e0e0",
                        pt: 2,
                        mt: 9,
                    },
                    display: { xs: "none", md: "block" },
                }}
                open
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                        Categories
                    </Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedCategory === "all"}
                                onClick={() => handleCategorySelect("all")}
                            >
                                <ListItemText primary="All" />
                            </ListItemButton>
                        </ListItem>
                        {categories.map((cat) => (
                            <ListItem key={cat} disablePadding>
                                <ListItemButton
                                    selected={selectedCategory === cat}
                                    onClick={() => handleCategorySelect(cat)}
                                >
                                    <ListItemText
                                        primary={cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ display: { xs: "block", md: "none" }, position: "fixed", top: 90, left: 10, zIndex: 1201 }}>
                <IconButton
                    onClick={() => setDrawerOpen(true)}
                    sx={{ background: "primary.main", color: "#fff", boxShadow: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 220,
                            background: "linear-gradient(135deg, #fff 80%, #f9fbe7 100%)",
                            borderRight: "1px solid #e0e0e0",
                            pt: 8,
                        },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "primary.main" }}>
                            Categories
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={selectedCategory === "all"}
                                    onClick={() => handleCategorySelect("all")}
                                >
                                    <ListItemText primary="All" />
                                </ListItemButton>
                            </ListItem>
                            {categories.map((cat) => (
                                <ListItem key={cat} disablePadding>
                                    <ListItemButton
                                        selected={selectedCategory === cat}
                                        onClick={() => handleCategorySelect(cat)}
                                    >
                                        <ListItemText
                                            primary={cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            sx={{ textTransform: "capitalize" }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>

            <Box sx={{ flex: 1, ml: { md: 3, xs: 0 }, width: "100%" }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        fontWeight: "bold",
                        color: "primary.main",
                    }}
                >
                    Today's Deals
                </Typography>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
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
                                        boxShadow: "0px 4px 16px rgba(82, 86, 83, 0.4)",
                                        borderRadius: 3,
                                        border: "1px solid #f0f0f0bc",
                                        background: "linear-gradient(135deg, #fff 80%, #d2d1d1b5 100%)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            transform: "translateY(-8px) scale(1.03)",
                                            boxShadow: "0px 12px 32px 0px rgba(56, 142, 60, 0.15)",
                                            cursor: "pointer",
                                        },
                                    }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
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
                                                    boxShadow: "0 2px 8px rgba(56,142,60,0.07)",
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
                                            {product.title.length > 20
                                                ? product.title.slice(0, 20) + "…"
                                                : product.title}
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
                                                minHeight: 36,
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
                )}

                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
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
            </Box>
        </Container>
    );
};

export default ProductsPage;
