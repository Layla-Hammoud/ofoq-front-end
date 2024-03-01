import style from "./Path.module.css";
import textIconDetail from "../../assets/text.svg";
import videoIconDetail from "../../assets/video.svg";
import bookIcon from "../../assets/book.svg";
// import useApi from "../../hooks/useApi";
import clockIcon from "../../assets/clock.png";
import personIcon from "../../assets/person.png";
import { Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchData } from "../../data/fetchdata";
import PathRatingCard from "../../components/PathRatingCard/PathRatingCard";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
const Path = () => {
  const { user } = useContext(AuthContext);
  const { itemId } = useParams();
  const [paths, setPaths] = useState(null);
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentUrl = window.location.href;
  const shareMessage =
    "Elevate your high school exam preparation with Ofok! 🚀 Unleash your potential, conquer challenges, and excel in your academic journey. Join us today for a brighter future! ";
  const hashtag = "#OfokAdventures #HighSchoolSuccess";

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
      const selectedPath = paths.find((item) => item.slug === itemId);
      setPath(selectedPath);
      fetchPathImage();
    }
  }, [paths, itemId, path]);

  return loading && !image ? (
    <p>
      <Loader heigth={"50vw"} />
    </p>
  ) : (
    path && (
      <div>
        <section className={style.imageWrapper}>
          <img src={imagePath} className={style.image} alt="path overview" />
        </section>
        <article className={style.pathInfoContainer}>
          <section className={style.textWrapper}>
            <div className={style.titleAndButtonWrapper}>
              <h1 className={style.title}>{path.name}</h1>
              {!user && (
                <Link to="/sign-up">
                  <Button
                    variant="contained"
                    sx={{
                      height: "50px",
                      width: "9rem",
                      backgroundColor: "#0B7077",
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
                </Link>
              )}
            </div>
            <h4 className={style.subTitle}>Overview</h4>
            <p className={style.description}>{path.description}</p>
            <h4 className={style.subTitle}>Skills developed by this path</h4>
            <ul className={style.skills}>
              {path.skillsDeveloped &&
                path.skillsDeveloped.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
            </ul>
            <h4 className={style.subTitle}>Key Features in this path</h4>
            <ul className={style.skills}>
              {path.key_features &&
                path.key_features.map((features, index) => (
                  <li key={index}>{features}</li>
                ))}
            </ul>
            <h4 className={style.subTitle}>Courses included in this path</h4>
            <div className={style.coursesTitleContainer}>
              {path.skillsDeveloped &&
                path.courses_included.map((course, index) => (
                  <div className={style.courseBox}>{course}</div>
                ))}
            </div>
            <h4 className={style.subTitle}>Reviews</h4>
            {path.reviews &&
              path.reviews.map((review, index) => (
                <>
                  <PathRatingCard
                    review={review.review}
                    rating={review.rating}
                    date={review.date}
                    name={review.name}
                  />
                </>
              ))}
          </section>
          <aside className={style.courseDetails}>
            <h4 className={style.detailTitle}>Course Details</h4>
            <div className={style.detailRowWrapper}>
              <img
                className={style.detailIcon}
                alt="clock"
                src={clockIcon}
              ></img>
              <p>{path.estimated_completion_time} hour(s)</p>
            </div>
            <div className={style.detailRowWrapper}>
              <img
                className={style.detailIcon}
                alt="clock"
                src={videoIconDetail}
              ></img>
              <p>{path.number_of_video_resources} video base resources</p>
            </div>
            <div className={style.detailRowWrapper}>
              <img
                className={style.detailIcon}
                alt="text"
                src={textIconDetail}
              ></img>
              <p>
                {path.number_of_text_resources} text base resources available
              </p>
            </div>
            <div className={style.detailRowWrapper}>
              <img
                className={style.detailIcon}
                alt="clock"
                src={personIcon}
              ></img>
              <p>{path.number_of_students} student(s) enrolled</p>
            </div>
            <div className={style.detailRowWrapper}>
              <img
                className={style.detailIcon}
                alt="clock"
                src={bookIcon}
              ></img>
              <p>{path.courses_included.length} courses available</p>
            </div>
            <h4 className={style.shareTitle}>
              Empower others! Share this path Now
            </h4>

            {/* Twitter Share Button */}
            <TwitterShareButton
              url={currentUrl}
              title={shareMessage}
              hashtags={[hashtag]}
              className={style.socialMediaButton}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* Facebook Share Button */}
            <FacebookShareButton
              url={currentUrl}
              className={style.socialMediaButton}
              quote={shareMessage}
              hashtag={hashtag}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            {/* LinkedIn Share Button */}
            <LinkedinShareButton
              className={style.socialMediaButton}
              url={currentUrl}
              title={shareMessage}
              summary={shareMessage}
              source={currentUrl}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            {/* Reddit Share Button */}
            <RedditShareButton
              url={currentUrl}
              title={shareMessage}
              className={style.socialMediaButton}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </aside>
        </article>
      </div>
    )
  );
};
export default Path;
