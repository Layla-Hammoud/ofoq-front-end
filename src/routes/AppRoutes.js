import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignUp/SignUp";
import PageLayout from "../layouts/PageLayout/PageLayout";
import Home from "../pages/Home/Home";
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<PageLayout />}>
         <Route path="/" element={<Home />}></Route>
         </Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route> */}
         <Route path="/sign-up" element={<SignupPage />}></Route>
         {/* <Route path="/signup" element={<SignupPage />}></Route> */}
      </Routes>
  );
};

export default AppRoutes;