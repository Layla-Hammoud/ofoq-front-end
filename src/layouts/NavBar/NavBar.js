import { NavItems } from "./NavBarItems";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import style from "./NavBar.module.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { studentNavItems } from "./NavBarItems";
import { teacherNavItems } from "./NavBarItems";
import { useNavigate } from "react-router-dom";
import MenuSimple from "../../components/DropdownList/DropdowList";
import useApi from "../../hooks/useApi";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { apiCall } = useApi();
  const handlelogOut = async () => {
    const response = await apiCall({
      url: "user/log-out",
      method: "post",
    });
    setUser(null);
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const bar1 = [style.bar1, open ? style.bar1active : ""].join(" ");
  const bar2 = [style.bar2, open ? style.bar2active : ""].join(" ");
  const bar3 = [style.bar3, open ? style.bar3active : ""].join(" ");
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      // Check window width and update the style directly
      const liElement = document.getElementById("conditionalLi");
      if (liElement) {
        liElement.style.display = window.innerWidth < 1222 ? "block" : "none";
      }
    };
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleClick = () => {
    setOpen(!open);
  };

  // const getNavItemsBasedOnRole = (role) => {
  //   switch (role) {
  //     case "student":
  //       return studentNavItems;
  //     case "teacher":
  //       return teacherNavItems;
  //     default:
  //       return NavItems;
  //   }
  // };

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

        {!user && (
          <span style={{ width: "auto" }} className={style.navlinks}>
            <NavLink className={style.link} to="teacher-request">
              Join as Teacher
            </NavLink>
          </span>
        )}
        {!user && windowWidth < 1222 && (
          <li id="conditionalLi">
            <span className={style.navlinks}>
              <NavLink className={style.link} to="sign-up">
                sign up
              </NavLink>
            </span>
          </li>
        )}
        {user && user.role === "student" && windowWidth < 1222 && (
          <li id="conditionalLi">
            <span className={style.navlinks}>
              <NavLink className={style.link} to="courses">
                My Courses
              </NavLink>
            </span>
          </li>
        )}
        {user && user.role === "teacher" && windowWidth < 1222 && (
          <li id="conditionalLi">
            <span className={style.navlinks}>
              <NavLink className={style.link} to="teacherSessions">
                My Sessions
              </NavLink>
            </span>
          </li>
        )}
        {user && windowWidth < 1222 && (
          <li id="conditionalLi">
            <span onClick={handlelogOut} className={style.navlinks}>
              Log Out
            </span>
          </li>
        )}
        <div className={style.navButtonContainer}>
          {!user ? (
            <>
              <li>
                <NavLink to="sign-up">
                  <Button
                    variant="contained"
                    sx={{
                      height: "50px",
                      width: "8rem",
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
                    }}
                  >
                    SIGN UP
                  </Button>
                </NavLink>
              </li>
            </>
          ) : (
            <MenuSimple />
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
