import style from "./TestimonialCard.module.css";
import { Rating } from "@mui/material";
import image from '../../assets/amir.jpg'
const TestimonialCard = ({testimonial}) => {
  return (
    <>
      <article className={style.CardContainer}>
        <section className={style.imageWrapper}>
          <img className={style.image} src={image} alt="testimonial"></img>
          <p className={style.name}>{testimonial.name}</p>
        </section>
        <p className={style.descriptrion}>
          {testimonial.content}
        </p>
        <Rating name="size-medium" readOnly defaultValue={testimonial.rate} sx={{
            marginLeft:"5%"
        }} />
      </article>
    </>
  );
};
export default TestimonialCard;
