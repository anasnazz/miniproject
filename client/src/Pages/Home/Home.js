import React, { useState } from "react";
import axios from "axios";
import fakenewsimg from "../../assets/fakenewsimg.jpg";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  useNotifications,
  NotificationsProvider,
} from "@toolpad/core/useNotifications";
import Magnet from "../../Components/Animations/Magnet";

function HomeComponent() {
  const [text, setText] = useState(""); // State for input text
  const [prediction, setPrediction] = useState(null); // Prediction result
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open state
  const notifications = useNotifications(); // Snackbar Notification Hook

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text) {
      notifications.show("Please enter text.", {
        severity: "warning",
        autoHideDuration: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        text,
      });
      console.log(response);

      const result = response.data.label ?? "Error: Could not classify";
      setPrediction(result);
      setDialogOpen(true);

      const storedData = localStorage.getItem("newsHistory");
      const historyData = storedData ? JSON.parse(storedData) : [];

      const newEntry = { text, result, timestamp: new Date().toISOString() };
      const updatedHistory = [newEntry, ...historyData].slice(0, 20); // Keep only the latest 10

      localStorage.setItem("newsHistory", JSON.stringify(updatedHistory));

      notifications.show("Prediction completed successfully!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error("Error in API request:", error);
      notifications.show("An error occurred. Please try again.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left - Image */}
        <Grid item xs={12} md={6} alignItems={"center"}>
          <img
            src={fakenewsimg}
            alt="Fake News"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>

        {/* Right - Description & Search */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={400} color="black">
            Beware of Fake News
          </Typography>
          <Typography variant="body1" paragraph>
            In today's digital age, social media platforms have become powerful
            tools for communication and information sharing. However, they have
            also become breeding grounds for the rapid spread of fake news.
          </Typography>

          {/* Input & Submit Button */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter a news link or text"
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Magnet padding={100} disabled={false} magnetStrength={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Magnet>
          </Box>
        </Grid>
      </Grid>

      {/* Prediction Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor:
              prediction === 1
                ? "rgba(192, 93, 93, 0.5)"
                : "rgba(46, 125, 50, 0.5)",
            backdropFilter: "blur(5px)", // Optional blur effect for better visuals
            boxShadow: "none",
          },
        }}
      >
        {/* Title with solid background */}
        <DialogTitle
          sx={{
            backgroundColor:
              prediction === 1
                ? "rgba(202, 0, 0, 0.5)"
                : "rgba(27, 94, 32, 0.9)",
            color: prediction === 1 ? "rgb(30, 0, 0)" : "rgb(0, 54, 3)",
            fontWeight: "bold",
            padding: "12px 24px",
          }}
        >
          Prediction Result
        </DialogTitle>

        {/* Content with adaptive background & text color */}
        <DialogContent
          sx={{
            color: prediction === 1 ? "rgb(30, 0, 0)" : "rgb(0, 54, 3)",
            padding: 3,
          }}
        >
          <Typography variant="h6">
            The news is classified as:{" "}
            <strong>
              {prediction === 1 ? "❌ Fake News" : "✅ Real News"}
            </strong>
          </Typography>
        </DialogContent>

        {/* Actions with adaptive styling */}
        <DialogActions sx={{ padding: "10px 24px" }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              color: prediction === 1 ? "rgb(30, 0, 0)" : "rgb(0, 54, 3)",
              fontWeight: "bold",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default function Home() {
  return (
    <NotificationsProvider>
      <HomeComponent />
    </NotificationsProvider>
  );
}
