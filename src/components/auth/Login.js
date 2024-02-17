import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { user, checkUser } = useContext(AuthContext);
  const { fetchUserData } = useContext(AuthContext);
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast.error("Please insert email or password");
      setLoading(false);
      return;
    }
    setFormData({
      email: "",
      password: "",
    });

    try {
      await apiCall({
        url: "/api/users/login",
        method: "post",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      await fetchUserData();
      toast.success("Logged in Successfully!");
      setLoading(false);
      if (user.role === "merchant") {
        navigate("/wallet/MerchantDashboard");
      } else if (user.role === "user") {
        navigate("/wallet/UserDashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;

        if (errors.email) {
          const emailError = errors.email;
          toast.error(emailError);
        }
        if (errors.password) {
          const passwordError = errors.password;
          toast.error(passwordError);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user && user.role) {
      if (user.role === "merchant") {
        navigate("/wallet/MerchantDashboard");
      } else if (user.role === "user") {
        navigate("/wallet/UserDashboard");
      }
    }
  }, [user, navigate]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Log In</Typography>
              <Typography variant="body2">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#119c59",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#119c59",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#119c59",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#119c59",
                    },
                  }}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "#119c59",
                  "&:hover": {
                    backgroundColor: "#2C6E49",
                  },
                }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Login;
