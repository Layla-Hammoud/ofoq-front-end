import style from "./HeaderContactUs.module.css";

const HeaderContactUs = () => {
  return (
    <>
      <header className={style.container}>
        <div className={style.textWrapper}>
          <h1 className={style.title}>Get in Touch with Us</h1>
          <p className={style.subTitle}>
            Should you have any questions, require assistance, or seek
            additional information, our dedicated support team is at your
            service. Feel free to reach out, and we assure you that your
            inquiries will receive our prompt attention and comprehensive
            assistance.
          </p>
        </div>
        <iframe
          className={style.map}
          title="equilibre location"
          src={
            "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5596.631581202541!2d35.832035649023815!3d34.44060266503827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slb!4v1709287829363!5m2!1sen!2slb"
          }
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </header>
    </>
  );
};
export default HeaderContactUs;
