import { Route, Routes } from "react-router-dom";
import NavBar from "../layouts/NavBar/NavBar";

const AppRoutes = () => {
  return (
      <Routes>
         <Route path="/" element={<NavBar />}></Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route>
         <Route path="/signup" element={<SignupPage />}></Route>
         <Route path="/signup" element={<SignupPage />}></Route> */}
      </Routes>
  );
};

export default AppRoutes;