// import * as React from "react";
// import { Dropdown } from "@mui/base/Dropdown";
// import { Menu } from "@mui/base/Menu";
// import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
// import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";
// import useApi from "../../hooks/useApi";
// import { useState, useContext } from "react";
// import { Typography, useMediaQuery } from "@mui/material";
// import { Link } from "react-router-dom";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { AuthContext } from "../../Context/AuthContext";
// export default function MenuSimple() {
//   const [open, setOpen] = useState(false);
//   const isWideScreen = useMediaQuery("(min-width:750px)");
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const toggleMenu = () => {
//     setOpen((prevOpen) => !prevOpen); // Toggle the open state
//   };
//   const { apiCall } = useApi();
//   const handlelogOut = async () => {
//     const response = await apiCall({
//       url: "user/log-out",
//       method: "post",
//     });
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <>
//       {isWideScreen && (
//         <Dropdown>
//           <MenuButton
//             onClick={toggleMenu}
//             sx={{
//               bgcolor: "#088395",
//               color: "white",
//               fontWeight: "600",
//               fontSize: "1rem",
//               ":hover": {
//                 bgcolor: "#066876",
//               },
//               fontFamily: "Inter",
//               display: "flex",
//               alignItems: "center",
//               ".base-Popup-root .base-Menu-root .base--expanded": {
//                 zIndex: 30,
//               },
//             }}
//           >
//             My account{" "}
//             <ArrowDropDownIcon
//               sx={{
//                 color: "white",
//               }}
//             />
//           </MenuButton>
//           <Menu
//             sx={{
//               zIndex: 1000,
//               ".base-Popup-root .base-Menu-root .base--expanded": {
//                 zIndex: 30,
//               },
//               marginTop: "2rem !important",
//             }}
//             slots={{ listbox: Listbox }}
//             open={open}
//             onClose={() => setOpen(false)}
//           >
//             {/* <Typography mb='0.5rem' fontFamily='Helvetica Neue'>
//                 {user && user.firstName} {user && user.lastName}
//               </Typography> */}
//             {user.role === "student" && (
//               <Link
//                 to="/courses"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 <MenuItem
//                   sx={{
//                     fontFamily: "Inter",
//                     ".base-Popup-root .base-Menu-root .base--expanded": {
//                       zIndex: 30,
//                     },
//                     marginTop: "1rem",
//                   }}
//                 >
//                   My Courses
//                 </MenuItem>
//               </Link>
//             )}
//             <MenuItem
//               onClick={handlelogOut}
//               sx={{
//                 color: "red",
//                 fontFamily: "Inter",
//               }}
//             >
//               Log out
//             </MenuItem>
//           </Menu>
//         </Dropdown>
//       )}
//     </>
//   );
// }

// const blue = {
//   50: "#F0F7FF",
//   100: "#C2E0FF",
//   200: "#99CCF3",
//   300: "#66B2FF",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E6",
//   700: "#0059B3",
//   800: "#004C99",
//   900: "#003A75",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E5EAF2",
//   200: "#DAE2ED",
//   300: "#C7D0DD",
//   400: "#B0B8C4",
//   500: "#9DA8B7",
//   600: "#6B7A90",
//   700: "#434D5B",
//   800: "#303740",
//   900: "#1C2025",
// };

// const Listbox = styled("ul")(
//   ({ theme }) => `
//   z-index: 10000 !important;
//   position: relative ;
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   padding: 6px;
//   margin: 2rem 0;
//   min-width: 200px;
//   border-radius: 12px;
//   overflow: auto;
//   outline: 0px;
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   box-shadow: 0px 4px 6px ${
//     theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
//   };
//   `
// );

// const MenuItem = styled(BaseMenuItem)(
//   ({ theme }) => `
//   z-index: 10000 !important;
//   list-style: none;
//   padding: 8px;
//   border-radius: 8px;
//   cursor: default;
//   user-select: none;
//   text-decoration:none
//   &:last-of-type {
//     border-bottom: none;
//   }

//   &.${menuItemClasses.focusVisible} {
//     outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
//     background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
//     color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   }

//   &.${menuItemClasses.disabled} {
//     color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
//   }

//   &:hover:not(.${menuItemClasses.disabled}) {
//     background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
//     color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
//   }
//   `
// );

// const MenuButton = styled(BaseMenuButton)(
//   ({ theme }) => `
//   margin-right:2rem;
//   z-index: 10000 !important;
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 600;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   padding: 8px 16px;
//   border-radius: 8px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
//   box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//   &:hover {
//     background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
//     border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
//   }

//   &:active {
//     background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
//   }

//   &:focus-visible {
//     box-shadow: 0 0 0 4px ${
//       theme.palette.mode === "dark" ? blue[300] : blue[200]
//     };
//     outline: none;
//   }
//   `
// );

import * as React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

export default function MenuSimple() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { apiCall } = useApi();
  const handlelogOut = async () => {
    const response = await apiCall({
      url: "user/log-out",
      method: "post",
    });
    setUser(null);
    navigate("/");
  };

  return (
    <Box
      sx={{
        ".MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
          width: "50rem",
          maxWidth: "none !important",
        },
      }}
    >
      <Button
        endIcon={<ArrowDropDownIcon />}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          bgcolor: "#0B7077 !important",
          color: "white !important",
          height: "45px !important",
          minHeight: "45px !important",
          fontFamily: "Inter",
        }}
      >
        My Account
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          mt: "0.5rem",
          fontFamily: "Inter",
        }}
      >
        {user.role === "teacher" && (
          <Link to="teacherSessions">
            <MenuItem
              onClick={handleClose}
              sx={{
                height: "3rem",
                width: "8.5rem !important",
                fontFamily: "Inter",
              }}
            >
              My Sessions
            </MenuItem>
          </Link>
        )}
        {user.role === "student" && (
          <Link to="courses">
            <MenuItem
              onClick={handleClose}
              sx={{
                height: "3rem",
                width: "8.5rem !important",
                fontFamily: "Inter",
              }}
            >
              My Courses
            </MenuItem>
          </Link>
        )}

        <MenuItem
          onClick={handlelogOut}
          sx={{
            height: "3rem",
            width: "8.5rem !important",
            fontFamily: "Inter",
            color: "red",
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
}
