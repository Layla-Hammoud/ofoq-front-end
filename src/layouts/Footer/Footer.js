import style from "./Footer.module.css";
import logo from "../../assets/logo.svg";
const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
        <section className={style.infoWrapper}>
          <img src={logo} alt="logo" />
          <p>
            Your exam success starts here. Unlock your potential with us!
          </p>
          <p>Email: laylahammoud63@gmail.com</p>
          <p>+961 00 000 000</p>
        </section>
        <section className={style.linksWrapper}>
            <h6>links</h6>
            <p>About us</p>
            <p>Contact Us</p>
            <p>Events</p>
        </section>
        <section className={style.inputWrapper}>
          <p>Stay up to date with the our platform updates</p>
        <div className={style.SearchboxWrap}>
      <input type="text" placeholder="Search for something..." />
      <button>
        <span>Send</span>
      </button>
    </div>
        </section>
      </footer>
    </>
  );
};
export default Footer;
