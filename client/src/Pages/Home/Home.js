import React from "react";
import fakenewsimg from "../../assets/fakenewsimg.jpg";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Magnet from "../../Components/Animations/Magnet";
import FuzzyText from "../../Components/Animations/FuzzyText";

function Home() {
  return (
    <>
      <Container sx={{ mt: 4 }}>
        {/* First Section: Image & Description */}
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
            <Box sx={{ mb: 1}}>
              <FuzzyText
                fontSize="3rem"
                fontWeight={400}
                color="#000"
                baseIntensity={0.15}
                hoverIntensity={0.3}
              >
                {/* <Typography variant="h4" gutterBottom> */}
                Beware of Fake News
                {/* </Typography> */}
              </FuzzyText>
            </Box>
            <Typography variant="body1" paragraph>
              In today's digital age, social media platforms have become
              powerful tools for communication and information sharing. However,
              they have also become breeding grounds for the rapid spread of
              fake news. The accessibility and speed of social media make it
              easy for misinformation to travel faster than the truth,
              influencing public opinion, shaping narratives, and even impacting
              elections and global events.
            </Typography>

            {/* Input & Submit Button (Centered) */}
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
              />
              <Magnet padding={100} disabled={false} magnetStrength={2}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Submit
                </Button>
              </Magnet>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
