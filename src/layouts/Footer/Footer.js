import style from "./Footer.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Footer = () => {
  const [state, setState] = useState({
    open: false,
    errorOpen: false,
    Transition: Slide,
    email: "",
  });

  const handleClick = () => {
    // Email validation logic
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);

    if (isValidEmail) {
      setState({
        ...state,
        open: true,
        email: "",
      });
    } else {
      setState({
        ...state,
        errorOpen: true,
        email: "",
      });
    }
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      errorOpen: false,
    });
  };

  return (
    <>
      <footer className={style.footer}>
        <section className={style.infoWrapper}>
          <img src={logo} alt="logo" />
          <p>Your exam success starts here. Unlock your potential with us!</p>
          <p>Email: laylahammoud63@gmail.com</p>
          <p>+961 81 449 032</p>
        </section>
        <section className={style.linksWrapper}>
          <h6>links</h6>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="contact-us">
            <p>Contact Us</p>
          </Link>
          <Link to="sessions">
            <p>Sessions</p>
          </Link>
        </section>
        <section className={style.inputWrapper}>
          <p style={{ fontWeight: "bold" }}>
            Stay up to date with the our platform updates
          </p>
          <div className={style.SearchboxWrap}>
            <input
              className={style.inputFooter}
              type="text"
              placeholder="example@gmail.com"
              value={state.email}
              onChange={handleEmailChange}
            />
            <button onClick={() => handleClick(SlideTransition)}>
              <span>Send</span>
            </button>
          </div>
        </section>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          key={state.Transition.name}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            Your email has been sent successfully
          </Alert>
        </Snackbar>
        <Snackbar
          onClose={handleSnackbarClose}
          open={state.errorOpen}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            Invalid email format
          </Alert>
        </Snackbar>
      </footer>
    </>
  );
};
export default Footer;
