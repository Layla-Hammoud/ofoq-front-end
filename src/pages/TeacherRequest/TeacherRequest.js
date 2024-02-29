import style from "./TeacherRequest.module.css";
import { useState } from "react";
import SuccessModel from "../../components/SuccessModel/SuccessModel";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import nextSvg from "../../assets/next.svg";
import useApi from "../../hooks/useApi";
import LoadingButton from "@mui/lab/LoadingButton";
const TeacherRequest = () => {
  const { loading, error, apiCall } = useApi();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsopen] = useState(false);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const next = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const previous = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    city: Yup.string().required("City is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    bio: Yup.string().required("Biography is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    yearsOfExperience: Yup.string().required("Years of Experience is required"),
    certifications: Yup.string().required("Certificate is required"),
    linkedin: Yup.string(),
    twitter: Yup.string(),
    image: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      role: "teacher",
      lastName: "",
      city: "",
      phoneNumber: "",
      bio: "",
      isApproved: false,
      email: "",
      yearsOfExperience: "",
      certifications: "",
      socialMedia: {
        linkedin: "",
        twitter: "",
      },
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();

      // Append fields to FormData if they exist
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("city", values.city);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("bio", values.bio);
      formData.append("role", values.role);
      formData.append("isApproved", values.isApproved);
      formData.append("email", values.email);
      formData.append("yearsOfExperience", values.yearsOfExperience);
      formData.append("certifications", values.certifications);

      // Append image if it exists
      if (values.image) {
        formData.append("image", values.image);
      }
      // Append social media links if they exist
      if (values.socialMedia.linkedin) {
        formData.append("socialMedia[linkedin]", values.socialMedia.linkedin);
      }

      if (values.socialMedia.twitter) {
        formData.append("socialMedia[twitter]", values.socialMedia.twitter);
      }
      try {
        const response = await apiCall({
          url: "user/signup",
          method: "post",
          data: formData,
        });
        if (response) {
          setIsopen(true);
        }
        resetForm();
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <>
      <SuccessModel
        isOpen={isOpen}
        setIsopen={setIsopen}
        title={"the request has been sent"}
        description={"we will notify you by email when the admin accept you"}
      />
      <div className={style.container}>
        <section className={style.textWrapper}>
          <h1> Join Our Team of Passionate Educators! </h1>
          <p>
            We are seeking talented and inspiring individuals to join our team
            of teachers and help us shape the future of young minds. If you have
            a passion for education, a strong understanding of your subject
            area, and a commitment to fostering a dynamic and engaging learning
            environment, we encourage you to apply!
          </p>
        </section>

        <section className={style.formWrapper}>
          <section className={style.stepTitleWrapper}>
            <div
              className={`${style.number} ${
                currentStep === 1 ? style.activeStep : ""
              }`}
            >
              1
            </div>
            personal info
            <img alt="icon" src={nextSvg} />
            <div
              className={`${style.number} ${
                currentStep === 2 ? style.activeStep : ""
              }`}
            >
              2
            </div>
            Professional info
          </section>

          <form onSubmit={formik.handleSubmit}>
            {currentStep === 1 && (
              <>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
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
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
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
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
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
                    label="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
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
                    id="filled-multiline-static"
                    label="Biography"
                    name="bio"
                    multiline
                    rows={4}
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bio && Boolean(errors.bio)}
                    helperText={touched.bio && errors.bio}
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

                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{
                      fontFamily: "Inter",
                      backgroundColor: "#0B7077",
                      width: "100%",
                      "&:hover": {
                        backgroundColor: "#085b61",
                      },
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    {formik.values.image === null && (
                      <>Upload Your Image (optional)</>
                    )}
                    {formik.values.image !== null && (
                      <>Image has been uploaded!</>
                    )}

                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        formik.setFieldValue("image", e.currentTarget.files[0]);
                      }}
                      accept="image/*"
                    />
                  </Button>
                </Stack>
                <section className={style.nextWrapper}>
                  <Button
                    onClick={next}
                    fullWidth
                    size="large"
                    sx={{
                      marginLeft: "auto",
                      width: "200px",
                      mt: 3,
                      position: "absolute",
                      bottom: "50px",
                      height: "50px",
                      borderRadius: "10px",
                      fontFamily: "Inter",
                      backgroundColor: "#0B7077",
                      "&:hover": {
                        backgroundColor: "#085b61",
                      },
                    }}
                    variant="contained"
                  >
                    Next
                  </Button>
                </section>
              </>
            )}
            {currentStep === 2 && (
              <>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
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

                  <TextField
                    fullWidth
                    label="Years of Experience"
                    name="yearsOfExperience"
                    value={values.yearsOfExperience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.yearsOfExperience &&
                      Boolean(errors.yearsOfExperience)
                    }
                    helperText={
                      touched.yearsOfExperience && errors.yearsOfExperience
                    }
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
                    label="Certificate"
                    name="certifications"
                    value={values.certifications}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.certifications && Boolean(errors.certifications)
                    }
                    helperText={touched.certifications && errors.certifications}
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
                    label="LinkedIn Link (optional)"
                    name="socialMedia.linkedin"
                    value={values.socialMedia.linkedin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.socialMedia?.linkedin &&
                      Boolean(errors.socialMedia?.linkedin)
                    }
                    helperText={
                      touched.socialMedia?.linkedin &&
                      errors.socialMedia?.linkedin
                    }
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
                    label="Twitter Link (optional)"
                    name="socialMedia.twitter"
                    value={values.socialMedia.twitter}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.socialMedia?.twitter &&
                      Boolean(errors.socialMedia?.twitter)
                    }
                    helperText={
                      touched.socialMedia?.twitter &&
                      errors.socialMedia?.twitter
                    }
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
                  <section className={style.buttonWrapper}>
                    <Button
                      onClick={previous}
                      size="large"
                      sx={{
                        position: "absolute",
                        bottom: "50px",
                        left: "50px",
                        mt: 16.2,
                        width: "200px",
                        height: "50px",
                        borderRadius: "10px",
                        fontFamily: "Inter",
                        backgroundColor: "#0B7077",
                        "&:hover": {
                          backgroundColor: "#085b61",
                        },
                        "@media(max-width:600px)": {
                          bottom: "150px",
                          width: "80%",
                          left: "25px",
                        },
                      }}
                      variant="contained"
                    >
                      Previous
                    </Button>
                    <LoadingButton
                      size="large"
                      sx={{
                        position: "absolute",
                        bottom: "50px",
                        right: "50px",
                        mt: 16.2,
                        height: "50px",
                        width: "200px",
                        borderRadius: "10px",
                        fontFamily: "Inter",
                        backgroundColor: loading ? "#808080" : "#0B7077",
                        "&:hover": {
                          backgroundColor: loading ? "#808080" : "#085b61",
                        },
                        "@media(max-width:600px)": {
                          width: "80%",
                          left: "25px",
                        },
                      }}
                      type="submit"
                      onSubmit={formik.handleSubmit}
                      endIcon={<SendIcon />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                    >
                      <span>Send</span>
                    </LoadingButton>
                  </section>
                </Stack>
              </>
            )}
          </form>
        </section>
      </div>
    </>
  );
};
export default TeacherRequest;
