import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SideMenu from "../components/SideMenu";
import ProductCard from "../components/ProductCard";

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
        console.log("Error fetching categories:", error);
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
      <SideMenu
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
      />
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
          <ProductCard filteredProducts={filteredProducts} handleAddToCart={handleAddToCart} />
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
