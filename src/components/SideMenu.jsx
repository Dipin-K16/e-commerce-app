import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
//   Divider as MuiDivider,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const SideMenu = ({ categories, selectedCategory, handleCategorySelect, setDrawerOpen, drawerOpen }) => {
  return (
    <>
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
              <ListItemButton selected={selectedCategory === "all"} onClick={() => handleCategorySelect("all")}>
                <ListItemText primary="All" />
              </ListItemButton>
            </ListItem>
            {categories.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton selected={selectedCategory === cat} onClick={() => handleCategorySelect(cat)}>
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
                <ListItemButton selected={selectedCategory === "all"} onClick={() => handleCategorySelect("all")}>
                  <ListItemText primary="All" />
                </ListItemButton>
              </ListItem>
              {categories.map((cat) => (
                <ListItem key={cat} disablePadding>
                  <ListItemButton selected={selectedCategory === cat} onClick={() => handleCategorySelect(cat)}>
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
    </>
  );
};

export default SideMenu;
