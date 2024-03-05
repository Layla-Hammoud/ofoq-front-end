import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../../Context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import useApi from "../../hooks/useApi";
const SessionModel = ({
  setOpen,
  open,
  selectedRow,
  type,
  setSuccessEdit,
  setSuccessAdd,
}) => {
  const { loading, apiCall } = useApi();
  const { user } = useContext(AuthContext);
  const [paths, setPaths] = useState([]);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClose = () => {
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
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    teacherId: user?._id,
    title: "",
    description: "",
    link: "",
    date: dayjs(new Date()),
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date()),
    duration: "",
    platformType: "Zoom",
    studentId: [],
    domainId: "",
  });

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        teacherId: user?._id,
        title: selectedRow?.title || "",
        description: selectedRow?.description || "",
        link: selectedRow?.link || "",
        date: dayjs(selectedRow?.date || new Date()),
        startTime: dayjs(selectedRow?.startTime || new Date()),
        endTime: dayjs(selectedRow?.endTime || new Date()),
        duration: selectedRow?.duration || "",
        platformType: selectedRow?.platformType || "Zoom",
        studentId: selectedRow?.studentId || [],
        domainId: selectedRow?.domainId || "",
      });
      console.log(selectedRow.image);
      setImage(selectedRow?.image || "");
    }
  }, [selectedRow]);
  const handleChange = (key, value) => {
    setFormData((prevFormData) => {
      let updatedValue = value;

      if (key.includes("Time")) {
        // Extract only the time part
        updatedValue = dayjs(value);
      } else if (key === "date") {
        // Assuming value is a valid date string
        updatedValue = dayjs(value);
      }

      return {
        ...prevFormData,
        [key]: updatedValue,
      };
    });
  };

  useEffect(() => {
    const fetchPaths = async () => {
      const response = await apiCall({ url: "domain/get-all", method: "get" });
      setPaths(response.data);
    };
    fetchPaths();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date: formData.date.toISOString(),
      startTime: formData.startTime.toISOString(),
      endTime: formData.endTime.toISOString(),
    };

    const formDataWithImage = new FormData();
    if (formattedData.title !== null) {
      formDataWithImage.append("title", formattedData.title);
    }
    if (formattedData.description !== null) {
      formDataWithImage.append("description", formattedData.description);
    }
    if (formattedData.link !== null) {
      formDataWithImage.append("link", formattedData.link);
    }
    if (formattedData.date !== null) {
      formDataWithImage.append("date", formattedData.date);
    }
    if (formattedData.startTime !== null) {
      formDataWithImage.append("startTime", formattedData.startTime);
    }
    if (formattedData.endTime !== null) {
      formDataWithImage.append("endTime", formattedData.endTime);
    }
    if (formattedData.duration !== null) {
      formDataWithImage.append("duration", formattedData.duration);
    }
    if (formattedData.platformType !== null) {
      formDataWithImage.append("platformType", formattedData.platformType);
    }
    formDataWithImage.append("teacherId", user._id);
    if (formattedData.domainId !== null) {
      formDataWithImage.append("domainId", formattedData.domainId);
    }
    if (image !== null) {
      formDataWithImage.append("image", image);
    }
    if (type === "edit") {
      formDataWithImage.append("id", selectedRow._id);
    }

    try {
      let url = "";
      let method = "";
      if (type === "edit") {
        url = "event/update";
        method = "patch";
      } else {
        url = "event/create";
        method = "post";
      }
      const response = await apiCall({
        url: url,
        method: method,
        data: formDataWithImage,
      });
      if (response) {
        setOpen(false);
        setSuccessEdit(true);
        setSuccessAdd(true);
      }
      toast.success(response.message);
      // Handle success cases or additional logic
    } catch (error) {
      toast.error(error);
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
            {type === "edit" ? "Edit the session" : "Add a new session"}
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
          {paths && (
            <TextField
              fullWidth
              label="Select Path"
              name="domainId"
              select
              value={formData.domainId}
              onChange={(e) => handleChange("domainId", e.target.value)}
              sx={{
                marginTop: "20px",
              }}
            >
              {/* Map over the paths and display them as MenuItem options */}
              {paths.map((path, index) => (
                <MenuItem key={index} value={path._id}>
                  {path.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            style={{ marginTop: "20px" }}
          />

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
