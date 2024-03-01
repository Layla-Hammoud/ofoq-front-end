import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import previouseIcon from "../../assets/previous.svg";
import { useFormik } from "formik";
import { AuthContext } from "../../Context/AuthContext";
import * as Yup from "yup";
import logo from "../../assets/logo.svg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useApi from "../../hooks/useApi";
import "./auth.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Signup = () => {
  const { fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [paths, setPaths] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    domainId: Yup.string().required("Path is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });
  const { apiCall } = useApi();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      domainId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axiosInstance.post("user/signup", values);
        toast.success("Enrolled successfully");
        await fetchUserData;
        navigate("/");
        resetForm();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const { errors } = error.response.data;

          if (errors.email) {
            const emailError = errors.email;
            toast.error(emailError);
          }
          if (errors.password) {
            const passwordError = errors.password;
            toast.error(passwordError);
          }
        } else {
          toast.error(error.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
  } = formik;
  useEffect(() => {
    const fetchPaths = async () => {
      const response = await apiCall({ url: "domain/get-all", method: "get" });
      setPaths(response.data);
    };
    fetchPaths();
  }, []);
  return (
    <>
      <Link to="/">
        <img src={logo} className="logo" alt="logo"></img>
      </Link>
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
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Enroll Now
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#969696",
                  fontFamily: "Inter",
                }}
              >
                Enroll now and learn without limits with us
              </Typography>
            </Stack>
            <form onSubmit={submitForm}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#0B7077",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0B7077",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#0B7077",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0B7077",
                    },
                  }}
                />

                <FormControl
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#0B7077",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0B7077",
                    },
                  }}
                >
                  <InputLabel id="demo-multiple-name-label">Path</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="domainId"
                    input={<OutlinedInput label="path" />}
                    value={values.domainId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    MenuProps={MenuProps}
                    required
                  >
                    {paths &&
                      paths.map((path, index) => (
                        <MenuItem key={index} value={path._id}>
                          {path.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {touched.domainId && errors.domainId && (
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "2.9%",
                      }}
                      color="error"
                    >
                      {errors.domainId}
                    </Typography>
                  )}
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,
                    width: "100%",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#0B7077",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0B7077",
                    },
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {touched.password && errors.password && (
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "2.9%",
                      }}
                      color="error"
                    >
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
              </Stack>

              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  height: "50px",
                  borderRadius: "10px",
                  fontFamily: "Inter",
                  backgroundColor: "#0B7077",
                  "&:hover": {
                    backgroundColor: "#085b61",
                  },
                }}
                type="submit"
                variant="contained"
              >
                Enroll Now
              </Button>
            </form>
            <Stack spacing={1} sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#969696",
                  fontFamily: "Inter",
                }}
              >
                Already have an account? <Link to="/Log-in">Log In</Link>
              </Typography>
            </Stack>
          </div>
        </Box>
      </Box>
      <Stack
        spacing={1}
        sx={{
          marginBottom: "1.5%",
          marginLeft: "10%",
        }}
      >
        <Link to="/">
          <div className="backpagelink">
            <img
              alt="previous"
              className="previouseIcon"
              src={previouseIcon}
            ></img>
            <span>Home</span>
          </div>
        </Link>
      </Stack>
    </>
  );
};

export default Signup;
