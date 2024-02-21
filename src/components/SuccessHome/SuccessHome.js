import style from "./SuccessHome.module.css";
import image from "../../assets/success.jpg";
import point from "../../assets/success1.svg";
const SuccessHome = () => {
  return (
    <>
      <section className={style.consultingSection}>
        <div className={style.textContainer}>
          <h3 className={style.sectionConsultationTitle}>
            Your Exam Success Toolkit
          </h3>
          <ul className={style.list}>
            <li>
              <img src={point} alt="point" />
              Get lots of resources to help you understand EVERYTHING!
            </li>
            <li>
              <img src={point} alt="point" /> Join live sessions when it suits
              you with teachers
            </li>
            <li>
              <img src={point} alt="point" />
              Discover and learn the path that interests you
            </li>
            <li>
              <img src={point} alt="point" />
              Study at your own pace, whenever you have time
            </li>
            <li>
              <img src={point} alt="point" />
              Ask and get answers from helpful people in our community
            </li>
          </ul>
        </div>
        <img className={style.img} alt="consulting" src={image}></img>
      </section>
    </>
  );
};
export default SuccessHome;
