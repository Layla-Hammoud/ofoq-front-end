import style from "./EventCard.module.css";
import moment from "moment";
import date from "../../assets/date.svg";
import timeIcon from "../../assets/clock.png";
import TimeLapseIcon from "../../assets/Timer.svg";
import { Link } from "react-router-dom";
const EventCard = ({
  title,
  image,
  time,
  duration,
  eventId,
  firstName,
  lastName,
  startTime,
  endTime,
}) => {
  const yourDate = moment(time).format("MMMM D, YYYY");

  return (
    <>
      <article className={style.cardContainer}>
        <img src={image} className={style.image} alt="event"></img>
        <section className={style.textWrapper}>
          <p className={style.nameWrapper}>
            by
            <span className={style.name}>
              {" "}
              {firstName} {lastName}
            </span>
          </p>
          <p className={style.title}>{title}</p>
          <div className={style.time}>
            <p>
              <img alt="time" className={style.icon} src={timeIcon}></img>
              {duration} hour(s)
            </p>
            <p>
              <img
                alt="person"
                className={style.icon}
                src={TimeLapseIcon}
              ></img>
              {moment(startTime).format("HH:mm")} -
              {moment(endTime).format("HH:mm")}
            </p>
            <p>
              <img alt="date" className={style.icon} src={date}></img>
              {yourDate}
            </p>
          </div>
          <Link to={`/session/${eventId}`}>
            <button className={style.button}>View More</button>
          </Link>
        </section>
      </article>
    </>
  );
};
export default EventCard;
