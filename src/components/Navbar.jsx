import { useState, useEffect, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { ShoppingCart, Menu, Brightness4, Brightness7 } from "@mui/icons-material";
import ColorModeContext from "../theme/ColorModeContext";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        updateCartCount();

        window.addEventListener("storage", updateCartCount);

        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("hasVisitedLogin");
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const navItems = [
        { text: "Products", path: "/products" },
        { text: "Cart", path: "/cart" },
    ];

    const drawer = (
        <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background:
                    theme.palette.mode === "light"
                        ? "linear-gradient(90deg, #090909ff 50%, #5e5e5eff 100%)"
                        : "linear-gradient(90deg, #23272F 80%, #5e5e5eff 100%)",
                boxShadow: "0px 2px 8px rgba(56, 142, 60, 0.10)",
                px: { xs: 0, sm: 2 },
                py: 0.5,
            }}
        >
            <Toolbar sx={{ minHeight: 64, display: "flex", alignItems: "center" }}>
                <Box
                    component={Link}
                    to="/products"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        flexGrow: 1,
                        gap: 1.2,
                    }}
                >
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            background: theme.palette.mode === "light" ? "#fff" : "#fff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(56,142,60,0.10)",
                            mr: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                fontSize: 22,
                                fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
                                letterSpacing: 1.5,
                                userSelect: "none",
                            }}
                        >
                            E
                        </Typography>
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
                            letterSpacing: 1.2,
                            textShadow: "0 2px 8px rgba(56,142,60,0.10)",
                            userSelect: "none",
                        }}
                    >
                        -Shop
                    </Typography>
                </Box>

                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/cart"
                            sx={{ mr: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                        >
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={colorMode.toggleColorMode}
                            sx={{ mr: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                        >
                            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={toggleDrawer(true)}
                            sx={{ background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                        >
                            <Menu />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    borderTopLeftRadius: 18,
                                    borderBottomLeftRadius: 18,
                                    minWidth: 200,
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/products"
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                color: "rgba(255, 255, 255, 0.69)",
                                px: 2,
                                borderRadius: 2,
                                transition: "background 0.2s",
                                "&:hover": {
                                    background: "rgba(16, 69, 23, 0.89)",
                                    color: "#ffffffff",
                                },
                            }}
                        >
                            Products
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to=""
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                px: 2,
                                borderRadius: 2,
                                color: "rgba(255, 255, 255, 0.69)",
                                transition: "background 0.2s",
                                "&:hover": {
                                    background: "rgba(16, 69, 23, 0.89)",
                                    color: "#ffffffff",
                                },
                            }}
                        >
                            Contact
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to=""
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                px: 2,
                                borderRadius: 2,
                                color: "rgba(255, 255, 255, 0.69)",
                                transition: "background 0.2s",
                                "&:hover": {
                                    background: "rgba(16, 69, 23, 0.89)",
                                    color: "#ffffffff",
                                },
                            }}
                        >
                            Wish List
                        </Button>
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/cart"
                            sx={{ mx: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                        >
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={{ ml: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                            onClick={colorMode.toggleColorMode}
                            color="inherit"
                        >
                            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                        <IconButton
                            sx={{ ml: 1, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}
                            color="inherit"
                            onClick={handleLogout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
