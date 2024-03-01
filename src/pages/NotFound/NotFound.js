import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/notfound.svg";
import { Box, Button, Container, Typography } from "@mui/material";

const NotFound = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src={NotFoundImage}
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{
              mb: 3,
              fontFamily: "Inter",
              "@media screen and (max-width: 600px)": {
                fontSize: "25px",
                mb: 2,
              },
            }}
            variant="h3"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
            sx={{
              fontFamily: "Inter",
            }}
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Link to="/">
            <Button
              sx={{
                mt: 3,
                backgroundColor: "#0B7077",
                fontFamily: "Inter",
                "&:hover": {
                  backgroundColor: "#085b61",
                  color: "white",
                },
              }}
              variant="contained"
            >
              Back To Home
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
