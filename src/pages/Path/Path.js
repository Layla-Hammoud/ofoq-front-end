import image from "../../assets/test.jpg";
import style from './Path.module.css'
let skillsDeveloped = [
    "JavaScript proficiency",
    "React.js development",
    "Node.js backend development",
    "HTML5 and CSS3 styling",
    "Responsive web design",
    "Version control with Git",
]
const Path = () => {
  return (
    <>
      <img src={image} className={style.image} alt="path overview"></img>
      <h1>SG</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec
        justo eget libero feugiat commodo. Vestibulum non dictum orci. Curabitur
        quis nisi a ligula tempor feugiat. Vivamus vitae gravida odio. Proin
        vestibulum mi eu sem ullamcorper, non cursus justo cursus. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Suspendisse nec justo eget
        libero feugiat commodo. Vestibulum non dictum orci. Curabitur quis nisi
        a ligula tempor feugiat. Vivamus vitae gravida odio. Proin vestibulum mi
        eu sem ullamcorper, non cursus justo cursus.
      </p>
      <h4>Skills developped</h4>
      <ul>
        {skillsDeveloped.map((skill , index)=>(
            <li>{skill}</li>
        ))}
      </ul>
    </>
  );
};
export default Path;
