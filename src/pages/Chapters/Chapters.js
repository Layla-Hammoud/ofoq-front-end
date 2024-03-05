import style from "./Chapters.module.css";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dataImage from "../../assets/data.svg";
import text from "../../assets/data.svg";
import video from "../../assets/videicon.svg";
const Chapters = () => {
  const { loading, error, apiCall } = useApi();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState(null);
  const { itemId } = useParams();
  useEffect(() => {
    const fetchChapters = async () => {
      const response = await apiCall({
        url: "chapter/get-chapters-by-course",
        method: "post",
        data: { courseId: itemId },
      });
      setChapters(response.data.chapters);
      setCourse(response.data.course);
    };
    fetchChapters();
  }, []);
  return loading ? (
    <Loader heigth={"50vw"} />
  ) : (
    <>
      {course && chapters && (
        <>
          <section className={style.imageWrapper}>
            <img
              src={course.image}
              className={style.image}
              alt="path overview"
            />
          </section>
          <section className={style.textWrapper}>
            <h1 className={style.title}>
              Available Resources for {course.name}
            </h1>
            <p className={style.description}>{course.description}</p>
            {chapters.map((chapter, index) => (
              <Accordion
                sx={{
                  border: "1px solid #E1D3D3",
                  marginBottom: "10px",
                }}
                key={chapter._id}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      "@media (max-width: 600px)": {
                        paddingTop: "10px",
                        fontSize: "17px",
                      },
                    }}
                    key={index}
                  >
                    chapter {chapter.number}: {chapter.title}{" "}
                    <span key={index} className={style.resourceNumber}>
                      ({chapter.resources.length} Resources)
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600",
                      paddingBottom: "15px",
                      color: "#696984",
                    }}
                  >
                    {chapter.description}
                  </Typography>

                  {chapter.resources.map((resource, index) => (
                    <>
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          paddingTop: "15px",
                          fontWeight: "700",
                          "@media (max-width: 600px)": {
                            paddingTop: "10px",
                            fontSize: "14px",
                          },
                        }}
                      >
                        {resource.type === "video" ? (
                          <img
                            alt="text icon"
                            className={style.icon}
                            src={video}
                          />
                        ) : resource.type === "text" ? (
                          <img
                            className={style.icon}
                            alt="video icon"
                            src={text}
                          />
                        ) : (
                          <img
                            className={style.icon}
                            alt="data icon"
                            src={dataImage}
                          />
                        )}{" "}
                        {resource.title} - {resource.description}{" "}
                        <a
                          href={resource.link}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Click here for the resource
                        </a>
                      </Typography>
                    </>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </section>
        </>
      )}
    </>
  );
};
export default Chapters;
