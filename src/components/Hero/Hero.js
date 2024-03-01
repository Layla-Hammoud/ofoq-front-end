import styles from "./Hero.module.css";
import { Button } from "@mui/material";
import HeroLine from "../../assets/HeroLine.png";
const Hero = () => {
  return (
    <>
      <div className={styles.heroWrapper}>
        <div className={styles.sloganWrapper}>
          <img className={styles.lines} src={HeroLine} alt="lines" />
          <h1 className={styles.slogan}>
            <span>Learn</span> Without Limits:<span> Knowledge </span>Accessible
            to <span>Everyone</span>
          </h1>
          <Button
            variant="contained"
            sx={{
              height: "50px",
              width: "10rem",
              backgroundColor: "#FD661F",
              marginRight: "10px",
              color: "white",
              fontFamily: "Inter, sans-serif",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#eb6e34",
                color: "#ffffff",
                boxShadow: "none",
              },
              "@media (max-width: 480px)": {
                height: "40px",
                mt: "20px",
              },
            }}
          >
            Explore Paths
          </Button>
        </div>

        <div alt="hero" className={styles.image}></div>
      </div>
    </>
  );
};
export default Hero;
