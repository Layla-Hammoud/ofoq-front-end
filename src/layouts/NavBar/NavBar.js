import { NavItems } from "./NavBarItems";
import { useState, useEffect } from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const bar1 = [style.bar1, open ? style.bar1active : ""].join(" ");
  const bar2 = [style.bar2, open ? style.bar2active : ""].join(" ");
  const bar3 = [style.bar3, open ? style.bar3active : ""].join(" ");
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      // Check window width and update the style directly
      const liElement = document.getElementById('conditionalLi');
      if (liElement) {
        liElement.style.display = window.innerWidth < 1222 ? 'block' : 'none';
      }
    };
    handleResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <nav className={style.NavbarItems}>
      <Link className={style.logo}>
        <img src={logo} alt="logo"></img>
      </Link>
      <div className={style["Hamburger-Cross-Icons"]} onClick={handleClick}>
        <span className={bar1}></span>
        <span className={bar2}></span>
        <span className={bar3}></span>
      </div>
      <ul className={`${style.MenuItems} ${open ? style.active : ""}`}>
        {NavItems.map((Item, index) => (
          <li key={index}>
            <span href={Item.url} className={style[Item.cName]}>
              <NavLink
                to={Item.url}
                className={`${style.link} ${
                  location.pathname === Item.url ? style.active : ""
                }`}
              >
                {Item.title}
              </NavLink>
            </span>
          </li>
        ))}
        <li id="conditionalLi">
        <span className={style.navlinks}>
          <NavLink className={style.link} to='sign-up'>sign up</NavLink>
          </span>
        </li>
        <div className={style.navButtonContainer}>
          <li>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                backgroundColor: "#ffffff",
                marginRight: "10px",
                color: "#0B7077",
                fontFamily: "Inter, sans-serif",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0B7077",
                  color: "#ffffff",
                },
              }}
            >
              SIGN UP
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
