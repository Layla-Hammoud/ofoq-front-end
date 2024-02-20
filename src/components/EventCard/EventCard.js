import style from "./EventCard.module.css"
import image from '../../assets/amir.jpg'
import person from '../../assets/person.png'
import date from '../../assets/date.svg'
import time from '../../assets/clock.png'
 const EventCard = () => {
  return (
    <>
      <article className={style.cardContainer}>
        <img src={image} className={style.image} alt="event"></img>
        <section className={style.textWrapper}>
            <p className={style.nameWrapper}>by<span className={style.name}> Amir Kassha</span></p>
            <p className={style.title}>Create an LMS Website with LearnPress</p>
            <div className={style.time}>
            <p><img alt="time" className={style.icon} src={time}></img>02:00 - 03:30 PM</p>
            <p><img alt="person" className={style.icon} src={person}></img>156 Students</p>
            <p><img alt="date" className={style.icon} src={date}></img>Today 5 Feb</p>
            </div>
            <button className={style.button}>View More</button>
        </section>
      </article>
    </>
  )
}
export default EventCard