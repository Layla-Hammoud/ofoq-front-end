import { Avatar, Rating } from "@mui/material";
import image from "../../assets/amir.jpg";
import style from "./PathratingCard.module.css";
function PathRatingCard({ name, rating, review, date }) {
  return (
    <article className={style.reviewCardContainer}>
      <div className={style.classNameratingHeaderContainer}>
        <section className={style.nameimageWrapper}>
          <Avatar src={image} />{" "}
          <span className={style.reviewName}>{name}</span>
        </section>
        <section className={style.ratingWrapper}>
          <Rating
            name="small"
            readOnly
            defaultValue={rating}
            sx={{
              marginLeft: "5%",
              mt: "10px",
              "@media screen and (max-width: 700px)": {
                marginLeft: "0",
              },
            }}
          />
        </section>
      </div>
      <p className={style.reviewText}>{review}</p>
      <p className={style.reviewDate}>{date}</p>
    </article>
  );
}
export default PathRatingCard;
