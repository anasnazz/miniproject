import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import AnimatedList from "../Animations/AnimatedList/AnimatedList";

const pages = ["Prediction", "About us", "Contact us"];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Open & close dialog
  // const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [historyItems, setHistoryItems] = React.useState([]);

  const fetchHistory = () => {
    const storedData = localStorage.getItem("newsHistory");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setHistoryItems(
        parsedData.map((entry) => `${entry.text} - ${entry.result}`)
      );
    }
  };

  React.useEffect(() => {
    fetchHistory();

    const handleStorageChange = (event) => {
      if (event.key === "newsHistory") {
        fetchHistory();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleOpenDialog = () => {
    fetchHistory();
    setOpenDialog(true);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(18, 114, 211, 0.8)",
          borderRadius: "35px",
          width: "auto",
          padding: 1,
          mx: 2,
          mt: 2,
          boxSizing: "border-box",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo and Title */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "50px",
                  width: "50px",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontSize: "1.4rem",
                  fontFamily: "Poppins",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Fake News Detection
              </Typography>
            </Box>

            {/* Mobile Menu (Hamburger) */}
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleOpenMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  sx={{ mt: 1 }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseMenu();
                        if (page === "Prediction") handleOpenDialog();
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              /* Desktop Navigation */
              <Box sx={{ display: "flex", gap: 2 }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={
                      page === "Prediction" ? handleOpenDialog : undefined
                    }
                    href={
                      page !== "Prediction"
                        ? `${page.toLowerCase().replace(" ", "-")}`
                        : undefined
                    }
                    sx={{
                      my: 2,
                      color: "white",
                    }}
                    aria-label={page}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Prediction Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Predictions History</DialogTitle>
        <DialogContent>
          <AnimatedList
            items={historyItems} // Use fetched data
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={false}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
