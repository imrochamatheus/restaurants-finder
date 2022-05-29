import * as React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import Map from "./components/Map";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AppBar, DrawerHeader, Main, drawerWidth } from "./styles";
import logo from "./assets/img/food-finder.gif";
import background from "./assets/img/background.jpg";

function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: "auto",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography
            sx={{ alignSelf: "center", display: "flex", alignItems: "center" }}
            component="div"
            variant="h6"
          >
            <img
              src={logo}
              alt="logo"
              width={60}
              style={{ marginTop: "-10px" }}
            />
            Food Finder
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ position: "absolute", right: 0 }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Home />
      </Drawer>
      <Main open={open} position="relative">
        <Map open={open} />
      </Main>
    </Box>
  );
}

export default App;
