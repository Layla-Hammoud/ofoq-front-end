import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { Button } from "@mui/material";

const Card = ({ image, name, description, itemId, type, homeSlick }) => {
  const cardHomeStyle = homeSlick ? { marginLeft: "60px" } : {};

  return (
    <>
      <article className={style.cardContainer} style={cardHomeStyle}>
        <img src={image} alt={name} className={style.pathImage}></img>
        <div className={style.textSection}>
          <p className={style.name}>{name}</p>
          <p className={style.description}>
            {description?.substring(0, 150)}...
          </p>
          <Link
            to={
              type === "path"
                ? `/path/${itemId}`
                : type === "course"
                ? `/chapters/${itemId}`
                : type === "event"
                ? `/session/${itemId}`
                : "/"
            }
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                height: "35px",
                width: "100px",
                backgroundColor: "#0B7077",
                marginRight: "10px",
                color: "white",
                fontFamily: "Inter, sans-serif",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#085b61",
                  color: "#ffffff",
                  boxShadow: "none",
                },
                fontSize: "13px",
              }}
            >
              View
            </Button>
          </Link>
        </div>
      </article>
    </>
  );
};
export default Card;
