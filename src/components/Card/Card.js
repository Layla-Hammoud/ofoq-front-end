import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const Card = ({ image, name, description, itemId, type, homeSlick, slug }) => {
  const [imagePath, setImagePath] = useState(null);
  const getImagePath = async (imageFilename) => {
    const { default: imagePath } = await import(
      `../../assets/${imageFilename}`
    );
    setImagePath(imagePath);
  };

  useEffect(() => {
    if (type === "path") {
      getImagePath(image);
    }
  }, []);

  const cardHomeStyle = homeSlick ? { marginLeft: "60px" } : {};

  return (
    <>
      <article className={style.cardContainer} style={cardHomeStyle}>
        {type === "path" ? (
          imagePath && (
            <img src={imagePath} alt={name} className={style.pathImage} />
          )
        ) : (
          <img src={image} alt={name} className={style.pathImage} />
        )}

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
