import facebookIcon from "../../assets/facebookIcon.svg";
import InstaIcon from "../../assets/instaIcon.svg";
import PhoneIcon from "../../assets/phoneIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";
import style from "./Contactinfo.module.css";

const ContactInfo = () => {
  return (
    <>
      <section className={style.contactInfoContainer}>
        <article className={style.socialIconsContainer}>
          <h2 className={style.followUs}>Follow Us</h2>
          <div className={style.iconsWrapper}>
            <div className={style.icon}>
              <a
                href="https://www.facebook.com/profile.php?id=100007494499241"
                rel="noreferrer"
                target="_blank"
              >
                <img alt="facebook icon" src={facebookIcon}></img>
              </a>
            </div>
            <div className={style.icon}>
              <a
                href="https://www.instagram.com/layla_hammoud_1/"
                rel="noreferrer"
                target="_blank"
              >
                <img alt="instagram icon" src={InstaIcon}></img>
              </a>
            </div>
          </div>
        </article>
        <article className={style.phoneContainer}>
          <img src={PhoneIcon} alt="phone icon"></img>
          <p className={style.number}>+961 81449032</p>
        </article>
        <address className={style.locationContainer}>
          <img src={locationIcon} alt="location icon"></img>
          <p className={style.location}>Lebanon, Tripoli</p>
        </address>
      </section>
    </>
  );
};
export default ContactInfo;
