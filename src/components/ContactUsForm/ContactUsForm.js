import { useState } from "react";
import FormStyle from "./ContactUsForm.module.css";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
const ContactUsForm = () => {
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      packages: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("miscellaneous/send-contact-form", formData);
      toast.success("Message sent successfully");
      resetForm();
    } catch (error) {
      if (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <>
      <section className={FormStyle.FormSectionContact}>
        <h2 className={FormStyle.contactTitle}>Contact Us</h2>
        <p className={FormStyle.contactSubTitle}>
          Feel free to reach out to us with any questions or concerns.
        </p>
        <form
          className={FormStyle.FormContainerContact}
          onSubmit={handleSubmit}
        >
          <div className={FormStyle.nameContainer}>
            <div className={FormStyle.divNameContainer}>
              <label className={FormStyle.nameLabel}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                className={FormStyle.nameInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className={FormStyle.divNameContainer}>
              <label className={FormStyle.nameLabel}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className={FormStyle.nameInput}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label className={FormStyle.inputLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={FormStyle.emailInput}
            required
          />

          <label className={FormStyle.inputLabel}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={FormStyle.message}
            required
          />

          <button className={FormStyle.ContactBtn} type="submit">
            Get In Touch
          </button>
        </form>
      </section>
    </>
  );
};
export default ContactUsForm;
