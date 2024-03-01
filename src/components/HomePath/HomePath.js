import Card from "../Card/Card";
import style from "./HomePath.module.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
// import useApi from "../../hooks/useApi";
import Loader from "../Loader/Loader";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import { fetchData } from "../../data/fetchdata";
const HomePath = () => {
  const [paths, setPaths] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setPaths(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, []);

  // const { apiCall, loading, error } = useApi();
  // useEffect(() => {
  //   const fetchPaths = async () => {
  //     const response = await apiCall({ url: "domain/get-all", method: "get" });
  //     setPaths(response.data);
  //   };
  //   fetchPaths();
  // }, []);

  const NextArrow = (props) => (
    <div {...props} className={`${style.slickArrow} ${style.nextArrow}`}>
      <img src={rightArrow} className={style.arrowImage} alt="Next" />
    </div>
  );

  const PrevArrow = (props) => (
    <div {...props} className={`${style.slickArrow} ${style.prevArrow}`}>
      <img src={leftArrow} alt="Previous" className={style.arrowImage} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
    ],
  };

  if (loading) {
    return <Loader heigth={"30vw"} />;
  }

  return (
    <>
      <section className={style.PathSection}>
        <h3 className={style.PathTitle}>Our Paths</h3>
        <p className={style.PathSubTitle}>
          Boost performance with our predefined paths
        </p>
        {paths && paths.length > 0 && (
          <Slider {...settings}>
            {paths.map((path, index) => (
              <Card
                key={index}
                name={path.name}
                description={path.description}
                image={path.image}
                itemId={path.slug}
                type={"path"}
                homeSlick={true}
              />
            ))}
          </Slider>
        )}
      </section>
    </>
  );
};
export default HomePath;
