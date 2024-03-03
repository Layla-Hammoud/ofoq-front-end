import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import {
  Typography,
  TextField,
  Box,
  Button,
  Modal,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import useApi from "../../hooks/useApi";
const SessionModel = ({ setOpen, open }) => {
  const { loading, apiCall } = useApi();
  const { user } = useContext(AuthContext);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    teacherId: user?._id,
    title: "",
    description: "",
    link: "",
    date: dayjs(new Date()),
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date()),
    duration: "",
    platformType: "Zoom", // Default platform type, you can change as needed
    studentId: [], // Array for student IDs, modify as needed
  });

  const handleChange = (key, value) => {
    setFormData((prevFormData) => {
      let updatedValue = value;

      if (key.includes("Time")) {
        // Extract only the time part
        updatedValue = dayjs(value).format("HH:mm:ss");
      } else if (key === "date") {
        // Assuming value is a valid date string
        updatedValue = dayjs(value).format("YYYY-MM-DD");
      }

      return {
        ...prevFormData,
        [key]: updatedValue,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date: formData.date.toISOString(),
      startTime: formData.startTime.toISOString(),
      endTime: formData.endTime.toISOString(),
    };

    console.log(formattedData);

    try {
      const response = await apiCall({
        url: "event/create",
        method: "post",
        data: formattedData,
      });
      if (response) {
        setOpen(false);
      }
      toast.success(response.message);
      // Handle success cases or additional logic
    } catch (error) {
      const errors = error.response.data;
      toast.error(errors);
      setOpen(false);
    }

    // Reset form data after submission
    setFormData({
      title: "",
      description: "",
      link: "",
      date: dayjs(new Date()),
      startTime: dayjs(new Date()),
      endTime: dayjs(new Date()),
      duration: "",
      platformType: "Zoom",
      studentId: [],
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
    maxHeight: 400,
    "@media (min-width: 768px)": {
      width: 500,
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2" fontFamily="Inter">
            Adding a new session
          </Typography>
          <IconButton
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            sx={{
              marginTop: "20px",
            }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            sx={{
              marginTop: "20px",
            }}
          />

          <TextField
            fullWidth
            label="Link"
            name="link"
            value={formData.link}
            onChange={(e) => handleChange("link", e.target.value)}
            required
            sx={{
              marginTop: "20px",
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isMobile ? (
              <MobileDatePicker
                label="Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                renderInput={(params) => <TextField {...params} />}
                sx={{
                  marginTop: "20px",
                  width: "100%",
                }}
              />
            ) : (
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                renderInput={(params) => <TextField {...params} />}
                sx={{
                  marginTop: "20px",
                  width: "100%",
                }}
              />
            )}

            <TimePicker
              label="Start Time"
              value={formData.startTime}
              onChange={(value) => handleChange("startTime", value)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                marginTop: "20px",
                width: "100%",
              }}
            />

            <TimePicker
              label="End Time"
              value={formData.endTime}
              onChange={(value) => handleChange("endTime", value)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                marginTop: "20px",
                width: "100%",
              }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Duration (number of hours)"
            name="duration"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            required
            sx={{
              marginTop: "20px",
            }}
          />

          <TextField
            fullWidth
            label="Platform Type"
            name="platformType"
            select
            value={formData.platformType}
            onChange={(e) => handleChange("platformType", e.target.value)}
            sx={{
              marginTop: "20px",
            }}
          >
            {["Zoom", "Teams", "Google Meet", "Other"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#0B7077",
              fontFamily: "Inter",
              "&:hover": {
                backgroundColor: "#085b61",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SessionModel;
