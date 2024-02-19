import Card from "../Card/Card"
import style from "./HomePath.module.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { ArrowCarousel } from "../ArrowCarousel/ArrowCarousel";
import useApi from "../../hooks/useApi";
 const HomePath = () => {
    const [paths, setPaths] = useState(null);
    const { apiCall } = useApi();
    useEffect(() => {
        const fetchPaths = async () => {
          const response = await apiCall({ url: "domain/get-all", method: "get" });
          setPaths(response.data);
        };
        fetchPaths();
      }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <ArrowCarousel />,
        prevArrow: <ArrowCarousel />,
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
              nextArrow: <ArrowCarousel />,
              prevArrow: <ArrowCarousel />,
            },
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              nextArrow: <ArrowCarousel />,
              prevArrow: <ArrowCarousel />,
            },
          },
        ],
      };

  return (
    <>
    <section className={style.PathSection}>
      <h3 className={style.PathTitle}>Our Paths</h3>
      <p className={style.PathSubTitle}>Boost performance with our predefined paths</p>
      {paths && paths.length > 0 && (
        <Slider {...settings}>
          {paths.map((path, index) => (
            <Card key={index} name={path.name} description={path.description} image={path.image}/>
          ))}
        </Slider>
      )}
      </section>
    </>
  )
}
export default HomePath
