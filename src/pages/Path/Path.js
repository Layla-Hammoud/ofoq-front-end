import image from "../../assets/test.jpg";
import style from "./Path.module.css";
// import useApi from "../../hooks/useApi";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchData } from "../../data/fetchdata";
const Path = () => {
  const { itemId } = useParams();
  const [paths, setPaths] = useState(null);
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const getImagePath = async (imageFilename) => {
    const { default: imagePath } = await import(
      `../../assets/${imageFilename}`
    );
    setImage(path.image);
  };

  // const { loading, error, apiCall } = useApi();
  // useEffect(() => {
  //   const fetchPaths = async () => {
  //     const response = await apiCall({
  //       url: "domain/get-one",
  //       method: "post",
  //       data: { id: itemId },
  //     });
  //     setPath(response.data[0]);
  //   };
  //   fetchPaths();
  // }, []);

  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const result = await fetchData();
        setPaths(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    const fetchPathImage = async () => {
      if (path && path.image) {
        try {
          const { default: imagePath } = await import(
            `../../assets/${path.image}`
          );
          setImagePath(imagePath);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
    };

    if (paths) {
      const selectedPath = paths.find((item) => item._id === itemId);
      setPath(selectedPath);
      fetchPathImage();
    }
  }, [paths, itemId, path]);

  return loading ? (
    <p>
      <Loader heigth={"50vw"} />
    </p>
  ) : (
    path && (
      <div>
        <section className={style.imageWrapper}>
          <img src={imagePath} className={style.image} alt="path overview" />
        </section>
        <section className={style.textWrapper}>
          <h1 className={style.title}>{path.name}</h1>
          <h4 className={style.subTitle}>Overview</h4>
          <p className={style.description}>{path.description}</p>
          <h4 className={style.subTitle}>Skills developed</h4>
          <ul className={style.skills}>
            {path.skillsDeveloped &&
              path.skillsDeveloped.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
          </ul>
          <Button
            variant="contained"
            sx={{
              height: "50px",
              width: "9rem",
              backgroundColor: "#0B7077",
              marginTop: "2em",
              color: "white",
              fontFamily: "Inter, sans-serif",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#085b61",
                color: "#ffffff",
                boxShadow: "none",
              },
              "@media screen and (max-width: 400px)": {
                width: "7rem",
                height: "40px",
                fontSize: "0.7rem",
              },
            }}
          >
            Enroll Now
          </Button>
        </section>
      </div>
    )
  );
};
export default Path;
